import Header from 'components/header'
import Footer from 'components/footer'
import CopyButton from 'components/tools/copy-button'

export const metadata = {
    title: 'Integrations',
    description: 'Make LinkOpen links from your own tools: an HTTP API, a prefill link for the converter, and recipes for Apple Shortcuts, Raycast and the shell.',
    alternates: { canonical: '/integrations' },
    openGraph: {
        title: 'Integrations | LinkOpen',
        description: 'An HTTP API and recipes for Apple Shortcuts, Raycast and the shell.',
        url: 'https://linkopen.app/integrations',
        images: ['/preview.png?v=2'],
    },
}

// Every snippet below was run against the API before publishing. If you change
// one, run it again: the responses shown are real output.

const CURL = `curl -G https://linkopen.app/api/link \\
  --data-urlencode 'url=obsidian://open?vault=Notes&file=Projects%2FRoadmap'`

const CURL_OUT = 'https://linkopen.app/s/1kAHDkPYC4KYM6PAHAFATmAVlAxhGBSATAGIBKYAhgCYC2pADkA'

const CURL_JSON = `curl -G https://linkopen.app/api/link \\
  --data-urlencode 'url=slack://channel?team=T0001&id=C0001' \\
  -d mode=manual -d format=json`

const CURL_JSON_OUT = '{"link":"https://linkopen.app/0/slack%3A%2F%2Fchannel%3Fteam%3DT0001%26id%3DC0001","url":"slack://channel?team=T0001&id=C0001","mode":"manual"}'

const FETCH = `const params = new URLSearchParams({ url: 'obsidian://open?vault=Notes&file=Roadmap' })
const res = await fetch(\`https://linkopen.app/api/link?\${params}\`)
const link = await res.text()`

const PREFILL = 'https://linkopen.app/?url=obsidian%3A%2F%2Fopen%3Fvault%3DNotes%26file%3DProjects%252FRoadmap'

const SHORTCUT_URL = 'https://linkopen.app/api/link?url='

const RAYCAST = `#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Copy LinkOpen Link
# @raycast.mode silent

# Optional parameters:
# @raycast.packageName LinkOpen
# @raycast.argument1 { "type": "text", "placeholder": "App link" }

# Documentation:
# @raycast.description Turn an app link into an https link and copy it.

link=$(curl -sS -G https://linkopen.app/api/link --data-urlencode "url=$1")

case "$link" in
  https://*)
    printf '%s' "$link" | pbcopy
    echo "Copied $link"
    ;;
  *)
    echo "$link"
    exit 1
    ;;
esac`

const SHELL = `# Usage: linkopen 'obsidian://open?vault=Notes&file=Roadmap' [manual]
linkopen() {
  local link
  link=$(curl -sS -G https://linkopen.app/api/link \\
    --data-urlencode "url=$1" \\
    --data-urlencode "mode=\${2:-auto}") || return 1
  case "$link" in
    https://*) ;;
    *) echo "linkopen: $link" >&2; return 1 ;;
  esac
  if [ -t 1 ]; then echo "$link"; else printf '%s' "$link"; fi
}`

const SHELL_USAGE = `linkopen 'obsidian://open?vault=Notes&file=Roadmap'
linkopen 'slack://channel?team=T0001&id=C0001' manual
linkopen 'zoommtg://zoom.us/join?action=join&confno=123456789' | pbcopy`

const PARAMS = [
    { name: 'url', values: 'required', notes: 'The app link, up to 2048 characters. URL-encode it; curl’s --data-urlencode does that for you.' },
    { name: 'mode', values: 'auto | manual', notes: 'auto (the default) opens the app as soon as the link is clicked. manual shows a page with an Open link button first. Links to websites (http, https) always come back as manual.' },
    { name: 'format', values: 'text | json', notes: 'text (the default) returns just the link. json returns {"link", "url", "mode"}, where mode is the one the link actually got.' },
]

const code = 'font-mono text-sm text-zinc-300'
const link = 'text-emerald-500 hover:text-emerald-400'
const h2 = 'font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4'
const p = 'text-zinc-400 leading-relaxed max-w-[60ch]'

