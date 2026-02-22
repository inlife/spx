# Brutalist Design Refactor — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign Shortlink from generic blue-purple SaaS aesthetic to high-contrast typographic brutalism with zinc-950 background, Satoshi + JetBrains Mono typography, and emerald-600 as sole accent color.

**Architecture:** Replace all existing styles in-place across 7 files. No new components needed — the existing component structure (header, footer, 5 pages) stays the same. Font loading via Google Fonts in layout.js. All styling via Tailwind v4 utility classes.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, Google Fonts (Satoshi via CDN, JetBrains Mono)

**Design Doc:** `docs/plans/2026-02-22-brutalist-design-refactor.md`

---

### Task 1: Global Styles — Replace CSS Foundation

**Files:**
- Modify: `app/globals.css` (entire file)

**Step 1: Rewrite globals.css**

Replace the entire file with:

```css
@import "tailwindcss";

@theme {
  --font-sans: "Satoshi", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

@layer base {
  body {
    @apply font-sans antialiased text-zinc-50 bg-zinc-950;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
}
```

This removes:
- Inter font-family declaration
- `h-full` cascade hack on html/body/div
- All blob animation keyframes (`@keyframes blob`, `.animate-blob`, `.animation-delay-*`)

**Step 2: Verify the dev server starts without errors**

Run: `npm run dev` — confirm no CSS compilation errors in terminal output.

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "refactor: replace global CSS with brutalist foundation"
```

---

### Task 2: Layout — Font Loading and Metadata

**Files:**
- Modify: `app/layout.js` (entire file)

**Step 1: Rewrite layout.js**

Replace the entire file. Key changes:
- Remove `Inter` font import from `next/font/google`
- Add Google Fonts `<link>` tags for Satoshi (via Fontshare CDN) and JetBrains Mono
- Update metadata: remove gradient/purple language from title/description
- Remove `inter.className` from body
- Set body className to `antialiased`

```jsx
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
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

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
```

**Step 2: Commit**

```bash
git add app/layout.js
git commit -m "refactor: swap Inter for Satoshi + JetBrains Mono, update metadata"
```

---

### Task 3: Favicon — Monochrome

**Files:**
- Modify: `public/favicon.svg`

**Step 1: Replace favicon with monochrome version**

Remove the gradient `<defs>` and `<linearGradient>`. Replace `fill="url(#gradient)"` on the rect with `fill="#09090b"` (zinc-950). Keep the white paths as-is.

```svg
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="6" fill="#09090b"/>
  <path d="M8 11.5C8 10.6716 8.67157 10 9.5 10H13.5C14.3284 10 15 10.6716 15 11.5V12.5C15 13.3284 14.3284 14 13.5 14H9.5C8.67157 14 8 13.3284 8 12.5V11.5Z" fill="white"/>
  <path d="M17 19.5C17 18.6716 17.6716 18 18.5 18H22.5C23.3284 18 24 18.6716 24 19.5V20.5C24 21.3284 23.3284 22 22.5 22H18.5C17.6716 22 17 21.3284 17 20.5V19.5Z" fill="white"/>
  <path d="M14.5 12H17.5C17.7761 12 18 12.2239 18 12.5V19.5C18 19.7761 17.7761 20 17.5 20H14.5C14.2239 20 14 19.7761 14 19.5V12.5C14 12.2239 14.2239 12 14.5 12Z" fill="white"/>
