export const metadata = {
    title: 'Opening link',
    description: 'Opens an app link, such as slack:// or obsidian://, through LinkOpen.',
    // Keep shared links out of search results, but let crawlers follow the link home
    robots: {
        index: false,
        follow: true,
    },
}

export default function CompressedRedirectLayout({ children }) {
    return children
}
