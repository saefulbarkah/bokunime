import { cheerio } from '../cheerio';

interface paginationProps {
  html: string;
  page: number;
}

type paginationType = {
  nextPage: number | null;
  prevPage: number | null;
  currentPage: number;
};

export const pagination = ({ html, page }: paginationProps) => {
  const $ = cheerio.load(html);
  const paginationData: paginationType = {
    currentPage: page,
    nextPage: null,
    prevPage: null,
  };
  $('.hpage').each((idx, el) => {
    const nextPage = $(el).find('.r').length > 0;
    const prevPage = $(el).find('.l').length > 0;
    if (nextPage) {
      paginationData.nextPage = paginationData.currentPage + 1;
    }
    if (prevPage) {
      paginationData.prevPage = paginationData.currentPage - 1;
    }
  });
  return paginationData;
};
