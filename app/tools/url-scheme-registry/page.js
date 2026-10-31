import ToolShell from 'components/tools/tool-shell'
import Faq from 'components/tools/faq'
import RegistryClient from 'components/tools/registry-client'
import { URL_SCHEMES } from 'utils/data/url-schemes'

export const metadata = {
    title: 'URL Scheme List',
    description: 'Deep link formats for Slack, Obsidian, Zoom, Notion, VS Code, Teams and other apps, with an example for each and links to the official docs.',
    alternates: { canonical: '/tools/url-scheme-registry' },
    openGraph: {
        title: 'URL Scheme List | LinkOpen',
        description: 'Deep link formats for common apps, with examples and links to the official docs.',
        url: 'https://linkopen.app/tools/url-scheme-registry',
        images: ['/preview.png?v=2'],
    },
}

const FAQ_ITEMS = [
    {
        q: 'How do I find an app’s URL scheme?',
        a: 'Start with the app’s developer docs. If there aren’t any, on macOS the schemes are listed in the app bundle: run /usr/libexec/PlistBuddy -c "Print :CFBundleURLTypes" /Applications/Slack.app/Contents/Info.plist (swap in the app you care about). On Windows, look under HKEY_CLASSES_ROOT for a key named after the scheme that has a "URL Protocol" value.',
    },
    {
        q: 'Why does a link work on my laptop but not on my phone?',
        a: 'The link only works where the app is installed and has registered the scheme. Mobile versions often register a different scheme, or none. Some desktop-only formats, such as vscode://file paths, mean nothing on a phone.',
    },
    {
        q: 'Can a web page open these links?',
        a: 'Yes. When you click one, the browser asks the operating system which app handles the scheme, and most browsers show a confirmation prompt first. Links usually fail earlier than that: the site you pasted the link into removes it before anyone can click.',
    },
]

export default function UrlSchemeRegistryPage() {
    const webAppLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'URL Scheme List',
        url: 'https://linkopen.app/tools/url-scheme-registry',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: metadata.description,
    }

    return (
        <ToolShell
            slug="url-scheme-registry"
            eyebrow="Reference"
            title="URL Scheme List"
            intro="Deep link formats for apps people link to from notes, docs and chat. Each row has an example you can copy and adapt, plus a link to the app’s own docs where there is one."
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
            />

            <section className="py-10">
                <RegistryClient schemes={URL_SCHEMES} />
                <p className="text-zinc-500 text-xs leading-relaxed mt-4 max-w-[60ch]">
                    Missing an app, or found an example that doesn’t work? <a href="/contact" className="text-emerald-500 hover:text-emerald-400">Tell us</a> and we’ll fix the list.
                </p>
            </section>

            <section className="border-t border-zinc-800 py-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    How the operating system knows which app to open
                </h2>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch] mb-4">
                    The scheme is the part before the colon. Browsers handle <code className="font-mono text-sm text-zinc-300">https</code> themselves. For anything else they ask the operating system, and the OS looks up which installed app claimed that scheme.
                </p>
                <p className="text-zinc-400 leading-relaxed max-w-[60ch]">
                    Apps claim a scheme when they’re installed. On macOS and iOS it’s listed under <code className="font-mono text-sm text-zinc-300">CFBundleURLTypes</code> in the app’s <code className="font-mono text-sm text-zinc-300">Info.plist</code>. On Windows it’s a registry key under <code className="font-mono text-sm text-zinc-300">HKEY_CLASSES_ROOT</code>. On Android it’s an intent filter in the manifest, and on Linux it’s an <code className="font-mono text-sm text-zinc-300">x-scheme-handler/…</code> entry in the app’s <code className="font-mono text-sm text-zinc-300">.desktop</code> file.
                </p>
            </section>

            <Faq items={FAQ_ITEMS} />
        </ToolShell>
    )
}
