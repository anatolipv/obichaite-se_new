// app/(shop)/checkout/actions.ts
'use server'

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { emailTemplates } from '@/emails/OrderToAdminEmail'

type OrderItem = {
  name: string
  quantity: number
}

type SendNewOrderEmailInput = {
  orderId: number
  items: OrderItem[]
  total: number
}

export async function sendNewOrderEmailAction({ orderId, items, total }: SendNewOrderEmailInput) {
  const payload = await getPayload({ config: configPromise })

  const adminOrderUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/order/${orderId}`
  const to = process.env.ADMIN_EMAIL! // сложи си го в .env

  const subject = emailTemplates.orders.newOrderNotification.subject({ orderId })
  const html = emailTemplates.orders.newOrderNotification.html({
    orderId,
    items,
    total,
    currency: 'лв.',
    adminOrderUrl,
  })

  await payload.sendEmail({
    to,
    subject,
    html,
  })

  return { ok: true }
}
