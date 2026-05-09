import ToolShell from 'components/tools/tool-shell'
import Faq from 'components/tools/faq'
import GeoGrid from 'components/tools/geo-grid'
import RegistryClient from 'components/tools/registry-client'
import { URL_SCHEMES } from 'utils/data/url-schemes'

export const metadata = {
    title: 'URL Scheme Registry',
    description: 'Searchable registry of every app deep link URL scheme — Slack, Obsidian, Zoom, Notion, Figma, VS Code and 40+ more. Free reference for developers and PMs.',
    alternates: { canonical: '/tools/url-scheme-registry' },
    openGraph: {
        title: 'URL Scheme Registry — Shortlink',
        description: 'Searchable reference for every app URL scheme.',
        url: 'https://www.shortlink.studio/tools/url-scheme-registry',
        images: ['/preview.png'],
    },
}

const FAQ_ITEMS = [
    {
        q: 'What is a URL scheme?',
        a: 'A URL scheme is the protocol prefix at the start of a URL, like https:// or slack://. Apps register custom schemes with the operating system so that links using their scheme open the app directly. Examples include obsidian://, zoom://, notion://, and vscode://.',
    },
    {
        q: 'How do I find an app’s custom URL scheme?',
        a: 'Most apps publish their URL scheme in their developer documentation. On macOS you can also inspect an app’s Info.plist file under CFBundleURLSchemes. On iOS the same key is in the bundle. The Shortlink registry above documents the schemes for 50+ popular apps.',
    },
    {
        q: 'What is the Slack URL scheme?',
        a: 'Slack uses the slack:// scheme. Common formats include slack://channel?team=T0001&id=C0001 to open a channel and slack://user?team=T0001&id=U0001 to open a DM. These links work on macOS, Windows, iOS, and Android Slack clients.',
    },
    {
        q: 'What is the zoom:// protocol?',
        a: 'Zoom registers two schemes: zoommtg:// (used by the legacy desktop client) and zoomus:// (used by newer clients). The most common format is zoommtg://zoom.us/join?confno=123456789 to join a meeting by ID.',
    },
    {
        q: 'How do I open VS Code from a browser link?',
        a: 'Use the vscode:// scheme. Examples: vscode://file/path/to/file.js to open a specific file, vscode://settings to open settings, or vscode://vscode.git/clone?url=https://github.com/user/repo to clone a repository.',
    },
    {
        q: 'Why don’t custom URL schemes work in browsers?',
        a: 'Browsers can launch custom schemes via the OS handler, but most websites strip non-HTTP(S) URLs from rendered content for security. Pasting slack:// or obsidian:// into Notion, Confluence, or an email body usually results in plain text, not a clickable link. Wrapping the scheme in an HTTPS URL with Shortlink solves this.',
    },
]

