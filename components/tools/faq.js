// Server component: a short list of questions as an accordion.

export default function Faq({ items, heading = 'Questions' }) {
    if (!items || items.length === 0) return null

    return (
        <section className="border-t border-zinc-800 py-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
                {heading}
            </h2>
            <div className="space-y-3 max-w-2xl">
                {items.map((faq, i) => (
                    <details key={i} className="group border border-zinc-800">
                        <summary className="flex items-center justify-between p-4 cursor-pointer">
                            <span className="text-white text-sm font-medium pr-4">{faq.q}</span>
                            <span className="font-mono text-zinc-600 text-xs group-open:rotate-45 transition-transform shrink-0">+</span>
                        </summary>
                        <div className="px-4 pb-4">
                            <p className="text-zinc-400 text-xs leading-relaxed whitespace-pre-line">{faq.a}</p>
                        </div>
                    </details>
                ))}
            </div>
        </section>
    )
}
