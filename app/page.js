'use client'

import Header from 'components/header'
import Footer from 'components/footer'
import {useState} from 'react'
import {shouldCompress} from 'utils/codec'

export default function HomePage() {
    const [url, setUrl] = useState("")
    const [type, setType] = useState("1")
    const [compress, setCompress] = useState(true)
    const [buttonText, setButtonText] = useState("Copy My Link")

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
        setButtonText("Copied! ✓")
        setTimeout(() => setButtonText("Copy My Link"), 2500)
    }

    return <main className="w-full min-h-screen flex justify-center flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Content wrapper with relative positioning */}
        <div className="relative z-10 w-full flex flex-col items-center">
        <Header />

        <div className="w-full px-4 sm:px-6 lg:px-8 pb-32">
        {/* Hero Section */}
        <section className="text-center mt-8 sm:mt-12 lg:mt-16 mb-12 max-w-4xl mx-auto">
            <div className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-4 py-2 mb-6 shadow-sm">
                <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Free • No Signup • Instant</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Shorten & Fix Your Links <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Anywhere</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Convert special links into short, universal links that work in Notion, Obsidian, Slack, and other apps
            </p>
        </section>

        <article className="text-left border border-gray-200 rounded-lg shadow-sm bg-white w-full max-w-2xl mx-auto">
            <section className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Turn broken links into working links in 3 simple steps</h2>
                <p className="text-gray-600 mb-6">Paste your link, choose how it opens, and get a short, shareable link that works everywhere.</p>

                {/* Input Field */}
                <div className="mb-6">
                    <input
                        className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        maxLength="256"
                        onChange={e => setUrl(e.target.value.trim())}
                        value={url}
                        autoFocus={true}
                        type="text"
                        placeholder="Paste your link here (e.g., slack://channel/...)"
                    />
                </div>

                {/* Toggle Switch */}
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Auto-open link</h3>
                        <p className="text-xs text-gray-500">Automatically redirect when the link is visited</p>
                    </div>
                    <button
                        onClick={() => setType(type === "1" ? "0" : "1")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            type === "1" ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        role="switch"
                        aria-checked={type === "1"}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                type === "1" ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>

                {/* Compress Link Toggle — only shown when compression would shorten the URL */}
                {canCompress && <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Shorten link</h3>
                        <p className="text-xs text-gray-500">Compress the URL using stateless compression</p>
                    </div>
                    <button
                        onClick={() => setCompress(!compress)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            compress ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        role="switch"
                        aria-checked={compress}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                compress ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>}
            </section>
            <footer className="border-t border-gray-200 bg-gray-50 p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="text-sm text-gray-500">
                    <span>Your shareable link will be ready to paste.</span>
                </div>
                <button
                    className="px-6 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 hover:border-blue-700 transition-all duration-200 min-w-[120px] min-h-[44px]"
                    onClick={generateUrl}
                >
                    {buttonText}
                </button>
            </footer>
        </article>

        {/* Use Cases Section */}
        <section className="mt-12 w-full max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">Perfect for...</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">🔗</span>
                        <h3 className="text-lg font-semibold text-gray-900">Notion</h3>
                    </div>
                    <p className="text-gray-600">Share Slack, Zoom, or app links in Notion pages that actually work when clicked.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">📝</span>
                        <h3 className="text-lg font-semibold text-gray-900">Obsidian</h3>
                    </div>
                    <p className="text-gray-600">Embed custom protocol links in your Obsidian notes that work across all platforms.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">📧</span>
                        <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    </div>
                    <p className="text-gray-600">Send clickable app links in email newsletters that work for all recipients.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">🎥</span>
                        <h3 className="text-lg font-semibold text-gray-900">Zoom</h3>
                    </div>
                    <p className="text-gray-600">Send clickable app links in Zoom meetings that work for all recipients.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">📱</span>
                        <h3 className="text-lg font-semibold text-gray-900">Mobile</h3>
                    </div>
                    <p className="text-gray-600">Share deep links that work across platforms and devices seamlessly.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">💼</span>
                        <h3 className="text-lg font-semibold text-gray-900">Teams</h3>
                    </div>
                    <p className="text-gray-600">Share internal tool links in documentation that everyone can access.</p>
                </div>
            </div>

            {/* Before/After Example */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">How it works</h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <div className="text-center">
                        <div className="text-red-500 text-sm font-medium mb-2">❌ Before</div>
                        <code className="bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 break-all">slack://channel/ABC123</code>
                        <div className="text-xs text-gray-500 mt-1">(broken in Notion)</div>
                    </div>
                    <div className="text-gray-400 text-xl">→</div>
                    <div className="text-center">
                        <div className="text-green-500 text-sm font-medium mb-2">✅ After</div>
                        <code className="bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 break-all">shortlink.studio/1/slack://channel/ABC123</code>
                        <div className="text-xs text-gray-500 mt-1">(works everywhere!)</div>
                    </div>
                </div>
            </div>
        </section>

        {/* Trust Section */}
        <section className="mt-8 w-full max-w-2xl mx-auto text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                    <strong>Privacy first:</strong> We don't store your URLs. Everything happens in your browser.
                </p>
            </div>
            <details className="text-sm text-gray-600">
                <summary className="cursor-pointer hover:text-gray-800 font-medium">How does this work?</summary>
                <div className="mt-3 text-left bg-white border border-gray-200 rounded p-4">
                    <p className="mb-2">When you paste a special link (like <code>slack://</code> or <code>zoom://</code>), we create a short web link that:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Is up to 65% shorter than the original URL</li>
                        <li>Works in any app or website</li>
                        <li>Opens your original link when clicked</li>
                        <li>Doesn't require any downloads or signups</li>
                    </ul>
                </div>
            </details>
        </section>

        <Footer />
        </div>
        </div>
    </main>
}
