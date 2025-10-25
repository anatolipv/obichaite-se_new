'use client'

import React from 'react'
import { GenericParagraph } from '../Generic'
import { ArrowIcon, CloseCircle } from '@/assets/icons'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { setShoppingCardOpen } from '@/store/features/checkout'

const ShoppingCardAside = () => {
  const dispatch = useAppDispatch()
  const shoppingCardOpen = useAppSelector((state) => state.checkout.shoppingCardOpen)
//   const products = useAppSelector((state) => state.checkout.products)

  return (
    <aside
      className={`fixed top-0 bottom-0 right-0 w-full max-w-[500px] bg-white z-[12] flex flex-col
        transition-transform duration-500 ease-in-out
        ${shoppingCardOpen ? 'translate-x-0' : 'translate-x-[100%]'}`}
    >
      <div className="w-full flex relative justify-center items-center py-4">
        <GenericParagraph
          fontStyle="font-sansation font-[700]"
          pType="large"
          textColor="text-bordo"
        >
          Твоята Количка
        </GenericParagraph>

        <button
          className="absolute right-4 top-[50%] translate-y-[-50%] flex justify-center items-center w-[24px] h-[24px]"
          onClick={() => {
            dispatch(setShoppingCardOpen(false))
          }}
        >
          <CloseCircle />
        </button>
      </div>
      <div className="w-full flex justify-center items-center red_background py-4">
        <GenericParagraph fontStyle="font-kolka font-[500]" pType="small" textColor="text-white">
          Добави артикули за още {/*//TODO*/} 0 лева и доставката ще е безплатна
        </GenericParagraph>
      </div>

      <div className="flex-1 bg-green-500"></div>

      <div className="w-full py-2 px-4">
        <button
          className="w-full rounded-[24px] flex justify-between items-center red_background py-4 px-4"
          aria-label="Към поръчка"
        >
          <div className="flex justify-center items-center">
            <GenericParagraph
              fontStyle="font-sansation font-[700]"
              pType="small"
              textColor="text-white"
              extraClass="uppercase"
            >
              Към поръчка
            </GenericParagraph>

            <div className="w-[20px] h-[20px] flex justify-center items-center ml-1">
              <ArrowIcon color="white" />
            </div>
          </div>

          <div className="flex justify-center items-center">
            <GenericParagraph
              fontStyle="font-kolka font-[500]"
              pType="small"
              textColor="text-white"
            >
              {/*//TODO*/} 0 лева
            </GenericParagraph>
          </div>
        </button>
      </div>
    </aside>
  )
}

export default ShoppingCardAside
