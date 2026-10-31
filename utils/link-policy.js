// Rules for where a shared link may send people.
//
// Links to websites (http/https) never auto-redirect: LinkOpen exists for
// app links, and an auto-forwarding https shortener is exactly what phishing
// campaigns look for. Those always get a confirmation page instead.

const BLOCKED_SCHEMES = ['javascript', 'data', 'vbscript']

export function schemeOf(url) {
    if (!url) return ''
    const match = url.trim().match(/^([a-zA-Z][a-zA-Z0-9+.\-]*):/)
    return match ? match[1].toLowerCase() : ''
}

export function isWebUrl(url) {
    const scheme = schemeOf(url)
    return scheme === 'http' || scheme === 'https'
}

export function isBlockedUrl(url) {
    return BLOCKED_SCHEMES.includes(schemeOf(url))
}
