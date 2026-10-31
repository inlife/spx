# LinkOpen

Copy a link to the current note, heading or block as an https link, so you can paste it into Notion, Slack, GitHub, Gmail and other places that drop `obsidian://` links.

The plugin builds the note's `obsidian://open` link and wraps it in a [LinkOpen](https://linkopen.app) link:

```
obsidian://open?vault=My%20Vault&file=Projects%2FRoadmap%23Q3
https://linkopen.app/s/1kAHFkJ4KQEwAwGoEMCuAbALoeAOAKAnA9gFYCmAxmgM7QBiASnggCYC2CADtAMwCKHQA
```

Clicking the https link opens a page on linkopen.app, which passes the `obsidian://` link on to Obsidian.

## Install

**From Community plugins** (once the plugin is listed): open **Settings → Community plugins**, select **Browse**, search for "LinkOpen", then install and enable it.

**With BRAT** (until then):

1. Install and enable [BRAT](https://github.com/TfTHacker/obsidian42-brat) from Community plugins.
2. Run **BRAT: Add a beta plugin for testing** from the command palette.
3. Enter `inlife/obsidian-linkopen` and select **Add Plugin**.
4. Enable LinkOpen in **Settings → Community plugins**.

**By hand**: download `main.js` and `manifest.json` from the [latest release](https://github.com/inlife/obsidian-linkopen/releases/latest) into `<your vault>/.obsidian/plugins/linkopen/`, reload Obsidian, then enable LinkOpen in **Settings → Community plugins**.

## Usage

Commands (open the command palette and type "LinkOpen"):

| Command | Copies |
| --- | --- |
| Copy link to current note | A link to the open note |
| Copy link to current heading or block | A link to the heading or block on the cursor line. Shown only when that line is a heading or ends with a block ID such as `^abc123` |
| Copy Markdown link to current note | `[Note title](https://linkopen.app/s/...)`, whatever the copy format setting says |

The commands have no default hotkeys. You can add your own in **Settings → Hotkeys**.

Menus:

- Right-click a note, for example in the file explorer, and select **Copy LinkOpen link**.
- Right-click in the editor and select **Copy LinkOpen link to note**. On a heading or block line, the menu also has **Copy LinkOpen link to heading** or **Copy LinkOpen link to block**.

A notice confirms each copy.

Block links need a block ID in the note: a space, `^` and an ID made of Latin letters, numbers and dashes at the end of the line, for example ` ^my-id`. For a list, quote, callout or table, the ID goes on a line of its own after it. See [Link to a block](https://obsidian.md/help/links) in Obsidian's help.

### Who can open the link

The link names a vault and a note. It opens the note for someone who has Obsidian installed, a vault with the same name, and the note at the same path, for example a vault you share through Obsidian Sync, iCloud or git. For anyone else, the link can't open the note.

## Settings

- **Open mode**: what happens when someone clicks a copied link.
  - **Open Obsidian right away** (default): the linkopen.app page asks the browser to open Obsidian as soon as it loads.
  - **Show a confirmation page first**: the page shows an **Open link** button.
- **Copy format**: **Plain link** (default) copies the https link. **Markdown link** copies `[Note title](link)`. Links to a heading or block are labelled `[Note title › Heading](link)` or `[Note title › ^block-id](link)`. Square brackets in titles are escaped.

## Privacy

- The plugin makes no network requests. Copying a link only writes to your clipboard.
- A link contains your vault name, the note's path in the vault and any heading or block ID. They are encoded, not encrypted, so anyone who has the link can read them. Don't share links to notes whose names you want to keep private.
- Remote services: the links point to linkopen.app. The plugin never contacts it; opening a link does. That page doesn't load Google Analytics, and Vercel Analytics records it with the link replaced by its app name (for example `/s/obsidian`).

## How the link is built

- The note link follows [Obsidian's URI format](https://obsidian.md/help/Extending+Obsidian/Obsidian+URI): `obsidian://open?vault=<vault>&file=<path without .md>`, with values URI-encoded (spaces as `%20`, slashes as `%2F`).
- A heading goes inside the `file` value after an encoded `#`: `file=Projects%2FRoadmap%23Q3`. A block uses an encoded `#^`: `file=Projects%2FRoadmap%23%5Eabc123`.
- The wrapped link is `https://linkopen.app/s/<data>`, made with the same encoder as the linkopen.app converter (`src/codec.js`). If the compressed form is ever longer, the plugin uses `https://linkopen.app/<type>/<encoded link>` instead, as the site does.

## Development

```bash
npm install
npm run dev     # rebuild main.js on every change
npm run build   # production build
```

To try a build, copy `main.js` and `manifest.json` into `<vault>/.obsidian/plugins/linkopen/`.

- `src/main.js`: commands, menus and copying
- `src/settings.js`: settings and the settings tab
- `src/links.js`: building the links, with no Obsidian imports
- `src/codec.js`: a copy of `utils/codec.js` from the [LinkOpen site](https://github.com/inlife/spx). Keep it identical to that file. Its dictionary must never change, because existing links depend on it.

Tests are in `test/links.test.js`. In the LinkOpen site repository they run with the site's `npm test` and decode every link with the site's own codec. On their own, run `npx vitest run`; the test then uses `src/codec.js` in place of the site's file.

## Releasing

These steps are for the maintainer.

1. Create the public repository `github.com/inlife/obsidian-linkopen`.
2. Copy everything in this folder to the root of that repository, including `.gitignore` and `.npmrc`.
3. Push to the default branch. `main.js` stays out of git; the release workflow builds it.
4. Tag the release with the exact manifest version, without a leading `v`:

   ```bash
   git tag 1.0.0
   git push origin 1.0.0
   ```

5. `.github/workflows/release.yml` builds the plugin and publishes a GitHub release for the tag with `main.js` and `manifest.json` attached. It fails if the tag and `manifest.json` disagree. Check the release page once it's done.
6. Install it with BRAT (`inlife/obsidian-linkopen`) in a test vault and try the commands on desktop and mobile.
7. Submit the plugin. Obsidian's current guide ([Submit your plugin](https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin)) uses the Community directory: sign in at [community.obsidian.md](https://community.obsidian.md) with an Obsidian account, link your GitHub account, open **Plugins**, select **New plugin**, enter `https://github.com/inlife/obsidian-linkopen`, choose the owner, agree to the developer policies and select **Submit**. The directory reads `manifest.json` from the default branch, and the automated review shows anything that needs fixing.

   Before the directory existed, plugins were submitted with a pull request to [obsidianmd/obsidian-releases](https://github.com/obsidianmd/obsidian-releases) that added an entry to the end of `community-plugins.json`. If that route is needed, this is the entry:

   ```json
   {
       "id": "linkopen",
       "name": "LinkOpen",
       "author": "inlife",
       "description": "Copy a LinkOpen link to the current note, heading or block. It is an https link, so it stays clickable in Notion, Slack, GitHub and Gmail.",
       "repo": "inlife/obsidian-linkopen"
   }
   ```

For later releases, run `npm version 1.0.1` (or the next version). It updates `manifest.json` and `versions.json`, commits, and creates a tag without a `v`. Push the commit and the tag; the release workflow does the rest.

## License

[MIT](LICENSE)
