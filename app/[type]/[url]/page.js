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
            <main className="w-full h-full flex justify-center items-center p-4 sm:p-6 lg:p-8 flex-col">
                <section className="text-center max-w-full">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Redirecting...</h1>
                    <p className="text-gray-600 mb-4">You will be redirected to:</p>
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
        <main className="w-full h-full flex justify-center items-center p-4 sm:p-6 lg:p-8 flex-col">
            <section className="text-center max-w-full">
                <h1 className="flex flex-col gap-2 items-center justify-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    <span>Click to open:</span>
                    <a href={decodedUrl} className="inline-block pointer">
                        <button className="px-4 py-2 text-lg font-medium text-white bg-gray-900 border border-gray-900 rounded-md hover:bg-white hover:text-gray-900 transition-all duration-200 min-w-[80px] min-h-[44px] truncate max-w-80">
                            {decodedUrl}
                        </button>
                    </a>
                </h1>
            </section>
            <Footer />
        </main>
    )
}
