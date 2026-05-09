export default function sitemap() {
    const baseUrl = 'https://www.shortlink.studio'

    const tools = [
        'url-compatibility-checker',
        'deep-link-builder',
        'markdown-link-generator',
        'url-scheme-registry',
    ]

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/tools`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        ...tools.map(slug => ({
            url: `${baseUrl}/tools/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        })),
    ]
}
