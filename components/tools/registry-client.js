'use client'

import { useState, useMemo } from 'react'

// Search box + table for the scheme list. Next.js renders the full table on
// the server, so the page works (and is readable) without JavaScript.

export default function RegistryClient({ schemes }) {
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
            <div>
                <label htmlFor="registry-search" className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">
                    Filter
                </label>
                <input
                    id="registry-search"
                    type="search"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="slack, obsidian, vscode..."
                    className="w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-base px-4 py-3 rounded-none placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                {query && (
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                        {filtered.length} of {schemes.length}
                    </div>
                )}
            </div>

            <div className="overflow-x-auto border border-zinc-800">
                <table className="w-full font-mono text-xs">
                    <thead>
                        <tr className="bg-zinc-900 text-zinc-400 uppercase tracking-widest text-[10px]">
                            <th className="text-left p-3 border-b border-zinc-800">App</th>
                            <th className="text-left p-3 border-b border-zinc-800">Scheme</th>
                            <th className="text-left p-3 border-b border-zinc-800">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(s => (
                            <tr key={s.app} className="border-b border-zinc-900 align-top">
                                <td className="p-3 text-white whitespace-nowrap">
                                    {s.app}
                                    {s.docs && (
                                        <a
                                            href={s.docs}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block text-[10px] text-zinc-500 hover:text-emerald-500 mt-1"
                                        >
                                            docs
                                        </a>
                                    )}
                                </td>
                                <td className="p-3 text-emerald-500 whitespace-nowrap">{s.scheme}</td>
                                <td className="p-3 text-zinc-400 min-w-[260px]">
                                    <span className="break-all">{s.example}</span>
                                    {s.note && (
                                        <p className="font-sans text-zinc-500 mt-1.5 leading-relaxed">{s.note}</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={3} className="p-6 text-center text-zinc-500">
                                    Nothing matches &ldquo;{query}&rdquo;.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
