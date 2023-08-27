import { targetUrl } from '@/config/siteConfig';
import axios from 'axios';

const scraping = axios.create({
  baseURL: targetUrl,
});

export { scraping };
