import { scraping } from '@/utils/api';
import { httpApiErrorHandle } from '@/utils/api/errorHandling';
import { cheerio } from '@/utils/api/scraping/cheerio';
import { pagination } from '@/utils/api/scraping/elements/pagination';
import { extractString } from '@/utils/index.util';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page') || 1;
  const searchQuery = `page=${page}&${req.nextUrl.searchParams}`;
  try {
    const resposne = await scraping.get(`/anime?${searchQuery}`);
    const html = await resposne.data;
    const $ = cheerio.load(html);

    const $container = $('.listupd');

    // get lists ongoing
    const searchLists: any[] = [];
    $container.find('article').each((idx, el) => {
      const article = $(el);
      const div = article.find('div');
      const slugURL = div.find('a').attr('href') as string;
      const title = div.find('a .tt').contents().not('h2').text().trim();
      const type = div.find('a .limit .typez').text().toLowerCase();
      const status = div.find('a .limit .bt .epx').text().toLowerCase();
      const thumbnail = div.find('a .limit img').attr('src');
      searchLists.push({
        title: title,
        thumbnail: thumbnail,
        type: type,
        status: status,
        slug: extractString(slugURL, 2, '/'),
      });
    });

    const paginate = pagination({ html, page: Number(page) });
    const data = {
      ...paginate,
      collection: searchLists,
    };

    return NextResponse.json(data);
  } catch (e: any) {
    return httpApiErrorHandle(e);
  }
}
