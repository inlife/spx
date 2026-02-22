import Header from 'components/header'
import Footer from 'components/footer'

export default function AboutPage() {
    return (
        <main className="min-h-[100dvh] flex flex-col">
            <Header />

            <div className="flex-1 max-w-2xl mx-auto w-full px-5">
                <h1 className="text-4xl md:text-5xl tracking-tighter leading-none font-bold text-white pt-12 sm:pt-16 pb-8">
                    About
                </h1>

                <section className="border-t border-zinc-800 py-8">
                    <p className="text-zinc-400 leading-relaxed max-w-[55ch]">
                        Shortlink converts custom scheme URLs into universal web links. Paste a <code className="font-mono text-zinc-300 text-sm">slack://</code> or <code className="font-mono text-zinc-300 text-sm">obsidian://</code> link, get back a standard HTTPS link that works in Notion, Obsidian, email, and everywhere else.
                    </p>
                </section>

                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">Why</h2>
                    <p className="text-zinc-400 leading-relaxed max-w-[55ch]">
                        Modern apps use custom URL schemes for deep linking. These break when embedded in web apps, documentation, or shared content. Shortlink bridges this gap.
                    </p>
                </section>

                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">How</h2>
                    <ol className="font-mono text-sm text-zinc-400 space-y-1">
                        <li>1. Paste your custom scheme URL</li>
                        <li>2. Choose auto-redirect or manual mode</li>
                        <li>3. Copy the universal link</li>
                    </ol>
                </section>

                <section className="border-t border-zinc-800 py-8">
                    <h2 className="text-lg font-bold text-white mb-3">Stack</h2>
                    <p className="font-mono text-sm text-zinc-500">
                        Next.js 15 / React 19 / Tailwind CSS / Vercel
                    </p>
                </section>

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
