import { scraping } from '@/utils/api';
import { cheerio } from '@/utils/api/scraping/cheerio';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const response = await scraping.get('anime');
  const html = await response.data;
  const $ = cheerio.load(html);

  //   get seasson all
  const seasonData: any = [];
  $('.filters')
    .find('.sec1 .filter:nth-child(2)')
    .find('ul')
    .each((idx, el) => {
      const list = $(el)
        .find('li:not(:first-child)')
        .find('label')
        .map((idx, el) => {
          return $(el).text().trim();
        })
        .get();
      seasonData.push(...list);
    });

  return NextResponse.json(seasonData);
}
