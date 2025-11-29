import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Product } from '@/payload-types'

export const revalidateProduct: CollectionAfterChangeHook<Product> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  console.log('Revalidate Product Hook Triggered', doc)
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/produkt/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('produkt-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/produkt/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('produkt-sitemap')

      // revalidate category page

      // console.log('Revalidating product doc:', doc)
      const category =
        (await payload.find({
          collection: 'category',
          where: {
            id: {
              equals: doc.category,
            },
          },
        })) || null

      const subCategory =
        (await payload.find({
          collection: 'sub-category',
          where: {
            id: {
              equals: doc.subCategory,
            },
          },
        })) || null

      const otherSubCategories = await Promise.all(
        (doc.otherSubCategories || []).map(async (subCatId) => {
          const res = await payload.find({
            collection: 'sub-category',
            where: {
              id: {
                equals: subCatId,
              },
            },
          })
          return res.docs[0]
        }),
      )

      // console.log('Revalidating category:', category)
      payload.logger.info(`Revalidating old post at path: ${`/kategorii/${category.docs[0].slug}`}`)
      revalidatePath(`/kategorii/${category.docs[0].slug}`)

      // revalidate subCategory
      // console.log('Revalidating subCategory:', subCategory)
      payload.logger.info(
        `Revalidating old post at path: ${`/kategorii/${subCategory.docs[0].slug}`}`,
      )
      revalidatePath(`/kategorii/${subCategory.docs[0].slug}`)

      // revalidate otherSubCategories
      otherSubCategories?.forEach((subCat) => {
        // console.log('Revalidating otherSubCategory:', subCat)
        payload.logger.info(`Revalidating old post at path: ${`/kategorii/${subCat.slug}`}`)
        revalidatePath(`/kategorii/${subCat.slug}`)
      })

      revalidateTag('produkt-sitemap')

      revalidateTag('category-sitemap')
    }
  }

  return doc
}

export const revalidateDeleteProduct: CollectionAfterDeleteHook<Product> = async ({
  doc,
  req: { payload, context },
}) => {
  // console.log('Revalidate Delete Product Hook Triggered')
  console.log('Deleted context:', context)
  if (!context.disableRevalidate && doc.slug) {
    const path = `/produkt/${doc?.slug}`

    revalidatePath(path)
    // revalidate category page

    // console.log('Revalidating product doc:', doc)
    const category = await payload.find({
      collection: 'category',
      where: {
        id: {
          equals: doc.category,
        },
      },
    })

    const subCategory = await payload.find({
      collection: 'sub-category',
      where: {
        id: {
          equals: doc.subCategory,
        },
      },
    })

    const otherSubCategories = await Promise.all(
      (doc.otherSubCategories || []).map(async (subCatId) => {
        const res = await payload.find({
          collection: 'sub-category',
          where: {
            id: {
              equals: subCatId,
            },
          },
        })
        return res.docs[0]
      }),
    )

    // console.log('Revalidating category:', category)
    payload.logger.info(`Revalidating old post at path: ${`/kategorii/${category.docs[0].slug}`}`)
    revalidatePath(`/kategorii/${category.docs[0].slug}`)

    // revalidate subCategory
    // console.log('Revalidating subCategory:', subCategory)
    payload.logger.info(
      `Revalidating old post at path: ${`/kategorii/${subCategory.docs[0].slug}`}`,
    )
    revalidatePath(`/kategorii/${subCategory.docs[0].slug}`)

    // revalidate otherSubCategories
    otherSubCategories?.forEach((subCat) => {
      // console.log('Revalidating otherSubCategory:', subCat)
      payload.logger.info(`Revalidating old post at path: ${`/kategorii/${subCat.slug}`}`)
      revalidatePath(`/kategorii/${subCat.slug}`)
    })

    revalidateTag('produkt-sitemap')

    revalidateTag('category-sitemap')
  }

  return doc
}
