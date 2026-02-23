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
