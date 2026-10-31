'use client'

import { useState, useMemo } from 'react'
import { makeLink } from 'utils/make-link'
import CopyButton from 'components/tools/copy-button'

const APPS = [
    {
        id: 'slack',
        name: 'Slack',
        scheme: 'slack://',
        fields: [
            { id: 'team', label: 'Team ID', placeholder: 'T0001', required: true, hint: 'Starts with T. Open Slack in a browser and it’s in the address: app.slack.com/client/T…/' },
            { id: 'channel', label: 'Channel ID', placeholder: 'C0001', required: true, hint: 'Starts with C. Open the channel details in Slack; the ID is at the bottom of the About tab.' },
        ],
        build: (v) => `slack://channel?team=${encodeURIComponent(v.team.trim())}&id=${encodeURIComponent(v.channel.trim())}`,
    },
    {
        id: 'obsidian',
        name: 'Obsidian',
        scheme: 'obsidian://',
        fields: [
            { id: 'vault', label: 'Vault name', placeholder: 'Notes', required: true, hint: 'As it appears in the vault switcher.' },
            { id: 'file', label: 'Note path', placeholder: 'Projects/Roadmap', required: true, hint: 'Path inside the vault, without .md.' },
            { id: 'heading', label: 'Heading', placeholder: 'Q3', required: false, hint: 'Optional. Opens the note at this heading.' },
        ],
        build: (v) => {
            // Obsidian expects the heading inside the file value (Note#Heading, encoded as %23)
            const file = v.heading ? `${v.file}#${v.heading}` : v.file
            return `obsidian://open?vault=${encodeURIComponent(v.vault)}&file=${encodeURIComponent(file)}`
        },
    },
    {
        id: 'zoom',
        name: 'Zoom',
        scheme: 'zoommtg://',
        fields: [
            { id: 'meeting', label: 'Meeting ID', placeholder: '123456789', required: true, hint: 'The number from the invite. Spaces are removed.' },
            { id: 'pwd', label: 'Passcode', placeholder: 'abc123', required: false, hint: 'Optional. Saves people typing it.' },
        ],
        build: (v) => {
            const base = `zoommtg://zoom.us/join?action=join&confno=${encodeURIComponent(v.meeting.replace(/\s+/g, ''))}`
            return v.pwd ? `${base}&pwd=${encodeURIComponent(v.pwd.trim())}` : base
        },
    },
    {
        id: 'notion',
        name: 'Notion',
        scheme: 'notion://',
        fields: [
            { id: 'page', label: 'Notion page URL or ID', placeholder: 'https://www.notion.so/My-Page-0123…', required: true, hint: 'Paste the page URL from your browser or from Copy link.' },
        ],
        build: (v) => {
            const idMatch = v.page.match(/[a-f0-9]{8}-?[a-f0-9]{4}-?[a-f0-9]{4}-?[a-f0-9]{4}-?[a-f0-9]{12}/i)
            if (idMatch) return `notion://www.notion.so/${idMatch[0].replaceAll('-', '')}`
            return `notion://${v.page.trim().replace(/^https?:\/\//, '')}`
        },
    },
    {
        id: 'figma',
        name: 'Figma',
        scheme: 'figma://',
        fields: [
            { id: 'fileKey', label: 'File key', placeholder: 'AbC123xYz', required: true, hint: 'The part after /design/ (or /file/) in the Figma URL.' },
            { id: 'node', label: 'Node ID', placeholder: '1-23', required: false, hint: 'Optional. Copy it from ?node-id= in the URL to open a specific frame.' },
        ],
        build: (v) => {
            const base = `figma://file/${encodeURIComponent(v.fileKey.trim())}`
            return v.node ? `${base}?node-id=${encodeURIComponent(v.node.trim())}` : base
        },
    },
    {
        id: 'other',
        name: 'Other',
        scheme: '*://',
        fields: [
            { id: 'scheme', label: 'Scheme', placeholder: 'myapp', required: true, hint: 'Just the name, no colon or slashes.' },
            { id: 'path', label: 'Path and query', placeholder: 'open?id=123', required: true, hint: 'Everything after scheme://' },
        ],
        build: (v) => `${v.scheme.trim().replace(/[:/]+$/, '')}://${v.path.trim().replace(/^\/+/, '')}`,
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
        try {
            return makeLink(rawUrl)
        } catch {
            // Refused by the link policy (javascript: and friends)
            return ''
        }
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
                            className="w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-base sm:text-sm px-4 py-3 rounded-none placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
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
                            {active.id === 'other' ? 'Deep link' : `${active.name} deep link`}
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
                            Same link as https, for Notion, email, GitHub…
                        </span>
                        <CopyButton value={shortlinkUrl} disabled={!shortlinkUrl} />
                    </div>
                    <code className="block font-mono text-sm text-white break-all whitespace-pre-wrap min-h-[1.5em]">
                        {shortlinkUrl || <span className="text-zinc-600">Appears once the link above is ready</span>}
                    </code>
                </div>
            </div>
        </div>
    )
}
