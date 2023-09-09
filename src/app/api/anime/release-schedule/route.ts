import { scheduleTypes } from '@/types';
import { scraping } from '@/utils/api';
import { httpApiErrorHandle } from '@/utils/api/errorHandling';
import { cheerio } from '@/utils/api/scraping/cheerio';
import { extractString } from '@/utils/index.util';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const response = await scraping.get('/jadwal-rilis');
    const html = await response.data;
    const $ = cheerio.load(html);

    // get shcedule release date
    const scheduleContainer = $('.schedulepage');
    const scheduleData: scheduleTypes[] = [];
    scheduleContainer.each((idx, el) => {
      const schedule = $(el);
      const getDate = schedule.find('.releases h3').text().toLowerCase();
      const data = schedule
        .find('.listupd .bs .bsx')
        .map((id, ele) => {
          const url = $(ele).find('a').attr('href') as string;
          const title = $(ele).find('a .tt').text() as string;
          const thumbnail = $(ele).find('a .limit img').attr('src') as string;
          const timer = $(ele).find('a .limit .bt .cndwn').text() as string;
          const ongoingEpisode = $(ele).find('a .limit .bt .sb').text();
          return {
            slug: extractString(url, 2, '/'),
            title,
            thumbnail,
            timer,
            ongoingEpisode: Number(ongoingEpisode),
          };
        })
        .get();

      scheduleData.push({
        day: getDate,
        data: data.map((item) => {
          return { ...item };
        }),
      });
    });
    const weekdaysInOrder = [
      'senin',
      'selasa',
      'rabu',
      'kamis',
      "jum'at",
      'sabtu',
    ];

    const sortData = weekdaysInOrder
      .filter((day) =>
        scheduleData.some((item) => item.day.toLowerCase() === day)
      )
      .map((day) => {
        const item = scheduleData.find(
          (item) => item.day.toLowerCase() === day
        );
        return item ? item : { day, data: [] };
      });

    return NextResponse.json(sortData);
  } catch (e: any) {
    return httpApiErrorHandle(e);
  }
}