</svg>
```

**Step 2: Commit**

```bash
git add public/favicon.svg
git commit -m "refactor: monochrome favicon, remove gradient"
```

---

### Task 4: Header Component — Brutalist Restyle

**Files:**
- Modify: `components/header.js` (entire file)

**Step 1: Rewrite header**

Key changes:
- Monochrome logo SVG (same as favicon — zinc-950 rect with white paths, but inverted for dark bg: white rect outline or emerald fill? No — use white paths on transparent bg since the page is dark)
- Actually: logo on dark bg needs to work differently. Use white stroke or just the white link icon paths without the rect background. Simplest: keep the 3 white paths, drop the rect entirely. The icon shape is visible as white on zinc-950.
- Brand text: `text-white font-bold text-xl` in Satoshi (default font-sans)
- Nav links: `text-zinc-500 hover:text-emerald-500`
- Border bottom: `border-b border-zinc-800`
- Max width: `max-w-2xl mx-auto`

```jsx
const Header = () =>
    <header className="w-full border-b border-zinc-800">
        <div className="max-w-2xl mx-auto flex items-center justify-between py-5 px-5">
            <a href="/" className="flex items-center gap-2.5">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 11.5C8 10.6716 8.67157 10 9.5 10H13.5C14.3284 10 15 10.6716 15 11.5V12.5C15 13.3284 14.3284 14 13.5 14H9.5C8.67157 14 8 13.3284 8 12.5V11.5Z" fill="white"/>
                    <path d="M17 19.5C17 18.6716 17.6716 18 18.5 18H22.5C23.3284 18 24 18.6716 24 19.5V20.5C24 21.3284 23.3284 22 22.5 22H18.5C17.6716 22 17 21.3284 17 20.5V19.5Z" fill="white"/>
                    <path d="M14.5 12H17.5C17.7761 12 18 12.2239 18 12.5V19.5C18 19.7761 17.7761 20 17.5 20H14.5C14.2239 20 14 19.7761 14 19.5V12.5C14 12.2239 14.2239 12 14.5 12Z" fill="white"/>
                </svg>
                <span className="text-xl font-bold text-white">Shortlink</span>
            </a>
            <nav className="flex items-center gap-6">
                <a href="/about" className="text-sm text-zinc-500 hover:text-emerald-500 transition-colors">About</a>
                <a href="/contact" className="text-sm text-zinc-500 hover:text-emerald-500 transition-colors">Contact</a>
            </nav>
        </div>
    </header>

export default Header
```

**Step 2: Commit**

```bash
git add components/header.js
git commit -m "refactor: brutalist header — monochrome logo, emerald hover"
```

---

### Task 5: Footer Component — Brutalist Restyle

**Files:**
- Modify: `components/footer.js` (entire file)

**Step 1: Rewrite footer**

Key changes:
- Remove all emojis (heart)
- Monospace font for all links
- `border-t border-zinc-800` top divider
- Links in `text-zinc-600 hover:text-emerald-500`
- Remove `max-[400px]:hidden` — footer should always be visible
- Separator: `text-zinc-700` middot or slash

```jsx
const Footer = () =>
    <footer className="w-full border-t border-zinc-800">
        <div className="max-w-2xl mx-auto flex justify-center items-center py-6 px-5">
            <nav className="flex items-center gap-3 text-xs font-mono text-zinc-600">
                <a href="/about" className="hover:text-emerald-500 transition-colors">About</a>
                <span className="text-zinc-700">/</span>
                <a href="/contact" className="hover:text-emerald-500 transition-colors">Contact</a>
                <span className="text-zinc-700">/</span>
                <a href="https://github.com/inlife/spx" target="_blank" className="hover:text-emerald-500 transition-colors">Source</a>
                <span className="text-zinc-700">/</span>
                <span>by <a href="https://twitter.com/inlife360" target="_blank" className="hover:text-emerald-500 transition-colors">inlife</a></span>
            </nav>
        </div>
    </footer>

export default Footer
```

**Step 2: Commit**

```bash
git add components/footer.js
git commit -m "refactor: brutalist footer — monospace, no emojis"
```

---

### Task 6: Homepage — Full Rewrite

**Files:**
- Modify: `app/page.js` (entire file)

**Step 1: Rewrite the homepage**

This is the biggest change. Key deletions:
- All gradient orbs / blob divs
- The pill badge ("Free / No Signup / Instant")
- The centered hero h1 with gradient text
- The white card container (article with shadow-sm)
- The entire 3-column "Perfect for..." use case grid
- The "How it works" before/after card
- The trust section blue callout
- The expandable details FAQ

Replace with single-column brutalist tool layout:

```jsx
'use client'

