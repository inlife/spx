import { describe, it, expect } from 'vitest'
import { isSharedLinkPath, redactSharedLinkUrl } from './analytics'

describe('isSharedLinkPath', () => {
    it('matches shared-link pages only', () => {
        expect(isSharedLinkPath('/s/1kAHFkJ4KQEw')).toBe(true)
        expect(isSharedLinkPath('/0/slack%3A%2F%2Fopen')).toBe(true)
        expect(isSharedLinkPath('/1/slack%3A%2F%2Fopen')).toBe(true)
        expect(isSharedLinkPath('/')).toBe(false)
        expect(isSharedLinkPath('/tools/deep-link-builder')).toBe(false)
        expect(isSharedLinkPath('/sitemap.xml')).toBe(false)
        expect(isSharedLinkPath(undefined)).toBe(false)
    })
})

describe('redactSharedLinkUrl', () => {
    it('replaces the link with its scheme', () => {
        expect(redactSharedLinkUrl('https://linkopen.app/s/1kAHFkJ4KQEw?x=1#y', 'obsidian')).toBe('https://linkopen.app/s/obsidian')
        expect(redactSharedLinkUrl('https://linkopen.app/1/things%3A%2F%2F%2Fadd', 'Things')).toBe('https://linkopen.app/1/things')
    })

    it('never passes anything but a scheme-shaped label', () => {
        expect(redactSharedLinkUrl('https://linkopen.app/0/x', 'a b/c')).toBe('https://linkopen.app/0/unknown')
        expect(redactSharedLinkUrl('https://linkopen.app/s/x', undefined)).toBe('https://linkopen.app/s/unknown')
    })

    it('leaves other pages alone', () => {
        expect(redactSharedLinkUrl('https://linkopen.app/tools?ref=hn', 'x')).toBe('https://linkopen.app/tools?ref=hn')
    })
})
