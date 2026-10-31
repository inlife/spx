'use client'

import Header from 'components/header'
import Footer from 'components/footer'
import GeoBg from 'components/geo-bg'
import {useState} from 'react'
import {shouldCompress} from 'utils/codec'
import {isWebUrl} from 'utils/link-policy'

export default function HomePage() {
    const [url, setUrl] = useState("")
    const [type, setType] = useState("1")
    const [compress, setCompress] = useState(true)
    const [buttonText, setButtonText] = useState("COPY LINK")

    // Links to websites always get a confirmation page (see utils/link-policy)
    const isWeb = isWebUrl(url)
    const linkType = isWeb ? "0" : type

    const canCompress = url.length > 0 && shouldCompress(url, linkType).useCompression

    const generateUrl = () => {
        const origin = location.origin + '/'
        let link
        if (compress && canCompress) {
            link = origin + 's/' + shouldCompress(url, linkType).compressed
        } else {
            link = origin + linkType + '/' + encodeURIComponent(url)
        }
        console.log('[info] created url', link)
        navigator.clipboard.writeText(link)
        setButtonText("COPIED")
        setTimeout(() => setButtonText("COPY LINK"), 2500)
    }

    const marqueeText = "CUSTOM SCHEME \u2014 URL COMPRESSION \u2014 CLICKABLE LINKS \u2014 STATELESS ENCODING \u2014 NOTION \u2014 OBSIDIAN \u2014 SLACK \u2014 ZOOM \u2014 DEEP LINKING \u2014 "

    return (
        <main className="min-h-[100dvh] flex flex-col">
            {/* WebSite gives Google the site name; WebApplication describes the converter */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            name: 'LinkOpen',
                            alternateName: ['linkopen.app', 'Shortlink', 'shortlink.studio'],
                            url: 'https://linkopen.app/',
                        },
                        {
                            '@context': 'https://schema.org',
                            '@type': 'WebApplication',
                            name: 'LinkOpen',
                            url: 'https://linkopen.app/',
                            description: 'Turns custom scheme links (slack://, obsidian://, zoommtg://, notion://) into https links that stay clickable in Notion, GitHub, email and chat.',
                            applicationCategory: 'UtilitiesApplication',
                            operatingSystem: 'Any',
                            browserRequirements: 'Requires JavaScript',
                            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                            author: { '@type': 'Person', name: 'inlife', url: 'https://github.com/inlife' },
                            isAccessibleForFree: true,
                        },
                    ]),
                }}
            />
            {/* Hero zone — header + title + marquee share the geometric bg */}
            <div className="relative overflow-hidden">
                <GeoBg />
                <div className="relative z-10">
                    <Header />

                    {/* Hero Banner */}
                    <section className="w-full px-5 pt-12 sm:pt-20 pb-12 sm:pb-16">
                        <div className="max-w-5xl mx-auto">
                            <div className="flex items-center gap-3 mb-5">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 border border-zinc-700 px-2 py-0.5">Stateless</span>
                                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 border border-zinc-700 px-2 py-0.5">v1.0</span>
                                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-600 border border-emerald-800 px-2 py-0.5">Free</span>
                            </div>
                            <h1>
                                <span className="block font-display text-6xl sm:text-8xl md:text-9xl font-bold text-white uppercase leading-[0.85] tracking-tighter">
                                    Link<br className="sm:hidden" />Open
                                </span>
                                <span className="block font-mono text-xs sm:text-sm text-zinc-500 uppercase tracking-widest mt-5">
                                    Make slack:// and obsidian:// links clickable
                                </span>
                            </h1>
                        </div>
                    </section>

                    {/* Scrolling Marquee */}
                    <div className="w-full border-t border-b border-zinc-800 overflow-hidden py-3" aria-hidden="true">
                        <div className="animate-marquee whitespace-nowrap flex">
                            <span className="font-display text-sm sm:text-base font-bold uppercase tracking-wide text-zinc-400 mx-0">
                                {marqueeText}{marqueeText}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Numbered Tool Panels */}
            <section className="w-full max-w-5xl mx-auto px-5 py-8 sm:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800">

                    {/* Panel 01 — Input */}
                    <div className="bg-zinc-950 p-5 sm:p-6 md:col-span-2">
                        <div className="flex items-baseline gap-3 mb-5">
                            <span className="font-display text-4xl sm:text-5xl font-bold text-zinc-800">01</span>
                            <span className="font-display text-sm font-bold uppercase tracking-wider text-white">Input</span>
                        </div>
                        <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Custom Scheme URL</label>
                        <input
                            className="w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-base sm:text-lg px-4 py-3.5 rounded-none placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
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
                        {/* Before/After readout */}
                        <div className="mt-4 font-mono text-xs space-y-1 border-t border-zinc-800 pt-4">
                            <div className="flex items-center gap-2">
                                <span className="text-zinc-600 w-8 shrink-0">IN</span>
                                <span className="text-zinc-500 truncate">{url || 'slack://channel/ABC123'}</span>
                                <span className="text-red-400 text-[10px] ml-auto shrink-0">BROKEN</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-zinc-600 w-8 shrink-0">OUT</span>
                                <span className="text-white truncate">linkopen.app/s/...</span>
                                <span className="text-emerald-500 text-[10px] ml-auto shrink-0">CLICKABLE</span>
                            </div>
                        </div>
                    </div>

                    {/* Panel 02 — Options */}
                    <div className="bg-zinc-950 p-5 sm:p-6">
                        <div className="flex items-baseline gap-3 mb-5">
                            <span className="font-display text-4xl sm:text-5xl font-bold text-zinc-800">02</span>
                            <span className="font-display text-sm font-bold uppercase tracking-wider text-white">Options</span>
                        </div>

                        <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Auto-Redirect</label>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs text-zinc-400">{isWeb ? 'Website links always ask first' : 'Open link on visit'}</span>
                            <button
                                onClick={() => setType(type === "1" ? "0" : "1")}
                                disabled={isWeb}
                                className={`relative inline-flex h-5 w-9 items-center rounded-sm transition-colors focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed ${
                                    linkType === "1" ? 'bg-emerald-600' : 'bg-zinc-700'
                                }`}
                                role="switch"
                                aria-checked={linkType === "1"}
                                aria-label="Auto-redirect"
                            >
                                <span className={`inline-block h-3.5 w-3.5 transform rounded-sm bg-white transition-transform ${
                                    linkType === "1" ? 'translate-x-[18px]' : 'translate-x-[3px]'
                                }`} />
                            </button>
                        </div>

                        {canCompress && <>
                            <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Compression</label>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs text-zinc-400">Stateless encoding</span>
                                <button
                                    onClick={() => setCompress(!compress)}
                                    className={`relative inline-flex h-5 w-9 items-center rounded-sm transition-colors focus:outline-none ${
                                        compress ? 'bg-emerald-600' : 'bg-zinc-700'
                                    }`}
                                    role="switch"
                                    aria-checked={compress}
                                >
                                    <span className={`inline-block h-3.5 w-3.5 transform rounded-sm bg-white transition-transform ${
                                        compress ? 'translate-x-[18px]' : 'translate-x-[3px]'
                                    }`} />
                                </button>
                            </div>
                        </>}

                        <div className="mt-auto pt-2">
                            <div className="font-mono text-[10px] text-zinc-600 flex justify-between">
                                <span>MODE: {linkType === "1" ? "AUTO" : "MANUAL"}</span>
                                <span>{canCompress && compress ? "LZ" : "RAW"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full-width Output Panel */}
                <div className="bg-zinc-950 border-t border-zinc-800 mt-px">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800">
                        <div className="bg-zinc-950 p-5 sm:p-6 md:col-span-2 flex items-center">
                            <div className="flex items-baseline gap-3">
                                <span className="font-display text-4xl sm:text-5xl font-bold text-zinc-800">03</span>
                                <div>
                                    <span className="font-display text-sm font-bold uppercase tracking-wider text-white block">Output</span>
                                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Click to generate and copy to clipboard</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-zinc-950 p-5 sm:p-6 flex items-center">
                            <button
                                className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-display font-bold py-4 text-sm tracking-wider uppercase transition-all"
                                onClick={generateUrl}
                            >
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Supported Schemes */}
            <section className="w-full max-w-5xl mx-auto px-5 py-12 sm:py-16">
                <div className="flex items-baseline gap-3 mb-8">
                    <span className="font-display text-4xl sm:text-5xl font-bold text-zinc-800">04</span>
                    <span className="font-display text-sm font-bold uppercase tracking-wider text-white">Supported Schemes</span>
                    <a href="/tools/url-scheme-registry" className="ml-auto font-mono text-[10px] uppercase tracking-widest text-emerald-600 hover:text-emerald-400 transition-colors">
                        More apps →
                    </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-zinc-800">
                    {[
                        { scheme: 'slack://', name: 'Slack', desc: 'Channel, DM and file links' },
                        { scheme: 'obsidian://', name: 'Obsidian', desc: 'Vault, note, and Advanced URI links' },
                        { scheme: 'zoommtg://', name: 'Zoom', desc: 'Meeting join links' },
                        { scheme: 'notion://', name: 'Notion', desc: 'Page and database deep links' },
                        { scheme: 'figma://', name: 'Figma', desc: 'File and prototype open links' },
                        { scheme: '*://', name: 'Any Scheme', desc: 'Works with any custom protocol URL' },
                    ].map(item => (
                        <div key={item.scheme} className="bg-zinc-950 p-5 sm:p-6">
                            <code className="font-mono text-emerald-500 text-sm block mb-2">{item.scheme}</code>
                            <div className="text-white font-bold text-sm mb-1">{item.name}</div>
                            <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
                <p className="mt-6 text-zinc-500 text-xs">
                    Sharing notes from a vault? See <a href="/obsidian-links" className="text-emerald-500 hover:text-emerald-400">how to share Obsidian links</a>.
                </p>
            </section>

            {/* How It Works */}
            <section className="w-full max-w-5xl mx-auto px-5 py-12 sm:py-16 border-t border-zinc-800">
                <div className="flex items-baseline gap-3 mb-8">
                    <span className="font-display text-4xl sm:text-5xl font-bold text-zinc-800">05</span>
                    <span className="font-display text-sm font-bold uppercase tracking-wider text-white">How It Works</span>
                </div>
                <div className="space-y-6 max-w-2xl">
                    <div className="flex gap-4">
                        <span className="font-mono text-emerald-600 text-sm shrink-0">01</span>
                        <div>
                            <h3 className="text-white font-bold text-sm mb-1">Paste your custom scheme URL</h3>
                            <p className="text-zinc-500 text-xs leading-relaxed">
                                Enter any URL that uses a custom protocol like slack://, obsidian://, zoommtg://, or notion://.
                                Web pages, email and most documentation tools only make web links clickable, so these
                                end up as plain text.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <span className="font-mono text-emerald-600 text-sm shrink-0">02</span>
                        <div>
                            <h3 className="text-white font-bold text-sm mb-1">Choose your redirect mode</h3>
                            <p className="text-zinc-500 text-xs leading-relaxed">
                                Auto-redirect opens the link immediately when someone clicks it. Manual mode shows
                                a confirmation page first. Links to websites (http and https) always get the confirmation
                                page. Compression uses LZ encoding to shorten the URL without a database.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <span className="font-mono text-emerald-600 text-sm shrink-0">03</span>
                        <div>
                            <h3 className="text-white font-bold text-sm mb-1">Share the link</h3>
                            <p className="text-zinc-500 text-xs leading-relaxed">
                                Copy the generated https link and paste it where the original wouldn&rsquo;t work: Notion pages,
                                Slack messages, emails, GitHub READMEs, wikis. Clicking it opens the original link in the app.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="w-full max-w-5xl mx-auto px-5 py-12 sm:py-16 border-t border-zinc-800">
                <div className="flex items-baseline gap-3 mb-8">
                    <span className="font-display text-4xl sm:text-5xl font-bold text-zinc-800">06</span>
                    <span className="font-display text-sm font-bold uppercase tracking-wider text-white">FAQ</span>
                </div>
                <div className="space-y-3 max-w-2xl">
                    {[
                        {
                            q: 'What is a custom scheme URL?',
                            a: 'A custom scheme URL starts with something other than https://, like slack://, obsidian:// or zoommtg://. Apps register these schemes so a link can open a specific channel, note or meeting. Most websites, email clients and wikis only make web links clickable, so these show up as plain text.',
                        },
                        {
                            q: 'Why do slack:// and obsidian:// links break in Notion?',
                            a: 'Notion, like most web apps, only keeps links that start with http, https, mailto or tel. A pasted slack:// or obsidian:// link loses its link and stays as plain text. LinkOpen wraps it in an https address that Notion accepts, and opening that address hands the original link to the app.',
                        },
                        {
                            q: 'Does LinkOpen store my URLs?',
                            a: 'No. Your URL is compressed into the link itself, and there is no database behind it. One caveat: the site uses Google Analytics and Vercel Analytics, which record the address of each page visited, and for a shared link that address contains the encoded URL.',
                        },
                        {
                            q: 'Is LinkOpen free?',
                            a: 'Yes, LinkOpen is free and open source. There are no usage limits, no signup requirements, and no premium tiers. The source code is available on GitHub.',
                        },
                        {
                            q: 'How does the compression work?',
                            a: 'LinkOpen uses LZ-string compression with a custom dictionary of common URL patterns. The URL is first pattern-matched against known schemes, then compressed using LZ encoding, and finally made URL-safe. Nothing is looked up when the link is opened: the link itself carries the whole URL.',
                        },
                    ].map((faq, i) => (
                        <details key={i} className="group border border-zinc-800">
                            <summary className="flex items-center justify-between p-4 cursor-pointer">
                                <span className="text-white text-sm font-medium pr-4">{faq.q}</span>
                                <span className="font-mono text-zinc-600 text-xs group-open:rotate-45 transition-transform shrink-0">+</span>
                            </summary>
                            <div className="px-4 pb-4">
                                <p className="text-zinc-400 text-xs leading-relaxed">{faq.a}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </section>

            <div className="flex-1" />
            <Footer />
        </main>
    )
}
