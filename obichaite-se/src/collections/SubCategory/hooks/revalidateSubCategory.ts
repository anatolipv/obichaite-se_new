import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { SubCategory } from '@/payload-types'

export const revalidateSubCategory: CollectionAfterChangeHook<SubCategory> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {

  return doc

  if (!context.disableRevalidate) {
    const parent = await payload.find({
      collection: 'category',
      where: {
        id: {
          equals: doc.parentCategory,
        },
      },
    })

    if (doc._status === 'published') {
      const path = `/kategorii/${parent.docs[0].slug}/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('subCategory-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/category/${parent.docs[0].slug}/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('subCategory-sitemap')
    }
  }
  return doc
}

export const revalidateDeleteSubCategory: CollectionAfterDeleteHook<SubCategory> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const parent = await payload.find({
      collection: 'category',
      where: {
        id: {
          equals: doc.parentCategory,
        },
      },
    })
    const path = `/kategorii/${parent.docs[0].slug}/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('subCategory-sitemap')
  }

  return doc
}
