import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'utils/'),
        },
    },
})
