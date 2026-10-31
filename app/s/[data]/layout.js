export const metadata = {
    title: 'Opening link',
    description: 'A Shortlink that opens an app link, such as slack:// or obsidian://.',
    // Keep shortlinks out of search results, but let crawlers follow the link home
    robots: {
        index: false,
        follow: true,
    },
}

export default function CompressedRedirectLayout({ children }) {
    return children
}
