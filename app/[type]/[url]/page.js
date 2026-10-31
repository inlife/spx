import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import RedirectView from 'components/redirect-view'
import { isBlockedUrl } from 'utils/link-policy'

// Legacy uncompressed links: /0/<encoded url> (manual) and /1/<encoded url> (auto).
export default async function ProxyPage({ params }) {
    const { type } = await params
    if (type !== '0' && type !== '1') notFound()

    // The raw path comes from middleware.js; params.url may already be decoded
    const rawPath = (await headers()).get('x-raw-path')
    const segment = rawPath?.split('/')[2]

    let target = null
    try {
        target = segment ? decodeURIComponent(segment) : (await params).url
    } catch {
        // falls through to the invalid view
    }

    if (!target || isBlockedUrl(target)) return <RedirectView invalid />
    return <RedirectView url={target} type={type} />
}
