'use client'

import Header from 'components/header'
import Footer from 'components/footer'
import GeoBg from 'components/geo-bg'
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

    const marqueeText = "CUSTOM SCHEME \u2014 URL COMPRESSION \u2014 UNIVERSAL LINKS \u2014 STATELESS ENCODING \u2014 NOTION \u2014 OBSIDIAN \u2014 SLACK \u2014 ZOOM \u2014 DEEP LINKING \u2014 "

    return (
        <main className="min-h-[100dvh] flex flex-col">
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
                            <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-bold text-white uppercase leading-[0.85] tracking-tighter">
                                Short<br className="sm:hidden" />link
                            </h1>
                            <p className="font-mono text-xs sm:text-sm text-zinc-500 uppercase tracking-widest mt-5">
                                Universal Link Converter
                            </p>
                        </div>
                    </section>

                    {/* Scrolling Marquee */}
                    <div className="w-full border-t border-b border-zinc-800 overflow-hidden py-3">
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
                                <span className="text-white truncate">shortlink.studio/s/...</span>
                                <span className="text-emerald-500 text-[10px] ml-auto shrink-0">UNIVERSAL</span>
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
                            <span className="text-xs text-zinc-400">Open link on visit</span>
                            <button
                                onClick={() => setType(type === "1" ? "0" : "1")}
                                className={`relative inline-flex h-5 w-9 items-center rounded-sm transition-colors focus:outline-none ${
                                    type === "1" ? 'bg-emerald-600' : 'bg-zinc-700'
                                }`}
                                role="switch"
                                aria-checked={type === "1"}
                            >
                                <span className={`inline-block h-3.5 w-3.5 transform rounded-sm bg-white transition-transform ${
                                    type === "1" ? 'translate-x-[18px]' : 'translate-x-[3px]'
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
                                <span>MODE: {type === "1" ? "AUTO" : "MANUAL"}</span>
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

            <div className="flex-1" />
            <Footer />
        </main>
    )
}
