'use client'

import { Category, Media, Product } from '@/payload-types'
import React, { useState } from 'react'
import { GenericButton, GenericHeading, GenericImage, GenericParagraph } from '../Generic'
import { priceToEuro } from '@/utils/calculatePriceFromLvToEuro'
import {
  BestSellerIcon,
  DetailsIcon,
  DiscountIcon,
  PhoneIcon,
  ShoppingCartIcon,
} from '@/assets/icons'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { addProductToShoppingCart } from '@/store/features/checkout'
import Link from 'next/link'
import { setNotification } from '@/store/features/notifications'

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch()
  const shoppingCartProducts = useAppSelector((state) => state.checkout.products)
  const productExistsInCart = shoppingCartProducts.find((item) => item.id === product.id)
  const {
    mediaArray,
    title,
    category,
    shortDescription,
    bestSeller,
    promoPrice,
    havePriceRange,
    priceRange,
    price,
  } = product

  const mediaToShow = mediaArray?.[0].file as Media

  const [isHover, setIsHover] = useState(false)

  const priceSection = !!price ? (
    <div className="w-full max-w-[40%] flex flex-col px-1 rounded-4 bg-white rounded-[4px]">
      <GenericParagraph
        pType="large"
        fontStyle="font-sansation font-[700]"
        textColor="text-brown"
        extraClass="text-center"
      >
        <span className={`${!!promoPrice && 'line-through text-[14px]'}`}>{price.toFixed(2)}</span>
        <span className={`${!!promoPrice && 'text-[16px] md:text-[20px]'}`}>
          {promoPrice && ` ${promoPrice.toFixed(2)}`}лв
        </span>
      </GenericParagraph>
      <div className="w-full h-[1px] bg-brown/80"></div>
      <GenericParagraph
        pType="large"
        fontStyle="font-sansation font-[700]"
        textColor="text-brown"
        extraClass="text-center"
      >
        <span className={`${!!promoPrice && 'line-through text-[14px]'}`}>
          {priceToEuro(price)}
        </span>
        <span className={`${!!promoPrice && 'text-[16px] md:text-[20px]'}`}>
          {!!promoPrice && ` ${priceToEuro(promoPrice)}`}€
        </span>
      </GenericParagraph>
    </div>
  ) : (
    <div className="w-full max-w-[40%] flex flex-col px-1">
      <GenericParagraph
        pType="large"
        fontStyle="font-sansation font-[700]"
        textColor="text-brown"
        extraClass="text-center"
      >
        <span className={`${!!havePriceRange && 'text-[16px]'}`}>
          {Number(priceRange?.split('-')?.[0]).toFixed(0)}-
          {Number(priceRange?.split('-')?.[1]).toFixed(0)}лв
        </span>
      </GenericParagraph>
      <div className="w-full h-[1px] bg-brown/80"></div>
      <GenericParagraph
        pType="large"
        fontStyle="font-sansation font-[700]"
        textColor="text-brown"
        extraClass="text-center"
      >
        <span className={`${!!havePriceRange && 'text-[16px]'}`}>
          {priceToEuro(Number(priceRange?.split('-')?.[0]))}-
          {priceToEuro(Number(priceRange?.split('-')?.[1]))}€
        </span>
      </GenericParagraph>
    </div>
  )

  return (
    <>
      {!!promoPrice && (
        <div className="w-[32px] h-[32px] md:w-[32px] md:h-[32px] absolute z-[3] top-0 left-0 translate-x-[20px] translate-y-[20px]">
          <DiscountIcon />
        </div>
      )}
      {!!bestSeller && (
        <div className="w-[32px] h-[32px] md:w-[36px] md:h-[36px] absolute z-[3] top-0 right-0 translate-x-[-20px] translate-y-[20px]">
          <BestSellerIcon />
        </div>
      )}
      <article
        className="w-full bg-[#e6cbcd] rounded-[16px] pb-[110px] relative overflow-hidden border-[1px] border-bordo/20"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => {
          if (isHover) {
            setIsHover(false)
          } else {
            setIsHover(true)
          }
        }}
      >
        <div
          className={`absolute z-[3] left-0 top-0 right-0 h-[270px]
            transition-[opacity,background-color] duration-500 ease-linear
            flex justify-center items-center flex-col gap-m
            ${
              isHover
                ? 'bg-bordo/80 opacity-100 pointer-events-auto'
                : 'bg-transparent opacity-0 pointer-events-none'
            }`}
        >
          <>
            {product?.havePriceRange ? (
              <GenericButton
                variant="white"
                styleClass="uppercase [&>div>svg]:hover:stroke-bordo gap-[6px] min-w-[146px]"
                click={() => {
                  dispatch(addProductToShoppingCart({ ...product, orderQuantity: 1 }))
                  dispatch(
                    setNotification({
                      showNotification: true,
                      message: !!productExistsInCart
                        ? `Kъм (${product?.title}) беше дованен 1 брой`
                        : `(${product?.title}) беше добавен в количката`,
                      type: 'success',
                    }),
                  )
                }}
                type="button"
                ariaLabel="Добави"
              >
                <div
                  className="w-[24px] h-[24px] flex justify-center items-center
           [&>svg]:transition-all duration-300 ease-in-out"
                >
                  <PhoneIcon />
                </div>
              </GenericButton>
            ) : (
              <GenericButton
                variant="white"
                styleClass="uppercase [&>div>svg_path]:hover:fill-bordo gap-[6px]"
                click={() => {
                  dispatch(addProductToShoppingCart({ ...product, orderQuantity: 1 }))
                  dispatch(
                    setNotification({
                      showNotification: true,
                      message: !!productExistsInCart
                        ? `Kъм (${product?.title}) беше дованен 1 брой`
                        : `(${product?.title}) беше добавен в количката`,
                      type: 'success',
                    }),
                  )
                }}
                type="button"
                ariaLabel="Добави"
              >
                <p>Добави</p>
                <div
                  className="w-[24px] h-[24px] flex justify-center items-center
          [&>svg_path]:fill-white [&>svg_path]:transition-all duration-300 ease-in-out"
                >
                  <ShoppingCartIcon />
                </div>
              </GenericButton>
            )}
          </>

          <Link href={`/produkt/${product?.slug}`}>
            <GenericButton
              variant="white"
              styleClass="uppercase [&>div>svg_path]:hover:fill-bordo gap-[6px]"
              click={() => {}}
              type="button"
              ariaLabel="Добави"
            >
              <p>Детайли</p>
              <div
                className="w-[20px] h-[20px] flex justify-center items-center
          [&>svg_path]:fill-white [&>svg_path]:transition-all duration-300 ease-in-out"
              >
                <DetailsIcon />
              </div>
            </GenericButton>
          </Link>
        </div>
        <div className="w-full flex flex-col px-4 pt-4">
          <div className="p-2 border-[1px] border-bordo/20 rounded-[12px] overflow-hidden bg-white relative">
            <GenericImage
              src={mediaToShow?.url as string}
              alt={mediaToShow?.alt}
              wrapperClassName="w-full h-[340px] rounded-[16px] overflow-hidden relative"
              imageClassName="w-full h-full object-contain"
              fill={true}
              updatedAt={mediaToShow?.updatedAt as string}
            />
            <div className="w-full absolute bottom-0 left-0 right-0 bg-brown/70 z-[2] px-2 py-1">
              <GenericParagraph
                fontStyle="font-kolka font-[500]"
                pType="semi"
                textColor="text-white"
                extraClass="text-[18px] leading-[110%] break-words text-center"
              >
                {(category as Category)?.title}
              </GenericParagraph>
            </div>
          </div>

          <div
            className={`w-full h-[220px] flex flex-col absolute bottom-0 left-0 right-0 z-[2] px-4
            transition-[transform] duration-500 ease-in-out
         ${!isHover ? 'translate-y-[110px]' : 'translate-y-[0px]'}
        `}
          >
            <div
              className={`absolute z-[0] top-0 left-0 right-0 h-[220px]
            transition-[background-color] duration-500 ease-in-out
          ${isHover ? 'bg-white' : 'bg-transparent'}
          `}
            ></div>
            <div className="w-full flex justify-between items-center h-[110px] relative z-[2]">
              <div className="w-full max-w-[66%]">
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

              {priceSection}
            </div>
            <div className="w-full flex justify-between items-center h-[110px] px-2 relative z-[2] border-t-[1px] border-bordo/20">
              {!!shortDescription && (
                <GenericParagraph
                  extraClass="text-center line-clamp-3 text-[18px] leading-[110%] break-words w-full"
                  fontStyle="font-kolka font-[400]"
                  textColor="text-brown"
                >
                  <p>{shortDescription}</p>
                </GenericParagraph>
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default ProductCard
