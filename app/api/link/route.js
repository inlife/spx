import { makeLink } from 'utils/make-link'
import { isWebUrl, schemeOf } from 'utils/link-policy'

// GET /api/link?url=<app link>&mode=auto|manual&format=text|json
//
// Returns the same link the converter makes. Nothing is stored, and the URL is
// never logged. Documented on /integrations.

const MAX_URL_LENGTH = 2048
const MODES = ['auto', 'manual']
const FORMATS = ['text', 'json']

const CORS = {
    'Access-Control-Allow-Origin': '*',
}

function respond(status, json, text, payload) {
    const headers = {
        ...CORS,
        'Cache-Control': status === 200 ? 'public, max-age=86400, s-maxage=86400' : 'no-store',
    }
    if (json) {
        return Response.json(payload, { status, headers })
    }
    return new Response(text, {
        status,
        headers: { ...headers, 'Content-Type': 'text/plain; charset=utf-8' },
    })
}

function fail(message, json) {
    return respond(400, json, message, { error: message })
}

export function GET(request) {
    const params = new URL(request.url).searchParams
    const format = params.get('format') || 'text'
    const json = format === 'json'

    if (!FORMATS.includes(format)) return fail('format must be text or json', false)

    const mode = params.get('mode') || 'auto'
    if (!MODES.includes(mode)) return fail('mode must be auto or manual', json)

    const url = (params.get('url') || '').trim()
    if (!url) return fail('url is missing', json)
    if (url.length > MAX_URL_LENGTH) return fail(`url is longer than ${MAX_URL_LENGTH} characters`, json)
    // Catches stray text (a shared sentence, a note title) before it becomes a dead link
    if (!schemeOf(url)) return fail('url must start with a scheme, like obsidian:', json)

    let link
    try {
        link = makeLink(url, { auto: mode === 'auto' })
    } catch (error) {
        // Blocked scheme (javascript:, data:, vbscript:)
        return fail(error.message, json)
    }

    // Website links always come back as manual links, whatever was asked for
    const effectiveMode = mode === 'auto' && !isWebUrl(url) ? 'auto' : 'manual'
    return respond(200, json, link, { link, url, mode: effectiveMode })
}

export function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            ...CORS,
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '86400',
        },
    })
}
