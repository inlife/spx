import { notFound } from 'next/navigation'
import RedirectView from 'components/redirect-view'
import { isBlockedUrl } from 'utils/link-policy'

// Legacy uncompressed links: /0/<encoded url> (manual) and /1/<encoded url> (auto).
export default async function ProxyPage({ params }) {
    const { type, url } = await params
    if (type !== '0' && type !== '1') notFound()

    let target = null
    try {
        target = decodeURIComponent(url)
    } catch {
        // falls through to the invalid view
    }

    if (!target || isBlockedUrl(target)) return <RedirectView invalid />
    return <RedirectView url={target} type={type} />
}
