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
    // get popular anime
    const popularData: Partial<animeTypes>[] = [];
    const $container = $('.bbnofrm').eq(0);
    $container.find('.excstf article .bsx a').each((idx, el) => {
      const url = $(el).attr('href') as string;
      const slug = extractString(url, 2, '/');
      const info = $(el).find('.limit');
      const thumbnail = info.find('img').attr('src');
      const title = info.find('.egghead .eggtitle').text();
      const type = info.find('.egghead .eggmeta .eggtype').text().toLowerCase();
      const episodeInfo = info
        .find('.egghead .eggmeta .eggepisode')
        .text()
        .toLowerCase();
      const episode = episodeInfo.replace('episode ', '');
      const numberEpisode = Number(episode) ? Number(episode) : 'END';

      popularData.push({
        title,
        slug,
        thumbnail,
        type,
        episode: numberEpisode,
      });
    });
    return NextResponse.json(popularData);
  } catch (e: any) {
    return httpApiErrorHandle(e);
  }
}
