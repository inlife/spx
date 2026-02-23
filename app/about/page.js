import Header from 'components/header'
import Footer from 'components/footer'

export const metadata = {
    title: 'About',
    description: 'Learn how Shortlink converts custom scheme URLs like slack://, obsidian://, and zoom:// into universal HTTPS links. Open source, stateless, no database.',
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'About Shortlink',
        description: 'Learn how Shortlink converts custom scheme URLs into universal HTTPS links.',
        url: 'https://www.shortlink.studio/about',
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
                    <p className="text-zinc-400 leading-relaxed max-w-[55ch]">
                        Modern applications like <code className="font-mono text-sm text-zinc-300">Slack</code>, <code className="font-mono text-sm text-zinc-300">Obsidian</code>, <code className="font-mono text-sm text-zinc-300">Zoom</code>, <code className="font-mono text-sm text-zinc-300">Notion</code>, and <code className="font-mono text-sm text-zinc-300">Figma</code> use custom URL schemes for deep linking &mdash; URIs like <code className="font-mono text-sm text-zinc-300">slack://channel</code> or <code className="font-mono text-sm text-zinc-300">obsidian://open?vault=wiki</code> that open specific views inside desktop and mobile apps.
                    </p>
                    <p className="text-zinc-400 leading-relaxed max-w-[55ch] mt-4">
                        The problem: these links break the moment you paste them into a web page, a wiki, an email, or a chat message on a different platform. Browsers don&rsquo;t know how to handle them, firewalls strip them, and Markdown renderers refuse to turn them into clickable links. Shortlink fixes this by converting any custom scheme URL into a standard HTTPS link that works everywhere.
                    </p>
                </section>

                {/* Why */}
                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">Why</h2>
                    <p className="text-zinc-400 leading-relaxed max-w-[55ch]">
                        Custom scheme URLs break in almost every cross-app context. Shortlink exists because these workflows are common and currently painful:
                    </p>
                    <ul className="text-zinc-400 leading-relaxed max-w-[55ch] mt-4 space-y-3 list-disc list-inside">
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
                        <li>3. Copy the universal link</li>
                    </ol>
                    <p className="text-zinc-400 leading-relaxed max-w-[55ch] mt-4">
                        Under the hood, Shortlink uses stateless LZ-based compression with dictionary substitution to encode your original URL directly into the HTTPS link path. There is no database, no server storage, and no lookup table. The entire payload lives in the URL itself, decoded and redirected fully client-side. This means links never expire, never hit a rate limit, and never depend on a third-party service staying online.
                    </p>
                </section>

                {/* Use Cases */}
                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">Use Cases</h2>
                    <ul className="text-zinc-400 leading-relaxed max-w-[55ch] space-y-3 list-disc list-inside">
                        <li>
                            <span className="text-zinc-300 font-medium">Internal documentation</span> &mdash; Embed deep links in Notion, Confluence, or Google Docs without them breaking.
                        </li>
                        <li>
                            <span className="text-zinc-300 font-medium">Knowledge management</span> &mdash; Share Obsidian and Roam Research vault links with teammates who use different tools.
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
                    <p className="text-zinc-400 leading-relaxed max-w-[55ch]">
                        Shortlink is fully stateless. There is no database, no server-side storage, and no analytics tracking on generated links. Your original URL is encoded directly into the link itself using client-side compression &mdash; the server never sees, logs, or stores the target address.
                    </p>
                    <p className="text-zinc-400 leading-relaxed max-w-[55ch] mt-4">
                        No cookies, no telemetry, no user accounts. The entire codebase is open source, so you can verify every claim by reading the code yourself.
                    </p>
                </section>

                {/* Stack */}
                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">Stack</h2>
                    <p className="font-mono text-sm text-zinc-500">
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
