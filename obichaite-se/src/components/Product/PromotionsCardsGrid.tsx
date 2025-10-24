import { Product } from '@/payload-types'
import React from 'react'
import { GenericHeading } from '../Generic'
import ProductCard from './ProductCard'

const PromotionsCardsGrid = ({ products, heading }: { products: Product[]; heading: string }) => {
  const promotionCardContent = products.map((product) => {
    return (
      <li key={product.id} className="w-full relative">
        <ProductCard product={product} />
      </li>
    )
  })

  return (
    <section className="w-full py-10 md:py-20 relative min-h-[100svh] flex white-pink-background">
      <div className="w-full flex flex-col gap-m content_wrapper">
        <div className="w-full">
          <GenericHeading
            headingType="h2"
            fontStyle="font-sansation font-[700]"
            textColor="text-bordo"
            extraClass="border-b-[1px] border-b-bordo/80"
          >
            <h2>{heading}</h2>
          </GenericHeading>
        </div>

        <ul className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {promotionCardContent}
        </ul>
      </div>
    </section>
  )
}

export default PromotionsCardsGrid