export default function UrlSchemeRegistryPage() {
    const wrappable = URL_SCHEMES.filter(s => s.wraps).length

    const webAppLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'URL Scheme Registry',
        url: 'https://www.shortlink.studio/tools/url-scheme-registry/',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: metadata.description,
        featureList: [
            'Searchable reference for 50+ app URL schemes',
            'Per-app example deep link URL',
            'Platform support details (macOS, Windows, Linux, iOS, Android)',
            'Indicates which schemes Shortlink can wrap into HTTPS',
        ],
    }

    return (
        <ToolShell
            slug="url-scheme-registry"
            eyebrow="Reference"
            title="URL Scheme Registry"
            intro={`A searchable reference for every app URL scheme — ${URL_SCHEMES.length} entries covering productivity, dev, and communication tools. Use this to look up the exact deep-link format an app expects, or to confirm whether a scheme exists at all.`}
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
            />

            {/* Searchable client table */}
            <section className="py-10">
                <RegistryClient schemes={URL_SCHEMES} />
            </section>

            {/* Static fallback table — duplicates the data for crawlers regardless of JS */}
            <section className="border-t border-zinc-800 py-10" aria-hidden="false">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    Full URL scheme reference
                </h2>
                <p className="text-zinc-500 text-sm mb-6 max-w-[60ch]">
                    The complete list, also indexable without JavaScript. {wrappable} of {URL_SCHEMES.length} schemes can be wrapped into a universal HTTPS link via Shortlink.
                </p>
                <div className="overflow-x-auto border border-zinc-800">
                    <table className="w-full font-mono text-xs">
                        <thead>
                            <tr className="bg-zinc-900 text-zinc-400 uppercase tracking-widest text-[10px]">
                                <th className="text-left p-3 border-b border-zinc-800">App</th>
                                <th className="text-left p-3 border-b border-zinc-800">Scheme</th>
                                <th className="text-left p-3 border-b border-zinc-800 hidden md:table-cell">Example</th>
                                <th className="text-left p-3 border-b border-zinc-800 hidden lg:table-cell">Platforms</th>
                                <th className="text-left p-3 border-b border-zinc-800">Wraps?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {URL_SCHEMES.map(s => (
                                <tr key={'static-' + s.app + s.scheme} className="border-b border-zinc-900">
                                    <td className="p-3 text-white">{s.app}</td>
                                    <td className="p-3 text-emerald-500">{s.scheme}</td>
                                    <td className="p-3 text-zinc-500 hidden md:table-cell truncate max-w-[280px]">{s.example}</td>
                                    <td className="p-3 text-zinc-500 hidden lg:table-cell">{s.platforms.join(', ')}</td>
                                    <td className="p-3">{s.wraps ? <span className="text-emerald-500">Yes</span> : <span className="text-zinc-600">No</span>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Explainer sections */}
            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    What is a URL scheme?
                </h2>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch] mb-4">
                    A URL scheme is the protocol identifier at the start of a URL &mdash; the part before the colon. Standard schemes like <code className="font-mono text-sm text-zinc-300">https</code>, <code className="font-mono text-sm text-zinc-300">http</code>, <code className="font-mono text-sm text-zinc-300">mailto</code>, and <code className="font-mono text-sm text-zinc-300">tel</code> are recognized by every browser and platform.
                </p>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch]">
                    Custom URL schemes like <code className="font-mono text-sm text-zinc-300">slack://</code> or <code className="font-mono text-sm text-zinc-300">obsidian://</code> are registered by individual applications. When the operating system sees one of these schemes in a clicked link, it hands the URL to the app that registered it. This is how apps implement deep links into specific channels, vaults, files, or meetings.
                </p>
            </section>

            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    How apps register custom URL schemes
                </h2>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch] mb-4">
                    On macOS and iOS, apps declare their schemes in <code className="font-mono text-sm text-zinc-300">Info.plist</code> under <code className="font-mono text-sm text-zinc-300">CFBundleURLTypes</code>. On Windows the registration lives in the Registry under <code className="font-mono text-sm text-zinc-300">HKEY_CLASSES_ROOT</code>. On Android, apps declare intent filters in their manifest with a custom scheme.
                </p>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch]">
                    Once registered, clicking a link with that scheme prompts the OS to launch the app and pass it the full URL. The app then parses the URL’s host, path, and query parameters to decide what to open.
                </p>
            </section>

            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    Browser vs OS: who handles custom schemes?
                </h2>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch] mb-4">
                    The browser is the messenger; the OS is the dispatcher. When you click a custom-scheme link, the browser doesn’t try to fetch it &mdash; it asks the OS which app handles that scheme. The OS launches the app and passes it the URL.
                </p>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch]">
                    Problems arise when content platforms (Notion, Confluence, Gmail, GitHub) sanitize or strip non-HTTPS links before rendering. Even though the browser would correctly hand off the URL to the OS, these platforms never let the link reach the browser as a clickable element. Wrapping the scheme in an HTTPS link via <a href="/" className="text-emerald-500 hover:text-emerald-400">Shortlink</a> works around this.
                </p>
            </section>

            <GeoGrid heading="Where these schemes get used" />

            <Faq items={FAQ_ITEMS} />
        </ToolShell>
    )
}
