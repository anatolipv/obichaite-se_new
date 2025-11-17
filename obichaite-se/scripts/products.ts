import { getPayload } from 'payload'
import config from '@payload-config'
import products from '../../products.json'
import sectionCategories from '../../section_categories.json'
import sectionProducts from '../../section_products.json'
import categories from '../categories.json'

//add sku to product config
//prepare sku for each product both files
//in each product try to change the url and file name to media (only media [0])
//in each product write util function to get first 15 words divided by " " and update mete.description
//IMPORTANT only update product

const mapped = products.slice(450, 555).map((product) => {
  const sku = product.sku

  return {
    title: product.name,
    sku: sku,
  }
})

async function upsertProduct(
  payload: Awaited<ReturnType<typeof getPayload>>,
  item: (typeof mapped)[number],
) {
  //guard to skip already existing products
  const existingProduct = await payload.find({
    collection: 'product',
    limit: 1,
    where: {
      title: {
        equals: item.title,
      },
    },
  })

  const data: Record<string, unknown> = {}
  Object.entries(item).forEach(([k, v]) => {
    if (v !== undefined) data[k] = v // keep nulls if you want to clear
  })

  if (Object.keys(data).length === 0) {
    return { ok: true, id: existingProduct?.docs?.[0]?.id, skipped: true } // nothing to change
  }

  const metaDescription = existingProduct?.docs?.[0]?.meta?.description
  const formated = metaDescription?.split(' ').slice(0, 15).join(' ')

  if (formated) {
    data.meta = {
      title: existingProduct?.docs?.[0]?.meta?.title ?? item.title,
      image: 41,
      description: formated,
    }
  }

  const updated = await payload.update({
    collection: 'product',
    id: existingProduct?.docs?.[0]?.id,
    data,
    // overrideAccess: true, // enable if your access rules block this from server
    depth: 0,
  })

  if (!!updated?.id) {
    console.log('updated', data.sku)
    return { action: 'updated', id: updated.id }
  }

  return { action: 'created', slug: '++' }
}

async function main() {
  const payload = await getPayload({ config })

  const items: typeof mapped = mapped

  const results = []
  for (const item of items) {
    // if (!item.title || !item.slug) {
    //   results.push({ action: 'skipped', reason: 'missing title/slug', item })
    //   continue
    // }
    results.push(await upsertProduct(payload, item))
  }

  // Pretty log
  const created = results.filter((r) => r.action === 'created').length
  const updated = results.filter((r) => r.action === 'updated').length
  const skipped = results.filter((r) => r.action === 'skipped').length
  console.log(`Seed complete. created=${created}, updated=${updated}, skipped=${skipped}`)
}

await main()