import Header from 'components/header'
import Footer from 'components/footer'
import {useState} from 'react'
import {shouldCompress} from 'utils/codec'

export default function HomePage() {
    const [url, setUrl] = useState("")
    const [type, setType] = useState("1")
    const [compress, setCompress] = useState(true)
    const [buttonText, setButtonText] = useState("COPY LINK")

    const canCompress = url.length > 0 && shouldCompress(url, type).useCompression

    const generateUrl = () => {
        const origin = location.origin + '/'
        let link
        if (compress && canCompress) {
            link = origin + 's/' + shouldCompress(url, type).compressed
        } else {
            link = origin + type + '/' + encodeURIComponent(url)
        }
        console.log('[info] created url', link)
        navigator.clipboard.writeText(link)
        setButtonText("COPIED")
        setTimeout(() => setButtonText("COPY LINK"), 2500)
    }

    return (
        <main className="min-h-[100dvh] flex flex-col">
            <Header />

            <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-5">
                {/* Tool Section */}
                <section className="pt-12 sm:pt-16">
                    <p className="text-zinc-500 text-sm font-mono mb-6">
                        Paste a custom scheme URL. Get a universal link.
                    </p>

                    <input
                        className="w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-lg px-5 py-4 rounded-none placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        maxLength="256"
                        onChange={e => setUrl(e.target.value.trim())}
                        value={url}
                        autoFocus={true}
                        type="text"
                        placeholder="slack://channel?team=T0..."
                    />

                    {/* Toggle rows */}
                    <div className="border-t border-zinc-800 flex items-center justify-between py-4">
                        <div>
                            <div className="text-sm text-zinc-300">Auto-open link</div>
                            <div className="text-xs text-zinc-600">Redirect automatically on visit</div>
                        </div>
                        <button
                            onClick={() => setType(type === "1" ? "0" : "1")}
                            className={`relative inline-flex h-5 w-9 items-center rounded-sm transition-colors focus:outline-none ${
                                type === "1" ? 'bg-emerald-600' : 'bg-zinc-700'
                            }`}
                            role="switch"
                            aria-checked={type === "1"}
                        >
                            <span
                                className={`inline-block h-3.5 w-3.5 transform rounded-sm bg-white transition-transform ${
                                    type === "1" ? 'translate-x-[18px]' : 'translate-x-[3px]'
                                }`}
                            />
                        </button>
                    </div>

                    {canCompress && (
                        <div className="border-t border-zinc-800 flex items-center justify-between py-4">
                            <div>
                                <div className="text-sm text-zinc-300">Shorten link</div>
                                <div className="text-xs text-zinc-600">Compress via stateless encoding</div>
                            </div>
                            <button
                                onClick={() => setCompress(!compress)}
                                className={`relative inline-flex h-5 w-9 items-center rounded-sm transition-colors focus:outline-none ${
                                    compress ? 'bg-emerald-600' : 'bg-zinc-700'
                                }`}
                                role="switch"
                                aria-checked={compress}
                            >
                                <span
                                    className={`inline-block h-3.5 w-3.5 transform rounded-sm bg-white transition-transform ${
                                        compress ? 'translate-x-[18px]' : 'translate-x-[3px]'
                                    }`}
                                />
                            </button>
                        </div>
                    )}

                    <button
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 text-sm tracking-wide uppercase transition-colors mt-4"
                        onClick={generateUrl}
                    >
                        {buttonText}
                    </button>
                </section>

                {/* Before/After Example */}
                <section className="border-t border-zinc-800 mt-12 pt-12 pb-16">
                    <div className="font-mono text-sm space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                            <code className="text-zinc-500">slack://channel/ABC123</code>
                            <span className="text-zinc-700 hidden sm:inline">&rarr;</span>
                            <span className="text-xs text-zinc-600">broken in Notion, Obsidian, email</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                            <code className="text-white">shortlink.studio/s/1eNqrV...</code>
                            <span className="text-emerald-500 hidden sm:inline">&rarr;</span>
                            <span className="text-xs text-emerald-600">works everywhere</span>
                        </div>
                    </div>
                </section>

                <div className="flex-1" />
            </div>

            <Footer />
        </main>
    )
}
```

**Step 2: Run the dev server and visually verify**

Run: `npm run dev` — open `http://localhost:3000` and verify:
- Dark zinc-950 background
- Satoshi font on UI text
- JetBrains Mono on input and code
- Emerald button and toggle accents
- No gradients, blobs, cards, or emojis
- Single column layout, max-w-2xl

