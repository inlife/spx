import ToolShell from 'components/tools/tool-shell'
import Faq from 'components/tools/faq'
import MarkdownClient from 'components/tools/markdown-client'

export const metadata = {
    title: 'Markdown Link Generator',
    description: 'Turn a URL and label into Markdown, Slack mrkdwn, HTML and reStructuredText links. Custom-scheme URLs can be swapped for an https version.',
    alternates: { canonical: '/tools/markdown-link-generator' },
    openGraph: {
        title: 'Markdown Link Generator | LinkOpen',
        description: 'One URL and label in, Markdown, Slack, HTML and reStructuredText links out.',
        url: 'https://linkopen.app/tools/markdown-link-generator',
        images: ['/preview.png?v=2'],
    },
}

const FAQ_ITEMS = [
    {
        q: 'How do I add a link in Notion?',
        a: 'Select the text, press Cmd+K (Ctrl+K on Windows) and paste the URL. Pasting a URL while text is selected does the same thing, and pasting Markdown like [label](url) works too. Notion drops links whose scheme isn’t http, https, mailto or tel.',
    },
    {
        q: 'How do I put a link on text in a Slack message?',
        a: 'In the message box, select the text, press Cmd+Shift+U (Ctrl+Shift+U on Windows) or click the link button, then paste the URL. The <url|label> format only applies to messages that apps and bots send through the Slack API.',
    },
    {
        q: 'Why does my link break when the URL has spaces?',
        a: 'In [label](url), a space ends the URL. Either encode spaces as %20 or wrap the target in angle brackets: [label](<My File.pdf>). The generator adds the angle brackets for you when it sees a space or a parenthesis.',
    },
]

const SYNTAX = [
    { surface: 'Markdown', syntax: '[Label](url)', notes: 'Notion, Obsidian, GitHub, GitLab, Bear, Logseq, most static site generators.' },
    { surface: 'Markdown, URL with spaces', syntax: '[Label](<url>)', notes: 'CommonMark lets you wrap the target in angle brackets.' },
    { surface: 'Markdown autolink', syntax: '<https://example.com>', notes: 'Shows the URL itself as the link text.' },
    { surface: 'Obsidian note link', syntax: '[[Note name|Label]]', notes: 'Only for notes inside the vault. Use regular Markdown for URLs.' },
    { surface: 'Slack mrkdwn', syntax: '<url|Label>', notes: 'API and Block Kit messages. Not typed into the message box.' },
    { surface: 'HTML', syntax: '<a href="url">Label</a>', notes: 'Escape & as &amp; inside href to be strict.' },
    { surface: 'reStructuredText', syntax: '`Label <url>`_', notes: 'Sphinx, Read the Docs.' },
    { surface: 'AsciiDoc', syntax: 'url[Label]', notes: 'No space between the URL and the brackets.' },
    { surface: 'BBCode', syntax: '[url=url]Label[/url]', notes: 'Older forum software.' },
]

export default function MarkdownLinkGeneratorPage() {
    const webAppLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Markdown Link Generator',
        url: 'https://linkopen.app/tools/markdown-link-generator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: metadata.description,
    }

    return (
        <ToolShell
            slug="markdown-link-generator"
            eyebrow="Formatter"
            title="Markdown Link Generator"
            intro="Type a URL and the text you want people to see. You get the link in each format, ready to copy."
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
            />

            <section className="py-10">
                <MarkdownClient />
                <p className="text-zinc-400 text-sm leading-relaxed mt-4 max-w-[60ch]">
                    Pasting a slack://, obsidian:// or zoommtg:// link? Correct syntax won’t help if the app drops the scheme. The <a href="/tools/url-compatibility-checker" className="text-emerald-500 hover:text-emerald-400">compatibility checker</a> shows which ones do.
                </p>
            </section>

            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
                    Link syntax by format
                </h2>
                <div className="overflow-x-auto border border-zinc-800">
                    <table className="w-full font-mono text-xs">
                        <thead>
                            <tr className="bg-zinc-900 text-zinc-400 uppercase tracking-widest text-[11px]">
                                <th className="text-left p-3 border-b border-zinc-800">Where</th>
                                <th className="text-left p-3 border-b border-zinc-800">Syntax</th>
                                <th className="text-left p-3 border-b border-zinc-800 hidden md:table-cell">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SYNTAX.map(row => (
                                <tr key={row.surface} className="border-b border-zinc-900 align-top">
                                    <td className="p-3 text-white">{row.surface}</td>
                                    <td className="p-3 text-emerald-500 break-all">{row.syntax}</td>
                                    <td className="p-3 text-zinc-400 font-sans hidden md:table-cell">{row.notes}</td>
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
