#!/usr/bin/env zx

// eslint-disable-next-line import/no-unresolved
import 'zx/globals'

import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { TwitterApi } from 'twitter-api-v2'
import { formatInTimeZone } from 'date-fns-tz'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/today.json'), 'utf-8'))

const keycap = '\uFE0F\u20E3'
const RANK_TO_EMOJI = [
  '0' + keycap,
  '1' + keycap,
  '2' + keycap,
  '3' + keycap,
  '4' + keycap,
  '5' + keycap,
  '6' + keycap,
  '7' + keycap,
  '8' + keycap,
  '9' + keycap,
]
function rankToNumberEmoji(rank) {
  if (!Number.isInteger(rank) || rank > 5 || rank < 1) return ''

  return RANK_TO_EMOJI[rank]
}

function rankToMedalEmoji(rank) {
  if (!Number.isInteger(rank) || rank > 3 || rank < 1) return ''

  return ['', '🥇', '🥈', '🥉'][rank]
}

const composeProduct = (product) => {
  return `${product.rank}. ${product.name} 🔼 ${product.votesCount}`
}

// =============================================================================

const _composeMainContentLong = () => {
  const { products, date } = data
  const formattedDate = formatInTimeZone(
    new Date(date),
    'America/Los_Angeles',
    'MMMM d, yyyy'
  )

  const formattedProducts = products
    .map((product) => composeProduct(product))
    .join('\n')

  let content = `🔥 Top 5 on Product Hunt yesterday
📅 ${formattedDate} #ProductHunt

${formattedProducts}

🧵 Detail & links in the thread 👇
`

  return content
}

const _composeMainContentShort = () => {
  const { products, date } = data
  const formattedDate = formatInTimeZone(
    new Date(date),
    'America/Los_Angeles',
    'MMMM d, yyyy'
  )

  const formattedProducts = products
    .map((product) => composeProduct(product))
    .join('\n')

  let content = `🔥 Top 5 on Product Hunt yesterday
📅 ${formattedDate} #ProductHunt

${formattedProducts}`

  return content
}

const composeMainContent = () => {
  if (_composeMainContentLong().length > 280) {
    return _composeMainContentShort()
  }
  return _composeMainContentLong()
}

// =============================================================================

const _composeDetailContentLong = (product) => {
  const { name, description, url, rank, votesCount } = product
  return `${rankToNumberEmoji(rank)} ${name} ${rankToMedalEmoji(rank)}
🔼 ${votesCount}

${description}

${url}`
}

const _composeDetailContentShort = (product) => {
  const { name, tagline, url, rank, votesCount } = product
  return `${rankToNumberEmoji(rank)} ${name} ${rankToMedalEmoji(rank)}
🔼 ${votesCount}

${tagline}

${url}`
}

const composeDetailContent = (product) => {
  if (_composeDetailContentLong(product).length > 280) {
    return _composeDetailContentShort(product)
  }
  return _composeDetailContentLong(product)
}

// =============================================================================

async function run() {
  const { products } = data

  const client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN_KEY,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })

  const mediaIdVideo = await client.v1.uploadMedia(
    path.resolve(__dirname, '../out/video.mp4'),
    { type: 'longmp4' }
  )

  await client.v2.tweetThread([
    {
      text: composeMainContent(),
      media: { media_ids: [mediaIdVideo] },
    },
    ...products.map((product) => ({
      text: composeDetailContent(product),
    })),
    {
      text: '👉 Follow @ProductHunToday bring #ProductHunt to your feed. Never missing trending hunts again',
    },
  ])
}

run()
