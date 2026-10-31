import ToolShell from 'components/tools/tool-shell'
import Faq from 'components/tools/faq'
import CheckerClient from 'components/tools/checker-client'
import { PLATFORMS, check } from 'utils/data/platform-rules'

export const metadata = {
    title: 'URL Compatibility Checker',
    description: 'Paste a slack://, obsidian:// or zoommtg:// link and see whether Notion, Slack, Gmail, GitHub, Linear and Confluence will keep it clickable.',
    alternates: { canonical: '/tools/url-compatibility-checker' },
    openGraph: {
        title: 'URL Compatibility Checker | LinkOpen',
        description: 'See which apps keep a custom-scheme link clickable and which turn it into plain text.',
        url: 'https://linkopen.app/tools/url-compatibility-checker',
        images: ['/preview.png?v=2'],
    },
}

const FAQ_ITEMS = [
    {
        q: 'Why is my Slack link broken in Notion?',
        a: 'Notion only keeps links that start with http, https, mailto or tel. A slack:// link loses its link and stays as text. The easiest fix is Slack’s own "Copy link" option, which gives you an https://…slack.com/archives/… address that works in Notion and still opens the Slack app. If you need the slack:// form, wrap it with LinkOpen first.',
    },
    {
        q: 'Can I put a Zoom link in a Notion page?',
        a: 'Yes, if you use the https://zoom.us/j/… link from the invite. That one is a normal web link, and Zoom opens the app from it. The zoommtg:// form skips the browser step, but Notion strips it.',
    },
    {
        q: 'My obsidian:// link works inside Obsidian. Why not anywhere else?',
        a: 'Obsidian knows its own scheme, but Slack, Notion, Gmail and most other tools don’t make obsidian:// clickable. Wrapping it in an https link fixes that, and the person clicking still needs Obsidian and the same vault on their machine.',
    },
]

const MATRIX_SCHEMES = [
    ['slack', 'slack://'],
    ['obsidian', 'obsidian://'],
    ['zoommtg', 'zoommtg://'],
    ['notion', 'notion://'],
    ['figma', 'figma://'],
    ['vscode', 'vscode://'],
    ['msteams', 'msteams://'],
    ['mailto', 'mailto:'],
]

const SYMBOLS = {
    works: { mark: '✓', cls: 'text-emerald-500' },
    partial: { mark: '~', cls: 'text-amber-400' },
    broken: { mark: '✕', cls: 'text-red-400' },
    unknown: { mark: '?', cls: 'text-zinc-600' },
}

export default function UrlCompatibilityCheckerPage() {
    const matrix = MATRIX_SCHEMES.map(([scheme, display]) => ({
        scheme,
        display,
        cells: PLATFORMS.map(p => check(scheme, p)),
    }))

    const webAppLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'URL Compatibility Checker',
        url: 'https://linkopen.app/tools/url-compatibility-checker',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: metadata.description,
    }

    return (
        <ToolShell
            slug="url-compatibility-checker"
            eyebrow="Checker"
            title="URL Compatibility Checker"
            intro="Paste a link to see which apps will keep it clickable and which will turn it into plain text."
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
            />

            <section className="py-10">
                <CheckerClient />
            </section>

            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    Why these links break
                </h2>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch] mb-4">
                    A link like <code className="font-mono text-sm text-zinc-300">slack://channel?team=T0001&amp;id=C0001</code> is fine as far as your computer is concerned. Click it and the OS opens Slack. The trouble is the step before the click. Notion, Gmail, GitHub and most wikis check every link you paste against a short list of allowed schemes, usually just <code className="font-mono text-sm text-zinc-300">http</code>, <code className="font-mono text-sm text-zinc-300">https</code> and <code className="font-mono text-sm text-zinc-300">mailto</code>. Anything else keeps its text and loses the link.
                </p>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch]">
                    They do this on purpose. An unknown scheme could launch any app on the reader’s machine, so blocking them is the safe default.
                </p>
            </section>

            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    Ways around it
                </h2>
                <ol className="text-zinc-400 leading-relaxed max-w-[60ch] space-y-3 list-decimal list-inside">
                    <li>
                        <span className="text-zinc-300">Check whether the app has an https version.</span> Several do: <code className="font-mono text-sm text-zinc-300">zoom.us/j/…</code> for Zoom, <code className="font-mono text-sm text-zinc-300">teams.microsoft.com/l/…</code> for Teams, <code className="font-mono text-sm text-zinc-300">wa.me/…</code> for WhatsApp, and Slack’s "Copy link". Use those when you can.
                    </li>
                    <li>
                        <span className="text-zinc-300">In Obsidian or other Markdown tools,</span> write it as <code className="font-mono text-sm text-zinc-300">[label](scheme://…)</code> rather than pasting the bare URL. Some renderers will then keep it.
                    </li>
                    <li>
                        <span className="text-zinc-300">Otherwise, wrap it.</span> <a href="/" className="text-emerald-500 hover:text-emerald-400">LinkOpen</a> turns the custom-scheme URL into an https link. The original is encoded in the link itself, and opening it sends the browser on to the app.
                    </li>
                </ol>
            </section>

            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    Which apps keep which links
                </h2>
                <p className="text-zinc-500 text-sm mb-6 max-w-[60ch]">
                    <span className="text-emerald-500">✓</span> stays clickable, <span className="text-amber-400">~</span> depends on how it’s written, <span className="text-red-400">✕</span> ends up as plain text. Apps change their link handling from time to time, so treat this as a starting point. If something here is wrong, <a href="/contact" className="text-emerald-500 hover:text-emerald-400">let us know</a>.
                </p>
                <div className="overflow-x-auto border border-zinc-800">
                    <table className="w-full font-mono text-xs">
                        <thead>
                            <tr className="bg-zinc-900 text-zinc-400 uppercase tracking-widest text-[10px]">
                                <th className="text-left p-3 border-b border-zinc-800">Scheme</th>
                                {PLATFORMS.map(p => (
                                    <th key={p.id} className="text-center p-3 border-b border-l border-zinc-800">
                                        {p.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {matrix.map(row => (
                                <tr key={row.scheme} className="border-b border-zinc-900">
                                    <td className="p-3 text-emerald-500 whitespace-nowrap">{row.display}</td>
                                    {row.cells.map(c => {
                                        const s = SYMBOLS[c.status]
                                        return (
                                            <td key={c.platform.id} className="text-center p-3 border-l border-zinc-800/60">
                                                <span className={`text-base font-bold ${s.cls}`}>{s.mark}</span>
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <dl className="mt-8 space-y-4 max-w-[60ch]">
                    {PLATFORMS.map(p => (
                        <div key={p.id}>
                            <dt className="text-white text-sm font-bold">{p.name}</dt>
                            <dd className="text-zinc-400 text-sm leading-relaxed">{p.notes}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            <Faq items={FAQ_ITEMS} />
        </ToolShell>
    )
}
