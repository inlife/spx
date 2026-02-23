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
