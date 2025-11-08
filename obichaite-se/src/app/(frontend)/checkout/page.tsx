import Checkout from '@/components/Checkout/Checkout'
import CheckoutForm from '@/components/Checkout/CheckoutForm'
import { GenericImage } from '@/components/Generic'
import React from 'react'

const CheckoutPage = () => {
  return (
    <section className="w-full relative py-10 md:py-20 flex mt-[52px] md:mt-[140px]">
      <GenericImage
        src="/static/auth-background.png"
        alt="auth-background"
        wrapperClassName="w-full h-full absolute top-0 left-0 z-[0]"
        imageClassName="w-full h-full object-cover"
        fill={true}
        sizes="100vw"
        fetchPriority="high"
      />

      <div className="px-4 md:px-6 w-full content_wrapper white_background_bubble md:py-10 relative z-[1] rounded-[24px] flex flex-col-reverse md:flex-row">
        <div className="flex-1 px-4">
          <Checkout />
        </div>

        <div className="flex-1 px-4">
          <CheckoutForm />
        </div>
      </div>
    </section>
  )
}

export default CheckoutPage

{
  /* <div className="bg-white z-[2] rounded-tr-[12px] rounded-tl-[12px] md:rounded-[12px] overflow-hidden relative">
          <div className="absolute z-[2] bg-black/20 py-2 left-0 right-0 top-[28px] border-t-[1px] border-b-[1px] border-white/20">
            <GenericParagraph
              pType="regular"
              textColor="text-white"
              fontStyle="font-sansation font-[700]"
              extraClass="uppercase w-full text-center"
            >
              <span>Поръчка</span>
            </GenericParagraph>
          </div>

          <div className="absolute z-[2] bg-black/20 py-[2px] left-0 right-0 bottom-[0px] border-t-[1px] flex justify-center items-center border-b-[1px] border-white/20">
            <Link href="/terms" className="w-full text-white text-center">
              <span className="font-kolka font-[400] text-white text-center text-[14px] w-full">
                Политика за поверителност
              </span>
            </Link>
          </div>
        </div> */
}
