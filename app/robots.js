// Shortlink pages (/s/, /0/, /1/) are crawlable on purpose: they carry
// noindex, so they stay out of results, but crawlers can see that tag and
// follow the link back to the homepage. Blocking them here would hide both.

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: 'https://www.shortlink.studio/sitemap.xml',
    }
}
