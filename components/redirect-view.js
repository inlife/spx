import Footer from 'components/footer'
import AutoOpen from 'components/auto-open'
import { isWebUrl, schemeOf } from 'utils/link-policy'

// The page someone sees after clicking a shared link. Rendered on the server so
// it has real content (and a link home) before any JavaScript runs.

export default function RedirectView({ url, type, invalid = false }) {
    const web = !invalid && isWebUrl(url)
    const auto = !invalid && type === '1' && !web

    return (
        // data-link-scheme lets analytics record which app a link opens, never the link itself
        <main className="min-h-[100dvh] flex flex-col" data-link-scheme={invalid ? 'invalid' : schemeOf(url) || 'unknown'}>
            <div className="flex-1 flex items-center justify-center px-5 py-16">
                <div className="text-center max-w-md w-full">
                    {invalid ? (
                        <>
                            <h1 className="text-lg font-bold text-white mb-3">This link can’t be opened</h1>
                            <p className="font-mono text-sm text-zinc-500">It’s incomplete or was changed after it was made. Ask the person who sent it for a fresh copy.</p>
                        </>
                    ) : (
                        <>
                            {auto && <AutoOpen url={url} />}
                            <h1 className="font-mono text-zinc-400 text-sm mb-6">
                                {auto ? 'Opening link…' : web ? 'This link goes to a website' : 'Click to open your link'}
                            </h1>
                            {web && (
                                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                                    Check the address below before you continue. LinkOpen doesn’t check where links go.
                                </p>
                            )}
                            <a
                                href={url}
                                rel="nofollow ugc"
                                className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-8 text-sm tracking-wide uppercase transition-colors"
                            >
                                {web ? 'Continue to site' : 'Open link'}
                            </a>
                            <div className="mt-8 font-mono text-xs text-zinc-500 break-all">{url}</div>
                            {!web && (
                                <p className="mt-6 text-xs text-zinc-600 leading-relaxed">
                                    Nothing happening? The app this link opens might not be installed on this device.
                                </p>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="border-t border-zinc-800 px-5 py-5 text-center text-xs text-zinc-500">
                Made with <a href="/" className="text-emerald-500 hover:text-emerald-400">LinkOpen</a>, which turns slack://, obsidian:// and other app links into links that stay clickable in Notion, GitHub and email.
            </div>
            <Footer />
        </main>
    )
}
