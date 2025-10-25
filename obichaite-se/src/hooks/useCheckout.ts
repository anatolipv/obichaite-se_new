'use client'

import { useAppSelector } from './redux-hooks'

export function useCheckout() {
  const products = useAppSelector((state) => state.checkout.products)

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => {
      if (product?.promoPrice) {
        return total + product.promoPrice
      }

      return total + product.price
    }, 0)
  }

  return { calculateTotalPrice }
}
