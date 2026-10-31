'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { Analytics } from '@vercel/analytics/next'
import { isSharedLinkPath, redactSharedLinkUrl } from 'utils/analytics'

const GA_ID = 'G-CG6KC5KZLG'

// See utils/analytics.js: shared-link pages never send their address.
function beforeSend(event) {
    const scheme = document.querySelector('[data-link-scheme]')?.dataset.linkScheme
    return { ...event, url: redactSharedLinkUrl(event.url, scheme) }
}

export default function SiteAnalytics() {
    const onSharedLink = isSharedLinkPath(usePathname())

    return (
        <>
            <Analytics beforeSend={beforeSend} />
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
