import LZString from 'lz-string'

// Dictionary of common URL patterns mapped to Unicode PUA characters.
//
// ADDING A NEW ENTRY:
//   1. Pick the next PUA code point: U+E000 + current_length (see last entry)
//   2. Add ['pattern', '\uE0XX'] with the new code point
//   3. Re-sort the array so longest patterns come first (greedy matching)
//   4. Run `npm test` to verify roundtrips still pass
//
// RULES:
//   - NEVER change an existing pattern↔token mapping (breaks live links)
//   - NEVER remove entries (old compressed URLs depend on them)
//   - Reordering rows is safe (matching is by content, not position)
//   - Prefer patterns that appear in many real URLs (check analytics)
//
const DICTIONARY = [
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

export function applyDictionary(url) {
    let result = url
    for (const [pattern, token] of DICTIONARY) {
        result = result.replaceAll(pattern, token)
    }
    return result
}

export function reverseDictionary(str) {
    let result = str
    for (const [pattern, token] of DICTIONARY) {
        result = result.replaceAll(token, pattern)
    }
    return result
}

// Post-processing: make lz-string output fully URL-safe
// lz-string's compressToEncodedURIComponent uses A-Za-z0-9+-$
// Replace + and $ which can cause issues in some link parsers
function toUrlSafe(compressed) {
    return compressed.replaceAll('+', '.').replaceAll('$', '_')
}

function fromUrlSafe(safe) {
    return safe.replaceAll('.', '+').replaceAll('_', '$')
}

export function encode(url, type) {
    const substituted = applyDictionary(url)
    const compressed = LZString.compressToEncodedURIComponent(substituted)
    const safe = toUrlSafe(compressed)
    return type + safe
}

export function decode(data) {
    const type = data.charAt(0)
    const payload = data.slice(1)
    const restored = fromUrlSafe(payload)
    const decompressed = LZString.decompressFromEncodedURIComponent(restored)
    if (decompressed === null || decompressed === '') {
        throw new Error('Failed to decompress data')
    }
    const url = reverseDictionary(decompressed)
    return { url, type }
}

export function shouldCompress(url, type) {
    const compressed = encode(url, type)
    const legacy = type + '/' + encodeURIComponent(url)

    // Use compression path prefix "s/" vs legacy "[type]/"
    const compressedPath = 's/' + compressed
    const legacyPath = legacy

    return {
        compressed,
        legacy,
        useCompression: compressedPath.length < legacyPath.length,
    }
}
