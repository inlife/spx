'use client'

import { useState, useMemo } from 'react'

// Client island for the URL Scheme Registry. Next.js SSRs this for the initial
// HTML, so crawlers see every row without executing JS — search is a pure
// progressive enhancement on top.

export default function RegistryClient({ schemes, wrappable }) {
    const [query, setQuery] = useState('')

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return schemes
        return schemes.filter(s =>
            s.app.toLowerCase().includes(q) ||
            s.scheme.toLowerCase().includes(q)
        )
    }, [query, schemes])

    return (
        <div className="space-y-5">
            {typeof wrappable === 'number' && (
                <p className="text-zinc-500 text-sm max-w-[60ch]">
                    {wrappable} of {schemes.length} schemes can be wrapped into a universal HTTPS link via Shortlink.
                </p>
            )}
            <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">
                    Search the registry
                </label>
                <input
                    type="search"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="slack, obsidian, vscode, ..."
                    className="w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-base px-4 py-3 rounded-none placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                    {filtered.length} of {schemes.length} schemes
                </div>
            </div>

            <div className="overflow-x-auto border border-zinc-800">
                <table className="w-full font-mono text-xs">
                    <thead>
                        <tr className="bg-zinc-900 text-zinc-400 uppercase tracking-widest text-[10px]">
                            <th className="text-left p-3 border-b border-zinc-800">App</th>
                            <th className="text-left p-3 border-b border-zinc-800">Scheme</th>
                            <th className="text-left p-3 border-b border-zinc-800 hidden md:table-cell">Example</th>
                            <th className="text-left p-3 border-b border-zinc-800 hidden lg:table-cell">Platforms</th>
                            <th className="text-left p-3 border-b border-zinc-800">Wraps?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(s => (
                            <tr key={s.scheme + s.app} className="border-b border-zinc-900 hover:bg-zinc-900/50">
                                <td className="p-3 text-white">{s.app}</td>
                                <td className="p-3 text-emerald-500">{s.scheme}</td>
                                <td className="p-3 text-zinc-500 hidden md:table-cell truncate max-w-[280px]">{s.example}</td>
                                <td className="p-3 text-zinc-500 hidden lg:table-cell">{s.platforms.join(', ')}</td>
                                <td className="p-3">
                                    {s.wraps ? (
                                        <span className="text-emerald-500">Yes</span>
                                    ) : (
                                        <span className="text-zinc-600">No</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-6 text-center text-zinc-500">
                                    No schemes match &ldquo;{query}&rdquo;.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
