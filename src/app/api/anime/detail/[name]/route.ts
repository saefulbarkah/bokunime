import { scraping } from '@/utils/api';
import { httpApiErrorHandle } from '@/utils/api/errorHandling';
import { cheerio } from '@/utils/api/scraping/cheerio';
import { getInformationAnime } from '@/utils/api/scraping/elements';
import { extractString } from '@/utils/index.util';
import { NextResponse, NextRequest } from 'next/server';

const getInformation = (html: string) => {
  const $ = cheerio.load(html);

  // get information
  const info = getInformationAnime(html);

  // get episodeLists
  const episodeLists: any = [];
  $('.eplister ul').each((idx, el) => {
    const list = $(el)
      .find('li')
      .map((id, ele) => {
        const url = $(ele).find('a').attr('href') as string;
        const slug = extractString(url, 2, '/');
        const title = $(ele).find('.epl-title').text();
        const getEpisode = $(ele).find('.epl-num').text();
        const episode = Number(getEpisode) ? Number(getEpisode) : 'END';
        const releaseDate = $(ele).find('.epl-date').text();
        return { title, slug, episode, releaseDate };
      })
      .get();

    list.map((item) => {
      episodeLists.push({ ...item });
    });
  });

  // get recommendation series
  const recommendationSeries: any = [];
  $('.bixbox .listupd article .bsx').each((idx, ele) => {
    const url = $(ele).find('a').attr('href') as string;
    const slug = extractString(url, 2, '/');
    const title = $(ele).find('.tt h2').text();
    const type = $(ele).find('.limit .typez').text().toLocaleLowerCase();
    const status = $(ele).find('.limit .status').text().toLowerCase();
    const thumbnail = $(ele).find('.limit img').attr('src');
    recommendationSeries.push({ title, slug, type, status, thumbnail });
  });

  return {
    ...info,
    episodeLists,
    recommendationSeries,
  };
};

export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  const name = params.name;
  try {
    const response = await scraping.get(`/anime/${name}`);
    const html = await response.data;
    const information = getInformation(html);
    return NextResponse.json(information);
  } catch (e: any) {
    return httpApiErrorHandle(e);
  }
}
