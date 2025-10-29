'use client'

import { Media, Product } from '@/payload-types'
import React, { useState } from 'react'
import { GenericImage } from '../Generic'
import { ArrowIcon } from '@/assets/icons'

const isBrowser = typeof window !== 'undefined'

const ProductPreview = ({ mediaArray }: { mediaArray: Product['mediaArray'] }) => {
  const [indexOfImageToShow, setIndexOfImageToShow] = useState(0)
  const [imageSliderTransitionPosition, setImageSliderTransitionPosition] = useState(0)

  const disabledRightArrow = indexOfImageToShow === (!!mediaArray && mediaArray?.length - 1)
  const disabledLeftArrow = indexOfImageToShow === 0

  //FLOWS //TODO
  // 1. only one image
  // 2. more then one slider

  const calculateTransitionValue = () => {
    if (!isBrowser) return 409

    if (window.innerWidth < 768) return window.innerWidth - 24

    return 409
  }

  const imagesContent = mediaArray
    ? mediaArray.map((image) => {
        if (!image) return

        const currentImage = image.file as Media

        return (
          <GenericImage
            key={image.id}
            src={currentImage.url as string}
            alt={currentImage.alt}
            wrapperClassName="w-full min-w-full md:w-[unset] md:min-w-[unset] md:aspect-square h-full relative bg-white "
            imageClassName="w-full h-full object-contain"
            fill={true}
            unoptimized={true}
            sizes="256px"
            updatedAt={currentImage?.updatedAt as string}
          />
        )
      })
    : []

  const imagesContentPreview = mediaArray
    ? mediaArray.map((image, index) => {
        if (!image) return

        const currentImage = image.file as Media

        return (
          <button
            key={image.id}
            type="button"
            aria-label="Покажи тази снимка"
            onClick={() => {
              setIndexOfImageToShow(index)
              const transitionPosition = index * calculateTransitionValue()
              setImageSliderTransitionPosition(-transitionPosition)
            }}
          >
            <GenericImage
              src={currentImage.url as string}
              alt={currentImage.alt}
              wrapperClassName={`p-1 border-[1px] border-brown/80 aspect-square h-full relative bg-white rounded-[8px] overflow-hidden
                  ${indexOfImageToShow === index ? 'opacity-50' : ''} 
                  `}
              imageClassName="w-full h-full object-contain"
              fill={true}
              unoptimized={true}
              sizes="256px"
              updatedAt={currentImage?.updatedAt as string}
            />
          </button>
        )
      })
    : []

  return (
    <div className="flex-1 flex flex-col order-1 md:order-2">
      <div
        className="w-full h-[409px] md:w-[unset] md:aspect-square mx-auto overflow-hidden flex
      transition-transform duration-500 ease-out
      "
      >
        <div
          style={{
            transform: `translateX(${imageSliderTransitionPosition}px)`,
          }}
          className="transition-transform duration-500 ease-out w-full h-[409px] md:w-[unset] flex"
        >
          {imagesContent}
        </div>
      </div>
      <div className="w-full h-[116px] md:h-[80px] flex flex-col-reverse md:flex-row items-center justify-between p-1">
        <div className="w-full md:w-[70%] h-full flex justify-center items-stretch md:items-stretch md:justify-stretch gap-2 p-1">
          {imagesContentPreview}
        </div>

        <div className="flex items-center gap-2 justify-center py-2">
          <button
            aria-label="Снимка на ляво"
            className="w-[32px] h-[32px] flex justify-center items-center rotate-180 rounded-full bg-brown disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              setImageSliderTransitionPosition((prev) => prev + calculateTransitionValue())
              setIndexOfImageToShow((prev) => prev - 1)
            }}
            disabled={disabledLeftArrow}
          >
            <ArrowIcon color="white" />
          </button>

          <button
            aria-label="Снимка на ляво"
            className="w-[32px] h-[32px] flex justify-center items-center rounded-full bg-brown disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              setImageSliderTransitionPosition((prev) => prev - calculateTransitionValue())
              setIndexOfImageToShow((prev) => prev + 1)
            }}
            disabled={disabledRightArrow}
          >
            <ArrowIcon color="white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductPreview
