import './globals.css'
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  metadataBase: new URL('https://www.shortlink.studio'),
  title: {
    default: 'Shortlink — Fix Custom Scheme URLs',
    template: '%s | Shortlink',
  },
  description: 'Turn slack://, obsidian:// and zoommtg:// links into https links that stay clickable in Notion, GitHub, email and chat. Free, no signup.',
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
    description: 'Turn slack://, obsidian:// and zoommtg:// links into https links that stay clickable in Notion, GitHub, email and chat. Free, no signup.',
    url: 'https://www.shortlink.studio',
    siteName: 'Shortlink',
    images: [
      {
        url: '/preview.png?v=1',
        width: 1200,
        height: 630,
        alt: 'Shortlink: make custom scheme links clickable',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@inlife360',
    title: 'Shortlink — Fix Custom Scheme URLs',
    description: 'Turn slack://, obsidian:// and zoommtg:// links into https links that stay clickable in Notion, GitHub, email and chat.',
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
