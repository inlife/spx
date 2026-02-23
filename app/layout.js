import './globals.css'
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  metadataBase: new URL('https://www.shortlink.studio'),
  title: {
    default: 'Shortlink — Fix Custom Scheme URLs',
    template: '%s | Shortlink',
  },
  description: 'Convert custom scheme URLs into universal links that work in Notion, Obsidian, Slack, and everywhere else. Free, instant, no signup.',
  keywords: 'url shortener, link shortener, custom scheme, notion links, obsidian links, broken links fix, link converter, universal links, slack links, zoom links, deep linking',
  authors: [{ name: 'inlife', url: 'https://github.com/inlife' }],
  creator: 'inlife',
  publisher: 'Shortlink',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Shortlink — Fix Custom Scheme URLs',
    description: 'Convert custom scheme URLs into universal links that work in Notion, Obsidian, Slack, and everywhere else. Free, instant, no signup.',
    url: 'https://www.shortlink.studio',
    siteName: 'Shortlink',
    images: [
      {
        url: '/preview.png?v=1',
        width: 1200,
        height: 630,
        alt: 'Shortlink — Universal Link Converter',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@inlife360',
    title: 'Shortlink — Fix Custom Scheme URLs',
    description: 'Convert custom scheme URLs into universal links that work everywhere. Free, instant, no signup.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <meta property="fb:admins" content="100000470641337" />
        <meta property="fb:profile_id" content="100000470641337" />
        <meta name="google-adsense-account" content="ca-pub-2466083603668341" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Shortlink',
              url: 'https://www.shortlink.studio',
              description: 'Convert custom scheme URLs (slack://, obsidian://, zoom://, notion://) into universal HTTPS links that work everywhere.',
              applicationCategory: 'UtilityApplication',
              operatingSystem: 'Any',
              browserRequirements: 'Requires JavaScript',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              author: {
                '@type': 'Person',
                name: 'inlife',
                url: 'https://github.com/inlife',
              },
              featureList: [
                'Convert slack:// URLs to universal links',
                'Convert obsidian:// URLs to universal links',
                'Convert zoom:// URLs to universal links',
                'Convert notion:// URLs to universal links',
                'Stateless URL compression with LZ encoding',
                'No signup required',
                'No database or tracking',
                'Open source',
              ],
            }),
          }}
        />

        {/* Fonts: Satoshi (Fontshare) + JetBrains Mono + Space Grotesk (Google Fonts) */}
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
            gtag('config', 'G-CG6KC5KZLG');
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
