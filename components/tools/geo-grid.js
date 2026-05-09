import { GEO_VARIANTS } from 'utils/data/geo-variants'
import GeoHighlight from 'components/tools/geo-highlight'

// Server-renders ALL regional variants statically. The GeoHighlight client
// island reads timezone and adds a "popular near you" badge to the matching
// card — it never hides anything, so every variant is indexed by Google.

export default function GeoGrid({ heading = 'How teams use this around the world' }) {
    return (
        <section id="geo-content" className="border-t border-zinc-800 py-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
                {heading}
            </h2>
            <GeoHighlight />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
                {GEO_VARIANTS.map(v => (
                    <article
                        key={v.id}
                        data-geo-variant={v.id}
                        className="bg-zinc-950 p-5 sm:p-6 relative"
                    >
                        <header className="flex items-center justify-between mb-3">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-600">
                                {v.region}
                            </span>
                            <span
                                data-geo-badge
                                className="hidden font-mono text-[9px] uppercase tracking-widest text-zinc-950 bg-emerald-500 px-1.5 py-0.5"
                            >
                                Popular near you
                            </span>
                        </header>
                        <p className="text-zinc-400 text-xs leading-relaxed mb-3">{v.intro}</p>
                        <p className="text-zinc-500 text-xs leading-relaxed border-t border-zinc-800 pt-3">
                            <span className="text-zinc-300 font-medium">Use case: </span>
                            {v.useCase}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    )
}
