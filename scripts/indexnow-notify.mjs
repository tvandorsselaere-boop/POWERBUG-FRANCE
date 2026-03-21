/**
 * IndexNow notification script
 * Reads sitemap from www.powerbug.fr, extracts all URLs, and pings IndexNow via our API.
 *
 * Usage: node scripts/indexnow-notify.mjs
 *
 * Requires INDEXNOW_SECRET in .env.local
 */

import { config } from 'dotenv'
config({ path: '.env.local' })

const SITE_URL = 'https://www.powerbug.fr'
const API_URL = `${SITE_URL}/api/indexnow`
const SECRET = process.env.INDEXNOW_SECRET

async function main() {
  if (!SECRET) {
    console.error('INDEXNOW_SECRET manquant dans .env.local')
    process.exit(1)
  }

  // Fetch sitemap
  console.log('Recuperation du sitemap...')
  const res = await fetch(`${SITE_URL}/sitemap.xml`)
  if (!res.ok) {
    console.error(`Impossible de recuperer le sitemap: ${res.status}`)
    process.exit(1)
  }

  const xml = await res.text()

  // Extract URLs with regex (no dependency needed)
  const urls = []
  const regex = /<loc>(.*?)<\/loc>/g
  let match
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1])
  }

  if (urls.length === 0) {
    console.error('Aucune URL trouvee dans le sitemap')
    process.exit(1)
  }

  console.log(`${urls.length} URLs trouvees dans le sitemap:`)
  urls.forEach((url) => console.log(`  ${url}`))

  // Submit to IndexNow
  console.log('\nEnvoi a IndexNow...')
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-indexnow-secret': SECRET,
    },
    body: JSON.stringify({ urls }),
  })

  const result = await response.json()
  console.log('\nReponse IndexNow:', JSON.stringify(result, null, 2))
}

main().catch((err) => {
  console.error('Erreur:', err)
  process.exit(1)
})
