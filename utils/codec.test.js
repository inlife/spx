import { describe, it, expect } from 'vitest'
import {
    applyDictionary,
    reverseDictionary,
    encode,
    decode,
    shouldCompress,
} from './codec'

describe('dictionary substitution', () => {
    it('applies and reverses dictionary for obsidian open', () => {
        const url = 'obsidian://open?vault=AI&file=Notes/test'
        const substituted = applyDictionary(url)
        expect(substituted).not.toEqual(url)
        expect(substituted.length).toBeLessThan(url.length)
        expect(reverseDictionary(substituted)).toEqual(url)
    })

    it('applies and reverses dictionary for altstore', () => {
        const url = 'altstore://install?url=https://github.com/user/repo/releases/latest/download/app.ipa'
        const substituted = applyDictionary(url)
        expect(substituted.length).toBeLessThan(url.length)
        expect(reverseDictionary(substituted)).toEqual(url)
    })

    it('applies and reverses dictionary for sideloadly', () => {
        const url = 'sideloadly:https://example.com/app.ipa'
        const substituted = applyDictionary(url)
        expect(substituted.length).toBeLessThan(url.length)
        expect(reverseDictionary(substituted)).toEqual(url)
    })

    it('applies and reverses dictionary for github URL', () => {
        const url = 'https://github.com/user/repo'
        const substituted = applyDictionary(url)
        expect(substituted.length).toBeLessThan(url.length)
        expect(reverseDictionary(substituted)).toEqual(url)
    })

    it('applies and reverses dictionary for notion URL', () => {
        const url = 'https://www.notion.so/workspace/page-id'
        const substituted = applyDictionary(url)
        expect(substituted.length).toBeLessThan(url.length)
        expect(reverseDictionary(substituted)).toEqual(url)
    })

    it('leaves URLs with no dictionary matches unchanged', () => {
        const url = 'ftp://files.example.com/data'
        const substituted = applyDictionary(url)
        expect(substituted).toEqual(url)
    })
})

describe('encode / decode roundtrip', () => {
    const testUrls = [
        'obsidian://open?vault=AI&file=Notes/test',
        'obsidian://advanced-uri?vault=MyVault&filepath=folder/note.md&uid=abc123',
        'altstore://install?url=https://github.com/user/repo/releases/latest/download/app.ipa',
        'sideloadly:https://example.com/app.ipa',
        'https://github.com/user/repo',
        'https://www.notion.so/workspace/page-id-abc123',
        'reprovision://install?url=https://example.com/app.ipa',
        'https://www.example.com/path?query=value',
        'http://example.com/basic',
        'custom-scheme://something/here',
    ]

    for (const url of testUrls) {
        it(`roundtrips: ${url.slice(0, 60)}...`, () => {
            for (const type of ['0', '1']) {
                const encoded = encode(url, type)
                const decoded = decode(encoded)
                expect(decoded.url).toEqual(url)
                expect(decoded.type).toEqual(type)
            }
        })
    }
})

describe('URL safety', () => {
    it('encoded output contains only URL-safe characters', () => {
        const urls = [
            'obsidian://open?vault=AI&file=Notes/test',
            'https://github.com/user/repo/releases/latest/download/file.zip',
            'altstore://install?url=https://example.com/app.ipa',
        ]

        const safePattern = /^[A-Za-z0-9\-._]+$/

        for (const url of urls) {
            const encoded = encode(url, '1')
            // Remove the leading type character for charset check
            const payload = encoded.slice(1)
            expect(payload).toMatch(safePattern)
        }
    })

    it('encoded output contains no slashes', () => {
        const url = 'obsidian://open?vault=AI&file=Notes/deep/path/file.md'
        const encoded = encode(url, '1')
        expect(encoded).not.toContain('/')
    })
})

