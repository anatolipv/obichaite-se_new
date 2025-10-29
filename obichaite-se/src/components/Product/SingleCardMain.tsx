'use client'

import { Category, Product } from '@/payload-types'
import Link from 'next/link'
import React, { useState } from 'react'
import { GenericHeading, GenericParagraph } from '../Generic'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import {
  addOrderQuantity,
  addProductToShoppingCart,
  removeOrderQuantity,
} from '@/store/features/checkout'
import { ArrowIcon, MinusIcon, PlusIcon } from '@/assets/icons'
import { priceToEuro } from '@/utils/calculatePriceFromLvToEuro'
import { setNotification } from '@/store/features/notifications'

const SingleCardMain = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch()
  const shoppingCartProducts = useAppSelector((state) => state.checkout.products)
  const existsInCart = shoppingCartProducts.find((item) => item.id === product.id)
  const [orderQuantity, setOrderQuantity] = useState(existsInCart?.orderQuantity || 1)
  const { category, title } = product //TODO add subCategory

  const currentCategory = category as Category

  //   useEffect(() => {
  //     if (existsInCart) {
  //       setOrderQuantity(existsInCart.orderQuantity)
  //     }
  //   }, [shoppingCartProducts])

  return (
    <div className="flex-1 relative order-2 md:order-1">
      <div className="hidden md:block absolute left-0 top-[48px] w-[1px] h-[calc(100%-96px)] bg-brown/20 z-[2]"></div>
      <div className="hidden md:block absolute right-0 top-[48px] w-[1px] h-[calc(100%-96px)] bg-brown/20 z-[2]"></div>
      <div className="flex flex-col p-4 md:p-6 w-full h-full">
        <Link href={`/kategorii/${currentCategory.slug}/subCategory`}>
          <GenericParagraph
            fontStyle="font-sansation font-[700]"
            pType="regular"
            textColor="text-mixPink"
            extraClass="cursor-pointer"
          >
            Под Категория Име
          </GenericParagraph>
        </Link>
        {!!title && (
          <GenericHeading
            align="text-left"
            fontStyle="font-sansation font-[700]"
            headingType="h1"
            textColor="text-brown"
            customStyles={true}
            extraClass="text-[28px] sm:text-[36px] md:text-[40px] xl:text-[48px] 2xl:text-[48px] leading-[100%] mt-4 md:mt-6"
          >
            <h1>{title}</h1>
          </GenericHeading>
        )}

        <div className="flex justify-between items-center px-2 py-3 mt-auto mb-4">
          <div className="flex justify-center items-center gap-3">
            <button
              className="p-2 max-w-[32px] max-h-[32px] flex justify-center items-center rounded-full border-[1px] border-brown
                          disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                if (!!existsInCart) {
                  dispatch(removeOrderQuantity({ id: product.id }))
                }
                setOrderQuantity((prev) => prev - 1)
              }}
              disabled={orderQuantity === 1}
              aria-label="Премахни единица"
              title="Премахни единица"
              aria-disabled={orderQuantity === 1}
            >
              <MinusIcon />
            </button>

            <div className="border-[1px] bg-brown border-brown px-3 py-1 flex justify-center items-center">
              <GenericParagraph
                fontStyle="font-kolka font-[500]"
                pType="regular"
                textColor="text-white"
                extraClass="text-center"
              >
                {orderQuantity}
              </GenericParagraph>
            </div>

            <button
              className="p-2 max-w-[32px] max-h-[32px] flex justify-center items-center rounded-full border-[1px] border-brown"
              onClick={() => {
                if (!!existsInCart) {
                  dispatch(addOrderQuantity({ id: product.id }))
                }
                setOrderQuantity((prev) => prev + 1)
              }}
              aria-label="Добави единица"
              title="Добави единица"
              aria-disabled={false}
              disabled={false}
            >
              <PlusIcon />
            </button>
          </div>

          <div>
            <GenericParagraph
              fontStyle="font-sansation font-[700]"
              pType="large"
              textColor="text-bordo"
            >
              <>
                {product?.promoPrice ? (
                  <>
                    {(product.promoPrice * orderQuantity).toFixed(1)} лв. (
                    {priceToEuro(product.promoPrice * orderQuantity)})€
                  </>
                ) : (
                  <>
                    {(product.price! * orderQuantity).toFixed(1)} лв. (
                    {priceToEuro(product.price! * orderQuantity)})€
                  </>
                )}
              </>
            </GenericParagraph>
          </div>
        </div>

        <div className="w-full">
          <button
            className="w-full rounded-[24px] flex  justify-center items-center red_background py-4 px-4
                      [&>div>div>svg]:hover:animate-bounce disabled:cursor-not-allowed disabled:opacity-50
                      "
            aria-label="Добави в Количка"
            title="Добави в Количка"
            onClick={() => {
              dispatch(addProductToShoppingCart({ ...product, orderQuantity: orderQuantity }))
              dispatch(
                setNotification({
                  showNotification: true,
                  message: existsInCart ? `Kъм (${product?.title}) бяха добавени ${orderQuantity} ${orderQuantity > 1 ? 'единици' : 'единица'}`  :  `(${product?.title}) беше добавен в количката`,
                  type: 'success',
                }),
              )
            }}
            disabled={orderQuantity === 0}
            aria-disabled={orderQuantity === 0}
          >
            <div className="flex justify-center items-center">
              <GenericParagraph
                fontStyle="font-sansation font-[700]"
                pType="small"
                textColor="text-white"
                extraClass="uppercase"
              >
                Добави в Количка
              </GenericParagraph>

              <div className="w-[20px] h-[20px] flex justify-center items-center ml-1">
                <ArrowIcon color="white" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleCardMain
