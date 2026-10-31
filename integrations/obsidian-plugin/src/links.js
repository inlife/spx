// Pure link building. No imports from 'obsidian', so it can be tested in Node.

import { shouldCompress } from './codec.js'

export const LINKOPEN_ORIGIN = 'https://linkopen.app/'

// Link types understood by linkopen.app: '1' opens the app as soon as the page
// loads, '0' shows a page with an "Open link" button first.
export const OPEN_MODES = {
    app: '1',
    confirm: '0',
}

export function linkTypeFor(openMode) {
    return openMode === 'confirm' ? OPEN_MODES.confirm : OPEN_MODES.app
}

// Obsidian's URI docs: "If the file extension is md, the extension can be omitted."
export function stripMarkdownExtension(path) {
    return path.endsWith('.md') ? path.slice(0, -3) : path
}

// Builds obsidian://open?vault=<vault>&file=<path>, with an optional heading
// (file=Path%23Heading) or block (file=Path%23%5Eblock-id) inside the file value.
// encodeURIComponent turns spaces into %20, / into %2F, # into %23 and ^ into %5E.
//
//   vault    the vault name (app.vault.getName())
//   path     the file path inside the vault, for example "Projects/Roadmap.md"
//   heading  heading text, already prepared for a link (stripHeadingForLink)
//   blockId  block ID without the ^; wins over heading if both are given
export function buildObsidianUri({ vault, path, heading, blockId }) {
    if (!vault) throw new Error('Missing vault name')
    if (!path) throw new Error('Missing file path')

    let file = stripMarkdownExtension(path)
    if (blockId) {
        file += '#^' + blockId
    } else if (heading) {
        file += '#' + heading
    }
    return 'obsidian://open?vault=' + encodeURIComponent(vault) + '&file=' + encodeURIComponent(file)
}

// Wraps any URI the same way the site does: https://linkopen.app/s/<compressed>
// when that is shorter, otherwise the legacy https://linkopen.app/<type>/<encoded>.
export function toLinkOpenUrl(uri, type) {
    if (type !== '0' && type !== '1') throw new Error('Link type must be "0" or "1"')

    const { compressed, legacy, useCompression } = shouldCompress(uri, type)
    if (useCompression) return LINKOPEN_ORIGIN + 's/' + compressed

    // encodeURIComponent leaves ( and ) as they are, and they can end a Markdown
    // link early. The site decodes the path with decodeURIComponent, so %28 and
    // %29 come back as ( and ).
    return LINKOPEN_ORIGIN + legacy.replaceAll('(', '%28').replaceAll(')', '%29')
}

// Backslashes and square brackets would end or break the [label] part.
export function escapeLinkText(text) {
    return text.replace(/[\\[\]]/g, '\\$&')
}

export function markdownLink(label, url) {
    return '[' + escapeLinkText(label) + '](' + url + ')'
}

// "Note title", "Note title › Heading" or "Note title › ^block-id"
export function linkLabel(title, { headingLabel, blockId } = {}) {
    if (blockId) return title + ' › ^' + blockId
    if (headingLabel) return title + ' › ' + headingLabel
    return title
}

// Everything a copy action needs, in one call.
//
//   vault, path, heading, blockId   see buildObsidianUri
//   title         the note title for Markdown output (file.basename)
//   headingLabel  the heading as written in the note, for Markdown output
//   openMode      'app' or 'confirm'
//   markdown      true for [label](link), false for the plain link
export function buildLink({ vault, path, heading, blockId, title, headingLabel, openMode, markdown }) {
    const uri = buildObsidianUri({ vault, path, heading, blockId })
    const url = toLinkOpenUrl(uri, linkTypeFor(openMode))
    if (!markdown) return url
    return markdownLink(linkLabel(title, { headingLabel: headingLabel || heading, blockId }), url)
}

// Finds what the cursor line points at.
// Returns { heading } for an ATX heading line ("## Text"),
// { blockId } for a line that ends with " ^block-id" or is only "^block-id",
// or null for anything else.
//
// Obsidian's docs: block IDs "can only consist of Latin letters, numbers, and
// dashes", placed after a space at the end of the line, or on a line of their
// own after a list, quote, callout or table. No lookbehind (older iOS lacks it).
const HEADING_LINE = /^ {0,3}#{1,6}[ \t]+(.*)$/
const BLOCK_ID_AT_END = /(?:^|\s)\^([A-Za-z0-9-]+)\s*$/

export function parseLineTarget(line) {
    const heading = line.match(HEADING_LINE)
    if (heading) {
        // Drop an optional closing run of #, as CommonMark does: "## Text ##"
        const text = heading[1].replace(/[ \t]+#+[ \t]*$/, '').replace(/^#+[ \t]*$/, '').trim()
        if (text) return { heading: text }
    }

    const block = line.match(BLOCK_ID_AT_END)
    if (block) return { blockId: block[1] }

    return null
}
