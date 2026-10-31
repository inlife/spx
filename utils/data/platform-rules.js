// How each platform treats a pasted or typed link, by scheme.
//
//   allows:   schemes (without "://") that come out as a clickable link
//   partial:  schemes that work only in some cases, or "*" for every scheme
//             not in `allows` (see notes for which cases)
//   blocks:   schemes that end up as plain text or get removed, or "*" for
//             every scheme not in `allows` / `partial`
//   notes:    one or two plain sentences shown to the user
//
// Platforms change this behaviour now and then. Keep the notes specific so
// they're easy to re-check.

export const PLATFORMS = [
    {
        id: 'notion',
        name: 'Notion',
        allows: ['https', 'http', 'mailto', 'tel'],
        partial: [],
        blocks: '*',
        notes: 'Links with any other scheme lose their link and stay as plain text.',
    },
    {
        id: 'obsidian',
        name: 'Obsidian',
        allows: ['https', 'http', 'mailto', 'obsidian'],
        partial: '*',
        blocks: [],
        notes: 'Written as a Markdown link, [label](scheme://…), a custom-scheme link opens the app on click if it’s installed. A bare URL pasted on its own may stay plain text.',
    },
    {
        id: 'slack',
        name: 'Slack',
        allows: ['https', 'http', 'mailto'],
        partial: [],
        blocks: '*',
        notes: 'Messages link http(s) and mailto. Other schemes show up as plain text.',
    },
    {
        id: 'gmail',
        name: 'Gmail',
        allows: ['https', 'http', 'mailto', 'tel'],
        partial: [],
        blocks: '*',
        notes: 'Links with other schemes are removed from the email, so the text arrives without a link.',
    },
    {
        id: 'linear',
        name: 'Linear',
        allows: ['https', 'http', 'mailto'],
        partial: [],
        blocks: '*',
        notes: 'Issue descriptions and comments keep http(s) and mailto links. Other schemes show as plain text.',
    },
    {
        id: 'confluence',
        name: 'Confluence',
        allows: ['https', 'http', 'mailto'],
        partial: [],
        blocks: '*',
        notes: 'The link dialog rejects custom schemes, and pasted ones are not turned into links.',
    },
    {
        id: 'github',
        name: 'GitHub',
        allows: ['https', 'http', 'mailto'],
        partial: [],
        blocks: '*',
        notes: 'GitHub’s Markdown sanitizer drops the link target for other schemes, so READMEs, issues and PRs show the label without a link.',
    },
    {
        id: 'markdown',
        name: 'Markdown (other)',
        allows: ['https', 'http', 'mailto'],
        partial: '*',
        blocks: [],
        notes: 'The CommonMark spec allows any scheme in [label](url), but each renderer decides what to keep. Bare-URL autolinking (GitHub style) only covers http(s), www. and mailto.',
    },
]

// Returns: { status: 'works' | 'partial' | 'broken' | 'unknown', platform, notes }
export function check(scheme, platform) {
    const lower = (scheme || '').toLowerCase().replace(/:.*$/, '')
    if (!lower) return { status: 'unknown', platform, notes: 'No scheme detected.' }

    const inList = (list) => list === '*' || (Array.isArray(list) && list.includes(lower))

    if (platform.allows.includes(lower)) return { status: 'works', platform, notes: platform.notes }
    if (Array.isArray(platform.partial) && platform.partial.includes(lower)) return { status: 'partial', platform, notes: platform.notes }
    if (Array.isArray(platform.blocks) && platform.blocks.includes(lower)) return { status: 'broken', platform, notes: platform.notes }
    if (inList(platform.partial)) return { status: 'partial', platform, notes: platform.notes }
    if (inList(platform.blocks)) return { status: 'broken', platform, notes: platform.notes }
    return { status: 'unknown', platform, notes: platform.notes }
}

export { schemeOf as extractScheme } from 'utils/link-policy'
