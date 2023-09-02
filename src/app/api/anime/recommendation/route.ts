import { animeTypes } from '@/types';
import { scraping } from '@/utils/api';
import { httpApiErrorHandle } from '@/utils/api/errorHandling';
import { cheerio } from '@/utils/api/scraping/cheerio';
import { extractString } from '@/utils/index.util';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const response = await scraping.get('/');
    const html = await response.data;
    const $ = cheerio.load(html);

    //   get recommnedation
    const $container = $('.series-gen');
    const dataRecommendation: { genre: string; data: Partial<animeTypes>[] }[] =
      [];
    $container.find('.listupd .tab-pane').each((idx, el) => {
      const genres = $container
        .find('.nav-tabs li')
        .map((id, ele) => {
          const genre = $(ele).find('a').text().trim().toLowerCase();
          return { genre };
        })
        .get();

      const data = $(el)
        .find('article')
        .map((id, ele) => {
          const info = $(ele).find('.bsx a .limit');
          const url = $(ele).find('.bsx a').attr('href') as string;
          const thumbnail = $(ele).find('.bsx a img').attr('src');
          const title = $(ele)
            .find('.bsx a .tt')
            .contents()
            .not('h2')
            .text()
            .trim();
          const status = info.find('.bt span').text().toLowerCase();
          const type = info.find('.typez').text().toLowerCase();

          const slug = extractString(url, 2, '/');

          return { title, thumbnail, slug, status, type };
        })
        .get();
      dataRecommendation.push({
        ...genres[idx],
        data: data.map((item) => ({ ...item })),
      });
    });

    return NextResponse.json(dataRecommendation);
  } catch (e: any) {
    return httpApiErrorHandle(e);
  }
}
