import { scraping } from '@/utils/api';
import { httpApiErrorHandle } from '@/utils/api/errorHandling';
import { cheerio } from '@/utils/api/scraping/cheerio';
import {
  getInformationAnime,
  getRecommendationSeries,
} from '@/utils/api/scraping/elements';
import { extractString } from '@/utils/index.util';
import { NextResponse, NextRequest } from 'next/server';

const getStreamEmbed = (html: string) => {
  const $ = cheerio.load(html);
  const streamURL = $('.player-embed').find('iframe').attr('src') as string;
  return streamURL;
};

const getDownloadEpisode = (html: string) => {
  const $ = cheerio.load(html);

  const $container = $('.mctnx');

  const downloads: any = [];
  $container.find('.soraddlx').each((idx, el) => {
    const format = $(el).find('.sorattlx h3').text();
    const resolution = $(el)
      .find('.soraurlx strong')
      .map((id, ele) => {
        const resolution = $(ele).text();
        return { resolution };
      })
      .get();
    const downloadLink = $(el)
      .find('.soraurlx a')
      .map((id, ele) => {
        const link = $(ele).attr('href');
        const serverName = $(ele).text();
        return { serverName, link };
      })
      .get();
    downloads.push({
      format,
      data: resolution.map((resolutionItem, id) => {
        return {
          ...resolutionItem,
          servers: downloadLink.map((serverItem) => {
            return { ...serverItem };
          }),
        };
      }),
    });
  });
  return downloads;
};

const getInformation = (html: string) => {
  const $ = cheerio.load(html);
  const titleEpisode = $('.title-section .entry-title').text();
  const releaseDate = $('.year .updated').text();
  const seriesName = $('.year a').eq(1).text();
  const seriesSlug = $('.year a').eq(1).attr('href') as string;
  const recommendationSeries = getRecommendationSeries(html);
  const {
    genres,
    duration,
    rating,
    season,
    type,
    releaseDate: releaseYear,
  } = getInformationAnime(html);

  return {
    titleEpisode,
    releaseDate,
    genres,
    duration,
    rating,
    season,
    type,
    releaseYear,
    series: {
      name: seriesName,
      slug: extractString(seriesSlug, 2, '/'),
    },
    recommendationSeries,
  };
};

export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  const name = params.name;
  try {
    const response = await scraping.get(`/${name}`);
    const html = await response.data;
    const getStreaming = getStreamEmbed(html);
    const downloads = getDownloadEpisode(html);
    const information = getInformation(html);
    const data = { ...information, streamURL: getStreaming, downloads };

    return NextResponse.json(data);
  } catch (e: any) {
    return httpApiErrorHandle(e);
  }
}
