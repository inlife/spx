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
