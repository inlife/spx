// Registry of known URL schemes — primary data source for Tools 1, 4, 7.
//
// Each entry:
//   app:        display name
//   scheme:     full prefix (e.g. "slack://")
//   example:    a representative example URL
//   platforms:  array of supported OSes/clients
//   docs:       optional URL to the official scheme docs
//   wraps:      true if Shortlink can wrap it into a universal HTTPS link
//
// When adding entries, prefer apps with verified, documented schemes.

export const URL_SCHEMES = [
    { app: 'Slack', scheme: 'slack://', example: 'slack://channel?team=T0001&id=C0001', platforms: ['macOS', 'Windows', 'iOS', 'Android'], docs: 'https://api.slack.com/reference/deep-linking', wraps: true },
    { app: 'Obsidian', scheme: 'obsidian://', example: 'obsidian://open?vault=MyVault&file=Note', platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'], docs: 'https://help.obsidian.md/Concepts/Obsidian+URI', wraps: true },
    { app: 'Zoom', scheme: 'zoommtg://', example: 'zoommtg://zoom.us/join?confno=123456789', platforms: ['macOS', 'Windows', 'iOS', 'Android'], docs: 'https://developers.zoom.us/docs/meeting-sdk/', wraps: true },
    { app: 'Notion', scheme: 'notion://', example: 'notion://www.notion.so/page-id', platforms: ['macOS', 'Windows', 'iOS', 'Android'], docs: null, wraps: true },
    { app: 'Figma', scheme: 'figma://', example: 'figma://file/abc123/FileName', platforms: ['macOS', 'Windows'], docs: null, wraps: true },
    { app: 'Linear', scheme: 'linear://', example: 'linear://issue/ENG-123', platforms: ['macOS', 'Windows', 'iOS', 'Android'], docs: null, wraps: true },
    { app: 'VS Code', scheme: 'vscode://', example: 'vscode://file/path/to/file.js:10:5', platforms: ['macOS', 'Windows', 'Linux'], docs: 'https://code.visualstudio.com/docs/configure/command-line', wraps: true },
    { app: 'Cursor', scheme: 'cursor://', example: 'cursor://file/path/to/file.js', platforms: ['macOS', 'Windows', 'Linux'], docs: null, wraps: true },
    { app: 'GitHub Desktop', scheme: 'x-github-client://', example: 'x-github-client://openRepo/https://github.com/user/repo', platforms: ['macOS', 'Windows'], docs: null, wraps: true },
    { app: 'Spotify', scheme: 'spotify://', example: 'spotify://track/6rqhFgbbKwnb9MLmUQDhG6', platforms: ['macOS', 'Windows', 'iOS', 'Android'], docs: null, wraps: true },
    { app: 'Apple Music', scheme: 'music://', example: 'music://music.apple.com/album/123456', platforms: ['macOS', 'iOS'], docs: null, wraps: true },
    { app: '1Password', scheme: 'onepassword://', example: 'onepassword://item/uuid', platforms: ['macOS', 'iOS'], docs: null, wraps: true },
    { app: 'Discord', scheme: 'discord://', example: 'discord://discord.com/channels/123/456', platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'], docs: null, wraps: true },
    { app: 'Telegram', scheme: 'tg://', example: 'tg://resolve?domain=username', platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'], docs: 'https://core.telegram.org/api/links', wraps: true },
    { app: 'WhatsApp', scheme: 'whatsapp://', example: 'whatsapp://send?phone=15551234567', platforms: ['macOS', 'Windows', 'iOS', 'Android'], docs: 'https://faq.whatsapp.com/5913398998672934', wraps: true },
    { app: 'Signal', scheme: 'sgnl://', example: 'sgnl://signal.me/#p/+15551234567', platforms: ['macOS', 'Windows', 'iOS', 'Android'], docs: null, wraps: true },
    { app: 'Microsoft Teams', scheme: 'msteams://', example: 'msteams://l/channel/19:abc/General?tenantId=...', platforms: ['macOS', 'Windows', 'iOS', 'Android'], docs: 'https://learn.microsoft.com/microsoftteams/platform/concepts/build-and-test/deep-links', wraps: true },
    { app: 'Webex', scheme: 'webex://', example: 'webex://meet?meetingNumber=123456789', platforms: ['macOS', 'Windows', 'iOS', 'Android'], docs: null, wraps: true },
    { app: 'Asana', scheme: 'asana://', example: 'asana://0/0/123456789', platforms: ['macOS', 'iOS', 'Android'], docs: null, wraps: true },
    { app: 'Trello', scheme: 'trello://', example: 'trello://board/abc123', platforms: ['iOS', 'Android'], docs: null, wraps: true },
    { app: 'Jira', scheme: 'jira://', example: 'jira://issue?key=PROJ-123', platforms: ['iOS', 'Android'], docs: null, wraps: true },
    { app: 'Confluence', scheme: 'confluence://', example: 'confluence://page?pageId=123456', platforms: ['iOS', 'Android'], docs: null, wraps: true },
    { app: 'ClickUp', scheme: 'clickup://', example: 'clickup://t/abc123', platforms: ['macOS', 'Windows', 'iOS', 'Android'], docs: null, wraps: true },
    { app: 'Monday', scheme: 'monday://', example: 'monday://boards/123456', platforms: ['iOS', 'Android'], docs: null, wraps: true },
    { app: 'Airtable', scheme: 'airtable://', example: 'airtable://base/appXXX/tblYYY', platforms: ['macOS', 'Windows', 'iOS', 'Android'], docs: null, wraps: true },
    { app: 'Coda', scheme: 'coda://', example: 'coda://doc/abc123', platforms: ['macOS', 'iOS'], docs: null, wraps: true },
    { app: 'Craft', scheme: 'craftdocs://', example: 'craftdocs://open?blockId=abc&spaceId=xyz', platforms: ['macOS', 'iOS'], docs: 'https://www.craft.do/s/H8ZZ58Bj7hgEC2', wraps: true },
    { app: 'Drafts', scheme: 'drafts://', example: 'drafts://x-callback-url/create?text=Hello', platforms: ['macOS', 'iOS'], docs: 'https://docs.getdrafts.com/docs/automation/urlschemes', wraps: true },
    { app: 'Fantastical', scheme: 'fantastical2://', example: 'fantastical2://parse?sentence=Lunch+tomorrow', platforms: ['macOS', 'iOS'], docs: null, wraps: true },
    { app: 'OmniFocus', scheme: 'omnifocus://', example: 'omnifocus:///add?name=New+Task', platforms: ['macOS', 'iOS'], docs: 'https://inside.omnifocus.com/url-schemes', wraps: true },
    { app: 'Things', scheme: 'things://', example: 'things:///add?title=Buy+milk', platforms: ['macOS', 'iOS'], docs: 'https://culturedcode.com/things/support/articles/2803573/', wraps: true },
    { app: 'Bear', scheme: 'bear://', example: 'bear://x-callback-url/open-note?id=abc123', platforms: ['macOS', 'iOS'], docs: 'https://bear.app/faq/x-callback-url-scheme-documentation/', wraps: true },
    { app: 'DEVONthink', scheme: 'x-devonthink-item://', example: 'x-devonthink-item://uuid', platforms: ['macOS', 'iOS'], docs: null, wraps: true },
    { app: 'Hookmark', scheme: 'hook://', example: 'hook://file/abc?p=...', platforms: ['macOS'], docs: 'https://hookproductivity.com/help/integration/using-hooks-deep-links/', wraps: true },
    { app: 'Logseq', scheme: 'logseq://', example: 'logseq://graph/MyGraph?page=Note', platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'], docs: null, wraps: true },
    { app: 'Roam Research', scheme: 'roam://', example: 'roam://#/app/graph/page/Title', platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'], docs: null, wraps: true },
    { app: 'Anytype', scheme: 'anytype://', example: 'anytype://object?objectId=abc', platforms: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'], docs: null, wraps: true },
    { app: 'Tana', scheme: 'tana://', example: 'tana://node/abc123', platforms: ['macOS', 'Windows', 'iOS'], docs: null, wraps: true },
    { app: 'Capacities', scheme: 'capacities://', example: 'capacities://open?spaceId=abc&objectId=xyz', platforms: ['macOS', 'iOS'], docs: null, wraps: true },
    { app: 'Reflect', scheme: 'reflect://', example: 'reflect://note/abc', platforms: ['macOS', 'iOS'], docs: null, wraps: true },
    { app: 'Mem', scheme: 'mem://', example: 'mem://m/abc123', platforms: ['macOS', 'iOS'], docs: null, wraps: true },
    { app: 'Sublime Text', scheme: 'subl://', example: 'subl://open?url=file:///path/to/file', platforms: ['macOS', 'Windows', 'Linux'], docs: null, wraps: true },
    { app: 'JetBrains', scheme: 'jetbrains://', example: 'jetbrains://idea/navigate/reference?project=name&path=src/Main.java', platforms: ['macOS', 'Windows', 'Linux'], docs: 'https://www.jetbrains.com/help/idea/settings-tools-web-browsers.html', wraps: true },
    { app: 'Warp', scheme: 'warp://', example: 'warp://action/new_tab', platforms: ['macOS'], docs: null, wraps: true },
    { app: 'iTerm', scheme: 'iterm2://', example: 'iterm2://app/start?profile=Default', platforms: ['macOS'], docs: null, wraps: true },
    { app: 'Tower', scheme: 'gittower://', example: 'gittower://openRepo/https://github.com/user/repo', platforms: ['macOS', 'Windows'], docs: null, wraps: true },
    { app: 'Sourcetree', scheme: 'sourcetree://', example: 'sourcetree://cloneRepo?cloneUrl=https://github.com/user/repo', platforms: ['macOS', 'Windows'], docs: null, wraps: true },
    { app: 'YouTube Music', scheme: 'youtubemusic://', example: 'youtubemusic://watch?v=abc123', platforms: ['iOS', 'Android'], docs: null, wraps: true },
    { app: 'Apple Mail', scheme: 'message://', example: 'message://%3Cmessage-id%40example.com%3E', platforms: ['macOS', 'iOS'], docs: null, wraps: true },
    { app: 'Mail (mailto)', scheme: 'mailto:', example: 'mailto:hello@example.com?subject=Hi', platforms: ['Universal'], docs: 'https://datatracker.ietf.org/doc/html/rfc6068', wraps: false },
    { app: 'Phone', scheme: 'tel:', example: 'tel:+15551234567', platforms: ['Universal'], docs: 'https://datatracker.ietf.org/doc/html/rfc3966', wraps: false },
    { app: 'SMS', scheme: 'sms:', example: 'sms:+15551234567?body=Hi', platforms: ['Universal'], docs: null, wraps: false },
    { app: 'FaceTime', scheme: 'facetime://', example: 'facetime://+15551234567', platforms: ['macOS', 'iOS'], docs: null, wraps: true },
]

export const SCHEMES_BY_PREFIX = Object.fromEntries(
    URL_SCHEMES.map(s => [s.scheme.replace(/[/:].*$/, ''), s])
)
