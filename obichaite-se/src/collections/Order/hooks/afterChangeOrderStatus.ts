import { sendChangeStatusOrderEmail } from '@/action/mail'
import { Order } from '@/payload-types'
import type { CollectionAfterChangeHook } from 'payload'

const statusMap = {
  pending: 'Очаква обработка',
  processing: 'Обработва се',
  shipped: 'Изпратена',
  delivered: 'Доставена',
  returned: 'Върната',
  cancelled: 'Отказана',
}

export const afterChangeOrderStatus: CollectionAfterChangeHook = async ({
  doc,
  previousDoc: previousDoc,
  operation,
}) => {
  if (previousDoc.status !== doc.status && operation !== 'create') {
    const document = doc as Order
    sendChangeStatusOrderEmail({
      orderId: document.id,
      items: document.items.map((item) => {
        return {
          name: item.productTitle,
          quantity: item.quantity,
        }
      }),
      total: document.total as number,
      userName: document.customerName as string,
      userEmail: document.customerEmail as string,
      orderNumber: document.orderNumber as string,
      orderStatus: statusMap[doc.status as keyof typeof statusMap],
    })
  }

  return doc
}
