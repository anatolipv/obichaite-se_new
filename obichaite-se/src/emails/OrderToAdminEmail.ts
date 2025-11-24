// lib/emailTemplates.ts

import { OrderStatus } from './templates/OrderChangeStatusEmail'
import { OrderConfirmed } from './templates/OrderConfirmed'
import { OrderToAdmin } from './templates/OrderToAdmin'

export const emailTemplates = {
  orders: {
    newOrderNotification: OrderToAdmin,
    orderConfirmed: OrderConfirmed,
    orderStatus: OrderStatus,
  },
}
