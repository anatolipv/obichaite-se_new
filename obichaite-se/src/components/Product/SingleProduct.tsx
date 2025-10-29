import { Product } from '@/payload-types'
import React from 'react'
import ProductPreview from './ProductPreview'
import SingleCardMain from './SingleCardMain'
import SingleProductInfo from './SingleProductInfo'

const SingleProduct = ({ product }: { product: Product }) => {
  return (
    <article className="w-full content_wrapper py-10 md:py-20">
      <div className="flex flex-col md:flex-row w-full items-stretch justify-stretch relative">
        <div className="hidden md:block absolute left-[48px] top-[-24px] w-[calc(100%-96px)] h-[1px] bg-brown/20 z-[2]"></div>
        <div className="hidden md:block absolute left-[48px] bottom-[-24px] w-[calc(100%-96px)] h-[1px] bg-brown/20 z-[2]"></div>
        <SingleCardMain product={product} />
        <ProductPreview mediaArray={product.mediaArray} />
        <SingleProductInfo product={product} />
      </div>
    </article>
  )
}

export default SingleProduct
