const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        REACT_APP_BRANCH: process.env.NOW_GITHUB_COMMIT_REF,
    },

    webpack(config, options) {
        config.resolve.alias = {
            ...config.resolve.alias,
            components: path.resolve(__dirname, 'components/'),
            context:    path.resolve(__dirname, 'context/'),
            utils:      path.resolve(__dirname, 'utils/'),
        }

        return config
    },

    // Links made before the rename point at shortlink.studio and never expire,
    // so those hosts forward every path (and query) to linkopen.app for good.
    // www.linkopen.app goes to the bare domain, which keeps shared links short.
    async redirects() {
        return ['shortlink.studio', 'www.shortlink.studio', 'www.linkopen.app'].map(host => ({
            source: '/:path*',
            has: [{ type: 'host', value: host }],
            destination: 'https://linkopen.app/:path*',
            permanent: true,
        }))
    },

    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                ],
            },
        ]
    },
}

module.exports = nextConfig
