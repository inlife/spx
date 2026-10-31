// "Open in …" README badges: which badge fits a link, and the snippets to paste.
// The badge images live in public/badge/<id>.svg (scripts/build-badges.cjs).

import { makeLink } from './make-link'
import { schemeOf, isWebUrl, isBlockedUrl } from './link-policy'
import BADGES from './data/badges.json'

export { BADGES }

export const SITE = 'https://linkopen.app'

// Schemes GitHub keeps as link targets, so they don't need wrapping
const KEPT_BY_GITHUB = ['http', 'https', 'mailto']

const FALLBACK_ID = 'app'

export function badgeById(id) {
    return BADGES.find(b => b.id === id) || BADGES.find(b => b.id === FALLBACK_ID)
}

export function badgeForScheme(scheme) {
    const lower = (scheme || '').toLowerCase()
    return BADGES.find(b => b.schemes.includes(lower)) || badgeById(FALLBACK_ID)
}

export function badgeAlt(badge) {
    return `Open in ${badge.name}`
}

export function badgeImageUrl(badge, origin = SITE) {
    return `${origin}/badge/${badge.id}.svg`
}

// Same link the converter and the deep link builder make: type '1' opens the
// app straight away, web links get the confirmation page (type '0').
//
// Returns { link, scheme, type, keptByGitHub } or { error } where error is
// 'empty', 'no-scheme' or 'blocked'.
export function buildBadgeLink(input) {
    const url = (input || '').trim()
    if (!url) return { error: 'empty' }

    const scheme = schemeOf(url)
    if (!scheme) return { error: 'no-scheme' }
    if (isBlockedUrl(url)) return { error: 'blocked', scheme }

    const type = isWebUrl(url) ? '0' : '1'
    // encodeURIComponent leaves ( and ) alone, and an unbalanced one ends a
    // Markdown link early. %28/%29 decode to the same characters.
    const link = makeLink(url).replaceAll('(', '%28').replaceAll(')', '%29')

    return { link, scheme, type, keptByGitHub: KEPT_BY_GITHUB.includes(scheme) }
}

function escapeAttr(s) {
    return s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
}

export function badgeMarkdown(link, badge) {
    return `[![${badgeAlt(badge)}](${badgeImageUrl(badge)})](${link})`
}

export function badgeHtml(link, badge) {
    return `<a href="${escapeAttr(link)}"><img src="${badgeImageUrl(badge)}" alt="${escapeAttr(badgeAlt(badge))}"></a>`
}
