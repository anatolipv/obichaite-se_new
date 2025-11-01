import { Product } from '@/payload-types'

export type SortFilters = '' | 'bestseller' | 'discount' | 'new' | 'price-asc' | 'price-desc'

export const sortProducts = (products: Product[], sort: SortFilters) => {
  switch (sort) {
    case 'bestseller':
      return products.sort((a, b) => {
        const currentA = a.bestSeller ? 1 : 0
        const currentB = b.bestSeller ? 1 : 0
        return currentB - currentA
      })
    case 'discount':
      return products.sort((a, b) => {
        const currentA = a.promoPrice ? 1 : 0
        const currentB = b.promoPrice ? 1 : 0
        return currentB - currentA
      })
    case 'new':
      return products.sort((a, b) => b.id - a.id)
    case 'price-asc':
      return products.sort((a, b) => {
        const currentA = a.promoPrice ? a.promoPrice : a.price || 0
        const currentB = b.promoPrice ? b.promoPrice : b.price || 0
        return currentA - currentB
      })
    case 'price-desc':
      return products.sort((a, b) => {
        const currentA = a.promoPrice ? a.promoPrice : a.price || 0
        const currentB = b.promoPrice ? b.promoPrice : b.price || 0
        return currentB - currentA
      })
    default:
      return products
  }
}
