import { TARGET_URL } from '@/config/siteConfig';
import axios from 'axios';

const scraping = axios.create({
  baseURL: TARGET_URL,
});

export { scraping };
