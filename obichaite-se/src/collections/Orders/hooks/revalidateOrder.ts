// import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

// import { revalidatePath, revalidateTag } from 'next/cache'
// import { Order } from '@/payload-types'

// export const revalidateOrder: CollectionAfterChangeHook<Order> = ({
//   doc,
//   previousDoc,
//   req: { payload, context },
// }) => {
//   console.log("********")
//   console.log(doc, 'doc')
//   console.log(previousDoc, 'previousDoc')


//   if (!context.disableRevalidate) {
//     if (doc._status === 'published') {
//       const path = `/orders/${doc.slug}`

//       payload.logger.info(`Revalidating post at path: ${path}`)

//       revalidatePath(path)
//       revalidateTag('category-sitemap')
//     }

//     // If the post was previously published, we need to revalidate the old path
//     if (previousDoc._status === 'published' && doc._status !== 'published') {
//       const oldPath = `/category/${previousDoc.slug}`

//       payload.logger.info(`Revalidating old post at path: ${oldPath}`)

//       revalidatePath(oldPath)
//       revalidateTag('category-sitemap')
//     }
//   }
//   return doc
// }

// export const revalidateDeleteCategory: CollectionAfterDeleteHook<Category> = ({
//   doc,
//   req: { context },
// }) => {
//   if (!context.disableRevalidate) {
//     const path = `/category/${doc?.slug}`

//     revalidatePath(path)
//     revalidateTag('category-sitemap')
//   }

//   return doc
// }
