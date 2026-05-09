import ToolShell from 'components/tools/tool-shell'
import Faq from 'components/tools/faq'
import GeoGrid from 'components/tools/geo-grid'
import CheckerClient from 'components/tools/checker-client'
import { PLATFORMS, check } from 'utils/data/platform-rules'
import { URL_SCHEMES } from 'utils/data/url-schemes'

export const metadata = {
    title: 'URL Compatibility Checker',
    description: 'Check whether a custom scheme URL works in Notion, Slack, Obsidian, Gmail, GitHub, and other platforms. Paste any link and see exactly where it breaks.',
    alternates: { canonical: '/tools/url-compatibility-checker' },
    openGraph: {
        title: 'URL Compatibility Checker — Shortlink',
        description: 'Check whether a custom scheme URL works in Notion, Slack, Obsidian, and other platforms.',
        url: 'https://www.shortlink.studio/tools/url-compatibility-checker',
        images: ['/preview.png'],
    },
}

const FAQ_ITEMS = [
    {
        q: 'Why is my Slack link broken in Notion?',
        a: 'Notion sanitizes pasted URLs and only renders standard HTTP(S), mailto, and tel links. The slack:// scheme is stripped before the link is rendered, so it shows up as plain text. Wrap the slack:// URL in a Shortlink (https://shortlink.studio/...) and Notion will render it as a clickable link that still opens Slack.',
    },
    {
        q: 'Does Obsidian support custom scheme URLs?',
        a: 'Obsidian renders https://, http://, mailto:, and its own obsidian:// scheme natively. Most other custom schemes (slack://, zoom://, figma://) render as plain text or are blocked. To embed a non-Obsidian deep link, wrap it in a Shortlink first.',
    },
    {
        q: 'Can you embed a Zoom link in a Notion page?',
        a: 'A standard https://zoom.us/j/... link works in Notion and opens the meeting in the browser or app. The native zoommtg:// scheme does NOT work — Notion strips it. Use either the HTTPS Zoom URL or a Shortlink-wrapped zoommtg:// URL.',
    },
    {
        q: 'What URLs work in Slack messages?',
        a: 'Slack auto-links HTTPS, HTTP, mailto, tel, and its own slack:// scheme. Other custom schemes (obsidian://, notion://, figma://) render as plain text. Wrap them in a Shortlink and they become clickable in any Slack message.',
    },
    {
        q: 'How do I fix deep links in email clients?',
        a: 'Most email clients (Gmail, Outlook web, Apple Mail) only render HTTPS, HTTP, mailto, and tel links. Custom schemes are stripped or rendered as plain text. The reliable fix is to wrap the custom scheme URL in an HTTPS link via Shortlink — recipients click the HTTPS link and get redirected to the app.',
    },
]

// Build a static reference matrix: for every well-known scheme × every platform.
// Pure server render — this is the SEO payload that crawlers index even
// without JavaScript.
function buildMatrix() {
    const popular = ['slack', 'obsidian', 'zoommtg', 'notion', 'figma', 'vscode', 'linear', 'msteams', 'mailto']
    const rows = popular.map(prefix => {
        const meta = URL_SCHEMES.find(s => s.scheme.startsWith(prefix + '://') || s.scheme.startsWith(prefix + ':'))
        return {
            scheme: prefix,
            display: meta ? meta.scheme : prefix + '://',
            cells: PLATFORMS.map(p => check(prefix, p)),
        }
    })
    return rows
}

