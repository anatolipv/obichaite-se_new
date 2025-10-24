import { Media, Product } from '@/payload-types'
import React from 'react'
import { GenericHeading, GenericImage, GenericParagraph } from '../Generic'
import { priceToEuro } from '@/utils/calculatePriceFromLvToEuro'

const ProductCard = ({ product }: { product: Product }) => {
  const {
    mediaArray,
    title,
    category,
    shortDescription,
    bestSeller,
    promoPrice,
    havePriceRange,
    price,
  } = product

  const mediaToShow = mediaArray?.[0].file as Media

  return (
    <article className="w-full border-[1px] border-bordo">
      <div className="w-full flex flex-col px-4 pt-4">
        <div className="p-2 border-[1px] border-bordo">
          <GenericImage
            src={mediaToShow?.url as string}
            alt={mediaToShow?.alt}
            wrapperClassName="w-full h-[320px] rounded-t-[16px] overflow-hidden relative"
            imageClassName="w-full h-full object-contain"
            fill={true}
            updatedAt={mediaToShow?.updatedAt as string}
          />
        </div>

        <div className="w-full h-[110px] bg-red-500/20 flex justify-between items-center">
          <div className="w-full max-w-[66%] px-4">
            <GenericHeading
              headingType="h5"
              fontStyle="font-sansation font-[700] italic"
              textColor="text-brown"
              extraClass="line-clamp-3 text-[18px] leading-[110%] break-words"
              customStyles={true}
            >
              <h3>{title}</h3>
            </GenericHeading>
          </div>
          <div className="w-full max-w-[34%] flex flex-col px-1">
            <GenericParagraph
              pType="large"
              fontStyle="font-sansation font-[700]"
              textColor="text-mixPink"
              extraClass='text-center'
            >
              {price.toFixed(1)}лв
            </GenericParagraph>
            <div className="w-full h-[1px] bg-mixPink/80"></div>
            <GenericParagraph
              pType="large"
              fontStyle="font-sansation font-[700]"
              textColor="text-mixPink"
              extraClass="text-center"
            >
              {priceToEuro(price)}€
            </GenericParagraph>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
