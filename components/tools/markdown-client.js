'use client'

import { useState, useMemo } from 'react'
import { shouldCompress } from 'utils/codec'
import { extractScheme } from 'utils/data/platform-rules'
import CopyButton from 'components/tools/copy-button'

function buildShortlink(url) {
    if (!url) return ''
    const result = shouldCompress(url, '1')
    const path = result.useCompression ? `s/${result.compressed}` : result.legacy
    return `https://www.shortlink.studio/${path}`
}

export default function MarkdownClient() {
    const [url, setUrl] = useState('')
    const [label, setLabel] = useState('')
    const [useShortlink, setUseShortlink] = useState(false)

    const detectedScheme = useMemo(() => extractScheme(url), [url])
    const isCustomScheme = detectedScheme && detectedScheme !== 'https' && detectedScheme !== 'http' && detectedScheme !== 'mailto' && detectedScheme !== 'tel'

    const finalUrl = useMemo(() => {
        if (!url) return ''
        if (useShortlink && isCustomScheme) {
            return buildShortlink(url) || url
        }
        return url
    }, [url, useShortlink, isCustomScheme])

    const finalLabel = label || finalUrl || 'link'

    const formats = useMemo(() => {
        if (!finalUrl) return []
        return [
            {
                id: 'markdown',
                name: 'Markdown / Notion',
                value: `[${finalLabel}](${finalUrl})`,
                hint: 'Standard CommonMark. Works in Notion, Bear, Logseq, GitHub READMEs.',
            },
            {
                id: 'wikilink',
                name: 'Obsidian wikilink',
                value: `[[${finalUrl}|${finalLabel}]]`,
                hint: 'Native Obsidian syntax. Note: wikilinks are designed for internal vault notes — for external URLs prefer the Markdown format above.',
            },
            {
                id: 'slack',
                name: 'Slack mrkdwn',
                value: `<${finalUrl}|${finalLabel}>`,
                hint: 'For Slack messages, posts, and Block Kit text fields.',
            },
            {
                id: 'html',
                name: 'HTML anchor',
                value: `<a href="${finalUrl}">${finalLabel}</a>`,
                hint: 'For email signatures, raw HTML emails, or any HTML-rendering surface.',
            },
            {
                id: 'rst',
                name: 'reStructuredText',
                value: `\`${finalLabel} <${finalUrl}>\`_`,
                hint: 'For Sphinx docs and Python project READMEs.',
            },
            {
                id: 'plain',
                name: 'Plain URL',
                value: finalUrl,
                hint: 'For surfaces that auto-link bare URLs (Slack, Discord, Twitter).',
            },
        ]
    }, [finalUrl, finalLabel])

    return (
        <div className="space-y-6">
            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
                <div className="bg-zinc-950 p-5">
                    <label htmlFor="md-url" className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">
                        URL
                    </label>
                    <input
                        id="md-url"
                        type="text"
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder="https://example.com or slack://channel?team=..."
                        className="w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-sm px-4 py-3 rounded-none placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                </div>
                <div className="bg-zinc-950 p-5">
                    <label htmlFor="md-label" className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">
                        Label (visible text)
                    </label>
                    <input
                        id="md-label"
                        type="text"
                        value={label}
                        onChange={e => setLabel(e.target.value)}
                        placeholder="Click here"
                        className="w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-sm px-4 py-3 rounded-none placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                </div>
            </div>

            {/* Custom-scheme toggle */}
            {isCustomScheme && (
                <div className="bg-zinc-950 border border-emerald-900/40 p-4 sm:p-5 flex items-center justify-between gap-4">
                    <div>
                        <div className="text-white font-bold text-sm mb-1">
                            Detected custom scheme: <code className="text-emerald-500 font-mono">{detectedScheme}://</code>
                        </div>
                        <p className="text-zinc-500 text-xs leading-relaxed max-w-[55ch]">
                            Most platforms strip non-HTTPS schemes. Toggle on to wrap this URL in a Shortlink so it renders as a clickable link in Notion, Gmail, Confluence, GitHub, etc.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setUseShortlink(!useShortlink)}
                        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-sm transition-colors focus:outline-none ${
                            useShortlink ? 'bg-emerald-600' : 'bg-zinc-700'
                        }`}
                        role="switch"
                        aria-checked={useShortlink}
                    >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-sm bg-white transition-transform ${
                            useShortlink ? 'translate-x-[18px]' : 'translate-x-[3px]'
                        }`} />
                    </button>
                </div>
            )}

            {/* Output tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800">
                {formats.length === 0 && (
                    <div className="bg-zinc-950 p-8 text-center text-zinc-500 sm:col-span-2">
                        Enter a URL above to see formatted link snippets.
                    </div>
                )}
                {formats.map(f => (
                    <div key={f.id} className="bg-zinc-950 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                                {f.name}
                            </span>
                            <CopyButton value={f.value} />
                        </div>
                        <code className="block font-mono text-xs text-emerald-500 break-all whitespace-pre-wrap mb-2">
                            {f.value}
                        </code>
                        <p className="text-zinc-500 text-[11px] leading-relaxed">{f.hint}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