**Step 3: Commit**

```bash
git add app/page.js
git commit -m "refactor: brutalist homepage — dark, monospace, emerald accent"
```

---

### Task 7: About Page — Brutalist Restyle

**Files:**
- Modify: `app/about/page.js` (entire file)

**Step 1: Rewrite the about page**

Remove `'use client'` directive — this page has no interactivity and can be a Server Component.

Remove: gradient orbs, centered hero, gradient text, all card containers, blue-100 step indicators.

Replace with raw text sections separated by borders:

```jsx
import Header from 'components/header'
import Footer from 'components/footer'

export default function AboutPage() {
    return (
        <main className="min-h-[100dvh] flex flex-col">
            <Header />

            <div className="flex-1 max-w-2xl mx-auto w-full px-5">
                <h1 className="text-4xl md:text-5xl tracking-tighter leading-none font-bold text-white pt-12 sm:pt-16 pb-8">
                    About
                </h1>

                <section className="border-t border-zinc-800 py-8">
                    <p className="text-zinc-400 leading-relaxed max-w-[55ch]">
                        Shortlink converts custom scheme URLs into universal web links. Paste a <code className="font-mono text-zinc-300 text-sm">slack://</code> or <code className="font-mono text-zinc-300 text-sm">obsidian://</code> link, get back a standard HTTPS link that works in Notion, Obsidian, email, and everywhere else.
                    </p>
                </section>

                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">Why</h2>
                    <p className="text-zinc-400 leading-relaxed max-w-[55ch]">
                        Modern apps use custom URL schemes for deep linking. These break when embedded in web apps, documentation, or shared content. Shortlink bridges this gap.
                    </p>
                </section>

                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">How</h2>
                    <ol className="font-mono text-sm text-zinc-400 space-y-1">
                        <li>1. Paste your custom scheme URL</li>
                        <li>2. Choose auto-redirect or manual mode</li>
                        <li>3. Copy the universal link</li>
                    </ol>
                </section>

                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">Stack</h2>
                    <p className="font-mono text-sm text-zinc-500">
                        Next.js 15 / React 19 / Tailwind CSS / Vercel
                    </p>
                </section>

                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">Source</h2>
                    <a
                        href="https://github.com/inlife/spx"
                        target="_blank"
                        className="font-mono text-sm text-emerald-500 hover:text-emerald-400 transition-colors"
                    >
                        github.com/inlife/spx
                    </a>
                </section>
            </div>

            <Footer />
        </main>
    )
}
```

**Step 2: Commit**

```bash
git add app/about/page.js
git commit -m "refactor: brutalist about page — raw text sections, no cards"
```

---

### Task 8: Contact Page — Brutalist Restyle

**Files:**
- Modify: `app/contact/page.js` (entire file)

**Step 1: Rewrite the contact page**

Keep the web3forms integration but restyle everything. Remove: gradient orbs, centered hero, gradient text, white cards, blue callouts, emoji icons.

