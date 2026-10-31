import { schemeOf } from 'utils/link-policy'

export async function generateMetadata({ params }) {
    const { url } = await params
    let scheme = ''
    try {
        scheme = schemeOf(decodeURIComponent(url))
    } catch {
        // malformed link; the page shows the invalid view
    }

    return {
        title: scheme ? `Opening ${scheme} link` : 'Opening link',
        description: 'A Shortlink that opens an app link, such as slack:// or obsidian://.',
        // Keep shortlinks out of search results, but let crawlers follow the link home
        robots: {
            index: false,
            follow: true,
        },
    }
}

export default function RedirectLayout({ children }) {
    return children
}
