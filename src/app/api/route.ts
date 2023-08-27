import { targetUrl } from '@/config/siteConfig';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json(`Target ${targetUrl}`);
}
