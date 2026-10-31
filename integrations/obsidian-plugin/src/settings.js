import { PluginSettingTab, Setting } from 'obsidian'

export const DEFAULT_SETTINGS = {
    // 'app': the link opens Obsidian as soon as the page loads
    // 'confirm': the link shows a page with an "Open link" button first
    openMode: 'app',
    // 'plain': https://linkopen.app/s/...
    // 'markdown': [Note title](https://linkopen.app/s/...)
    copyFormat: 'plain',
}

// Falls back to the defaults for missing or unknown values in data.json.
export function normalizeSettings(settings) {
    return {
        openMode: settings.openMode === 'confirm' ? 'confirm' : 'app',
        copyFormat: settings.copyFormat === 'markdown' ? 'markdown' : 'plain',
    }
}

export class LinkOpenSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin)
        this.plugin = plugin
    }

    display() {
        const { containerEl } = this
        containerEl.empty()

        new Setting(containerEl)
            .setName('Open mode')
            .setDesc('What happens when someone clicks a copied link. Both go through a page on linkopen.app.')
            .addDropdown((dropdown) =>
                dropdown
                    .addOption('app', 'Open Obsidian right away')
                    .addOption('confirm', 'Show a confirmation page first')
                    .setValue(this.plugin.settings.openMode)
                    .onChange(async (value) => {
                        this.plugin.settings.openMode = value
                        await this.plugin.saveSettings()
                    }),
            )

        new Setting(containerEl)
            .setName('Copy format')
            .setDesc('Used by the copy commands and menu items. "Copy Markdown link to current note" always copies a Markdown link.')
            .addDropdown((dropdown) =>
                dropdown
                    .addOption('plain', 'Plain link')
                    .addOption('markdown', 'Markdown link')
                    .setValue(this.plugin.settings.copyFormat)
                    .onChange(async (value) => {
                        this.plugin.settings.copyFormat = value
                        await this.plugin.saveSettings()
                    }),
            )

        new Setting(containerEl).setName('Privacy').setHeading()

        new Setting(containerEl)
            .setName('What a link contains')
            .setDesc(
                'A copied link contains the vault name, the note path and any heading or block ID. ' +
                    'They are not encrypted, so anyone who has the link can read them. ' +
                    'Copying a link makes no network requests.',
            )
    }
}
