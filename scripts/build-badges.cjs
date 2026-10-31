#!/usr/bin/env node
// Writes the "Open in …" README badges to public/badge/<id>.svg.
//
//   node scripts/build-badges.cjs
//
// Badges are listed in utils/data/badges.json (id, name, color). Each one is a
// two-part badge in the shields.io "flat" style: "Open in" on grey, the app
// name on the app's color, 20px tall, 11px Verdana / DejaVu Sans.
//
// Text widths are measured in Chromium (Playwright) with canvas measureText,
// once per font in the stack that is installed, and the widest result wins.
// The SVG also sets textLength to that width, so a viewer with a different
// font gets the same box and the text can't run past the edge.
//
// Needs Playwright with Chromium: `npm i -D playwright && npx playwright install chromium`
// if it isn't available globally. Never rename an existing badge file: READMEs
// link to it.

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'badge')
const BADGES = require(path.join(ROOT, 'utils', 'data', 'badges.json'))

const LABEL = 'Open in'
const LABEL_COLOR = '#555'
const FONT_SIZE = 11
const FONT_STACK = 'Verdana,DejaVu Sans,sans-serif'
const MEASURE_FONTS = ['Verdana', 'DejaVu Sans']
const HEIGHT = 20
const PADDING = 5 // left and right of the text, in each segment
const MIN_CONTRAST = 4.5 // WCAG AA for white text on the segment color

function loadPlaywright() {
    try {
        return require('playwright')
    } catch {
        console.error('Playwright is not installed. Run: npm i -D playwright && npx playwright install chromium')
        process.exit(1)
    }
}

// Returns { [text]: width } using the widest of the installed fonts.
async function measure(texts) {
    const { chromium } = loadPlaywright()
    const browser = await chromium.launch()
    try {
        const page = await browser.newPage()
        return await page.evaluate(({ texts, fonts, size }) => {
            const ctx = document.createElement('canvas').getContext('2d')
            const width = (font, text) => {
                ctx.font = font
                return ctx.measureText(text).width
            }
            // A font is installed if it changes the width against two different
            // generic fallbacks (the classic font detection check).
            const probe = 'mmmmmmmmmmlli1WQ@'
            const installed = fonts.filter(f =>
                ['monospace', 'serif'].some(g => width(`${size}px "${f}", ${g}`, probe) !== width(`${size}px ${g}`, probe))
            )
            const widths = {}
            for (const text of texts) {
                widths[text] = Math.max(...installed.map(f => width(`${size}px "${f}"`, text)))
            }
            return { installed, widths }
        }, { texts, fonts: MEASURE_FONTS, size: FONT_SIZE })
    } finally {
        await browser.close()
    }
}

function luminance(hex) {
    const full = hex.length === 4 ? '#' + [...hex.slice(1)].map(c => c + c).join('') : hex
    const [r, g, b] = [1, 3, 5].map(i => {
        const c = parseInt(full.slice(i, i + 2), 16) / 255
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrastWithWhite(hex) {
    return 1.05 / (luminance(hex) + 0.05)
}

function escapeXml(s) {
    return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

// Two text runs per segment, as shields.io does: a faint shadow 1px lower, then the white text.
function textRun(text, centerX, textLength) {
    const t = escapeXml(text)
    return [
        `    <text aria-hidden="true" x="${centerX}" y="15" fill="#010101" fill-opacity=".3" textLength="${textLength}">${t}</text>`,
        `    <text x="${centerX}" y="14" textLength="${textLength}">${t}</text>`,
    ].join('\n')
}

function renderBadge(badge, labelTextWidth, messageTextWidth) {
    const title = escapeXml(`${LABEL} ${badge.name}`)
    const leftWidth = labelTextWidth + PADDING * 2
    const rightWidth = messageTextWidth + PADDING * 2
    const width = leftWidth + rightWidth
    // Ids are prefixed per badge so two badges inlined on one page don't clash.
    const gradientId = `lo-${badge.id}-s`
    const clipId = `lo-${badge.id}-r`

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${HEIGHT}" role="img" aria-label="${title}">
  <title>${title}</title>
  <linearGradient id="${gradientId}" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="${clipId}">
    <rect width="${width}" height="${HEIGHT}" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#${clipId})">
    <rect width="${leftWidth}" height="${HEIGHT}" fill="${LABEL_COLOR}"/>
    <rect x="${leftWidth}" width="${rightWidth}" height="${HEIGHT}" fill="${badge.color}"/>
    <rect width="${width}" height="${HEIGHT}" fill="url(#${gradientId})"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="${FONT_STACK}" font-size="${FONT_SIZE}" text-rendering="geometricPrecision">
${textRun(LABEL, leftWidth / 2, labelTextWidth)}
${textRun(badge.name, leftWidth + rightWidth / 2, messageTextWidth)}
  </g>
</svg>
`
}

async function main() {
    for (const b of BADGES) {
        if (!/^[a-z0-9-]+$/.test(b.id)) throw new Error(`Bad badge id: ${b.id}`)
        const ratio = contrastWithWhite(b.color)
        if (ratio < MIN_CONTRAST) {
            throw new Error(`${b.id}: white on ${b.color} is ${ratio.toFixed(2)}:1, needs ${MIN_CONTRAST}:1`)
        }
    }
    if (contrastWithWhite(LABEL_COLOR) < MIN_CONTRAST) throw new Error('Label color is too light for white text')

    const texts = [LABEL, ...BADGES.map(b => b.name)]
    const { installed, widths } = await measure(texts)
    if (installed.length === 0) {
        throw new Error(`None of ${MEASURE_FONTS.join(', ')} is installed, so text can't be measured`)
    }
    console.log(`Measured with: ${installed.join(', ')}`)

    // Whole pixels keep the rects on the pixel grid
    const textWidth = (text) => Math.ceil(widths[text])

    fs.mkdirSync(OUT_DIR, { recursive: true })
    for (const b of BADGES) {
        const svg = renderBadge(b, textWidth(LABEL), textWidth(b.name))
        fs.writeFileSync(path.join(OUT_DIR, `${b.id}.svg`), svg)
        const total = textWidth(LABEL) + textWidth(b.name) + PADDING * 4
        console.log(`${(b.id + '.svg').padEnd(14)} ${String(total).padStart(3)}px  ${LABEL} ${b.name}  (${contrastWithWhite(b.color).toFixed(2)}:1)`)
    }
}

main().catch(err => {
    console.error(err.message || err)
    process.exit(1)
})
