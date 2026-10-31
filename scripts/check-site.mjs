// Smoke test for the live site. Checks that pages load, that every old
// shortlink.studio link still forwards to the same path on linkopen.app, and
// that the badge and link API respond correctly.
//
//   node scripts/check-site.mjs                 # check production once
//   node scripts/check-site.mjs --retries 4     # retry failures (right after a deploy)
//   node scripts/check-site.mjs --base http://localhost:3000 --skip-hosts
//
// Exits non-zero if any check fails. Runs in .github/workflows/production-checks.yml.

import { encode, decode } from '../utils/codec.js'

const args = process.argv.slice(2)
const flag = (name, fallback) => {
    const i = args.indexOf(name)
    return i === -1 ? fallback : args[i + 1]
}
const BASE = flag('--base', 'https://linkopen.app').replace(/\/$/, '')
const RETRIES = Number(flag('--retries', 0))
const SKIP_HOSTS = args.includes('--skip-hosts')
const OLD_HOSTS = ['shortlink.studio', 'www.shortlink.studio', 'www.linkopen.app']

const APP_LINK = 'obsidian://open?vault=My%20Vault&file=Projects%2FRoadmap'
const SHARED_PATH = '/s/' + encode(APP_LINK, '1')
const LEGACY_PATH = '/1/' + encodeURIComponent('things:///add?title=Buy%20milk%20%26%20eggs')

const get = (url, init = {}) => fetch(url, { redirect: 'manual', ...init })
const sleep = ms => new Promise(r => setTimeout(r, ms))

function expect(cond, message) {
    if (!cond) throw new Error(message)
}

const checks = []
const check = (name, fn) => checks.push({ name, fn })

// Pages
for (const path of [
    '/', '/about', '/contact', '/tools', '/obsidian-links', '/integrations',
    '/tools/url-compatibility-checker', '/tools/deep-link-builder',
    '/tools/markdown-link-generator', '/tools/url-scheme-registry', '/tools/readme-badge',
    '/sitemap.xml', '/robots.txt', '/llms.txt', '/a1cccb780ba2cbcb2e123d0e037f417d.txt',
]) {
    check(`page ${path}`, async () => {
        const res = await get(BASE + path)
        expect(res.status === 200, `status ${res.status}`)
    })
}

check('homepage canonical', async () => {
    const html = await (await get(BASE + '/')).text()
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
    expect(canonical === 'https://linkopen.app', `canonical is ${canonical}`)
})

// Shared links open the right target
check('shared /s/ link shows its target', async () => {
    const res = await get(BASE + SHARED_PATH)
    const html = await res.text()
    expect(res.status === 200, `status ${res.status}`)
    expect(html.includes(APP_LINK.replaceAll('&', '&amp;')), 'target URL missing from the page')
})

check('legacy /1/ link shows its target', async () => {
    const res = await get(BASE + LEGACY_PATH)
    const html = await res.text()
    expect(res.status === 200, `status ${res.status}`)
    expect(html.includes('things:///add?title=Buy%20milk%20%26%20eggs'), 'target URL missing from the page')
})

// Old domains forward with the exact path and query
if (!SKIP_HOSTS) {
    for (const host of OLD_HOSTS) {
        for (const path of ['/', SHARED_PATH, LEGACY_PATH, '/tools/deep-link-builder?x=1&y=%2F']) {
            check(`redirect https://${host}${path.slice(0, 40)}`, async () => {
                const res = await get(`https://${host}${path}`)
                const location = res.headers.get('location')
                expect([301, 308].includes(res.status), `status ${res.status}`)
                expect(location === 'https://linkopen.app' + path, `location ${location}`)
            })
        }
    }
}

// Badges
check('badge /badge/vscode.svg', async () => {
    const res = await get(BASE + '/badge/vscode.svg')
    expect(res.status === 200, `status ${res.status}`)
    expect((res.headers.get('content-type') || '').includes('image/svg+xml'), `content-type ${res.headers.get('content-type')}`)
})

// Link API
const api = (params) => get(`${BASE}/api/link?${new URLSearchParams(params)}`)

check('api: app link → auto link that decodes back', async () => {
    const res = await api({ url: APP_LINK })
    const link = (await res.text()).trim()
    expect(res.status === 200, `status ${res.status}`)
    expect(link.startsWith('https://linkopen.app/'), `link ${link}`)
    const path = new URL(link).pathname
    if (path.startsWith('/s/')) {
        const { url, type } = decode(path.slice(3))
        expect(url === APP_LINK && type === '1', `decoded ${type} ${url}`)
    } else {
        expect(path.startsWith('/1/'), `path ${path}`)
    }
})

check('api: https link is forced to manual', async () => {
    const res = await api({ url: 'https://example.com/login' })
    const link = (await res.text()).trim()
    expect(res.status === 200, `status ${res.status}`)
    const path = new URL(link).pathname
    const type = path.startsWith('/s/') ? decode(path.slice(3)).type : path.split('/')[1]
    expect(type === '0', `type ${type}`)
})

check('api: javascript: is refused', async () => {
    const res = await api({ url: 'javascript:alert(1)' })
    expect(res.status === 400, `status ${res.status}`)
})

// Run
let failed = 0
for (const { name, fn } of checks) {
    let error
    for (let attempt = 0; attempt <= RETRIES; attempt++) {
        try {
            await fn()
            error = null
            break
        } catch (e) {
            error = e
            if (attempt < RETRIES) await sleep(15000)
        }
    }
    if (error) {
        failed++
        console.log(`FAIL ${name}: ${error.message}`)
    } else {
        console.log(`ok   ${name}`)
    }
}

console.log(`\n${checks.length - failed}/${checks.length} checks passed against ${BASE}`)
process.exit(failed ? 1 : 0)
