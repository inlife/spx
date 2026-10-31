import { NextResponse } from 'next/server'

// Legacy links (/0/<encoded url>, /1/<encoded url>) must be decoded exactly
// once. Depending on where the app runs, Next.js hands pages their params
// already decoded (Vercel) or still encoded (next start), so pass the path as
// it arrived and let the page decode that.
export function middleware(request) {
    const headers = new Headers(request.headers)
    headers.set('x-raw-path', new URL(request.url).pathname)
    return NextResponse.next({ request: { headers } })
}

export const config = {
    matcher: ['/0/:path*', '/1/:path*'],
}
