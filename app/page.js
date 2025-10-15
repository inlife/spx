'use client'

import Footer from 'components/footer'
import {useState, useEffect} from 'react'

export default function HomePage() {
    const [url, setUrl] = useState("")
    const [type, setType] = useState(1)
    const [buttonText, setButtonText] = useState("Copy")
    const [hostname, setHostname] = useState("spx.now.sh")

    useEffect(() => {
        // Set the actual hostname on the client side
        if (typeof window !== 'undefined') {
            setHostname(window.location.host)
        }
    }, [])

    const generateUrl = () => {
        const link = location.href + [type, encodeURIComponent(url)].join('/')
        console.log('[info] created url', link)
        navigator.clipboard.writeText(link)
        setButtonText("Copied!")
        setTimeout(() => setButtonText("Copy"), 2500)
    }

    return <main className="w-full h-full flex justify-center items-center p-4 sm:p-6 lg:p-8 flex-col">
        <article className="text-left border border-gray-200 rounded-lg shadow-sm bg-white w-full max-w-2xl">
            <section className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Create a proxy scheme URL</h2>
                <p className="text-gray-600 mb-6">Provide a custom scheme url, select activation type, and click "Copy".</p>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 mb-4">
                    <div className="flex">
                        <div className="bg-gray-50 px-3 py-2 text-sm text-gray-500 border border-gray-200 rounded-l-md border-r-0 flex items-center">
                            <span>{hostname}/{type}/</span>
                        </div>
                        <input
                            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px]"
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength="256"
                            onChange={e => setUrl(e.target.value.trim())}
                            value={url}
                            autoFocus={true}
                            type="text"
                            placeholder="Enter your custom scheme URL"
                        />
                    </div>
                    <select
                        className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] sm:w-auto w-full"
                        onChange={e => setType(e.target.value)}
                        value={type}
                    >
                        <option value="1">auto</option>
                        <option value="0">manual</option>
                    </select>
                </div>
            </section>
            <footer className="border-t border-gray-200 bg-gray-50 p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="text-sm text-gray-500">
                    <span>Created url will be copied to your clipboard buffer.</span>
                </div>
                <button
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-gray-900 rounded-md hover:bg-white hover:text-gray-900 transition-all duration-200 min-w-[80px] min-h-[44px]"
                    onClick={generateUrl}
                >
                    {buttonText}
                </button>
            </footer>
        </article>

        <Footer />
    </main>
}
