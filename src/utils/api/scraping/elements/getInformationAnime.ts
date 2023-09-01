import { cheerio } from '../cheerio';

export const getInformationAnime = (html: string) => {
  const $ = cheerio.load(html);
  const thumbnail = $('.thumb img').attr('src');
  const title = $('.entry-title').text();
  const genres = $('.genxed')
    .map((idx, el) => {
      return $(el).text().trim().toLowerCase().split(' ');
    })
    .get();
  const synopsis = $('.entry-content p').text();
  const rating = $('.rating strong').text().replace('Rating ', '');
  const statusElement = $('.spe span b:contains("Status:")');
  const studioElement = $('.spe span b:contains("Studio:")');
  const durationElement = $('.spe span b:contains("Durasi:")');
  const seasonElement = $('.spe span b:contains("Season:")');
  const typeElement = $('.spe span b:contains("Tipe:")');
  const releaseElement = $('.spe span b:contains("Dirilis:")');

  const status = statusElement
    .parent()
    .text()
    .replace('Status:', '')
    .trim()
    .toLowerCase();

  const studio = studioElement
    .parent()
    .text()
    .replace('Studio:', '')
    .trim()
    .toLowerCase();

  const duration = durationElement
    .parent()
    .text()
    .replace('Durasi:', '')
    .trim()
    .toLowerCase();

  const season = seasonElement
    .parent()
    .text()
    .replace('Season:', '')
    .trim()
    .toLowerCase();

  const type = typeElement
    .parent()
    .text()
    .replace('Tipe:', '')
    .trim()
    .toLowerCase();
  const releaseDate = releaseElement
    .parent()
    .eq(0)
    .text()
    .replace('Dirilis:', '')
    .trim()
    .toLowerCase();
  const updatedAt = $('.spe .split time[itemprop="dateModified"]').attr(
    'datetime'
  );
  return {
    title,
    thumbnail,
    rating: Number(rating),
    genres,
    synopsis,
    status,
    studio,
    duration,
    season,
    type,
    releaseDate,
    updatedAt,
  };
};
