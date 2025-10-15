'use client'

import Footer from 'components/footer'
import {useEffect} from 'react'
import { useParams } from 'next/navigation'

export default function ProxyPage() {
    const { type, url } = useParams()
    const decodedUrl = decodeURIComponent(url)

    useEffect(() => {
        if (type === '1' && decodedUrl) {
            console.log('[info] redirecting user to url:', decodedUrl)
            window.location = decodedUrl
        }
    }, [type, decodedUrl])

    if (!decodedUrl) {
        return <div />
    }

    if (type === '1') {
        // Auto redirect mode - show loading or redirect message
        return (
            <main className="w-full min-h-screen flex justify-center items-center p-4 sm:p-6 lg:p-8 flex-col pb-32">
                <section className="text-center max-w-full">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Opening your link...</h1>
                    <p className="text-gray-600 mb-4">This is a safe redirect to:</p>
                    <a
                        href={decodedUrl}
                        className="inline-block text-blue-600 hover:text-blue-800 hover:underline break-all max-w-full text-sm sm:text-base"
                    >
                        {decodedUrl}
                    </a>
                </section>
                <Footer />
            </main>
        )
    }

    // Manual mode - show clickable link
    return (
        <main className="w-full min-h-screen flex justify-center items-center p-4 sm:p-6 lg:p-8 flex-col pb-32">
            <section className="text-center max-w-full">
                <h1 className="flex flex-col gap-2 items-center justify-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    <span>Click the button below to open your link</span>
                    <a href={decodedUrl} className="inline-block pointer">
                        <button className="px-6 py-3 text-lg font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 hover:border-blue-700 transition-all duration-200 min-w-[120px] min-h-[44px] truncate max-w-80">
                            Open Link
                        </button>
                    </a>
                </h1>
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-md">
                    <p className="text-sm text-gray-600 mb-2">This link will open:</p>
                    <code className="text-xs text-gray-700 break-all bg-white border border-gray-300 rounded px-2 py-1">{decodedUrl}</code>
                </div>
            </section>
            <Footer />
        </main>
    )
}
