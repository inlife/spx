import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
    LINKOPEN_ORIGIN,
    buildLink,
    buildObsidianUri,
    escapeLinkText,
    linkTypeFor,
    parseLineTarget,
    toLinkOpenUrl,
} from '../src/links.js'

// Links must decode with the site's own codec (utils/codec.js in the LinkOpen
// repo). If this folder is used on its own, outside that repo, the vendored copy
// stands in for it.
const siteCodecUrl = new URL('../../../utils/codec.js', import.meta.url)
const hasSiteCodec = existsSync(fileURLToPath(siteCodecUrl))
const siteCodec = hasSiteCodec
    ? await import(/* @vite-ignore */ siteCodecUrl.href)
    : await import('../src/codec.js')

// Reads a LinkOpen link the way the site does: /s/<data> through the codec,
// /<type>/<encoded> through decodeURIComponent (app/[type]/[url]/page.js).
function decodeWithSite(link) {
    expect(link.startsWith(LINKOPEN_ORIGIN)).toBe(true)
    const path = link.slice(LINKOPEN_ORIGIN.length)
    if (path.startsWith('s/')) return siteCodec.decode(path.slice(2))
    const slash = path.indexOf('/')
    return { type: path.slice(0, slash), url: decodeURIComponent(path.slice(slash + 1)) }
}

