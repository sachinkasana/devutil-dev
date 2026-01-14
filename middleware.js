import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host');

  if (host === 'devutil.dev') {
    const url = request.nextUrl.clone();
    url.hostname = 'www.devutil.dev';
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
