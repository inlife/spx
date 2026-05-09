import ToolShell from 'components/tools/tool-shell'
import Faq from 'components/tools/faq'
import GeoGrid from 'components/tools/geo-grid'
import MarkdownClient from 'components/tools/markdown-client'

export const metadata = {
    title: 'Markdown Link Generator',
    description: 'Format any URL into Markdown, Slack mrkdwn, HTML, Obsidian wikilink, or plain link syntax. Auto-wraps custom scheme URLs into universal Shortlinks.',
    alternates: { canonical: '/tools/markdown-link-generator' },
    openGraph: {
        title: 'Markdown Link Generator — Shortlink',
        description: 'Format URLs for Notion, Obsidian, Slack, HTML, and more.',
        url: 'https://www.shortlink.studio/tools/markdown-link-generator',
        images: ['/preview.png'],
    },
}

const FAQ_ITEMS = [
    {
        q: 'How do I format a link in Notion?',
        a: 'Notion uses standard CommonMark Markdown for links: [Label](https://example.com). Type the link, select it, press Cmd/Ctrl+K, then paste the URL. Or paste a URL onto selected text and Notion auto-formats it. Custom scheme URLs (slack://, obsidian://) are stripped — wrap them in a Shortlink first.',
    },
    {
        q: 'What is Slack mrkdwn link syntax?',
        a: 'Slack uses its own mrkdwn flavor: <https://example.com|Label>. Note the angle brackets and the pipe (not parentheses or square brackets). You can also paste a bare URL and Slack auto-links it. Custom schemes other than slack:// are not auto-linked.',
    },
    {
        q: 'How do I make a clickable link in Obsidian?',
        a: 'Obsidian supports two formats: standard Markdown ([Label](url)) for any link, and wikilinks ([[Note Name|Label]]) for internal vault notes. Wikilinks are designed for in-vault navigation; for external URLs always use the Markdown format. Custom schemes work in both if Obsidian is set to allow them.',
    },
    {
        q: 'Markdown link syntax cheat sheet',
        a: 'Inline: [Label](https://example.com). Reference: [Label][ref] then [ref]: https://example.com elsewhere. Auto-link: <https://example.com>. With title: [Label](https://example.com "Hover text"). All four work in CommonMark, GitHub Flavored Markdown, Notion, Obsidian, and most other Markdown renderers.',
    },
    {
        q: 'How do I embed a Zoom link in a Notion page?',
        a: 'Use [Join meeting](https://zoom.us/j/123456789) for the standard HTTPS form. For the native zoommtg:// scheme — which Notion strips — wrap it in a Shortlink first, then paste [Join meeting](https://shortlink.studio/s/...) into Notion. The wrapped link renders as clickable and still opens the Zoom desktop app.',
    },
]

const SYNTAX_REFERENCE = [
    { surface: 'Markdown / CommonMark', syntax: '[Label](url)', notes: 'Standard everywhere — Notion, Bear, Logseq, GitHub, GitLab, Jekyll, Hugo.' },
    { surface: 'Notion', syntax: '[Label](url)', notes: 'Same as Markdown. Cmd/Ctrl+K to insert quickly.' },
    { surface: 'Obsidian (external)', syntax: '[Label](url)', notes: 'Use Markdown for external URLs. Wikilinks are for in-vault navigation.' },
    { surface: 'Obsidian (vault note)', syntax: '[[Note Name|Label]]', notes: 'Resolves internal note paths only.' },
    { surface: 'Slack mrkdwn', syntax: '<url|Label>', notes: 'Angle brackets, pipe separator. No parentheses.' },
    { surface: 'HTML', syntax: '<a href="url">Label</a>', notes: 'For email signatures, raw HTML, web pages.' },
    { surface: 'reStructuredText', syntax: '`Label <url>`_', notes: 'Sphinx docs, Python projects, ReadTheDocs.' },
    { surface: 'AsciiDoc', syntax: 'url[Label]', notes: 'Antora, AsciiDoctor — note no separator between url and brackets.' },
    { surface: 'BBCode', syntax: '[url=...]Label[/url]', notes: 'Older forums, phpBB, vBulletin.' },
    { surface: 'Auto-link (bare URL)', syntax: 'https://example.com', notes: 'Slack, Discord, Twitter, GitHub comments — auto-detect URLs.' },
]

export default function MarkdownLinkGeneratorPage() {
    const webAppLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Markdown Link Generator',
        url: 'https://www.shortlink.studio/tools/markdown-link-generator/',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: metadata.description,
        featureList: [
            'Outputs Markdown, Slack mrkdwn, HTML, Obsidian wikilink, RST, plain URL',
            'Detects custom URL schemes and offers Shortlink wrapping',
            'One-click copy per format',
            'Stateless: no server calls, no tracking',
        ],
    }

    return (
        <ToolShell
            slug="markdown-link-generator"
            eyebrow="Formatter"
            title="Markdown Link Generator"
            intro="Type a URL and a label once, get every link format you need: Markdown, Slack mrkdwn, HTML, Obsidian wikilinks, reStructuredText, and plain. Custom scheme URLs auto-detect and offer one-toggle Shortlink wrapping."
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
            />

            {/* Generator */}
            <section className="py-10">
                <MarkdownClient />
            </section>

            {/* Syntax reference */}
            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    Link syntax by platform
                </h2>
                <p className="text-zinc-500 text-sm mb-6 max-w-[60ch]">
                    Reference table for the most-used link formats. The generator above produces correctly formatted output for every row.
                </p>
                <div className="overflow-x-auto border border-zinc-800">
                    <table className="w-full font-mono text-xs">
                        <thead>
                            <tr className="bg-zinc-900 text-zinc-400 uppercase tracking-widest text-[10px]">
                                <th className="text-left p-3 border-b border-zinc-800">Surface</th>
                                <th className="text-left p-3 border-b border-zinc-800">Syntax</th>
                                <th className="text-left p-3 border-b border-zinc-800 hidden md:table-cell">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SYNTAX_REFERENCE.map(row => (
                                <tr key={row.surface} className="border-b border-zinc-900">
                                    <td className="p-3 text-white">{row.surface}</td>
                                    <td className="p-3 text-emerald-500 break-all">{row.syntax}</td>
                                    <td className="p-3 text-zinc-500 hidden md:table-cell">{row.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Why custom schemes need wrapping */}
            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    Why custom scheme URLs need wrapping first
                </h2>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch] mb-4">
                    Markdown link syntax is universal: <code className="font-mono text-sm text-zinc-300">[Label](url)</code> renders the same way in every Markdown processor. The variable is what the surrounding platform allows in the URL slot.
                </p>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch]">
                    Most platforms whitelist a small set of schemes — typically <code className="font-mono text-sm text-zinc-300">https</code>, <code className="font-mono text-sm text-zinc-300">http</code>, <code className="font-mono text-sm text-zinc-300">mailto</code>, sometimes <code className="font-mono text-sm text-zinc-300">tel</code>. Anything else (slack://, obsidian://, zoommtg://) gets stripped before the link is rendered. The generator above auto-detects this case and offers to wrap the URL in a <a href="/" className="text-emerald-500 hover:text-emerald-400">Shortlink</a> so the resulting Markdown renders as clickable everywhere.
                </p>
            </section>

            <GeoGrid heading="Where teams paste these formats" />

            <Faq items={FAQ_ITEMS} />
        </ToolShell>
    )
}