```jsx
'use client'

import Header from 'components/header'
import Footer from 'components/footer'
import { useState } from 'react'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [status, setStatus] = useState({ type: '', message: '' })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus({ type: 'loading', message: 'Sending...' })

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    access_key: '23269879-4f18-4f1b-871d-d8adada577d3',
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject || 'New message from Shortlink',
                    message: formData.message,
                })
            })

            const result = await response.json()

            if (result.success) {
                setStatus({ type: 'success', message: 'Message sent.' })
                setFormData({ name: '', email: '', subject: '', message: '' })
            } else {
                setStatus({ type: 'error', message: 'Failed to send. Try again.' })
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Network error. Check your connection.' })
        }
    }

    const inputClass = "w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-sm px-4 py-3 rounded-none placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"

    return (
        <main className="min-h-[100dvh] flex flex-col">
            <Header />

            <div className="flex-1 max-w-2xl mx-auto w-full px-5">
                <h1 className="text-4xl md:text-5xl tracking-tighter leading-none font-bold text-white pt-12 sm:pt-16 pb-8">
                    Contact
                </h1>

                <form onSubmit={handleSubmit} className="border-t border-zinc-800 pt-8 space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm text-zinc-300 mb-2">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="Your name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm text-zinc-300 mb-2">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="you@example.com" />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm text-zinc-300 mb-2">Subject</label>
                        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className={inputClass} placeholder="Optional" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm text-zinc-300 mb-2">Message</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="6" className={`${inputClass} resize-none`} placeholder="Your message" />
                    </div>

                    {status.message && (
                        <div className={`text-sm font-mono py-2 ${
                            status.type === 'success' ? 'text-emerald-500' :
                            status.type === 'error' ? 'text-red-400' :
                            'text-zinc-400'
                        }`}>
                            {status.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status.type === 'loading'}
                        className={`w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 text-sm tracking-wide uppercase transition-colors ${
                            status.type === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {status.type === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
                    </button>
                </form>

                <section className="border-t border-zinc-800 mt-12 py-8 space-y-4">
                    <div>
                        <div className="text-sm text-zinc-300 mb-1">GitHub</div>
                        <a href="https://github.com/inlife/spx" target="_blank" className="font-mono text-sm text-emerald-500 hover:text-emerald-400 transition-colors">github.com/inlife/spx</a>
                    </div>
                    <div>
                        <div className="text-sm text-zinc-300 mb-1">Twitter / X</div>
                        <a href="https://twitter.com/inlife360" target="_blank" className="font-mono text-sm text-emerald-500 hover:text-emerald-400 transition-colors">@inlife360</a>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    )
}
```

**Step 2: Commit**

```bash
git add app/contact/page.js
git commit -m "refactor: brutalist contact page — raw form, no cards"
```

---

### Task 9: Redirect Page — Brutalist Restyle

**Files:**
- Modify: `app/[type]/[url]/page.js` (entire file)

**Step 1: Rewrite the redirect page**

Minimal dark page. Remove old styling. Center content vertically.

```jsx
'use client'

import Footer from 'components/footer'
import {useEffect} from 'react'
import { useParams } from 'next/navigation'

export default function ProxyPage() {
    const { type, url } = useParams()
    const decodedUrl = decodeURIComponent(url)

    useEffect(() => {
        if (type === '1' && decodedUrl) {
            window.location = decodedUrl
        }
    }, [type, decodedUrl])

    if (!decodedUrl) return <div />

    if (type === '1') {
        return (
            <main className="min-h-[100dvh] flex flex-col items-center justify-center px-5">
                <div className="text-center">
                    <h1 className="font-mono text-zinc-400 text-sm mb-4">Redirecting...</h1>
                    <a href={decodedUrl} className="font-mono text-sm text-emerald-500 hover:text-emerald-400 break-all transition-colors">
                        {decodedUrl}
                    </a>
                </div>
                <div className="fixed bottom-0 w-full"><Footer /></div>
            </main>
        )
    }

    return (
        <main className="min-h-[100dvh] flex flex-col items-center justify-center px-5">
            <div className="text-center max-w-md">
                <p className="font-mono text-zinc-400 text-sm mb-6">Click to open your link</p>
                <a href={decodedUrl}>
                    <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-8 text-sm tracking-wide uppercase transition-colors">
                        Open Link
                    </button>
                </a>
                <div className="mt-8 font-mono text-xs text-zinc-600 break-all">
                    {decodedUrl}
                </div>
            </div>
            <div className="fixed bottom-0 w-full"><Footer /></div>
        </main>
    )
}
```

**Step 2: Commit**

```bash
git add "app/[type]/[url]/page.js"
git commit -m "refactor: brutalist redirect page — minimal dark layout"
```

---

### Task 10: Compressed Redirect Page — Brutalist Restyle

**Files:**
- Modify: `app/s/[data]/page.js` (entire file)

**Step 1: Rewrite the compressed redirect page**

Same brutalist pattern as the regular redirect page. Add error state.

```jsx
'use client'

