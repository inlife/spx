import './globals.css'
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: 'Shortlink — Fix Custom Scheme URLs',
  description: 'Convert custom scheme URLs into universal links that work in Notion, Obsidian, Slack, and everywhere else. Free, instant, no signup.',
  keywords: 'url shortener, link shortener, custom scheme, notion links, obsidian links, broken links fix, link converter, universal links, slack links, zoom links',
  authors: [{ name: 'inlife' }],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Shortlink — Fix Custom Scheme URLs',
    description: 'Convert custom scheme URLs into universal links that work in Notion, Obsidian, Slack, and everywhere else. Free, instant, no signup.',
    url: 'https://www.shortlink.studio',
    siteName: 'Shortlink',
    images: [
      {
        url: 'https://www.shortlink.studio/preview.png?v=1',
        width: 1200,
        height: 630,
        alt: 'Shortlink',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@inlife360',
    description: 'Convert custom scheme URLs into universal links that work everywhere. Free, instant, no signup.',
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

        {/* Fonts: Satoshi (Fontshare) + JetBrains Mono (Google Fonts) */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />

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
      <body className="antialiased" suppressHydrationWarning>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