// Links get pasted into Markdown, chat and email, so they must not contain
// anything that ends a link early.
const SAFE_LINK = /^https:\/\/linkopen\.app\/[A-Za-z0-9\-._~%/!*']+$/

const CASES = [
    {
        name: 'note at the vault root',
        input: { vault: 'Notes', path: 'Inbox.md' },
        uri: 'obsidian://open?vault=Notes&file=Inbox',
    },
    {
        name: 'note in a folder',
        input: { vault: 'Notes', path: 'Projects/Roadmap.md' },
        uri: 'obsidian://open?vault=Notes&file=Projects%2FRoadmap',
    },
    {
        name: 'heading (example from the Obsidian URI docs)',
        input: { vault: 'Notes', path: 'Projects/Roadmap.md', heading: 'Q3' },
        uri: 'obsidian://open?vault=Notes&file=Projects%2FRoadmap%23Q3',
    },
    {
        name: 'block',
        input: { vault: 'Notes', path: 'Projects/Roadmap.md', blockId: 'abc123' },
        uri: 'obsidian://open?vault=Notes&file=Projects%2FRoadmap%23%5Eabc123',
    },
    {
        name: 'spaces in vault, folder, note and heading',
        input: { vault: 'My Vault', path: 'Daily notes/2026-10-31 Friday.md', heading: 'Open questions' },
        uri: 'obsidian://open?vault=My%20Vault&file=Daily%20notes%2F2026-10-31%20Friday%23Open%20questions',
    },
    {
        name: 'deep folders',
        input: { vault: 'Work', path: 'Areas/Clients/Acme/Kickoff call.md' },
        uri: 'obsidian://open?vault=Work&file=Areas%2FClients%2FAcme%2FKickoff%20call',
    },
    {
        name: '# and & in the vault name, reserved characters in the path',
        input: { vault: 'Team #1 & Co', path: 'Q&A/50% done + more = ok?.md' },
        uri: 'obsidian://open?vault=Team%20%231%20%26%20Co&file=Q%26A%2F50%25%20done%20%2B%20more%20%3D%20ok%3F',
    },
    {
        name: '# inside a heading value',
        input: { vault: 'Notes', path: 'Dev.md', heading: 'C# tips' },
        uri: 'obsidian://open?vault=Notes&file=Dev%23C%23%20tips',
    },
    {
        name: 'parentheses in the path',
        input: { vault: 'Notes', path: 'Books/Dune (1965).md' },
        uri: 'obsidian://open?vault=Notes&file=Books%2FDune%20(1965)',
    },
    {
        name: 'Cyrillic note and heading',
        input: { vault: 'Нотатки', path: 'Проєкти/План на рік.md', heading: 'Третій квартал' },
        uri:
            'obsidian://open?vault=' + encodeURIComponent('Нотатки') +
            '&file=' + encodeURIComponent('Проєкти/План на рік#Третій квартал'),
    },
    {
        name: 'Japanese vault and accented heading',
        input: { vault: '日本語ノート', path: 'メモ/会議.md', heading: 'Überblick für Café' },
        uri:
            'obsidian://open?vault=%E6%97%A5%E6%9C%AC%E8%AA%9E%E3%83%8E%E3%83%BC%E3%83%88' +
            '&file=%E3%83%A1%E3%83%A2%2F%E4%BC%9A%E8%AD%B0%23%C3%9Cberblick%20f%C3%BCr%20Caf%C3%A9',
    },
    {
        name: 'emoji in folder, note and block',
        input: { vault: 'Ideas 💡', path: 'Rockets 🚀/Launch ✅.md', blockId: 'step-2' },
        uri:
            'obsidian://open?vault=Ideas%20%F0%9F%92%A1' +
            '&file=Rockets%20%F0%9F%9A%80%2FLaunch%20%E2%9C%85%23%5Estep-2',
    },
    {
        name: 'only the trailing .md is dropped',
        input: { vault: 'Notes', path: 'notes.md/read.md.md' },
        uri: 'obsidian://open?vault=Notes&file=notes.md%2Fread.md',
    },
    {
        name: 'other extensions are kept',
        input: { vault: 'Notes', path: 'Boards/Plan.canvas' },
        uri: 'obsidian://open?vault=Notes&file=Boards%2FPlan.canvas',
    },
    {
        name: 'long path',
        input: {
            vault: 'Research',
            path: 'Literature/2026/' + 'A very long note title about link compression '.repeat(6).trim() + '.md',
            heading: 'Results and discussion',
        },
        uri:
            'obsidian://open?vault=Research&file=' +
            encodeURIComponent(
                'Literature/2026/' +
                    'A very long note title about link compression '.repeat(6).trim() +
                    '#Results and discussion',
            ),
    },
]

describe('buildObsidianUri', () => {
    for (const c of CASES) {
        it(c.name, () => {
            expect(buildObsidianUri(c.input)).toBe(c.uri)
        })
    }

    it('uses the block when both a heading and a block are given', () => {
        expect(buildObsidianUri({ vault: 'Notes', path: 'A.md', heading: 'H', blockId: 'b1' })).toBe(
            'obsidian://open?vault=Notes&file=A%23%5Eb1',
        )
    })

    it('rejects a missing vault or path', () => {
        expect(() => buildObsidianUri({ vault: '', path: 'A.md' })).toThrow()
        expect(() => buildObsidianUri({ vault: 'Notes', path: '' })).toThrow()
    })
})

describe('toLinkOpenUrl decodes with the site codec', () => {
    for (const c of CASES) {
        for (const type of ['1', '0']) {
            it(`${c.name} (type ${type})`, () => {
                const link = toLinkOpenUrl(c.uri, type)
                expect(link).toMatch(SAFE_LINK)
                expect(decodeWithSite(link)).toEqual({ url: c.uri, type })

                // Same choice and same output as the site
                const site = siteCodec.shouldCompress(c.uri, type)
                if (site.useCompression) {
                    expect(link).toBe(LINKOPEN_ORIGIN + 's/' + site.compressed)
                } else {
                    expect(link.startsWith(LINKOPEN_ORIGIN + type + '/')).toBe(true)
                }
            })
        }
    }

    it('uses the legacy path when it is shorter, with parentheses encoded', () => {
        const uri = 'x:(a)'
        expect(siteCodec.shouldCompress(uri, '1').useCompression).toBe(false)

        const link = toLinkOpenUrl(uri, '1')
        expect(link).toBe('https://linkopen.app/1/x%3A%28a%29')
        expect(link).toMatch(SAFE_LINK)
        expect(decodeWithSite(link)).toEqual({ url: uri, type: '1' })
    })

    it('rejects unknown link types', () => {
        expect(() => toLinkOpenUrl('obsidian://open?vault=a&file=b', '2')).toThrow()
    })
})

describe('buildLink', () => {
    const base = { vault: 'My Vault', path: 'Projects/Roadmap 2026.md', title: 'Roadmap 2026' }

    it('copies a plain link that opens the app by default', () => {
        const link = buildLink({ ...base, openMode: 'app', markdown: false })
        expect(decodeWithSite(link)).toEqual({
            url: 'obsidian://open?vault=My%20Vault&file=Projects%2FRoadmap%202026',
            type: '1',
        })
    })

    it('uses type 0 for the confirmation page', () => {
        expect(linkTypeFor('confirm')).toBe('0')
        expect(linkTypeFor('app')).toBe('1')
        expect(linkTypeFor(undefined)).toBe('1')
        const link = buildLink({ ...base, openMode: 'confirm', markdown: false })
        expect(decodeWithSite(link).type).toBe('0')
    })

    // [label](url) with a label that may contain escaped brackets
    function parseMarkdown(md) {
        const m = md.match(/^\[((?:\\.|[^\\\]])*)\]\((\S+)\)$/)
        expect(m).not.toBeNull()
        return { label: m[1], url: m[2] }
    }

    it('copies a Markdown link to a note', () => {
        const md = buildLink({ ...base, openMode: 'app', markdown: true })
        const { label, url } = parseMarkdown(md)
        expect(label).toBe('Roadmap 2026')
        expect(decodeWithSite(url).url).toBe('obsidian://open?vault=My%20Vault&file=Projects%2FRoadmap%202026')
    })

    it('copies a Markdown link to a heading, labelled with the heading as written', () => {
        const md = buildLink({
            ...base,
            heading: 'C tips',
            headingLabel: 'C# tips',
            openMode: 'app',
            markdown: true,
        })
        const { label, url } = parseMarkdown(md)
        expect(label).toBe('Roadmap 2026 › C# tips')
        expect(decodeWithSite(url).url).toBe(
            'obsidian://open?vault=My%20Vault&file=Projects%2FRoadmap%202026%23C%20tips',
        )
    })

    it('falls back to the link heading for the label', () => {
        const md = buildLink({ ...base, heading: 'Q3', openMode: 'app', markdown: true })
        expect(parseMarkdown(md).label).toBe('Roadmap 2026 › Q3')
    })

    it('copies a Markdown link to a block', () => {
        const md = buildLink({ ...base, blockId: 'abc123', openMode: 'confirm', markdown: true })
        const { label, url } = parseMarkdown(md)
        expect(label).toBe('Roadmap 2026 › ^abc123')
        expect(decodeWithSite(url)).toEqual({
            url: 'obsidian://open?vault=My%20Vault&file=Projects%2FRoadmap%202026%23%5Eabc123',
            type: '0',
        })
    })

    it('escapes [ and ] (and backslashes) in titles and headings', () => {
        expect(escapeLinkText('Notes [draft]')).toBe('Notes \\[draft\\]')
        expect(escapeLinkText('a\\]b')).toBe('a\\\\\\]b')

        const md = buildLink({
            vault: 'V',
            path: 'Notes [draft].md',
            title: 'Notes [draft]',
            heading: 'Step 1 2',
            headingLabel: 'Step [1] 2',
            openMode: 'app',
            markdown: true,
        })
        const { label, url } = parseMarkdown(md)
        expect(label).toBe('Notes \\[draft\\] › Step \\[1\\] 2')
        expect(decodeWithSite(url).url).toBe('obsidian://open?vault=V&file=Notes%20%5Bdraft%5D%23Step%201%202')
    })

    it('keeps unicode and emoji titles as they are', () => {
        const md = buildLink({
            vault: 'Ideas 💡',
            path: 'Rockets 🚀/Запуск.md',
            title: 'Запуск',
            heading: 'Étape ✅',
            openMode: 'app',
            markdown: true,
        })
        const { label, url } = parseMarkdown(md)
        expect(label).toBe('Запуск › Étape ✅')
        expect(decodeWithSite(url)).toEqual({
            url: 'obsidian://open?vault=' + encodeURIComponent('Ideas 💡') +
                '&file=' + encodeURIComponent('Rockets 🚀/Запуск#Étape ✅'),
            type: '1',
        })
    })
})

