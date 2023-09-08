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
    const resolutions: any = [];

    $(el)
      .find('.soraurlx')
      .each((resIndex, resElement) => {
        const resolution = $(resElement).find('strong').text();
        const servers: any = [];

        $(resElement)
          .find('a[target="_blank"]')
          .each((linkIndex, linkElement) => {
            const serverName = $(linkElement)
              .text()
              .replace(/\s*\([^)]*\)/, '');
            const link = $(linkElement).attr('href');
            servers.push({ serverName, link });
          });

        resolutions.push({ resolution, servers });
      });

    downloads.push({ format, data: resolutions });
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
