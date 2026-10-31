'use client'

import { useState, useMemo } from 'react'
import { shouldCompress } from 'utils/codec'
import { extractScheme } from 'utils/data/platform-rules'
import CopyButton from 'components/tools/copy-button'

function buildShortlink(url) {
    if (!url) return ''
    const result = shouldCompress(url, '1')
    const path = result.useCompression ? `s/${result.compressed}` : result.legacy
    return `https://linkopen.app/${path}`
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
        // Spaces or parentheses break a plain (url) target; CommonMark allows <url> instead
        const mdTarget = /[\s()]/.test(finalUrl) ? `<${finalUrl}>` : finalUrl
        const mdLabel = finalLabel.replace(/([[\]])/g, '\\$1')
        const htmlHref = finalUrl.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
        const htmlLabel = finalLabel.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
        return [
            {
                id: 'markdown',
                name: 'Markdown',
                value: `[${mdLabel}](${mdTarget})`,
                hint: 'Notion, Obsidian, GitHub, Bear, Logseq and most other Markdown editors.',
            },
            {
                id: 'slack',
                name: 'Slack mrkdwn',
                value: `<${finalUrl}|${finalLabel}>`,
                hint: 'For messages sent through the Slack API or Block Kit. The Slack message box doesn’t read this; there, select text and use the link button.',
            },
            {
                id: 'html',
                name: 'HTML',
                value: `<a href="${htmlHref}">${htmlLabel}</a>`,
                hint: 'Email signatures, HTML emails, web pages.',
            },
            {
                id: 'rst',
                name: 'reStructuredText',
                value: `\`${finalLabel} <${finalUrl}>\`_`,
                hint: 'Sphinx and other reStructuredText docs.',
            },
            {
                id: 'plain',
                name: 'Plain URL',
                value: finalUrl,
                hint: 'For places that turn bare URLs into links on their own, like Slack, Discord or GitHub comments.',
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
                        className="w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-base sm:text-sm px-4 py-3 rounded-none placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
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
                        placeholder="Project notes"
                        className="w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-base sm:text-sm px-4 py-3 rounded-none placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                </div>
            </div>

            {/* Custom-scheme toggle */}
            {isCustomScheme && (
                <div className="bg-zinc-950 border border-emerald-900/40 p-4 sm:p-5 flex items-center justify-between gap-4">
                    <div>
                        <div className="text-white font-bold text-sm mb-1">
                            This is a <code className="text-emerald-500 font-mono">{detectedScheme}:</code> link
                        </div>
                        <p className="text-zinc-500 text-xs leading-relaxed max-w-[55ch]">
                            Notion, Gmail, GitHub and most wikis will drop it. Switch this on to use an https version instead.
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
                        aria-label="Use an https version"
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
                        Type a URL to see the formats.
                    </div>
                )}
                {formats.map(f => (
                    <div key={f.id} className={`bg-zinc-950 p-5 ${f.id === 'plain' ? 'sm:col-span-2' : ''}`}>
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
