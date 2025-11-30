import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Product } from '@/payload-types'

export const revalidateProduct: CollectionAfterChangeHook<Product> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  const revalidateAll = async () => {
    revalidatePath('/kategorii/tematichni-podarytsi')

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

    try {
      revalidatePath(`/kategorii/${category.docs[0].slug}`)
      revalidatePath(`/kategorii/produkti/${subCategory.docs[0].slug}`)
      revalidatePath(`/kategorii/emotsionalni-iznenadi/${subCategory.docs[0].slug}`)
      revalidatePath(`/kategorii/tematichni-podarytsi/${subCategory.docs[0].slug}`)
      revalidatePath(`/kategorii/rychnoizraboteni-podarytsi/${subCategory.docs[0].slug}`)
      otherSubCategories?.forEach((subCat) => {
        revalidatePath(`/kategorii/produkti/${subCat.slug}`)
        revalidatePath(`/kategorii/emotsionalni-iznenadi/${subCat.slug}`)
        revalidatePath(`/kategorii/tematichni-podarytsi/${subCat.slug}`)
        revalidatePath(`/kategorii/rychnoizraboteni-podarytsi/${subCat.slug}`)
      })
    } catch (error) {
      console.error(error)
    }
    revalidateTag('produkt-sitemap')
  }

  // console.log('Revalidate Product Hook Triggered', doc)
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/produkt/${doc.slug}`

      console.log('REVALIDATE ALL')

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidateAll()
      revalidatePath(path)
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/produkt/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)

      revalidateAll()
    }
  }

  return doc
}

export const revalidateDeleteProduct: CollectionAfterDeleteHook<Product> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate && doc.slug) {
    const path = `/produkt/${doc?.slug}`

    revalidatePath(path)

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

    payload.logger.info(`Revalidating old post at path: ${`/kategorii/${category.docs[0].slug}`}`)
    revalidatePath(`/kategorii/${category.docs[0].slug}`)

    payload.logger.info(
      `Revalidating old post at path: ${`/kategorii/${subCategory.docs[0].slug}`}`,
    )
    revalidatePath(`/kategorii/${subCategory.docs[0].slug}`)

    otherSubCategories?.forEach((subCat) => {
      payload.logger.info(`Revalidating old post at path: ${`/kategorii/${subCat.slug}`}`)
      revalidatePath(`/kategorii/${subCat.slug}`)
    })

    revalidateTag('produkt-sitemap')

    revalidateTag('category-sitemap')
  }

  return doc
}
