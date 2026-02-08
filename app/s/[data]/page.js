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
            console.log('[info] redirecting user to url:', decodedUrl)
            window.location = decodedUrl
        }
    }, [type, decodedUrl])

    if (error) {
        return (
            <main className="w-full min-h-screen flex justify-center items-center p-4 sm:p-6 lg:p-8 flex-col pb-32">
                <section className="text-center max-w-full">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Invalid Link</h1>
                    <p className="text-gray-600 mb-4">This compressed link appears to be corrupted or invalid.</p>
                    <a href="/" className="text-blue-600 hover:text-blue-800 hover:underline">Go to homepage</a>
                </section>
                <Footer />
            </main>
        )
    }

    if (!decodedUrl) {
        return <div />
    }

    if (type === '1') {
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
                <div className="mt-6 mx-auto bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-md">
                    <p className="text-sm text-gray-600 mb-2">This link will open:</p>
                    <code className="text-xs text-gray-700 break-all bg-white border border-gray-300 rounded px-2 py-1">{decodedUrl}</code>
                </div>
            </section>
            <Footer />
        </main>
    )
}
