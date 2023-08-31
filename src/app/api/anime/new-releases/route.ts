import { scraping } from '@/utils/api';
import { httpApiErrorHandle } from '@/utils/api/errorHandling';
import { cheerio } from '@/utils/api/scraping/cheerio';
import { pagination } from '@/utils/api/scraping/pagination.util';
import { extractString } from '@/utils/index.util';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get('page') || 1;
    const isPage = req.nextUrl.searchParams.get('page');
    let url = '/';
    if (Number(isPage) > 1) url = `/page/${page}/`;
    const response = await scraping.get(url);
    const html = await response.data;

    const $ = cheerio.load(html);

    const $container = $('.bbnofrm').eq(1);

    const dataReleases: any = [];
    $container.find('.excstf article').each((idx, el) => {
      const thumbnail = $(el).find('.bsx .thumb a img').attr('src');
      const url = $(el).find('.bsx .thumb a').attr('href') as string;
      const info = $(el).find('.bsx .inf');
      const title = info.find('h2').text();
      const score = $(el).find('.bsx .upscore .scr').text();
      const slug = extractString(url, 2, '/');
      const information = info
        .find('ul li')
        .map((id, ele) => {
          const data = $(ele).contents().not('b').text().trim();
          return data;
        })
        .get();
      const genres = information[4].split(', ');
      const status = information[0].toLowerCase();
      const series = information[3];
      dataReleases.push({
        title,
        thumbnail,
        slug,
        status,
        series,
        score: Number(score),
        genres,
      });
    });

    const paginate = pagination({ html, page: Number(page) });
    const data = {
      ...paginate,
      collection: dataReleases,
    };
    return NextResponse.json(data);
  } catch (e: any) {
    return httpApiErrorHandle(e);
  }
}
