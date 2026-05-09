'use client'

import { useState, useMemo } from 'react'
import { shouldCompress } from 'utils/codec'
import CopyButton from 'components/tools/copy-button'

const APPS = [
    {
        id: 'slack',
        name: 'Slack',
        scheme: 'slack://',
        fields: [
            { id: 'team', label: 'Team ID', placeholder: 'T0001', required: true, hint: 'Find this in your Slack URL: app.slack.com/client/T0001/...' },
            { id: 'channel', label: 'Channel ID', placeholder: 'C0001', required: true, hint: 'In Slack, right-click a channel → Copy link.' },
            { id: 'ts', label: 'Message timestamp', placeholder: '1700000000.001234', required: false, hint: 'Optional. Targets a specific message.' },
        ],
        build: (v) => {
            const base = `slack://channel?team=${encodeURIComponent(v.team)}&id=${encodeURIComponent(v.channel)}`
            return v.ts ? `${base}&message=${encodeURIComponent(v.ts)}` : base
        },
    },
    {
        id: 'obsidian',
        name: 'Obsidian',
        scheme: 'obsidian://',
        fields: [
            { id: 'vault', label: 'Vault name', placeholder: 'MyVault', required: true, hint: 'The display name of your vault.' },
            { id: 'file', label: 'Note path', placeholder: 'Folder/Note', required: true, hint: 'Path inside the vault, without the .md extension.' },
            { id: 'heading', label: 'Heading anchor', placeholder: 'Section title', required: false, hint: 'Optional. Jumps to a specific heading.' },
        ],
        build: (v) => {
            const base = `obsidian://open?vault=${encodeURIComponent(v.vault)}&file=${encodeURIComponent(v.file)}`
            return v.heading ? `${base}#${encodeURIComponent(v.heading)}` : base
        },
    },
    {
        id: 'zoom',
        name: 'Zoom',
        scheme: 'zoommtg://',
        fields: [
            { id: 'meeting', label: 'Meeting ID', placeholder: '123456789', required: true, hint: 'The numeric Zoom meeting ID.' },
            { id: 'pwd', label: 'Passcode', placeholder: 'abc123', required: false, hint: 'Optional. Pre-fills the meeting passcode.' },
        ],
        build: (v) => {
            const base = `zoommtg://zoom.us/join?action=join&confno=${encodeURIComponent(v.meeting)}`
            return v.pwd ? `${base}&pwd=${encodeURIComponent(v.pwd)}` : base
        },
    },
    {
        id: 'notion',
        name: 'Notion',
        scheme: 'notion://',
        fields: [
            { id: 'page', label: 'Notion page URL or ID', placeholder: 'https://www.notion.so/Page-abc123...', required: true, hint: 'Paste the full Notion URL — the page ID is auto-extracted.' },
        ],
        build: (v) => {
            const idMatch = (v.page || '').match(/([a-f0-9]{32})/i)
            if (idMatch) return `notion://www.notion.so/${idMatch[1]}`
            const cleaned = (v.page || '').replace(/^https?:\/\//, '')
            return `notion://${cleaned}`
        },
    },
    {
        id: 'figma',
        name: 'Figma',
        scheme: 'figma://',
        fields: [
            { id: 'fileKey', label: 'File key', placeholder: 'abc123def456', required: true, hint: 'From the Figma URL: figma.com/file/<key>/...' },
            { id: 'node', label: 'Node ID', placeholder: '1:23', required: false, hint: 'Optional. Targets a specific frame or layer.' },
        ],
        build: (v) => {
            const base = `figma://file/${encodeURIComponent(v.fileKey)}`
            return v.node ? `${base}?node-id=${encodeURIComponent(v.node)}` : base
        },
    },
    {
        id: 'other',
        name: 'Other',
        scheme: '*://',
        fields: [
            { id: 'scheme', label: 'Scheme', placeholder: 'myapp', required: true, hint: 'Without the trailing colon or slashes.' },
            { id: 'path', label: 'Path / query', placeholder: 'open?id=123', required: true, hint: 'Everything after the scheme prefix.' },
        ],
        build: (v) => `${(v.scheme || '').replace(/[:/]+$/, '')}://${(v.path || '').replace(/^\/+/, '')}`,
    },
]

export default function BuilderClient() {
    const [activeId, setActiveId] = useState(APPS[0].id)
    const [values, setValues] = useState({})

    const active = APPS.find(a => a.id === activeId)
    const valid = active.fields.every(f => !f.required || (values[f.id] || '').trim().length > 0)

    const rawUrl = useMemo(() => {
        if (!valid) return ''
        try {
            return active.build(values)
        } catch {
            return ''
        }
    }, [active, values, valid])

    const shortlinkUrl = useMemo(() => {
        if (!rawUrl) return ''
        const result = shouldCompress(rawUrl, '1')
        const path = result.useCompression ? `s/${result.compressed}` : result.legacy
        return `https://www.shortlink.studio/${path}`
    }, [rawUrl])

    const handleField = (id, val) => setValues(v => ({ ...v, [id]: val }))
    const handleApp = (id) => {
        setActiveId(id)
        setValues({})
    }

    return (
        <div className="space-y-6">
            {/* App tabs */}
            <div className="flex flex-wrap gap-px bg-zinc-800 border border-zinc-800">
                {APPS.map(a => (
                    <button
                        key={a.id}
                        type="button"
                        onClick={() => handleApp(a.id)}
                        className={`px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${
                            activeId === a.id
                                ? 'bg-zinc-950 text-emerald-500'
                                : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'
                        }`}
                    >
                        {a.name}
                    </button>
                ))}
            </div>

            {/* Fields */}
            <div className="bg-zinc-950 border border-zinc-800 p-5 sm:p-6 space-y-5">
                {active.fields.map(f => (
                    <div key={f.id}>
                        <label htmlFor={`builder-${active.id}-${f.id}`} className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">
                            {f.label}{f.required && <span className="text-emerald-600 ml-1">*</span>}
                        </label>
                        <input
                            id={`builder-${active.id}-${f.id}`}
                            type="text"
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            value={values[f.id] || ''}
                            onChange={e => handleField(f.id, e.target.value)}
                            placeholder={f.placeholder}
                            className="w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-sm px-4 py-3 rounded-none placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                        {f.hint && (
                            <p className="mt-1.5 text-zinc-500 text-xs leading-relaxed">{f.hint}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Output */}
            <div className="grid grid-cols-1 gap-px bg-zinc-800 border border-zinc-800">
                <div className="bg-zinc-950 p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                            Raw {active.scheme} URL
                        </span>
                        <CopyButton value={rawUrl} disabled={!rawUrl} />
                    </div>
                    <code className="block font-mono text-sm text-emerald-500 break-all whitespace-pre-wrap min-h-[1.5em]">
                        {rawUrl || <span className="text-zinc-600">Fill in the required fields…</span>}
                    </code>
                </div>
                <div className="bg-zinc-950 p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                            Universal Shortlink (works everywhere)
                        </span>
                        <CopyButton value={shortlinkUrl} disabled={!shortlinkUrl} />
                    </div>
                    <code className="block font-mono text-sm text-white break-all whitespace-pre-wrap min-h-[1.5em]">
                        {shortlinkUrl || <span className="text-zinc-600">—</span>}
                    </code>
                </div>
            </div>
        </div>
    )
}
