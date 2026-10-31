import Header from 'components/header'
import Footer from 'components/footer'
import { ALL_TOOLS } from 'components/tools/tool-shell'

export const metadata = {
    title: 'Tools',
    description: 'Small tools for working with deep links: check where a link will break, build Slack or Obsidian links, format links for Markdown, and look up app URL schemes.',
    alternates: {
        canonical: '/tools',
    },
    openGraph: {
        title: 'Tools | LinkOpen',
        description: 'Small tools for working with deep links and custom URL schemes.',
        url: 'https://linkopen.app/tools',
        images: ['/preview.png?v=2'],
    },
}

export default function ToolsIndex() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'LinkOpen Tools',
        url: 'https://linkopen.app/tools',
        description: metadata.description,
        hasPart: ALL_TOOLS.map(t => ({
            '@type': 'WebApplication',
            name: t.name,
            url: `https://linkopen.app/tools/${t.slug}`,
            description: t.tagline,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        })),
    }

    return (
        <main className="min-h-[100dvh] flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />

            <div className="flex-1 max-w-5xl mx-auto w-full px-5">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="pt-8 sm:pt-10">
                    <ol className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        <li><a href="/" className="hover:text-emerald-500 transition-colors">Home</a></li>
                        <li className="text-zinc-700">/</li>
                        <li className="text-zinc-300">Tools</li>
                    </ol>
                </nav>

                <header className="pt-6 pb-10 border-b border-zinc-800">
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tighter leading-[0.95] font-bold text-white">
                        Tools
                    </h1>
                    <p className="text-zinc-400 leading-relaxed max-w-[60ch] mt-5">
                        Small helpers for deep links, the slack:// and obsidian:// kind. Everything runs in your browser, and nothing you type is sent to a server.
                    </p>
                </header>

                <section className="py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800">
                        {ALL_TOOLS.map(t => (
                            <a
                                key={t.slug}
                                href={`/tools/${t.slug}`}
                                className="bg-zinc-950 p-6 sm:p-8 hover:bg-zinc-900 transition-colors block group"
                            >
                                <div className="font-display text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                    {t.name}
                                </div>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    {t.tagline}
                                </p>
                                <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-emerald-600">
                                    Open tool →
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    )
}
