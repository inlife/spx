import Header from 'components/header'
import Footer from 'components/footer'

export const metadata = {
    title: 'How to Share Obsidian Links',
    description: 'Copy an obsidian:// link to a note, link to a heading or block, and make the link clickable in Notion, Slack, GitHub or email.',
    alternates: { canonical: '/obsidian-links' },
    openGraph: {
        title: 'How to Share Obsidian Links | LinkOpen',
        description: 'Copy an obsidian:// link to a note and make it clickable in Notion, Slack, GitHub or email.',
        url: 'https://linkopen.app/obsidian-links',
        images: ['/preview.png?v=2'],
    },
}

const code = 'font-mono text-sm text-zinc-300'

export default function ObsidianLinksPage() {
    return (
        <main className="min-h-[100dvh] flex flex-col">
            <Header />

            <div className="flex-1 max-w-5xl mx-auto w-full px-5">
                <nav aria-label="Breadcrumb" className="pt-8 sm:pt-10">
                    <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-400">
                        <li><a href="/" className="hover:text-emerald-500 transition-colors">Home</a></li>
                        <li className="text-zinc-600" aria-hidden="true">/</li>
                        <li className="text-zinc-300">Obsidian links</li>
                    </ol>
                </nav>

                <header className="pt-6 pb-10 border-b border-zinc-800">
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tighter leading-[0.95] font-bold text-white">
                        Sharing Obsidian links
                    </h1>
                    <p className="text-zinc-300 leading-relaxed max-w-[60ch] mt-5">
                        An <code className={code}>obsidian://</code> link opens a specific note in a vault. Inside Obsidian it just works. Paste it into Notion, Slack, Gmail or a GitHub README, though, and it turns into plain text, because those tools only make web links clickable.
                    </p>
                </header>

                <section className="py-10">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                        Copy the link to a note
                    </h2>
                    <p className="text-zinc-300 leading-relaxed max-w-[60ch] mb-4">Obsidian builds the link for you. Any of these works:</p>
                    <ul className="text-zinc-300 leading-relaxed max-w-[60ch] space-y-2 list-disc list-inside mb-4">
                        <li>Command palette: <span className="text-zinc-300">Copy Obsidian URL for current file</span>.</li>
                        <li>In the note, open <span className="text-zinc-300">More options</span> and choose <span className="text-zinc-300">Copy path › as Obsidian URL</span>.</li>
                        <li>On desktop, right-click the note in the file explorer and choose <span className="text-zinc-300">Copy path › as Obsidian URL</span>.</li>
                    </ul>
                    <p className="text-zinc-300 leading-relaxed max-w-[60ch]">
                        You get something like <code className={code}>obsidian://open?vault=Notes&amp;file=Projects%2FRoadmap</code>. Spaces become <code className={code}>%20</code> and slashes become <code className={code}>%2F</code>. If you edit the link by hand, keep that encoding or Obsidian may not find the note.
                    </p>
                </section>

                <section className="border-t border-zinc-800 py-10">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                        Link to a heading or block
                    </h2>
                    <p className="text-zinc-300 leading-relaxed max-w-[60ch] mb-4">
                        Add the heading to the end of the <code className={code}>file</code> value, after an encoded <code className={code}>#</code> (<code className={code}>%23</code>). For a block, use <code className={code}>%23%5E</code> (an encoded <code className={code}>#^</code>) and the block ID:
                    </p>
                    <ul className="font-mono text-xs sm:text-sm text-zinc-300 space-y-2 mb-4 break-all">
                        <li>obsidian://open?vault=Notes&amp;file=Projects%2FRoadmap%23Q3</li>
                        <li>obsidian://open?vault=Notes&amp;file=Projects%2FRoadmap%23%5Eabc123</li>
                    </ul>
                    <p className="text-zinc-300 leading-relaxed max-w-[60ch]">
                        The <a href="/tools/deep-link-builder" className="text-emerald-500 hover:text-emerald-400">deep link builder</a> does this encoding for you. If you use the Advanced URI community plugin, it has its own format with separate parameters, for example <code className={code}>obsidian://adv-uri?vault=Notes&amp;filepath=Roadmap&amp;heading=Q3</code>, and it can also open a note at a given line.
                    </p>
                </section>

                <section className="border-t border-zinc-800 py-10">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                        Make it clickable in other apps
                    </h2>
                    <p className="text-zinc-300 leading-relaxed max-w-[60ch] mb-4">
                        Notion, Slack, Gmail, GitHub, Linear and Confluence all drop <code className={code}>obsidian://</code> links. The <a href="/tools/url-compatibility-checker" className="text-emerald-500 hover:text-emerald-400">compatibility checker</a> has the details for each. To get around it, wrap the link in an https address:
                    </p>
                    <ol className="text-zinc-300 leading-relaxed max-w-[60ch] space-y-2 list-decimal list-inside mb-4">
                        <li>Paste the Obsidian link into the <a href="/" className="text-emerald-500 hover:text-emerald-400">LinkOpen converter</a> and copy the result.</li>
                        <li>Paste that https link wherever you need it. In Markdown: <code className={code}>[Open in Obsidian](https://linkopen.app/s/…)</code>.</li>
                        <li>Clicking it opens a page on linkopen.app, which passes the original link on to Obsidian.</li>
                    </ol>
                    <p className="text-zinc-300 leading-relaxed max-w-[60ch]">
                        To skip the converter, the <a href="/integrations#obsidian" className="text-emerald-500 hover:text-emerald-400">LinkOpen plugin</a> copies the https link straight from Obsidian, for a note, a heading or a block. Find it under Settings › Community plugins by searching for LinkOpen.
                    </p>
                </section>

                <section className="border-t border-zinc-800 py-10">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                        What the other person needs
                    </h2>
                    <p className="text-zinc-300 leading-relaxed max-w-[60ch] mb-4">
                        The link only names a vault and a note, so it works for someone who has Obsidian installed, a vault with the same name, and the note at the same path. In practice that means a shared vault, kept in sync through Obsidian Sync, iCloud or git.
                    </p>
                    <p className="text-zinc-300 leading-relaxed max-w-[60ch]">
                        Links written with a vault ID (<code className={code}>vault=ef6ca3e3b524d22f</code>) instead of a name may not match on someone else’s computer, so use the name for links you share. For people who don’t have the vault at all, an Obsidian link can’t help; publishing the note as a web page, with Obsidian Publish or an export, is the way to go.
                    </p>
                </section>
            </div>

            <Footer />
        </main>
    )
}
