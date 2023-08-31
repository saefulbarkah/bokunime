import { scraping } from '@/utils/api';
import { httpApiErrorHandle } from '@/utils/api/errorHandling';
import { cheerio } from '@/utils/api/scraping/cheerio';
import { extractString } from '@/utils/index.util';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const response = await scraping.get('/anime/list-mode');
    const html = await response.data;
    const $ = cheerio.load(html);

    //   get list animes
    const $container = $('.soralist');
    const listData: {
      tag: string;
      data: { title: string; slug?: string }[];
    }[] = [];
    $container.find('.blix').each((idx, el) => {
      const tag = $(el).find('span a').text();
      const data = $(el)
        .find('ul li')
        .map((id, ele) => {
          const title = $(ele).find('a').text();
          const slug = $(ele).find('a').attr('href') as string;

          return { title: title, slug: extractString(slug, 2, '/') };
        })
        .get();

      listData.push({
        tag,
        data: data.map((item) => {
          return { ...item };
        }),
      });
    });
    return NextResponse.json(listData);
  } catch (e: any) {
    return httpApiErrorHandle(e);
  }
}
