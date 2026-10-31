import ToolShell from 'components/tools/tool-shell'
import Faq from 'components/tools/faq'
import BadgeClient from 'components/tools/badge-client'
import { BADGES, badgeAlt, badgeById, badgeImageUrl, buildBadgeLink, badgeMarkdown } from 'utils/readme-badge'

export const metadata = {
    title: 'README Badge Maker',
    description: 'Make an Open in VS Code, Obsidian or Slack badge for a GitHub README. The badge links through https, so GitHub keeps the link to the app.',
    alternates: { canonical: '/tools/readme-badge' },
    openGraph: {
        title: 'README Badge Maker | LinkOpen',
        description: 'Open in VS Code, Obsidian or Slack badges for GitHub READMEs, linked through https.',
        url: 'https://linkopen.app/tools/readme-badge',
        images: ['/preview.png?v=2'],
    },
}

const FAQ_ITEMS = [
    {
        q: 'What happens when someone clicks the badge?',
        a: 'Their browser opens a page on linkopen.app, which passes the original link to the app. Most browsers ask before they open an app. If the app isn’t installed, nothing opens, and the page shows the original link with a note that the app may be missing.',
    },
    {
        q: 'Can I change where a badge points after I publish it?',
        a: 'Not in place. The app link is stored inside the badge’s address, not in a database, so there’s nothing to edit. Make a new badge and replace the snippet in your README.',
    },
    {
        q: 'Can I use my own badge image?',
        a: 'Yes. The link makes the button work, not the image. Copy the “Link only” output and put any image in front of it: [![Open in my app](https://example.com/badge.svg)](https://linkopen.app/…)',
    },
]

const EXAMPLE_URL = 'vscode://vscode.git/clone?url=https%3A%2F%2Fgithub.com%2Finlife%2Fspx'

const h2 = 'font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4'
const code = 'font-mono text-emerald-500'

export default function ReadmeBadgePage() {
    const webAppLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'README Badge Maker',
        url: 'https://linkopen.app/tools/readme-badge',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: metadata.description,
    }

    const example = badgeMarkdown(buildBadgeLink(EXAMPLE_URL).link, badgeById('vscode'))

    return (
        <ToolShell
            slug="readme-badge"
            eyebrow="Badges"
            title="README Badge Maker"
            intro="Paste an app link, like vscode:// or obsidian://, and get an “Open in …” badge for your README. GitHub removes those links from Markdown. The badge goes through an https link instead, which GitHub keeps."
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
            />

            <section className="py-10">
                <BadgeClient />
                <p className="text-zinc-500 text-xs leading-relaxed mt-4 max-w-[60ch]">
                    Need to write the app link first? The <a href="/tools/deep-link-builder" className="text-emerald-500 hover:text-emerald-400">deep link builder</a> makes Slack, Obsidian, Zoom, Notion and Figma links, and the <a href="/tools/url-scheme-registry" className="text-emerald-500 hover:text-emerald-400">URL scheme list</a> has formats for more apps.
                </p>
            </section>

            <section className="border-t border-zinc-800 py-10">
                <h2 className={h2}>Why README buttons break</h2>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed max-w-[65ch]">
                    <p>
                        When GitHub renders Markdown, it keeps link targets that start with <code className={code}>http</code>, <code className={code}>https</code> or <code className={code}>mailto</code>. It removes targets with app schemes such as <code className={code}>vscode://</code>, <code className={code}>obsidian://</code> or <code className={code}>slack://</code>.
                    </p>
                    <p>
                        So a badge written as <code className={`${code} break-all`}>[![Open in VS Code](badge.svg)](vscode://…)</code> still shows the image, but clicking it doesn’t open VS Code. Point the badge at an https link that opens the app link, and GitHub leaves it alone.
                    </p>
                </div>
            </section>

            <section className="border-t border-zinc-800 py-10">
                <h2 className={h2}>How it works</h2>
                <ol className="space-y-3 text-zinc-400 text-sm leading-relaxed max-w-[65ch] list-decimal pl-5 marker:text-emerald-600 marker:font-mono">
                    <li>
                        Paste the app link. The badge is picked from its scheme: <code className={code}>vscode://</code> gets “Open in VS Code”, and a scheme without its own badge gets “Open in app”. You can pick a different one.
                    </li>
                    <li>
                        Copy the Markdown or HTML into your README.
                    </li>
                    <li>
                        The badge links to linkopen.app. The app link is compressed into that address, so nothing is stored on a server. Clicking it opens a short page that passes the link on to the app.
                    </li>
                </ol>
                <p className="text-zinc-500 text-xs leading-relaxed mt-4 max-w-[65ch]">
                    Links to websites (http and https) open a page that asks people to confirm instead of redirecting straight away. GitHub keeps those links anyway, so you can use them in a README directly.
                </p>
                <div className="border border-zinc-800 bg-zinc-950 p-5 mt-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-3">
                        Example: clone this repository in VS Code
                    </span>
                    <code className="block font-mono text-xs text-emerald-500 break-all whitespace-pre-wrap">{example}</code>
                </div>
            </section>

            <section className="border-t border-zinc-800 py-10">
                <h2 className={h2}>Badges</h2>
                <p className="text-zinc-500 text-sm mb-6 max-w-[60ch]">
                    Each one is a static SVG, 20px tall, in the flat style shields.io uses, so it lines up with other README badges. Text only, no logos.
                </p>
                <div className="overflow-x-auto border border-zinc-800">
                    <table className="w-full font-mono text-xs">
                        <thead>
                            <tr className="bg-zinc-900 text-zinc-400 uppercase tracking-widest text-[10px]">
                                <th className="text-left p-3 border-b border-zinc-800">Badge</th>
                                <th className="text-left p-3 border-b border-zinc-800">Image URL</th>
                                <th className="text-left p-3 border-b border-zinc-800 hidden md:table-cell">Picked for</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BADGES.map(b => (
                                <tr key={b.id} className="border-b border-zinc-900 align-middle">
                                    <td className="p-3">
                                        <img src={`/badge/${b.id}.svg`} alt={badgeAlt(b)} height="20" className="block h-5 w-auto max-w-none" />
                                    </td>
                                    <td className="p-3 text-emerald-500 break-all">{badgeImageUrl(b)}</td>
                                    <td className="p-3 text-zinc-500 hidden md:table-cell">
                                        {b.schemes.length > 0 ? b.schemes.map(s => `${s}:`).join(', ') : 'any other scheme'}
                                    </td>
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
