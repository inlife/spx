import './globals.css'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shortlink - Shorten & Fix Links for Notion, Obsidian & Other Apps | Free Link Shortener',
  description: 'Shorten and convert custom scheme URLs into compact, universal links that work in Notion, Obsidian, Slack, and anywhere else. Built-in URL compression makes links up to 65% shorter. Free, instant, no signup required.',
  keywords: 'url shortener, link shortener, shorten url, compress url, short link, notion links, obsidian links, broken links fix, link converter, url fixer, share links notion, share links obsidian, clickable links, custom scheme, universal links, slack links, zoom links, obsidian url, notion url, link compressor, short url generator',
  authors: [{ name: 'inlife' }],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Shortlink - Shorten & Fix Links for Notion, Obsidian & Other Apps | Free Link Shortener',
    description: 'Shorten and convert custom scheme URLs into compact, universal links that work in Notion, Obsidian, Slack, and anywhere else. Built-in URL compression makes links up to 65% shorter. Free, instant, no signup required.',
    url: 'https://www.shortlink.studio',
    siteName: 'Shortlink - Free Link Shortener & Converter',
    images: [
      {
        url: 'https://www.shortlink.studio/preview.png?v=1',
        width: 1200,
        height: 630,
        alt: 'Shortlink - Make Links Work Everywhere',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@inlife360',
    description: 'Shorten and convert custom scheme URLs into compact, universal links that work in Notion, Obsidian, Slack, and anywhere else. Built-in URL compression makes links up to 65% shorter. Free, instant, no signup required.',
  },
  robots: 'index, follow',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="HandheldFriendly" content="True" />
        <link rel="canonical" href="https://www.shortlink.studio" />
        <link rel="author" href="https://plus.google.com/114197786731970943237" />
        <link rel="publisher" href="https://plus.google.com/114197786731970943237" />
        <meta property="fb:admins" content="100000470641337" />
        <meta property="fb:profile_id" content="100000470641337" />
        <meta name="google-adsense-account" content="ca-pub-2466083603668341" />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CG6KC5KZLG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-76312016-2');
          `}
        </Script>
        {/* google adsense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2466083603668341"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
