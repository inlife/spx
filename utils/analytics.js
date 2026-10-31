// Shared-link pages (/s/…, /0/…, /1/…) have someone's URL in their address.
// Analytics never get that address: Google Analytics doesn't load there, and
// Vercel Analytics gets the path with the link replaced by the app it opens.

export const SHARED_LINK_PATH = /^\/(s|0|1)\//

export function isSharedLinkPath(pathname) {
    return SHARED_LINK_PATH.test(pathname || '')
}

// https://linkopen.app/s/<payload> → https://linkopen.app/s/obsidian
export function redactSharedLinkUrl(url, scheme) {
    const parsed = new URL(url)
    const match = parsed.pathname.match(SHARED_LINK_PATH)
    if (!match) return url
    const label = /^[a-z][a-z0-9+.-]*$/i.test(scheme || '') ? scheme.toLowerCase() : 'unknown'
    return `${parsed.origin}/${match[1]}/${label}`
}
