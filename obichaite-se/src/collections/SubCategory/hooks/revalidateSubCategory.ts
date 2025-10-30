import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { SubCategory } from '@/payload-types'

export const revalidateSubCategory: CollectionAfterChangeHook<SubCategory> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/category/${doc.slug}` //TODO

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('subCategory-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/category/${previousDoc.slug}` //TODO

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('subCategory-sitemap')
    }
  }
  return doc
}

export const revalidateDeleteSubCategory: CollectionAfterDeleteHook<SubCategory> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/category/${doc?.slug}` //TODO

    revalidatePath(path)
    revalidateTag('subCategory-sitemap')
  }

  return doc
}