function Snippet({ value, label }) {
    return (
        <div className="border border-zinc-800 bg-zinc-950 my-4">
            <div className="flex items-center justify-between gap-4 border-b border-zinc-800 px-4 py-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{label}</span>
                <CopyButton value={value} />
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-xs sm:text-sm leading-relaxed text-emerald-500"><code>{value}</code></pre>
        </div>
    )
}

function Output({ value }) {
    return (
        <div className="border border-zinc-800 border-dashed my-4">
            <div className="border-b border-zinc-800 border-dashed px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-600">Response</div>
            <pre className="overflow-x-auto p-4 font-mono text-xs sm:text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap break-all"><code>{value}</code></pre>
        </div>
    )
}

const SECTIONS = [
    ['api', 'API'],
    ['prefill', 'Prefill link'],
    ['shortcuts', 'Apple Shortcuts'],
    ['raycast', 'Raycast'],
    ['shell', 'Shell'],
    ['obsidian', 'Obsidian'],
]

export default function IntegrationsPage() {
    return (
        <main className="min-h-[100dvh] flex flex-col">
            <Header />

            <div className="flex-1 max-w-5xl mx-auto w-full px-5">
                <nav aria-label="Breadcrumb" className="pt-8 sm:pt-10">
                    <ol className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        <li><a href="/" className="hover:text-emerald-500 transition-colors">Home</a></li>
                        <li className="text-zinc-700">/</li>
                        <li className="text-zinc-300">Integrations</li>
                    </ol>
                </nav>

                <header className="pt-6 pb-10 border-b border-zinc-800">
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tighter leading-[0.95] font-bold text-white">
                        Integrations
                    </h1>
                    <p className={`${p} mt-5`}>
                        Make LinkOpen links without opening the site. There’s a small API, a link that opens the converter with your link filled in, and recipes for Apple Shortcuts, Raycast and the shell. They all follow the same rules as the <a href="/" className={link}>converter</a>.
                    </p>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-6 font-mono text-[10px] uppercase tracking-widest">
                        {SECTIONS.map(([id, name]) => (
                            <li key={id}><a href={`#${id}`} className="text-zinc-500 hover:text-emerald-500 transition-colors">{name}</a></li>
                        ))}
                    </ul>
                </header>

                <section id="api" className="py-10 scroll-mt-6">
                    <h2 className={h2}>API</h2>
                    <p className={p}>
                        Send an app link to <code className={code}>GET /api/link</code> and get the https link back as plain text:
                    </p>
                    <Snippet label="curl" value={CURL} />
                    <Output value={CURL_OUT} />

                    <div className="overflow-x-auto border border-zinc-800 my-6">
                        <table className="w-full font-mono text-xs">
                            <thead>
                                <tr className="bg-zinc-900 text-zinc-400 uppercase tracking-widest text-[10px]">
                                    <th className="text-left p-3 border-b border-zinc-800">Parameter</th>
                                    <th className="text-left p-3 border-b border-zinc-800">Values</th>
                                    <th className="text-left p-3 border-b border-zinc-800">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PARAMS.map(row => (
                                    <tr key={row.name} className="border-b border-zinc-900 align-top">
                                        <td className="p-3 text-emerald-500">{row.name}</td>
                                        <td className="p-3 text-white whitespace-nowrap">{row.values}</td>
                                        <td className="p-3 text-zinc-400 font-sans text-sm min-w-[16rem]">{row.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className={p}>A manual link, as JSON:</p>
                    <Snippet label="curl" value={CURL_JSON} />
                    <Output value={CURL_JSON_OUT} />

                    <p className={`${p} mb-4`}>
                        Errors come back as status 400 with a short message, or as <code className={code}>{'{"error": "…"}'}</code> with <code className={code}>format=json</code>. That happens when <code className={code}>url</code> is missing, has no scheme, is longer than 2048 characters, or uses <code className={code}>javascript:</code>, <code className={code}>data:</code> or <code className={code}>vbscript:</code>, which LinkOpen refuses.
                    </p>
                    <p className={p}>
                        Responses send <code className={code}>Access-Control-Allow-Origin: *</code>, so a web page on any site can call the API with <code className={code}>fetch</code>. Successful responses may be cached for a day. The API doesn’t save the URL; the link is worked out from it on each request.
                    </p>
                    <Snippet label="JavaScript" value={FETCH} />
                </section>

                <section id="prefill" className="border-t border-zinc-800 py-10 scroll-mt-6">
                    <h2 className={h2}>Prefill link</h2>
                    <p className={p}>
                        To send someone to the converter with a link already filled in, put the app link in <code className={code}>?url=</code>, URL-encoded:
                    </p>
                    <Snippet label="URL" value={PREFILL} />
                    <p className={p}>
                        Add <code className={code}>&amp;mode=manual</code> to turn off auto-redirect. Encode the whole app link: an unencoded <code className={code}>&amp;</code> inside it would cut it short.
                    </p>
                </section>

                <section id="shortcuts" className="border-t border-zinc-800 py-10 scroll-mt-6">
                    <h2 className={h2}>Apple Shortcuts</h2>
                    <p className={`${p} mb-4`}>
                        A shortcut for iPhone and iPad that takes an app link from the share sheet, or from the clipboard when nothing was shared, and copies the https link.
                    </p>
                    <ol className={`${p} space-y-2 list-decimal list-inside`}>
                        <li>In the Shortcuts app, create a shortcut. Open its <span className="text-zinc-300">Details</span> and turn on <span className="text-zinc-300">Show in Share Sheet</span>. An input action appears at the top.</li>
                        <li>In the input action, tap <span className="text-zinc-300">Any</span> and keep only text and URLs. Then tap <span className="text-zinc-300">Continue</span> in the same action and choose <span className="text-zinc-300">Get Clipboard</span>.</li>
                        <li>Add the action that URL-encodes text (search the actions for “encode”) and give it the shortcut’s input.</li>
                        <li>Add a <span className="text-zinc-300">URL</span> action: <code className={`${code} break-all`}>{SHORTCUT_URL}</code> followed by the encoded text from step 3. For links that ask first, add <code className={code}>&amp;mode=manual</code> at the end.</li>
                        <li>Add <span className="text-zinc-300">Get Contents of URL</span>. It calls the URL from step 4 and gets the link back.</li>
                        <li>Add <span className="text-zinc-300">Copy to Clipboard</span>.</li>
                    </ol>
                    <p className={`${p} mt-4`}>
                        Use it from the share sheet on a selected app link, or copy an app link and run the shortcut from the Shortcuts app.
                    </p>
                </section>

                <section id="raycast" className="border-t border-zinc-800 py-10 scroll-mt-6">
                    <h2 className={h2}>Raycast</h2>
                    <p className={p}>
                        A <a href="https://github.com/raycast/script-commands" className={link}>Script Command</a> for Raycast on a Mac. Save it as <code className={code}>linkopen.sh</code> in a folder of its own. In Raycast settings, open Extensions, click the plus button, choose <span className="text-zinc-300">Add Script Directory</span> and pick that folder.
                    </p>
                    <Snippet label="linkopen.sh" value={RAYCAST} />
                    <p className={p}>
                        Run <span className="text-zinc-300">Copy LinkOpen Link</span>, paste an app link, press Enter, and the https link is on your clipboard. If Raycast can’t run the script, make it executable with <code className={code}>chmod +x linkopen.sh</code>.
                    </p>
                </section>

                <section id="shell" className="border-t border-zinc-800 py-10 scroll-mt-6">
                    <h2 className={h2}>Shell</h2>
                    <p className={p}>
                        For macOS and Linux. Add this to <code className={code}>~/.zshrc</code> or <code className={code}>~/.bashrc</code>:
                    </p>
                    <Snippet label="zsh / bash" value={SHELL} />
                    <Snippet label="Usage" value={SHELL_USAGE} />
                    <p className={p}>
                        Keep the app link in single quotes so the shell leaves <code className={code}>&amp;</code> and <code className={code}>?</code> alone. When piped, the output has no trailing newline, so <code className={code}>pbcopy</code> on macOS, or <code className={code}>xclip -selection clipboard</code> or <code className={code}>wl-copy</code> on Linux, copies just the link.
                    </p>
                </section>

                <section id="obsidian" className="border-t border-zinc-800 py-10 scroll-mt-6">
                    <h2 className={h2}>Obsidian</h2>
                    <p className={p}>
                        For now, copy a note’s Obsidian URL and use any of the options above. <a href="/obsidian-links" className={link}>Sharing Obsidian links</a> covers the details.
                    </p>
                    {/* OBSIDIAN_PLUGIN_SECTION */}
                </section>
            </div>

            <Footer />
        </main>
    )
}
