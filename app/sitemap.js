// No lastModified: stamping every URL with the build time tells search engines
// every page changes on every deploy, which they learn to ignore.

export default function sitemap() {
    const baseUrl = 'https://linkopen.app'

    const tools = [
        'url-compatibility-checker',
        'deep-link-builder',
        'markdown-link-generator',
        'url-scheme-registry',
    ]

    return [
        {
            url: baseUrl,
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/obsidian-links`,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/tools`,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...tools.map(slug => ({
            url: `${baseUrl}/tools/${slug}`,
            changeFrequency: 'monthly',
            priority: 0.6,
        })),
    ]
}
