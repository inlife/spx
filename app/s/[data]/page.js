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
