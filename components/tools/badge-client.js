'use client'

import { useState, useMemo } from 'react'
import CopyButton from 'components/tools/copy-button'
import {
    BADGES,
    badgeAlt,
    badgeById,
    badgeForScheme,
    buildBadgeLink,
    badgeMarkdown,
    badgeHtml,
} from 'utils/readme-badge'

const EXAMPLE = 'vscode://vscode.git/clone?url=https%3A%2F%2Fgithub.com%2Finlife%2Fspx'

const ERRORS = {
    'no-scheme': 'That doesn’t look like an app link. It should start with a scheme, like vscode:// or obsidian://.',
    blocked: 'javascript:, data: and vbscript: links can’t be shared through LinkOpen.',
}

export default function BadgeClient() {
    const [url, setUrl] = useState('')
    const [choice, setChoice] = useState('auto')

    const result = useMemo(() => buildBadgeLink(url), [url])
    const link = result.link || ''
    const error = result.error && result.error !== 'empty' ? ERRORS[result.error] : ''

    const autoBadge = badgeForScheme(result.scheme)
    const badge = choice === 'auto' ? autoBadge : badgeById(choice)

    const markdown = link ? badgeMarkdown(link, badge) : ''
    const html = link ? badgeHtml(link, badge) : ''
    const previewSrc = `/badge/${badge.id}.svg`

    const outputs = [
        { id: 'markdown', name: 'Markdown', value: markdown, hint: 'For README.md and other Markdown files on GitHub.' },
        { id: 'html', name: 'HTML', value: html, hint: 'For an HTML block in a README, or a web page.' },
        { id: 'link', name: 'Link only', value: link, hint: 'The https link on its own, if you already have a badge image.' },
    ]

    return (
        <div className="space-y-6">
            {/* Inputs */}
            <div className="bg-zinc-950 border border-zinc-800 p-5 sm:p-6 space-y-5">
                <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                        <label htmlFor="badge-url" className="font-mono text-[11px] uppercase tracking-widest text-zinc-400">
                            App link
                        </label>
                        <button
                            type="button"
                            onClick={() => setUrl(EXAMPLE)}
                            className="font-mono text-[11px] uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors"
                        >
                            Use an example
                        </button>
                    </div>
                    <input
                        id="badge-url"
                        type="text"
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder="vscode://vscode.git/clone?url=…"
                        aria-describedby="badge-url-status"
                        className="w-full bg-zinc-900 border border-zinc-600 text-white font-mono text-base sm:text-sm px-4 py-3 rounded-none placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    <p id="badge-url-status" role="status" className={`mt-1.5 text-sm leading-relaxed ${error ? 'text-red-400' : 'text-zinc-400'}`}>
                        {error || 'A vscode://, obsidian://, slack:// or other app link.'}
                    </p>
                </div>

                <div>
                    <label htmlFor="badge-choice" className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 block mb-2">
                        Badge
                    </label>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                        Auto picks the badge from the link’s scheme.
                    </p>
                    <select
                        id="badge-choice"
                        value={choice}
                        onChange={e => setChoice(e.target.value)}
                        className="w-full sm:w-auto bg-zinc-900 border border-zinc-600 text-white font-mono text-base sm:text-sm px-4 py-3 rounded-none focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                        <option value="auto">Auto ({badgeAlt(autoBadge)})</option>
                        {BADGES.map(b => (
                            <option key={b.id} value={b.id}>{badgeAlt(b)}</option>
                        ))}
                    </select>
                </div>
            </div>

            {result.keptByGitHub && (
                <div className="bg-zinc-950 border border-emerald-900/40 p-4 sm:p-5">
                    <div className="text-white font-bold text-sm mb-1">
                        GitHub keeps <code className="text-emerald-500 font-mono">{result.scheme}:</code> links
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-[60ch]">
                        You can put this link in your README as it is. The badge below works too
                        {result.type === '0' ? ', but it opens a LinkOpen page that asks people to confirm before going to the site.' : '.'}
                    </p>
                </div>
            )}

            {/* Preview */}
            <div className="border border-zinc-800">
                <div className="bg-zinc-950 px-5 sm:px-6 pt-5 pb-3">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400">
                        Preview{link ? ', click to try the link' : ''}
                    </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                    {[
                        { id: 'light', label: 'Light theme', className: 'bg-white text-zinc-600' },
                        { id: 'dark', label: 'Dark theme', className: 'bg-[#0d1117] text-zinc-400' },
                    ].map(theme => (
                        <div key={theme.id} className={`${theme.className} px-5 sm:px-6 py-6 flex items-center justify-between gap-4`}>
                            {link ? (
                                <a href={link} target="_blank" rel="noopener noreferrer" data-preview={theme.id}>
                                    <img src={previewSrc} alt={badgeAlt(badge)} height="20" className="block h-5 w-auto" />
                                </a>
                            ) : (
                                <img src={previewSrc} alt={badgeAlt(badge)} height="20" className="block h-5 w-auto opacity-60" data-preview={theme.id} />
                            )}
                            <span className="font-mono text-[11px] uppercase tracking-widest">{theme.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Output */}
            <div className="grid grid-cols-1 gap-px bg-zinc-800 border border-zinc-800">
                {outputs.map(o => (
                    <div key={o.id} className="bg-zinc-950 p-5 sm:p-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400">
                                {o.name}
                            </span>
                            <CopyButton value={o.value} disabled={!o.value} />
                        </div>
                        <code data-output={o.id} className="block font-mono text-xs text-emerald-500 break-all whitespace-pre-wrap min-h-[1.5em] mb-2">
                            {o.value || <span className="text-zinc-400">Paste an app link above</span>}
                        </code>
                        <p className="text-zinc-400 text-sm leading-relaxed">{o.hint}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
