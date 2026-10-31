import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { decode } from './codec'
import {
    BADGES,
    badgeById,
    badgeForScheme,
    buildBadgeLink,
    badgeMarkdown,
    badgeHtml,
} from './readme-badge'

// Reads a link made by buildBadgeLink back into { url, type }
function readLink(link) {
    const path = link.replace('https://linkopen.app/', '')
    if (path.startsWith('s/')) return decode(path.slice(2))
    return { type: path.charAt(0), url: decodeURIComponent(path.slice(2)) }
}

describe('badgeForScheme', () => {
    it('picks the badge for known schemes', () => {
        expect(badgeForScheme('vscode').id).toBe('vscode')
        expect(badgeForScheme('obsidian').id).toBe('obsidian')
        expect(badgeForScheme('slack').id).toBe('slack')
        expect(badgeForScheme('zoommtg').id).toBe('zoom')
        expect(badgeForScheme('zoomus').id).toBe('zoom')
        expect(badgeForScheme('notion').id).toBe('notion')
        expect(badgeForScheme('figma').id).toBe('figma')
        expect(badgeForScheme('cursor').id).toBe('cursor')
        expect(badgeForScheme('msteams').id).toBe('teams')
        expect(badgeForScheme('things').id).toBe('things')
    })

    it('falls back to the generic badge', () => {
        expect(badgeForScheme('spotify').id).toBe('app')
        expect(badgeForScheme('').id).toBe('app')
        expect(badgeById('nope').id).toBe('app')
    })

    it('has an SVG file for every badge', () => {
        for (const b of BADGES) {
            const file = path.resolve(__dirname, '..', 'public', 'badge', `${b.id}.svg`)
            expect(fs.existsSync(file), file).toBe(true)
        }
    })
})

describe('buildBadgeLink', () => {
    it('makes an auto-open link that decodes to the exact app link', () => {
        const url = 'vscode://vscode.git/clone?url=https%3A%2F%2Fgithub.com%2Finlife%2Fspx'
        const { link, type, error } = buildBadgeLink(url)
        expect(error).toBeUndefined()
        expect(type).toBe('1')
        expect(link.startsWith('https://linkopen.app/')).toBe(true)
        expect(readLink(link)).toEqual({ url, type: '1' })
    })

    it('uses the confirmation page for web links', () => {
        const url = 'https://vscode.dev/github/inlife/linkopen'
        const { link, type, keptByGitHub } = buildBadgeLink(url)
        expect(type).toBe('0')
        expect(keptByGitHub).toBe(true)
        expect(readLink(link)).toEqual({ url, type: '0' })
    })

    it('refuses blocked schemes and input without a scheme', () => {
        expect(buildBadgeLink('javascript:alert(1)').error).toBe('blocked')
        expect(buildBadgeLink(' DATA:text/html,hi').error).toBe('blocked')
        expect(buildBadgeLink('not a link').error).toBe('no-scheme')
        expect(buildBadgeLink('   ').error).toBe('empty')
    })

    it('never leaves parentheses in the link', () => {
        const url = 'myapp://open?name=a(1'
        const { link } = buildBadgeLink(url)
        expect(link).not.toMatch(/[()]/)
        expect(readLink(link)).toEqual({ url, type: '1' })
    })
})

describe('snippets', () => {
    const link = 'https://linkopen.app/s/1abc'
    it('builds Markdown and HTML', () => {
        const badge = badgeById('vscode')
        expect(badgeMarkdown(link, badge)).toBe(
            '[![Open in VS Code](https://linkopen.app/badge/vscode.svg)](https://linkopen.app/s/1abc)'
        )
        expect(badgeHtml(link, badge)).toBe(
            '<a href="https://linkopen.app/s/1abc"><img src="https://linkopen.app/badge/vscode.svg" alt="Open in VS Code"></a>'
        )
    })
})
