import Header from 'components/header'
import Footer from 'components/footer'

export const metadata = {
    title: 'About',
    description: 'How LinkOpen turns slack://, obsidian:// and zoommtg:// links into https links that stay clickable, what it stores (nothing) and what the site tracks.',
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'About LinkOpen',
        description: 'How LinkOpen turns custom scheme links into https links that stay clickable.',
        url: 'https://linkopen.app/about',
    },
}

export default function AboutPage() {
    return (
        <main className="min-h-[100dvh] flex flex-col">
            <Header />

            <div className="flex-1 max-w-5xl mx-auto w-full px-5">
                <h1 className="text-4xl md:text-5xl tracking-tighter leading-none font-bold text-white pt-12 sm:pt-16 pb-8">
                    About
                </h1>

                {/* Intro */}
                <section className="border-t border-zinc-800 py-8">
                    <p className="text-zinc-300 leading-relaxed max-w-[55ch]">
                        Modern applications like <code className="font-mono text-sm text-zinc-300">Slack</code>, <code className="font-mono text-sm text-zinc-300">Obsidian</code>, <code className="font-mono text-sm text-zinc-300">Zoom</code>, <code className="font-mono text-sm text-zinc-300">Notion</code>, and <code className="font-mono text-sm text-zinc-300">Figma</code> use custom URL schemes for deep linking &mdash; URIs like <code className="font-mono text-sm text-zinc-300">slack://channel</code> or <code className="font-mono text-sm text-zinc-300">obsidian://open?vault=wiki</code> that open specific views inside desktop and mobile apps.
                    </p>
                    <p className="text-zinc-300 leading-relaxed max-w-[55ch] mt-4">
                        The problem: these links stop working the moment you paste them into a wiki, an email, or a chat on another platform. Those tools only make web links clickable, so the deep link shows up as plain text. LinkOpen converts it into a standard https link that those tools accept, and opening that link hands the original to the app.
                    </p>
                </section>

                {/* Why */}
                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">Why</h2>
                    <p className="text-zinc-300 leading-relaxed max-w-[55ch]">
                        Custom scheme URLs break in almost every cross-app context. LinkOpen exists because these workflows are common and currently painful:
                    </p>
                    <ul className="text-zinc-300 leading-relaxed max-w-[55ch] mt-4 space-y-3 list-disc list-inside">
                        <li>
                            Documentation teams embedding <code className="font-mono text-sm text-zinc-300">slack://</code> channel links inside Notion wikis or Confluence pages, only to find they render as plain text.
                        </li>
                        <li>
                            Obsidian users sharing <code className="font-mono text-sm text-zinc-300">obsidian://</code> vault links in team chats where the protocol is stripped or blocked by IT policy.
                        </li>
                        <li>
                            Zoom meeting links using <code className="font-mono text-sm text-zinc-300">zoommtg://</code> pasted into project management tools like Linear, Jira, or Asana that refuse to parse non-HTTP schemes.
                        </li>
                        <li>
                            Any cross-app workflow where a deep link needs to survive being pasted into a medium that only understands HTTPS.
                        </li>
                    </ul>
                </section>

                {/* How */}
                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">How</h2>
                    <ol className="font-mono text-sm text-zinc-400 space-y-1">
                        <li>1. Paste your custom scheme URL</li>
                        <li>2. Choose auto-redirect or manual mode</li>
                        <li>3. Copy the https link</li>
                    </ol>
                    <p className="text-zinc-300 leading-relaxed max-w-[55ch] mt-4">
                        Under the hood, LinkOpen uses LZ-based compression with dictionary substitution to encode your original URL directly into the https link path. There is no database, no server storage, and no lookup table. The entire payload lives in the URL itself, and the page you land on decodes it and passes it to the app. This means links never expire and don&rsquo;t depend on a database staying online.
                    </p>
                </section>

                {/* Use Cases */}
                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">Use Cases</h2>
                    <ul className="text-zinc-300 leading-relaxed max-w-[55ch] space-y-3 list-disc list-inside">
                        <li>
                            <span className="text-zinc-300 font-medium">Internal documentation</span> &mdash; Embed deep links in Notion, Confluence, or Google Docs without them breaking.
                        </li>
                        <li>
                            <span className="text-zinc-300 font-medium">Knowledge management</span> &mdash; Share Obsidian vault links and Roam Research graph links with teammates who use different tools.
                        </li>
                        <li>
                            <span className="text-zinc-300 font-medium">Team communication</span> &mdash; Slack deep links and Zoom meeting links that survive being pasted into any chat or email client.
                        </li>
                        <li>
                            <span className="text-zinc-300 font-medium">Developer workflows</span> &mdash; Custom protocol handlers, IDE deep links, and local dev-server URLs wrapped in a shareable HTTPS link.
                        </li>
                    </ul>
                </section>

                {/* Privacy */}
                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">Privacy</h2>
                    <p className="text-zinc-300 leading-relaxed max-w-[55ch]">
                        LinkOpen doesn&rsquo;t store links. There is no database, no server-side storage and no user accounts: your URL is compressed into the link itself, and the page you land on decodes it.
                    </p>
                    <p className="text-zinc-300 leading-relaxed max-w-[55ch] mt-4">
                        The site does use analytics, but never on the link itself. Shared-link pages don&rsquo;t load Google Analytics, and Vercel Analytics records them with the link replaced by the app it opens, for example /s/obsidian. The rest of the site uses both; Google Analytics sets cookies to count visits. The code is open source, so you can check all of this yourself.
                    </p>
                </section>

                {/* Name */}
                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">Name</h2>
                    <p className="text-zinc-300 leading-relaxed max-w-[55ch]">
                        LinkOpen used to be called Shortlink, at shortlink.studio. Links made there still work: shortlink.studio forwards every one of them here. The code lives in the <code className="font-mono text-sm text-zinc-300">spx</code> repository, after the project&rsquo;s first name, scheme proxy.
                    </p>
                </section>

                {/* Stack */}
                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">Stack</h2>
                    <p className="font-mono text-sm text-zinc-400">
                        Next.js 15 / React 19 / Tailwind CSS / Vercel
                    </p>
                </section>

                {/* Source */}
                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">Source</h2>
                    <a
                        href="https://github.com/inlife/spx"
                        target="_blank"
                        className="font-mono text-sm text-emerald-500 hover:text-emerald-400 transition-colors"
                    >
                        github.com/inlife/spx
                    </a>
                </section>
            </div>

            <Footer />
        </main>
    )
}
