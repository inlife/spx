// Run by `npm version <x.y.z>`: copies the new version into manifest.json and
// records it in versions.json with the current minAppVersion.
import { readFileSync, writeFileSync } from 'fs'

const targetVersion = process.env.npm_package_version

const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'))
const { minAppVersion } = manifest
manifest.version = targetVersion
writeFileSync('manifest.json', JSON.stringify(manifest, null, 4) + '\n')

const versions = JSON.parse(readFileSync('versions.json', 'utf8'))
if (!(targetVersion in versions)) {
    versions[targetVersion] = minAppVersion
    writeFileSync('versions.json', JSON.stringify(versions, null, 4) + '\n')
}
