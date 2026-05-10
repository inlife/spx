'use client'

import { useMemo, useState } from 'react'
import { PLATFORMS, check, extractScheme } from 'utils/data/platform-rules'

const STATUS_STYLES = {
    works: { label: 'Works', cls: 'text-emerald-500' },
    partial: { label: 'Partial', cls: 'text-amber-400' },
    broken: { label: 'Broken', cls: 'text-red-400' },
    unknown: { label: 'Unknown', cls: 'text-zinc-500' },
}

export default function CheckerClient() {
    const [input, setInput] = useState('')

    const scheme = useMemo(() => extractScheme(input), [input])
    const results = useMemo(
        () => (scheme ? PLATFORMS.map(p => check(scheme, p)) : null),
        [scheme]
    )

    const trimmed = input.trim()
    const showCannotDetect = trimmed.length >= 4 && !scheme

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="checker-input" className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">
                    Paste any URL
                </label>
                <input
                    id="checker-input"
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="slack://channel?team=T0001&id=C0001"
                    className="w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-base px-4 py-3 rounded-none placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                {scheme && (
                    <div className="mt-3 font-mono text-xs text-zinc-500">
                        Detected scheme: <span className="text-emerald-500">{scheme}://</span>
                    </div>
                )}
                {showCannotDetect && (
                    <div className="mt-3 font-mono text-xs text-amber-400">
                        Could not detect a URL scheme. Try a URL like <code>slack://...</code>.
                    </div>
                )}
            </div>

            {results && (
                <div>
                    <h3 className="font-display text-lg font-bold text-white mb-4">
                        Compatibility for <code className="text-emerald-500 font-mono text-base">{scheme}://</code>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
                        {results.map(r => {
                            const style = STATUS_STYLES[r.status]
                            return (
                                <div key={r.platform.id} className="bg-zinc-950 p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white font-bold text-sm">{r.platform.name}</span>
                                        <span className={`font-mono text-[10px] uppercase tracking-widest ${style.cls}`}>
                                            {style.label}
                                        </span>
                                    </div>
                                    <p className="text-zinc-500 text-xs leading-relaxed">{r.notes}</p>
                                </div>
                            )
                        })}
                    </div>
                    {results.some(r => r.status === 'broken') && (
                        <div className="mt-6 bg-zinc-950 border border-emerald-900/40 p-5">
                            <p className="text-zinc-300 text-sm">
                                Some platforms above strip this scheme.{' '}
                                <a href="/" className="text-emerald-500 hover:text-emerald-400 font-medium">
                                    Wrap it in a Shortlink →
                                </a>
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
