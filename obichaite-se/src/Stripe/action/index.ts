'use server'

import { ExtendedProduct } from '@/store/features/checkout'
import { stripe } from '..'

function calculateTotalAmount(items: ExtendedProduct[], discount: number = 0): number {
  let total = 0

  for (const item of items) {
    if (item.orderQuantity <= 0) continue

    const unitPrice = item?.promoPrice ? item.promoPrice : item.price || 0

    total += unitPrice * item.orderQuantity
  }

  if (total <= 0) {
    return 0
  }

  if (discount > 0) {
    total *= 1 - discount / 100
  }

  return total * 100
}

export async function createPaymentIntentAction(products: ExtendedProduct[]) {
  const amount = calculateTotalAmount(products)

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'BGN', //TODO need to be changed to lv
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      products: JSON.stringify(products.map(({ title, quantity }) => ({ title, quantity }))),
    },
  })

  return {
    clientSecret: paymentIntent.client_secret,
  }
}
