import { scraping } from '@/utils/api';
import { httpApiErrorHandle } from '@/utils/api/errorHandling';
import { cheerio } from '@/utils/api/scraping/cheerio';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const response = await scraping.get('/anime');
    const html = await response.data;
    const $ = cheerio.load(html);
    //   get genre lists
    const genreData: any = [];
    $('.filters')
      .find('.sec1 .filter:first-child')
      .find('ul')
      .each((idx, el) => {
        const list = $(el)
          .find('li:not(:first-child)')
          .find('label')
          .map((idx, el) => {
            return $(el).text().toLowerCase();
          })
          .get();
        genreData.push(...list);
      });
    return NextResponse.json(genreData);
  } catch (e: any) {
    return httpApiErrorHandle(e);
  }
}
