import './globals.css'
import Script from 'next/script'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'spx - Create a proxy for custom scheme URL',
  description: 'spx - scheme proxy. A simple tool that allows naive proxying of urls with custom schemes. Useful for cases when you don\'t have an ability to use original url, because of some limitations (ex. urls on Notion)',
  keywords: 'scheme, proxy, url, notion, link, share, page, web, short',
  authors: [{ name: 'inlife' }],
  openGraph: {
    title: 'spx - Create a proxy for custom scheme URL',
    description: 'spx - scheme proxy. A simple tool that allows naive proxying of urls with custom schemes. Useful for cases when you don\'t have an ability to use original url, because of some limitations (ex. urls on Notion)',
    url: 'https://spx.now.sh',
    siteName: 'spx - Create a proxy for custom scheme URL',
    images: [
      {
        url: 'https://spx.now.sh/preview.png?v=1',
        width: 1200,
        height: 630,
        alt: 'spx - scheme proxy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    creator: '@inlife360',
    description: 'spx - scheme proxy. A simple tool that allows naive proxying of urls with custom schemes. Useful for cases when you don\'t have an ability to use original url, because of some limitations (ex. urls on Notion)',
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
        <link rel="canonical" href="https://spx.now.sh" />
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
