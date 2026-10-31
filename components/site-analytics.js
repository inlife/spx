'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { Analytics } from '@vercel/analytics/next'

const GA_ID = 'G-CG6KC5KZLG'

// Shared-link pages (/s/…, /0/…, /1/…) have someone's URL in their address.
// Google Analytics doesn't load there, and Vercel Analytics gets the address
// with the link replaced by the app it opens, e.g. /s/obsidian.
const SHARED_LINK = /^\/(s|0|1)\//

function redactSharedLink(event) {
    const url = new URL(event.url)
    const match = url.pathname.match(SHARED_LINK)
    if (!match) return event

    const scheme = document.querySelector('[data-link-scheme]')?.dataset.linkScheme || 'unknown'
    return { ...event, url: `${url.origin}/${match[1]}/${scheme}` }
}

export default function SiteAnalytics() {
    const pathname = usePathname() || ''
    const onSharedLink = SHARED_LINK.test(pathname)

    return (
        <>
            <Analytics beforeSend={redactSharedLink} />
            {!onSharedLink && (
                <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_ID}');
                        `}
                    </Script>
                </>
            )}
        </>
    )
}
