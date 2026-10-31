// Tells Bing (and other IndexNow engines) which pages changed, so they
// re-crawl soon instead of whenever. Run after a production deploy:
//   npm run indexnow
// The key file lives at public/a1cccb780ba2cbcb2e123d0e037f417d.txt; keep the two in sync.

const HOST = 'www.shortlink.studio'
const KEY = 'a1cccb780ba2cbcb2e123d0e037f417d'

const sitemap = await fetch(`https://${HOST}/sitemap.xml`).then(r => r.text())
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])

const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
})

console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`)
if (!res.ok) process.exit(1)
