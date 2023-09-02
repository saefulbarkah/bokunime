import { extractString } from '@/utils/index.util';
import { cheerio } from '../cheerio';

export const getRecommendationSeries = (html: string) => {
  const $ = cheerio.load(html);
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
  return [...recommendationSeries];
};

export default getRecommendationSeries;
