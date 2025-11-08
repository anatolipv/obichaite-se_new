
import type { CollectionAfterChangeHook } from 'payload';

export const setOrderNumber: CollectionAfterChangeHook = async ({
  doc,
  operation,
  context,
  req,
}) => {
  // Only on create
  if (operation !== 'create') return doc;

  // If already set or we've already run this once → do nothing
  if (doc.orderNumber || context?.orderNumberSet) return doc;
  console.log(doc.orderNumber)
  console.log("wtf")
  const updated = await req.payload.update({
    collection: 'orders',
    id: doc.id,
    data: {
      orderNumber: String(doc.id),
    },
    context: {
      ...context,
      orderNumberSet: true,
    },
  });

  return updated;
};


