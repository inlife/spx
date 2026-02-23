export async function generateMetadata({ params }) {
    const { url } = await params
    const decodedUrl = decodeURIComponent(url)
    const scheme = decodedUrl.split('://')[0] || 'custom'

    return {
        title: `Redirecting to ${scheme}:// link`,
        description: `Shortlink is redirecting you to a ${scheme}:// custom scheme URL. This universal link works in any browser or app.`,
        robots: {
            index: false,
            follow: false,
        },
    }
}

export default function RedirectLayout({ children }) {
    return children
}
