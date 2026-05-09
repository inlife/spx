import ToolShell from 'components/tools/tool-shell'
import Faq from 'components/tools/faq'
import GeoGrid from 'components/tools/geo-grid'
import BuilderClient from 'components/tools/builder-client'

export const metadata = {
    title: 'Deep Link Builder',
    description: 'Generate Slack, Obsidian, Zoom, Notion, and Figma deep links from a guided form. Outputs both the raw scheme:// URL and a universal HTTPS Shortlink.',
    alternates: { canonical: '/tools/deep-link-builder' },
    openGraph: {
        title: 'Deep Link Builder — Shortlink',
        description: 'Generate Slack, Obsidian, Zoom, Notion, and Figma deep links.',
        url: 'https://www.shortlink.studio/tools/deep-link-builder',
        images: ['/preview.png'],
    },
}

const FAQ_ITEMS = [
    {
        q: 'How do I create a deep link to a Slack channel?',
        a: 'Slack channel deep links use the format slack://channel?team={team_id}&id={channel_id}. The team ID starts with T (e.g. T0001), and the channel ID starts with C. You can find both in the URL when you open Slack in a browser, or by right-clicking a channel and selecting Copy link.',
    },
    {
        q: 'What is the Obsidian URI scheme?',
        a: 'Obsidian uses the obsidian:// scheme. The most common format is obsidian://open?vault={vault_name}&file={note_path} to open a specific note. Advanced URI plugin extends this with obsidian://advanced-uri for jumping to headings, blocks, or running commands. Both formats work across macOS, Windows, Linux, iOS, and Android.',
    },
    {
        q: 'How do I make a clickable Zoom link in Notion?',
        a: 'The native zoommtg:// scheme is stripped by Notion. Two options work: paste the standard https://zoom.us/j/{meeting_id} URL (opens in browser, then app), or use this builder to generate a zoommtg:// link, wrap it in a Shortlink, and paste the Shortlink into Notion. Both render as clickable links.',
    },
    {
        q: 'What is a Figma deep link?',
        a: 'Figma deep links use the figma:// scheme to open a file directly in the desktop app. The format is figma://file/{file_key}/{file_name} where the file key is the alphanumeric ID from the Figma URL (figma.com/file/<key>/...). Add ?node-id=<id> to open at a specific frame.',
    },
    {
        q: 'How do I get a Notion page ID?',
        a: 'Open the page in Notion and copy its URL. The page ID is the 32-character alphanumeric string at the end (e.g. notion.so/Page-Title-abc123def456...). The deep link format is notion://www.notion.so/{page-id}. This builder extracts the ID automatically when you paste the full URL.',
    },
]

const FORMAT_REFERENCE = [
    { app: 'Slack', format: 'slack://channel?team={team_id}&id={channel_id}', notes: 'Add &message={ts} to deep-link to a specific message.' },
    { app: 'Obsidian', format: 'obsidian://open?vault={vault}&file={note_path}', notes: 'URL-encode the path. Add #{heading} for a specific heading.' },
    { app: 'Zoom', format: 'zoommtg://zoom.us/join?action=join&confno={meeting_id}', notes: 'Optional &pwd={passcode}. The newer zoomus:// scheme is also accepted.' },
    { app: 'Notion', format: 'notion://www.notion.so/{page_id}', notes: 'Page ID is the 32-character alphanumeric suffix from the page URL.' },
    { app: 'Figma', format: 'figma://file/{file_key}/{name}', notes: 'Add ?node-id={id} to open at a specific frame.' },
    { app: 'Linear', format: 'linear://issue/{TEAM-123}', notes: 'Identifier matches the issue key shown in the Linear UI.' },
    { app: 'VS Code', format: 'vscode://file/{absolute_path}:{line}:{col}', notes: 'Line and column are optional but useful for code reviews.' },
]

export default function DeepLinkBuilderPage() {
    const webAppLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Deep Link Builder',
        url: 'https://www.shortlink.studio/tools/deep-link-builder/',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: metadata.description,
        featureList: [
            'Guided forms for Slack, Obsidian, Zoom, Notion, Figma deep links',
            'Auto-extracts Notion page IDs from full URLs',
            'Generates both raw scheme:// and HTTPS Shortlink output',
            'Stateless: runs entirely in the browser',
        ],
    }

    return (
        <ToolShell
            slug="deep-link-builder"
            eyebrow="Generator"
            title="Deep Link Builder"
            intro="Build correctly formatted slack://, obsidian://, zoom://, notion://, and figma:// deep links from a guided form. Get both the raw scheme URL and a universal HTTPS Shortlink that works in tools that strip custom schemes."
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
            />

            {/* Builder */}
            <section className="py-10">
                <BuilderClient />
            </section>

            {/* What is a deep link */}
            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    What is a deep link?
                </h2>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch] mb-4">
                    A deep link is a URL that opens a specific view inside a desktop or mobile app rather than landing on a generic homepage. Custom URL schemes like <code className="font-mono text-sm text-zinc-300">slack://</code>, <code className="font-mono text-sm text-zinc-300">obsidian://</code>, and <code className="font-mono text-sm text-zinc-300">notion://</code> are how apps register themselves with the operating system to handle their own links.
                </p>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch]">
                    The catch: while the OS knows how to open these schemes, most content platforms (Notion, Confluence, Gmail, GitHub) refuse to render them as clickable links. Wrap the deep link in an HTTPS URL via <a href="/" className="text-emerald-500 hover:text-emerald-400">Shortlink</a> and it works everywhere.
                </p>
            </section>

            {/* Format reference */}
            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    Deep link formats by app
                </h2>
                <p className="text-zinc-500 text-sm mb-6 max-w-[60ch]">
                    Reference for the most-used custom URL schemes. Use the builder above to generate any of these without hand-crafting the URL.
                </p>
                <div className="overflow-x-auto border border-zinc-800">
                    <table className="w-full font-mono text-xs">
                        <thead>
                            <tr className="bg-zinc-900 text-zinc-400 uppercase tracking-widest text-[10px]">
                                <th className="text-left p-3 border-b border-zinc-800">App</th>
                                <th className="text-left p-3 border-b border-zinc-800">Format</th>
                                <th className="text-left p-3 border-b border-zinc-800 hidden md:table-cell">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {FORMAT_REFERENCE.map(row => (
                                <tr key={row.app} className="border-b border-zinc-900">
                                    <td className="p-3 text-white">{row.app}</td>
                                    <td className="p-3 text-emerald-500 break-all">{row.format}</td>
                                    <td className="p-3 text-zinc-500 hidden md:table-cell">{row.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Why wrap in HTTPS */}
            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    Why wrap deep links in HTTPS?
                </h2>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch] mb-4">
                    Custom scheme URLs only render as clickable when the platform that displays them allows non-standard schemes. Notion, Gmail, GitHub, Linear, and most enterprise wikis don’t. Wrapping the deep link in an HTTPS URL solves this without changing the destination.
                </p>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch]">
                    Shortlink encodes the original scheme URL into the path of an <code className="font-mono text-sm text-zinc-300">https://shortlink.studio/...</code> URL using stateless LZ compression. The wrapped link works in any context that allows HTTPS links; clicking it triggers a client-side redirect to the original scheme URL, which the OS hands off to the registered app.
                </p>
            </section>

            <GeoGrid heading="How teams use deep links by region" />

            <Faq items={FAQ_ITEMS} />
        </ToolShell>
    )
}
