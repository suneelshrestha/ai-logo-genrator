import {NextRequest, NextResponse} from 'next/server';
import {auth} from './lib/auth';

export async function middleware(request: NextRequest) {
  // const session = await auth();
  if (request.nextUrl.pathname === '/suiiiiii') {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
