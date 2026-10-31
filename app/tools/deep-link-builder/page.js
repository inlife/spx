import ToolShell from 'components/tools/tool-shell'
import Faq from 'components/tools/faq'
import BuilderClient from 'components/tools/builder-client'

export const metadata = {
    title: 'Deep Link Builder',
    description: 'Build slack://, obsidian://, zoommtg://, notion:// and figma:// deep links from a form, and get an https version for tools that strip custom schemes.',
    alternates: { canonical: '/tools/deep-link-builder' },
    openGraph: {
        title: 'Deep Link Builder | LinkOpen',
        description: 'Build Slack, Obsidian, Zoom, Notion and Figma deep links from a form.',
        url: 'https://linkopen.app/tools/deep-link-builder',
        images: ['/preview.png?v=2'],
    },
}

const FAQ_ITEMS = [
    {
        q: 'Where do I find my Slack team and channel IDs?',
        a: 'Open Slack in a browser. The address looks like app.slack.com/client/T0123ABCD/C0456EFGH: the part starting with T is the team ID and the part starting with C is the channel. In the desktop app, open the channel details; the channel ID is at the bottom of the About tab.',
    },
    {
        q: 'How do I get a Notion page ID?',
        a: 'Copy the page link (Share › Copy link, or the browser address). The ID is the 32 hex characters at the end, after the page title. You can paste the whole URL into the builder and it will pull the ID out.',
    },
    {
        q: 'Can I link to a heading inside an Obsidian note?',
        a: 'Yes. The heading goes inside the file value with a #, encoded as %23: obsidian://open?vault=Notes&file=Roadmap%23Q3. Don’t tack the # onto the end of the whole URL; it has to be part of file. The builder handles the encoding when you fill in the Heading field.',
    },
]

const FORMATS = [
    { app: 'Slack', format: 'slack://channel?team={TEAM_ID}&id={CHANNEL_ID}', notes: 'slack://user and slack://file use the same pattern. There’s no app-scheme link to a single message.' },
    { app: 'Obsidian', format: 'obsidian://open?vault={vault}&file={path}', notes: 'URL-encode both values. Heading: file=Note%23Heading.' },
    { app: 'Zoom', format: 'zoommtg://zoom.us/join?action=join&confno={meeting_id}', notes: 'Add &pwd={passcode} to skip the passcode prompt.' },
    { app: 'Notion', format: 'notion://www.notion.so/{page_id}', notes: 'The 32-character ID from the end of the page URL.' },
    { app: 'Figma', format: 'figma://file/{file_key}', notes: 'Add ?node-id={id} to open at a frame.' },
    { app: 'VS Code', format: 'vscode://file/{path}:{line}:{column}', notes: 'Line and column are optional.' },
]

export default function DeepLinkBuilderPage() {
    const webAppLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Deep Link Builder',
        url: 'https://linkopen.app/tools/deep-link-builder',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: metadata.description,
    }

    return (
        <ToolShell
            slug="deep-link-builder"
            eyebrow="Builder"
            title="Deep Link Builder"
            intro="Fill in a couple of IDs and get a working deep link for Slack, Obsidian, Zoom, Notion or Figma. You also get an https version to paste into tools that strip custom schemes."
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
            />

            <section className="py-10">
                <BuilderClient />
                <p className="text-zinc-500 text-xs leading-relaxed mt-4 max-w-[60ch]">
                    Not sure where the link will end up? The <a href="/tools/url-compatibility-checker" className="text-emerald-500 hover:text-emerald-400">compatibility checker</a> shows which apps keep custom-scheme links and which don’t.
                </p>
            </section>

            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    Formats
                </h2>
                <p className="text-zinc-500 text-sm mb-6 max-w-[60ch]">
                    If you’d rather write the link by hand. More apps are in the <a href="/tools/url-scheme-registry" className="text-emerald-500 hover:text-emerald-400">URL scheme list</a>.
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
                            {FORMATS.map(row => (
                                <tr key={row.app} className="border-b border-zinc-900 align-top">
                                    <td className="p-3 text-white">{row.app}</td>
                                    <td className="p-3 text-emerald-500 break-all">{row.format}</td>
                                    <td className="p-3 text-zinc-500 font-sans hidden md:table-cell">{row.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <Faq items={FAQ_ITEMS} />
        </ToolShell>
    )
}
