// Platform compatibility rules for URL schemes.
//
// Each platform entry documents which schemes render as clickable links.
//   allows:   schemes (without "://") that the platform reliably renders.
//   blocks:   schemes the platform actively strips, blocks, or renders as plain text.
//             "*" means the platform allows ONLY the schemes in `allows`.
//   notes:    short user-facing explanation of why links break.
//
// Status returned by check(scheme):
//   "works"   — scheme is in allows
//   "broken"  — scheme is in blocks (or blocks is "*" and scheme not in allows)
//   "partial" — desktop client supports it but the web/mobile surface does not
//               (encoded as scheme appearing in `partial`)

export const PLATFORMS = [
    {
        id: 'notion',
        name: 'Notion',
        allows: ['https', 'http', 'mailto', 'tel'],
        blocks: '*',
        partial: [],
        notes: 'Notion strips non-HTTPS schemes when pasted into pages. Custom scheme URLs render as plain text.',
    },
    {
        id: 'obsidian',
        name: 'Obsidian',
        allows: ['https', 'http', 'mailto', 'obsidian'],
        blocks: ['slack', 'zoommtg', 'figma', 'notion'],
        partial: [],
        notes: 'Obsidian renders https:// and obsidian:// links natively but blocks most third-party schemes for security.',
    },
    {
        id: 'slack',
        name: 'Slack',
        allows: ['https', 'http', 'mailto', 'tel', 'slack'],
        blocks: ['obsidian', 'notion', 'figma', 'zoommtg'],
        partial: [],
        notes: 'Slack auto-links https:// and its own slack:// scheme, but other custom schemes render as plain text.',
    },
    {
        id: 'gmail',
        name: 'Gmail',
        allows: ['https', 'http', 'mailto', 'tel'],
        blocks: '*',
        partial: [],
        notes: 'Gmail web only renders standard HTTP(S), mailto, and tel links. All custom schemes render as plain text.',
    },
    {
        id: 'msteams',
        name: 'MS Teams',
        allows: ['https', 'http', 'mailto', 'tel', 'msteams'],
        blocks: ['slack', 'obsidian', 'zoommtg', 'figma', 'notion'],
        partial: [],
        notes: 'Teams supports msteams:// deep links but blocks competing custom schemes.',
    },
    {
        id: 'linear',
        name: 'Linear',
        allows: ['https', 'http', 'mailto', 'linear'],
        blocks: '*',
        partial: [],
        notes: 'Linear allows HTTPS and its own linear:// scheme. Other custom schemes render as plain text in issue descriptions.',
    },
    {
        id: 'confluence',
        name: 'Confluence',
        allows: ['https', 'http', 'mailto'],
        blocks: '*',
        partial: [],
        notes: 'Confluence sanitizes URLs and rejects custom schemes entirely. Wrap them in HTTPS first.',
    },
    {
        id: 'github',
        name: 'GitHub',
        allows: ['https', 'http', 'mailto'],
        blocks: '*',
        partial: [],
        notes: 'GitHub Markdown only auto-links HTTPS, HTTP, and mailto. Custom schemes are stripped from issue/PR/README rendering.',
    },
    {
        id: 'markdown',
        name: 'Markdown (generic)',
        allows: ['https', 'http', 'mailto', 'ftp'],
        blocks: [],
        partial: [],
        notes: 'CommonMark spec only auto-links HTTPS/HTTP/mailto/ftp. Custom schemes work in [label](url) syntax IF the renderer permits them.',
    },
]

// Returns: { status: 'works' | 'broken' | 'partial' | 'unknown', platform, notes }
export function check(scheme, platform) {
    const lower = (scheme || '').toLowerCase().replace(/:.*$/, '')
    if (!lower) return { status: 'unknown', platform, notes: 'No scheme detected.' }

    if (platform.allows.includes(lower)) {
        return { status: 'works', platform, notes: platform.notes }
    }
    if (Array.isArray(platform.partial) && platform.partial.includes(lower)) {
        return { status: 'partial', platform, notes: platform.notes }
    }
    if (platform.blocks === '*' || (Array.isArray(platform.blocks) && platform.blocks.includes(lower))) {
        return { status: 'broken', platform, notes: platform.notes }
    }
    return { status: 'unknown', platform, notes: platform.notes }
}

export function extractScheme(url) {
    if (!url) return ''
    const match = url.trim().match(/^([a-zA-Z][a-zA-Z0-9+.\-]*):/)
    return match ? match[1].toLowerCase() : ''
}
