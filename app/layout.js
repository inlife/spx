import './globals.css'
import Script from 'next/script'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"

// Self-hosted at build time by next/font: no render-blocking request to Google.
// globals.css maps these variables to font-display / font-mono.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
  variable: '--font-space-grotesk',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata = {
  metadataBase: new URL('https://linkopen.app'),
  title: {
    default: 'LinkOpen — Fix Custom Scheme URLs',
    template: '%s | LinkOpen',
  },
  description: 'Turn slack://, obsidian:// and zoommtg:// links into https links that stay clickable in Notion, GitHub, email and chat. Free, no signup.',
  authors: [{ name: 'inlife', url: 'https://github.com/inlife' }],
  creator: 'inlife',
  publisher: 'LinkOpen',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LinkOpen — Fix Custom Scheme URLs',
    description: 'Turn slack://, obsidian:// and zoommtg:// links into https links that stay clickable in Notion, GitHub, email and chat. Free, no signup.',
    url: 'https://linkopen.app',
    siteName: 'LinkOpen',
    images: [
      {
        url: '/preview.png?v=2',
        width: 1200,
        height: 630,
        alt: 'LinkOpen: make custom scheme links clickable',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@inlife360',
    title: 'LinkOpen — Fix Custom Scheme URLs',
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
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="HandheldFriendly" content="True" />
        <meta property="fb:admins" content="100000470641337" />
        <meta property="fb:profile_id" content="100000470641337" />

        {/* Satoshi comes from Fontshare. Its license (ITF FFL) allows self-hosting on
            our own site but not distributing the files through a public repository,
            so the font files stay on Fontshare instead of in this repo. */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />

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
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
