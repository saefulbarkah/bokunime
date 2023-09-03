export const dynamic = 'force-dynamic';
import { NextResponse, NextRequest } from 'next/server';
import { scraping } from '@/utils/api';
import { extractString } from '@/utils/index.util';
import { pagination } from '@/utils/api/scraping/elements/pagination';
import { cheerio } from '@/utils/api/scraping/cheerio';
import { httpApiErrorHandle } from '@/utils/api/errorHandling';

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page') || 1;
  try {
    const response = await scraping.get(
      `/anime/?page=${page}&status=ongoing&order=update`
    );
    const html = await response.data;
    const $ = cheerio.load(html);

    const $container = $('.listupd');

    // get lists ongoing
    const ongoingLists: any[] = [];
    $container.find('article').each((idx, el) => {
      const article = $(el);
      const div = article.find('div');
      const slugURL = div.find('a').attr('href') as string;
      const title = div.find('a .tt').contents().not('h2').text().trim();
      const type = div.find('a .limit .typez').text().toLowerCase();
      const status = div.find('a .limit .bt .epx').text().toLowerCase();
      const thumbnail = div.find('a .limit img').attr('src');
      ongoingLists.push({
        title: title,
        thumbnail: thumbnail,
        type: type,
        status: status,
        slug: extractString(slugURL, 2, '/'),
      });
    });

    //   pagination
    const paginate = pagination({ html, page: Number(page) });

    const collection = {
      ...paginate,
      data: ongoingLists,
    };

    return NextResponse.json(collection);
  } catch (e: any) {
    return httpApiErrorHandle(e);
  }
}
