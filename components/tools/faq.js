// Server component: renders FAQ accordion + emits FAQPage JSON-LD.
// Q&A bodies appear in the DOM (Google requires this for rich results).

export default function Faq({ items, heading = 'FAQ' }) {
    if (!items || items.length === 0) return null

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
        })),
    }

    return (
        <section className="border-t border-zinc-800 py-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
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