export default function UrlCompatibilityCheckerPage() {
    const matrix = buildMatrix()

    const webAppLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'URL Compatibility Checker',
        url: 'https://www.shortlink.studio/tools/url-compatibility-checker/',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: metadata.description,
        featureList: [
            'Detects URL scheme from any pasted link',
            'Shows compatibility across 9 major platforms',
            'Per-platform explanation of why links break',
            'Direct fix path via Shortlink wrapper',
        ],
    }

    const symbol = (status) => {
        if (status === 'works') return { mark: '✓', cls: 'text-emerald-500' }
        if (status === 'partial') return { mark: '~', cls: 'text-amber-400' }
        if (status === 'broken') return { mark: '✕', cls: 'text-red-400' }
        return { mark: '?', cls: 'text-zinc-600' }
    }

    return (
        <ToolShell
            slug="url-compatibility-checker"
            eyebrow="Diagnostic"
            title="URL Compatibility Checker"
            intro="Paste any URL and see exactly which platforms render it as a clickable link, which strip it, and why. Built for the moment a slack:// or obsidian:// link silently fails inside someone else’s tool."
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
            />

            {/* Interactive checker */}
            <section className="py-10">
                <CheckerClient />
            </section>

            {/* Why custom scheme URLs break */}
            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    Why custom scheme URLs break
                </h2>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch] mb-4">
                    Custom URL schemes like <code className="font-mono text-sm text-zinc-300">slack://</code>, <code className="font-mono text-sm text-zinc-300">obsidian://</code>, and <code className="font-mono text-sm text-zinc-300">zoommtg://</code> only become clickable when an OS-level handler is registered for them. The browser is fine handing these off to the OS &mdash; the problem is upstream: most content platforms (Notion, Confluence, Gmail, GitHub, Linear) sanitize URLs before rendering, and their allowlists rarely extend past <code className="font-mono text-sm text-zinc-300">https</code>, <code className="font-mono text-sm text-zinc-300">http</code>, <code className="font-mono text-sm text-zinc-300">mailto</code>, and <code className="font-mono text-sm text-zinc-300">tel</code>.
                </p>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch]">
                    The result: a <code className="font-mono text-sm text-zinc-300">slack://channel</code> link pasted into a Notion page silently becomes plain text. The link target is intact, but the platform refuses to render it as an anchor. The fix is to wrap the custom scheme inside an <code className="font-mono text-sm text-zinc-300">https://</code> URL that handles the redirect client-side &mdash; which is exactly what <a href="/" className="text-emerald-500 hover:text-emerald-400">Shortlink</a> does.
                </p>
            </section>

            {/* Static reference matrix */}
            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    Compatibility matrix
                </h2>
                <p className="text-zinc-500 text-sm mb-6 max-w-[60ch]">
                    Reference table covering common schemes across major content platforms. <span className="text-emerald-500">✓</span> = renders as clickable link. <span className="text-red-400">✕</span> = stripped or rendered as plain text. <span className="text-amber-400">~</span> = partial / depends on client.
                </p>
                <div className="overflow-x-auto border border-zinc-800">
                    <table className="w-full font-mono text-xs">
                        <thead>
                            <tr className="bg-zinc-900 text-zinc-400 uppercase tracking-widest text-[10px]">
                                <th className="text-left p-3 border-b border-zinc-800">Scheme</th>
                                {PLATFORMS.map(p => (
                                    <th key={p.id} className="text-center p-3 border-b border-zinc-800 border-l border-zinc-800/60">
                                        {p.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {matrix.map(row => (
                                <tr key={row.scheme} className="border-b border-zinc-900">
                                    <td className="p-3 text-emerald-500">{row.display}</td>
                                    {row.cells.map(c => {
                                        const s = symbol(c.status)
                                        return (
                                            <td key={c.platform.id} className="text-center p-3 border-l border-zinc-800/60">
                                                <span className={`text-base font-bold ${s.cls}`} title={c.notes}>
                                                    {s.mark}
                                                </span>
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Per-platform breakdown */}
            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
                    Platform-by-platform breakdown
                </h2>
                <div className="space-y-3">
                    {PLATFORMS.map(p => (
                        <details key={p.id} className="group border border-zinc-800">
                            <summary className="flex items-center justify-between p-4 cursor-pointer">
                                <span className="text-white text-sm font-medium pr-4">{p.name}</span>
                                <span className="font-mono text-zinc-600 text-xs group-open:rotate-45 transition-transform shrink-0">+</span>
                            </summary>
                            <div className="px-4 pb-4 space-y-2">
                                <p className="text-zinc-400 text-xs leading-relaxed">{p.notes}</p>
                                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                                    Allows: <span className="text-emerald-500">{p.allows.join(', ')}</span>
                                </div>
                                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                                    Blocks: <span className="text-red-400">{p.blocks === '*' ? 'everything else' : p.blocks.join(', ') || 'none'}</span>
                                </div>
                            </div>
                        </details>
                    ))}
                </div>
            </section>

            <GeoGrid heading="Where this problem hits hardest" />

            <Faq items={FAQ_ITEMS} />
        </ToolShell>
    )
}
