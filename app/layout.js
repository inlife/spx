import './globals.css'
import Script from 'next/script'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SPX - Make Links Work in Notion, Obsidian & Other Apps | Free Link Converter',
  description: 'Convert custom scheme URLs into universal links that work in Notion, Obsidian, Slack, and anywhere else. Free, instant, no signup required.',
  keywords: 'notion links, obsidian links, broken links fix, link converter, url fixer, share links notion, share links obsidian, clickable links, custom scheme, universal links, slack links, zoom links, obsidian url, notion url',
  authors: [{ name: 'inlife' }],
  openGraph: {
    title: 'SPX - Make Links Work in Notion, Obsidian & Other Apps | Free Link Converter',
    description: 'Convert custom scheme URLs into universal links that work in Notion, Obsidian, Slack, and anywhere else. Free, instant, no signup required.',
    url: 'https://spx.vercel.sh',
    siteName: 'SPX - Free Link Converter',
    images: [
      {
        url: 'https://spx.vercel.sh/preview.png?v=1',
        width: 1200,
        height: 630,
        alt: 'SPX - Make Links Work Everywhere',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@inlife360',
    description: 'Convert custom scheme URLs into universal links that work in Notion, Obsidian, Slack, and anywhere else. Free, instant, no signup required.',
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
        <link rel="canonical" href="https://spx.vercel.sh" />
        <link rel="author" href="https://plus.google.com/114197786731970943237" />
        <link rel="publisher" href="https://plus.google.com/114197786731970943237" />
        <meta property="fb:admins" content="100000470641337" />
        <meta property="fb:profile_id" content="100000470641337" />

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
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
