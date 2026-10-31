import { Notice, Plugin, TFile, stripHeadingForLink } from 'obsidian'
import { buildLink, parseLineTarget } from './links.js'
import { DEFAULT_SETTINGS, LinkOpenSettingTab, normalizeSettings } from './settings.js'

function isMarkdownFile(file) {
    return file instanceof TFile && file.extension === 'md'
}

export default class LinkOpenPlugin extends Plugin {
    async onload() {
        await this.loadSettings()

        this.addCommand({
            id: 'copy-link-to-note',
            name: 'Copy link to current note',
            checkCallback: (checking) => {
                const file = this.app.workspace.getActiveFile()
                if (!isMarkdownFile(file)) return false
                if (!checking) void this.copyLink(file, null)
                return true
            },
        })

        this.addCommand({
            id: 'copy-link-to-heading-or-block',
            name: 'Copy link to current heading or block',
            editorCheckCallback: (checking, editor, ctx) => {
                const file = ctx.file
                if (!isMarkdownFile(file)) return false
                const target = this.targetAtCursor(editor, file)
                if (!target) return false
                if (!checking) void this.copyLink(file, target)
                return true
            },
        })

        this.addCommand({
            id: 'copy-markdown-link-to-note',
            name: 'Copy Markdown link to current note',
            checkCallback: (checking) => {
                const file = this.app.workspace.getActiveFile()
                if (!isMarkdownFile(file)) return false
                if (!checking) void this.copyLink(file, null, { markdown: true })
                return true
            },
        })

        this.registerEvent(
            this.app.workspace.on('file-menu', (menu, file) => {
                if (!isMarkdownFile(file)) return
                menu.addItem((item) =>
                    item
                        .setTitle('Copy LinkOpen link')
                        .setIcon('link')
                        .onClick(() => this.copyLink(file, null)),
                )
            }),
        )

        this.registerEvent(
            this.app.workspace.on('editor-menu', (menu, editor, info) => {
                const file = info.file
                if (!isMarkdownFile(file)) return

                menu.addItem((item) =>
                    item
                        .setTitle('Copy LinkOpen link to note')
                        .setIcon('link')
                        .onClick(() => this.copyLink(file, null)),
                )

                const target = this.targetAtCursor(editor, file)
                if (!target) return
                menu.addItem((item) =>
                    item
                        .setTitle(target.blockId ? 'Copy LinkOpen link to block' : 'Copy LinkOpen link to heading')
                        .setIcon('link')
                        .onClick(() => this.copyLink(file, target)),
                )
            }),
        )

        this.addSettingTab(new LinkOpenSettingTab(this.app, this))
    }

    async loadSettings() {
        this.settings = normalizeSettings(Object.assign({}, DEFAULT_SETTINGS, await this.loadData()))
    }

    async saveSettings() {
        await this.saveData(this.settings)
    }

    // The heading or block on the cursor line, or null.
    // Returns { heading, headingLabel } or { blockId }.
    targetAtCursor(editor, file) {
        const line = editor.getCursor().line
        const parsed = parseLineTarget(editor.getLine(line))
        if (!parsed) return null

        const cache = this.app.metadataCache.getFileCache(file)
        const inCode = cache?.sections?.some(
            (s) => s.type === 'code' && s.position.start.line <= line && line <= s.position.end.line,
        )
        if (inCode) return null

        if (parsed.blockId) return { blockId: parsed.blockId }

        // Prefer the heading text Obsidian indexed; the parsed text covers a cache
        // that hasn't caught up with typing yet.
        const cached = cache?.headings?.find((h) => h.position.start.line === line)
        const headingLabel = cached ? cached.heading : parsed.heading
        const heading = stripHeadingForLink(headingLabel)
        if (!heading) return null
        return { heading, headingLabel }
    }

    async copyLink(file, target, { markdown = this.settings.copyFormat === 'markdown' } = {}) {
        const text = buildLink({
            vault: this.app.vault.getName(),
            path: file.path,
            title: file.basename,
            heading: target?.heading,
            headingLabel: target?.headingLabel,
            blockId: target?.blockId,
            openMode: this.settings.openMode,
            markdown,
        })

        const what = target?.blockId ? 'block' : target?.heading ? 'heading' : 'note'
        try {
            await navigator.clipboard.writeText(text)
            new Notice(`Copied ${markdown ? 'Markdown link' : 'link'} to ${what}.`)
        } catch {
            new Notice('Could not copy the link to the clipboard.')
        }
    }
}
