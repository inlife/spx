'use client'

import { useEffect } from 'react'

// Hands the link to the browser as soon as the page loads (auto-redirect mode).
export default function AutoOpen({ url }) {
    useEffect(() => {
        window.location.href = url
    }, [url])

    return null
}
