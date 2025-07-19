#!/usr/bin/env zx

// To run this script to fetch today featured products:
// yarn fetch
// or specify a date:
// yarn fetch 2020/01/01

// eslint-disable-next-line import/no-unresolved
import 'zx/globals'
import 'dotenv/config'

import prettier from 'prettier'

/* eslint-disable no-undef */
$.verbose = false

const selectThreeImages = (images) => {
  if (images.length < 1) {
    return []
  }
  if (images.length === 1) {
    return [images[0], images[0], images[0]]
  }
  if (images.length === 2) {
    return [images[0], images[1], images[0]]
  }
  return [images[0], images[1], images[2]]
}

// For product detail carousel images, reduce image file size & video build time
const constructImgixParameter = (src) => {
  const url = new URL(src)
  url.searchParams.set('w', '624')
  url.searchParams.set('h', '351')
  url.searchParams.set('fit', 'clip')
  return url.toString()
}

const dateArg =
  argv['_']?.[1] || new Date().setUTCDate(new Date().getUTCDate() - 1)
const postedAfterDate = new Date(dateArg)
postedAfterDate.setUTCHours(-8, 0, 0, 0) // Pacific Time (-8)
const postedBeforeDate = new Date(postedAfterDate)
postedBeforeDate.setUTCDate(postedAfterDate.getUTCDate() + 1)

const res = await fetch('https://api.producthunt.com/v2/api/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + process.env.REACT_APP_PRODUCT_HUNT_API_KEY,
  },
  body: JSON.stringify({
    query: `
        {
          posts(first: 5, order: RANKING, featured: true, postedBefore: "${postedBeforeDate.toISOString()}", postedAfter: "${postedAfterDate.toISOString()}") {
            edges {
              node {
                name
                slug
                tagline
                description
                thumbnail {
                  url
                }
                url
                votesCount
                commentsCount
                user {
                  name
                  profileImage
                }
                media {
                  type
                  url
                  videoUrl
                }
                topics {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
        }
    `,
  }),
})
const json = await res.json()
const products = json.data.posts.edges
  .map((edge) => edge.node)
  .map((product, index) => {
    return {
      name: product.name,
      tagline: product.tagline,
      description: product.description,
      url: product.url.split('?')[0],
      rank: index + 1,
      thumbnail: product.thumbnail?.url,
      votesCount: product.votesCount,
      user: {
        name: product.user?.name,
        profileImage: product.user?.profileImage,
      },
      images: selectThreeImages(
        product.media
          ?.filter((media) => media.type === 'image')
          .map((media) => constructImgixParameter(media.url))
      ),
      topics: product.topics?.edges?.map((edge) => edge.node.name),
    }
  })

const result = { date: postedBeforeDate.toISOString(), products: products }
console.log(result)

fs.writeFileSync(
  path.resolve(__dirname, '../data/today.json'),
  await prettier.format(JSON.stringify(result), { parser: 'json' })
)
