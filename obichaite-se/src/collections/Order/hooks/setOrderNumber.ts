
import type { CollectionAfterChangeHook } from 'payload';
import { getPayload } from 'payload'
import config from '@payload-config'
export const setOrderNumber: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  context,
}) => {
  if (operation !== 'create') return
  const payload = await getPayload({ config })


  // await payload.update({
  //   collection: 'order',
  //   id: doc.id,
  //   data: { orderNumber: doc.id },
  //   overrideAccess: true,
  //   depth: 0,
  // })



  console.log("***logs***")
  console.log('previousDoc', previousDoc)
  console.log("doc", doc)

  return doc;
};


