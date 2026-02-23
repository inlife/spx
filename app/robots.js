export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/s/', '/0/', '/1/'],
            },
        ],
        sitemap: 'https://www.shortlink.studio/sitemap.xml',
    }
}
