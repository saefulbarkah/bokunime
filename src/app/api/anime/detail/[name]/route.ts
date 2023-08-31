import { scraping } from '@/utils/api';
import { httpApiErrorHandle } from '@/utils/api/errorHandling';
import { cheerio } from '@/utils/api/scraping/cheerio';
import { extractString } from '@/utils/index.util';
import { NextResponse, NextRequest } from 'next/server';

const getInformation = (html: string) => {
  const $ = cheerio.load(html);

  // get information
  const thumbnail = $('.thumb img').attr('src');
  const title = $('.entry-title').text();
  const genres = $('.genxed')
    .map((idx, el) => {
      return $(el).text().trim().toLowerCase().split(' ');
    })
    .get();
  const synopsis = $('.entry-content p').text();
  const rating = $('.rating strong').text().replace('Rating ', '');
  const status = $('.spe span')
    .eq(0)
    .contents()
    .not('b')
    .text()
    .toLowerCase()
    .trim();
  const studio = $('.spe span').eq(1).contents().not('b').text().trim();
  const duration = $('.spe span').eq(2).contents().not('b').text().trim();
  const season = $('.spe span')
    .eq(3)
    .contents()
    .not('b')
    .text()
    .trim()
    .toLowerCase();
  const type = $('.spe span').eq(4).contents().not('b').text().trim();
  const createdAt = $('.spe .split time').eq(0).attr('datetime');
  const updatedAt = $('.spe .split time').eq(1).attr('datetime');

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
    title,
    thumbnail,
    rating: Number(rating),
    genres,
    synopsis,
    status,
    studio,
    duration,
    season,
    type,
    createdAt,
    updatedAt,
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
