// URL schemes shown on /tools/url-scheme-registry and used by the other tools.
//
// Each entry:
//   app:      display name
//   scheme:   the prefix, exactly as the app expects it
//   example:  a working example URL (placeholder IDs are fine)
//   note:     optional, anything that trips people up
//   docs:     optional, link to the app's own documentation
//
// Only add schemes you've checked against the app's docs or tried yourself.
// A short accurate list is worth more than a long guessed one.

export const URL_SCHEMES = [
    {
        app: 'Slack',
        scheme: 'slack://',
        example: 'slack://channel?team=T0001&id=C0001',
        note: 'Also slack://user, slack://file and slack://open. There is no app-scheme link to a single message; use the message permalink for that.',
        docs: 'https://docs.slack.dev/interactivity/deep-linking/',
    },
    {
        app: 'Obsidian',
        scheme: 'obsidian://',
        example: 'obsidian://open?vault=Notes&file=Inbox',
        note: 'To jump to a heading, put it inside the file value: file=Inbox%23Todo.',
        docs: 'https://obsidian.md/help/Extending+Obsidian/Obsidian+URI',
    },
    {
        app: 'Obsidian Advanced URI',
        scheme: 'obsidian://adv-uri',
        example: 'obsidian://adv-uri?vault=Notes&filepath=Inbox.md',
        note: 'Needs the Advanced URI community plugin. Older links use obsidian://advanced-uri.',
        docs: 'https://vinzent03.github.io/obsidian-advanced-uri/',
    },
    {
        app: 'Zoom',
        scheme: 'zoommtg://',
        example: 'zoommtg://zoom.us/join?action=join&confno=123456789',
        note: 'Add &pwd= for the passcode. A regular zoom.us/j/ link also opens the app, after a browser prompt.',
    },
    {
        app: 'Notion',
        scheme: 'notion://',
        example: 'notion://www.notion.so/My-Page-0123456789abcdef0123456789abcdef',
        note: 'Take the page URL from your browser and replace https:// with notion://.',
    },
    {
        app: 'Figma',
        scheme: 'figma://',
        example: 'figma://file/AbC123xYz',
        note: 'Opens the file in the desktop app.',
    },
    {
        app: 'VS Code',
        scheme: 'vscode://',
        example: 'vscode://file/c:/myProject/package.json:5:10',
        note: 'Line and column are optional. Insiders builds use vscode-insiders://.',
        docs: 'https://code.visualstudio.com/docs/configure/command-line',
    },
    {
        app: 'Cursor',
        scheme: 'cursor://',
        example: 'cursor://file/Users/me/project/src/index.js',
    },
    {
        app: 'JetBrains Toolbox',
        scheme: 'jetbrains://',
        example: 'jetbrains://idea/navigate/reference?project=MyProject&path=src/Main.java',
    },
    {
        app: 'GitHub Desktop',
        scheme: 'x-github-client://',
        example: 'x-github-client://openRepo/https://github.com/inlife/spx',
    },
    {
        app: 'Warp',
        scheme: 'warp://',
        example: 'warp://action/new_tab?path=/Users/me/code',
        docs: 'https://docs.warp.dev/terminal/more-features/uri-scheme',
    },
    {
        app: 'Microsoft Teams',
        scheme: 'msteams://',
        example: 'msteams://teams.microsoft.com/l/chat/0/0?users=alex@example.com',
        note: 'Skips the browser and opens the desktop client. Microsoft suggests the https://teams.microsoft.com/l/ form unless everyone has the desktop app.',
        docs: 'https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/deep-links',
    },
    {
        app: 'Telegram',
        scheme: 'tg://',
        example: 'tg://resolve?domain=durov',
        docs: 'https://core.telegram.org/api/links',
    },
    {
        app: 'WhatsApp',
        scheme: 'whatsapp://',
        example: 'whatsapp://send?phone=15551234567&text=Hi',
        note: 'https://wa.me/15551234567 does the same thing and works in browsers.',
    },
    {
        app: 'FaceTime',
        scheme: 'facetime://',
        example: 'facetime://+15551234567',
        note: 'facetime-audio:// starts an audio-only call.',
    },
    {
        app: 'Apple Mail',
        scheme: 'message://',
        example: 'message://%3Cmessage-id@example.com%3E',
        note: 'Uses the email’s Message-ID header, wrapped in encoded angle brackets.',
    },
    {
        app: 'Apple Shortcuts',
        scheme: 'shortcuts://',
        example: 'shortcuts://run-shortcut?name=Log%20Water',
        docs: 'https://support.apple.com/guide/shortcuts/run-a-shortcut-from-a-url-apd624386f42/ios',
    },
    {
        app: 'Things',
        scheme: 'things:///',
        example: 'things:///add?title=Buy%20milk',
        note: 'Three slashes, because there is no host.',
        docs: 'https://culturedcode.com/things/support/articles/2803573/',
    },
    {
        app: 'OmniFocus',
        scheme: 'omnifocus:///',
        example: 'omnifocus:///add?name=Call%20Sam',
        docs: 'https://inside.omnifocus.com/url-schemes',
    },
    {
        app: 'Bear',
        scheme: 'bear://',
        example: 'bear://x-callback-url/open-note?id=7E4B681B',
        docs: 'https://bear.app/faq/x-callback-url-scheme-documentation/',
    },
    {
        app: 'Drafts',
        scheme: 'drafts://',
        example: 'drafts://x-callback-url/create?text=Hello',
        docs: 'https://docs.getdrafts.com/docs/automation/urlschemes',
    },
    {
        app: 'Craft',
        scheme: 'craftdocs://',
        example: 'craftdocs://open?blockId=BLOCK_ID&spaceId=SPACE_ID',
    },
    {
        app: 'DEVONthink',
        scheme: 'x-devonthink-item://',
        example: 'x-devonthink-item://9A1B2C3D-0000-0000-0000-000000000000',
    },
    {
        app: 'Logseq',
        scheme: 'logseq://',
        example: 'logseq://graph/MyGraph?page=Inbox',
    },
    {
        app: 'Zotero',
        scheme: 'zotero://',
        example: 'zotero://select/library/items/ABCD2345',
        note: 'Common in Obsidian notes that cite papers.',
    },
    {
        app: 'Spotify',
        scheme: 'spotify:',
        example: 'spotify:track:6rqhFgbbKwnb9MLmUQDhG6',
        note: 'Spotify URIs use colons, not slashes.',
        docs: 'https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids',
    },
    {
        app: 'Steam',
        scheme: 'steam://',
        example: 'steam://run/440',
        docs: 'https://developer.valvesoftware.com/wiki/Steam_browser_protocol',
    },
    {
        app: 'AltStore',
        scheme: 'altstore://',
        example: 'altstore://install?url=https://example.com/app.ipa',
        note: 'altstore://source?url= adds a source instead of a single app.',
    },
    {
        app: 'Email',
        scheme: 'mailto:',
        example: 'mailto:hello@example.com?subject=Hi',
        note: 'Standard scheme. Most apps already make it clickable.',
        docs: 'https://datatracker.ietf.org/doc/html/rfc6068',
    },
    {
        app: 'Phone',
        scheme: 'tel:',
        example: 'tel:+15551234567',
        note: 'Standard scheme. Most apps already make it clickable.',
        docs: 'https://datatracker.ietf.org/doc/html/rfc3966',
    },
    {
        app: 'SMS',
        scheme: 'sms:',
        example: 'sms:+15551234567',
        docs: 'https://datatracker.ietf.org/doc/html/rfc5724',
    },
]
