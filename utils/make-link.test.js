import { describe, it, expect } from 'vitest'
import { makeLink } from './make-link'
import { decode, shouldCompress } from './codec'

// Reads a link back the way the /s/ and /<type>/ routes do.
function parse(link) {
    const path = link.slice('https://linkopen.app/'.length)
    if (path.startsWith('s/')) {
        const { url, type } = decode(decodeURIComponent(path.slice(2)))
        return { url, type, compressed: true }
    }
    const slash = path.indexOf('/')
    return {
        type: path.slice(0, slash),
        url: decodeURIComponent(path.slice(slash + 1)),
        compressed: false,
    }
}

const OBSIDIAN = 'obsidian://open?vault=Notes&file=Projects%2FRoadmap'
const SLACK = 'slack://open'

describe('makeLink', () => {
    it('makes an auto link for a custom scheme by default', () => {
        const link = makeLink(OBSIDIAN)
        expect(link.startsWith('https://linkopen.app/s/1')).toBe(true)
        expect(parse(link)).toEqual({ url: OBSIDIAN, type: '1', compressed: true })
    })

    it('makes a manual link when auto is false', () => {
        const link = makeLink(OBSIDIAN, { auto: false })
        expect(link.startsWith('https://linkopen.app/s/0')).toBe(true)
        expect(parse(link)).toEqual({ url: OBSIDIAN, type: '0', compressed: true })
    })

    it('uses the legacy path when it is shorter', () => {
        expect(makeLink(SLACK)).toBe('https://linkopen.app/1/slack%3A%2F%2Fopen')
        expect(makeLink(SLACK, { auto: false })).toBe('https://linkopen.app/0/slack%3A%2F%2Fopen')
    })

    it('always makes website links manual', () => {
        for (const url of ['https://example.com/a?b=1&c=%2F', 'HTTP://example.com', 'https://github.com/inlife/linkopen/releases/latest/download/app.zip']) {
            expect(parse(makeLink(url)).type).toBe('0')
            expect(parse(makeLink(url, { auto: true })).type).toBe('0')
            expect(parse(makeLink(url, { auto: false })).type).toBe('0')
        }
    })

    it('refuses script-running schemes', () => {
        expect(() => makeLink('javascript:alert(1)')).toThrow(/javascript: links are not allowed/)
        expect(() => makeLink(' JavaScript:alert(1)')).toThrow(/not allowed/)
        expect(() => makeLink('data:text/html,<b>hi</b>')).toThrow(/data: links are not allowed/)
        expect(() => makeLink('vbscript:msgbox', { auto: false })).toThrow(/vbscript: links are not allowed/)
    })

    it('refuses empty input', () => {
        expect(() => makeLink('')).toThrow(/empty/)
        expect(() => makeLink('   \n')).toThrow(/empty/)
        expect(() => makeLink()).toThrow(/empty/)
        expect(() => makeLink(null)).toThrow(/empty/)
    })

    it('round-trips through decode()', () => {
        const urls = [
            OBSIDIAN,
            'obsidian://adv-uri?vault=My%20Vault&filepath=Daily%2F2026-10-31.md&heading=Tasks',
            'zoommtg://zoom.us/join?action=join&confno=123456789&pwd=abc',
            'spotify:track:6rqhFgbbKwnb9MLmUQDhG6',
            'vscode://file/Users/me/project/src/index.js:12:4',
            'myapp://open?q=caf%C3%A9&emoji=%F0%9F%94%97',
            'notion://www.notion.so/0123456789abcdef0123456789abcdef',
        ]
        for (const url of urls) {
            for (const auto of [true, false]) {
                const parsed = parse(makeLink(url, { auto }))
                expect(parsed.url).toBe(url)
                expect(parsed.type).toBe(auto ? '1' : '0')
            }
        }
    })

    it('matches the path the tools built before makeLink existed', () => {
        for (const url of [OBSIDIAN, SLACK, 'zoommtg://zoom.us/join?action=join&confno=123']) {
            const result = shouldCompress(url, '1')
            const path = result.useCompression ? `s/${result.compressed}` : result.legacy
            expect(makeLink(url)).toBe(`https://linkopen.app/${path}`)
        }
    })
})
