import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream, readdirSync, statSync } from 'fs'
import { resolve } from 'path'

const SITE_URL = 'https://think-link.net/tkl-docs'
const DIST_DIR = resolve('docs/tkl-docs')

function walk(dir, files = []) {
    for (const file of readdirSync(dir)) {
        const fullPath = resolve(dir, file)
        if (statSync(fullPath).isDirectory()) {
            walk(fullPath, files)
        } else if (file.endsWith('.html')) {
            files.push(fullPath)
        }
    }
    return files
}

async function generate() {
    const sitemap = new SitemapStream({ hostname: SITE_URL })
    const writeStream = createWriteStream(resolve(DIST_DIR, 'sitemap.xml'))
    sitemap.pipe(writeStream)

    const pages = walk(DIST_DIR)

    pages.forEach(page => {
        const url = page
            .replace(DIST_DIR, '')
            .replace(/index\.html$/, '')
            .replace(/\.html$/, '')

        sitemap.write({
            url: url || '/',
            changefreq: 'weekly',
            priority: url === '/' ? 1.0 : 0.7,
        })
    })

    sitemap.end()
    await streamToPromise(sitemap)
    console.log('✅ sitemap.xml generated')
}

generate()
