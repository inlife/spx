'use client'

import { useEffect } from 'react'
import { TZ_TO_VARIANT } from 'utils/data/geo-variants'

// Client island: reads timezone, finds the matching geo card,
// and reveals the "popular near you" badge on it. Pure progressive
// enhancement — if JS fails, all variants still render statically.

export default function GeoHighlight() {
    useEffect(() => {
        try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
            const variantId = TZ_TO_VARIANT[tz] || 'default'
            const card = document.querySelector(`[data-geo-variant="${variantId}"]`)
            if (!card) return
            const badge = card.querySelector('[data-geo-badge]')
            if (badge) {
                badge.classList.remove('hidden')
                badge.classList.add('inline-block')
            }
            card.classList.add('ring-1', 'ring-emerald-700/40')
        } catch {
            // No-op: static grid is the fallback.
        }
    }, [])

    return null
}
