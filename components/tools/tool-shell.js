import Header from 'components/header'
import Footer from 'components/footer'

// Server component: renders the standard tool page chrome (header, breadcrumb,
// hero, related-tools footer, site footer). Each tool's page.js wraps its
// content in <ToolShell ...>.

const ALL_TOOLS = [
    { slug: 'url-compatibility-checker', name: 'URL Compatibility Checker', tagline: 'See which platforms render any URL' },
    { slug: 'deep-link-builder', name: 'Deep Link Builder', tagline: 'Generate slack://, obsidian://, zoom://, notion://, figma:// links' },
    { slug: 'markdown-link-generator', name: 'Markdown Link Generator', tagline: 'Format links for Notion, Obsidian, Slack, HTML' },
    { slug: 'url-scheme-registry', name: 'URL Scheme Registry', tagline: 'Reference of every app deep-link protocol' },
]

export default function ToolShell({ slug, eyebrow, title, intro, children }) {
    const others = ALL_TOOLS.filter(t => t.slug !== slug)

    return (
        <main className="min-h-[100dvh] flex flex-col">
            <Header />

            <div className="flex-1 max-w-5xl mx-auto w-full px-5">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="pt-8 sm:pt-10">
                    <ol className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        <li><a href="/" className="hover:text-emerald-500 transition-colors">Home</a></li>
                        <li className="text-zinc-700">/</li>
                        <li><a href="/tools/" className="hover:text-emerald-500 transition-colors">Tools</a></li>
                        <li className="text-zinc-700">/</li>
                        <li className="text-zinc-300">{title}</li>
                    </ol>
                </nav>

                {/* Hero */}
                <header className="pt-6 pb-10 border-b border-zinc-800">
                    {eyebrow && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-600 border border-emerald-800 px-2 py-0.5">
                            {eyebrow}
                        </span>
                    )}
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tighter leading-[0.95] font-bold text-white mt-4">
                        {title}
                    </h1>
                    {intro && (
                        <p className="text-zinc-400 leading-relaxed max-w-[60ch] mt-5">
                            {intro}
                        </p>
                    )}
                </header>

                {children}

                {/* Related tools */}
                <section className="border-t border-zinc-800 py-10 mt-12">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-5">
                        Related tools
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800">
                        {others.map(t => (
                            <a
                                key={t.slug}
                                href={`/tools/${t.slug}/`}
                                className="bg-zinc-950 p-5 hover:bg-zinc-900 transition-colors block"
                            >
                                <div className="text-white font-bold text-sm mb-1">{t.name}</div>
                                <p className="text-zinc-500 text-xs leading-relaxed">{t.tagline}</p>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Convert CTA */}
                <section className="border-t border-zinc-800 py-10">
                    <div className="bg-zinc-950 border border-emerald-900/40 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <div className="text-white font-bold text-base mb-1">Need to wrap a custom scheme URL?</div>
                            <p className="text-zinc-500 text-xs leading-relaxed max-w-[50ch]">
                                Use the main Shortlink converter to turn any slack://, obsidian://, zoom:// or notion:// URL into a universal HTTPS link.
                            </p>
                        </div>
                        <a
                            href="/"
                            className="bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-display font-bold py-3 px-6 text-sm tracking-wider uppercase transition-all whitespace-nowrap text-center"
                        >
                            Convert →
                        </a>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    )
}

export { ALL_TOOLS }