import Footer from 'components/footer'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { decode } from 'utils/codec'

export default function CompressedProxyPage() {
    const { data } = useParams()
    const [decodedUrl, setDecodedUrl] = useState(null)
    const [type, setType] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        try {
            const decoded = decode(decodeURIComponent(data))
            setDecodedUrl(decoded.url)
            setType(decoded.type)
        } catch (e) {
            console.error('[error] failed to decode compressed URL:', e)
            setError(true)
        }
    }, [data])

    useEffect(() => {
        if (type === '1' && decodedUrl) {
            window.location = decodedUrl
        }
    }, [type, decodedUrl])

    if (error) {
        return (
            <main className="min-h-[100dvh] flex flex-col items-center justify-center px-5">
                <div className="text-center">
                    <h1 className="text-lg font-bold text-white mb-3">Invalid link</h1>
                    <p className="font-mono text-sm text-zinc-500 mb-6">This compressed link is corrupted or invalid.</p>
                    <a href="/" className="font-mono text-sm text-emerald-500 hover:text-emerald-400 transition-colors">Back to home</a>
                </div>
                <div className="fixed bottom-0 w-full"><Footer /></div>
            </main>
        )
    }

    if (!decodedUrl) return <div />

    if (type === '1') {
        return (
            <main className="min-h-[100dvh] flex flex-col items-center justify-center px-5">
                <div className="text-center">
                    <h1 className="font-mono text-zinc-400 text-sm mb-4">Redirecting...</h1>
                    <a href={decodedUrl} className="font-mono text-sm text-emerald-500 hover:text-emerald-400 break-all transition-colors">
                        {decodedUrl}
                    </a>
                </div>
                <div className="fixed bottom-0 w-full"><Footer /></div>
            </main>
        )
    }

    return (
        <main className="min-h-[100dvh] flex flex-col items-center justify-center px-5">
            <div className="text-center max-w-md">
                <p className="font-mono text-zinc-400 text-sm mb-6">Click to open your link</p>
                <a href={decodedUrl}>
                    <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-8 text-sm tracking-wide uppercase transition-colors">
                        Open Link
                    </button>
                </a>
                <div className="mt-8 font-mono text-xs text-zinc-600 break-all">
                    {decodedUrl}
                </div>
            </div>
            <div className="fixed bottom-0 w-full"><Footer /></div>
        </main>
    )
}
```

**Step 2: Commit**

```bash
git add "app/s/[data]/page.js"
git commit -m "refactor: brutalist compressed redirect page"
```

---

### Task 11: Run Tests and Final Verification

**Files:** None (verification only)

**Step 1: Run existing tests**

Run: `npm test`
Expected: All codec tests pass (no styling code is tested, but verify nothing broke imports).

**Step 2: Run dev server and visually verify all pages**

Run: `npm run dev`

Check each page:
- `http://localhost:3000` — homepage tool
- `http://localhost:3000/about` — about page
- `http://localhost:3000/contact` — contact form
- `http://localhost:3000/1/slack://test` — auto-redirect page
- `http://localhost:3000/0/slack://test` — manual redirect page

Verify:
- [ ] zinc-950 background everywhere
- [ ] Satoshi font renders on headlines/body
- [ ] JetBrains Mono renders on input, code, footer
- [ ] Emerald accent on button, toggles, link hovers
- [ ] No gradients, blobs, shadows, emojis
- [ ] Mobile responsive (single column, px-5)
- [ ] No console errors

**Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: post-refactor visual adjustments"
```