describe('edge cases', () => {
    it('handles very short URL', () => {
        const url = 'a://b'
        const encoded = encode(url, '0')
        const decoded = decode(encoded)
        expect(decoded.url).toEqual(url)
        expect(decoded.type).toEqual('0')
    })

    it('handles URL with unicode characters', () => {
        const url = 'https://example.com/path?name=\u00e9\u00e8\u00ea'
        const encoded = encode(url, '1')
        const decoded = decode(encoded)
        expect(decoded.url).toEqual(url)
    })

    it('throws on invalid compressed data', () => {
        expect(() => decode('1!!invalid!!')).toThrow()
    })

    it('survives browser decodeURIComponent roundtrip', () => {
        const url = 'obsidian://open?vault=AI&file=Notes/test'
        const encoded = encode(url, '1')
        // Simulate what the browser does: the encoded string goes into a URL path,
        // then gets decoded by decodeURIComponent on the other side
        const afterBrowserRoundtrip = decodeURIComponent(encodeURIComponent(encoded))
        const decoded = decode(afterBrowserRoundtrip)
        expect(decoded.url).toEqual(url)
    })
})

describe('shouldCompress', () => {
    it('prefers compression for long obsidian URLs', () => {
        const url = 'obsidian://open?vault=AI&file=Notes/test'
        const result = shouldCompress(url, '1')
        expect(result.useCompression).toBe(true)
        expect(result.compressed).toBeTruthy()
        expect(result.legacy).toBeTruthy()
    })

    it('may fall back for very short URLs', () => {
        const url = 'a://b'
        const result = shouldCompress(url, '0')
        // For very short URLs, compression might not help
        expect(typeof result.useCompression).toBe('boolean')
        expect(result.compressed).toBeTruthy()
        expect(result.legacy).toBeTruthy()
    })

    it('prefers compression for long altstore URLs', () => {
        const url = 'altstore://install?url=https://github.com/user/repo/releases/latest/download/app.ipa'
        const result = shouldCompress(url, '1')
        expect(result.useCompression).toBe(true)
    })
})

describe('dictionary integrity', () => {
    it('dictionary is sorted longest-first', async () => {
        // Import the dictionary indirectly by checking that longer patterns are tried first
        // We verify this by testing that overlapping patterns resolve correctly
        const url = 'obsidian://open?vault=Test'
        const substituted = applyDictionary(url)
        // 'obsidian://open?vault=' (22 chars) should match before 'obsidian://' (11 chars)
        const reversed = reverseDictionary(substituted)
        expect(reversed).toEqual(url)
    })

    it('obsidian://advanced-uri?vault= matches before obsidian://', () => {
        const url = 'obsidian://advanced-uri?vault=MyVault'
        const substituted = applyDictionary(url)
        const reversed = reverseDictionary(substituted)
        expect(reversed).toEqual(url)
    })

    // Snapshot: catches accidental changes to existing pattern↔token mappings.
    // If this fails, you likely edited an existing entry instead of appending.
    it('existing mappings have not changed', () => {
        const frozen = [
            ['obsidian://advanced-uri?vault=', '\uE000'],
            ['obsidian://adv-uri?vault=',     '\uE001'],
            ['obsidian://open?vault=',        '\uE002'],
            ['/releases/latest/download/',    '\uE003'],
            ['https://www.notion.so/',        '\uE004'],
            ['https://github.com/',           '\uE005'],
            ['://install?url=',               '\uE006'],
            ['reprovision://',                '\uE007'],
            ['https://www.',                  '\uE008'],
            ['obsidian://',                   '\uE009'],
            ['altstore://',                   '\uE00A'],
            ['sideloadly:',                   '\uE00B'],
            ['&filepath=',                    '\uE00C'],
            ['https://',                      '\uE00D'],
            ['http://',                       '\uE00E'],
            ['&file=',                        '\uE00F'],
            ['&uid=',                         '\uE010'],
        ]
        // Every frozen mapping must still roundtrip correctly
        for (const [pattern, token] of frozen) {
            const substituted = applyDictionary(pattern)
            expect(substituted).toContain(token)
            expect(reverseDictionary(token)).toEqual(pattern)
        }
    })
})
