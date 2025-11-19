import { getPayload } from 'payload'
import products from '../../products.json'
import configPromise from '@payload-config'

//script body
//* map over the products and get product title and product image string

const FALLBACK_IMAGE_ID = 749

const mapped = products.slice(500).map((product) => {
  const title = product.name
  const imageRaw = product.image

  let image = imageRaw
    ?.replace('/uploads/', '')
    .replace('products/', '')
    .replace('33/', '')
    .replace('249/', '')

  if (!image) image = 'fallback.png'

  return { title, image }
})

//find product by title with payload

async function main() {
  const payload = await getPayload({ config: configPromise })

  const results = []

  for (const item of mapped) {
    if (!item?.title || !item?.image) {
      results.push({ title: item?.title || 'no title', status: 'skipped' })
      continue
    }

    const existingProduct = await payload.find({
      collection: 'product',
      limit: 1,
      where: {
        title: {
          equals: item.title,
        },
      },
    })

    const corespondingImage = await payload.find({
      collection: 'media',
      limit: 1,
      where: {
        filename: { like: item.image },
      },
    })

    if (existingProduct?.docs?.[0] && corespondingImage?.docs?.[0]) {
      const productId = existingProduct.docs[0].id
      const mediaId = corespondingImage.docs[0].id

      await payload.update({
        collection: 'product',
        id: productId,
        data: {
          // replace the whole array with one row pointing to the media doc
          mediaArray: [{ file: mediaId }],

          // if meta.image is a single relationship/upload to 'media', this is fine:
          meta: { image: mediaId },
        },
        overrideAccess: true,
        depth: 0,
      })

      results.push({
        title: existingProduct.docs[0].title,
        status: 'updated with original image',
      })

      console.log(
        `Updated product ${existingProduct.docs[0]?.title} with image ${corespondingImage.docs[0].filename}`,
      )
      continue
    }

    if (existingProduct?.docs?.[0] && !corespondingImage?.docs?.[0]) {
      const productId = existingProduct.docs[0].id
      await payload.update({
        collection: 'product',
        id: productId,
        data: {
          // replace the whole array with one row pointing to the media doc
          mediaArray: [{ file: FALLBACK_IMAGE_ID }],

          // if meta.image is a single relationship/upload to 'media', this is fine:
          meta: { image: FALLBACK_IMAGE_ID },
        },
        overrideAccess: true,
        depth: 0,
      })

      results.push({
        title: existingProduct.docs[0].title,
        status: 'updated with fallback image',
      })

      console.log(`Updated product ${existingProduct.docs[0].title} with fallback image`)
      continue
    }

    results.push({
      title: existingProduct?.docs?.[0]?.title,
      status: 'skipped',
    })

    console.log(`Could not find coresponding image for product ${existingProduct?.docs?.[0]?.title}`)
  }

  const updatedWithFallback = results.filter(
    (r) => r.status === 'updated with fallback image',
  ).length
  const updatedWithOriginal = results.filter(
    (r) => r.status === 'updated with original image',
  ).length
  const skipped = results.filter((r) => r.status === 'skipped').length
  console.log(
    `Seed complete. updatedWithFallback=${updatedWithFallback}, updatedWithOriginal=${updatedWithOriginal}, skipped=${skipped}`,
  )
}

await main()