describe('parseLineTarget', () => {
    it.each([
        ['# Title', { heading: 'Title' }],
        ['###### Six', { heading: 'Six' }],
        ['## Spaces after   ', { heading: 'Spaces after' }],
        ['## Closing hashes ##', { heading: 'Closing hashes' }],
        ['## C# tips', { heading: 'C# tips' }],
        ['   ### Indented up to three spaces', { heading: 'Indented up to three spaces' }],
        ['## Привіт 👋', { heading: 'Привіт 👋' }],
        ['## Heading with id ^h1', { heading: 'Heading with id ^h1' }],
    ])('heading: %s', (line, expected) => {
        expect(parseLineTarget(line)).toEqual(expected)
    })

    it.each([
        ['A paragraph ^abc123', { blockId: 'abc123' }],
        ['- list item ^item-2', { blockId: 'item-2' }],
        ['- [ ] task ^Task9', { blockId: 'Task9' }],
        ['^table-1', { blockId: 'table-1' }],
        ['Trailing spaces ^abc   ', { blockId: 'abc' }],
    ])('block: %s', (line, expected) => {
        expect(parseLineTarget(line)).toEqual(expected)
    })

    it.each([
        [''],
        ['Plain text'],
        ['#tag at the start'],
        ['####### Seven hashes'],
        ['    # Four spaces is code'],
        ['## '],
        ['## ##'],
        ['text^abc'],
        ['text ^under_score'],
        ['text ^Ünicode'],
        ['text ^abc more text'],
    ])('nothing: %j', (line) => {
        expect(parseLineTarget(line)).toBeNull()
    })
})

describe('vendored codec', () => {
    it.skipIf(!hasSiteCodec)('matches the site codec below the header comment', () => {
        const site = readFileSync(siteCodecUrl, 'utf8')
        const vendored = readFileSync(new URL('../src/codec.js', import.meta.url), 'utf8')
        const body = vendored.replace(/^(\/\/.*\n)+\n/, '')
        expect(body).not.toBe(vendored)
        expect(body).toBe(site)
    })
})
