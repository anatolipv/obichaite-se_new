import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload';
import { revalidateTag } from 'next/cache';
// import { revalidatePath } from 'next/cache'; // ако решиш да биеш конкретни пътища

// If you have generated types, you can do:
// import type { Order } from '@/payload-types';

export const revalidateOrdersAfterChange: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (context?.disableRevalidate) {
    return doc;
  }

  // Generic: invalidate anything that depends on orders
  payload.logger.info(
    `Revalidating orders after change. ID: ${doc.id}`,
  );
  revalidateTag('order');

  return doc;
};

export const revalidateOrdersAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload, context },
}) => {
  if (context?.disableRevalidate) {
    return doc;
  }

  if (doc) {
    payload.logger.info(
      `Revalidating orders after delete. ID: ${doc.id}`,
    );
  }

  revalidateTag('order');
  return doc;
};
