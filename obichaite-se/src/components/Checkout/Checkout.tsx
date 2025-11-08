'use client'

import React from 'react'
import { GenericHeading } from '../Generic'
import { useAppSelector } from '@/hooks/redux-hooks'
import CheckoutProduct from './CheckoutProduct'

const Checkout = () => {
  const { products } = useAppSelector((state) => state.checkout)

  //form order
  //aside

  const productsContent = products.map((product) => {
    return <CheckoutProduct key={product.id} product={product} />
  })

  return (
    <div className="w-full flex flex-col gap-m">
      <div className="w-full flex flex-col gap-s">
        <GenericHeading
          headingType="h4"
          fontStyle="font-sansation font-[700]"
          textColor="text-bordo"
          extraClass="border-b-[1px] border-b-bordo/80 text-center"
        >
          <h2>Продукти</h2>
        </GenericHeading>
      </div>

      <ul className="w-full flex flex-col md:min-w-[500px] xl:min-w-[600px] gap-m">
        {productsContent}
      </ul>
    </div>
  )
}

export default Checkout
