import { greatVibes } from '@/app/fonts'
import Background from '@/components/Custom/Background'
import { GenericHeading, GenericImage } from '@/components/Generic'
import { CommonHero, Media } from '@/payload-types'
import React from 'react'

const HeroCommon: React.FC<CommonHero> = (props) => {
  const { heading, description, mediaMobile, media } = props

  return (
    <section
      className={`w-full min-h-[100svh] flex relative ${greatVibes.variable} flex md:pt-[140px]`}
      id="hero"
    >
      <div className="absolute top-[140px] left-0 right-0 bottom-0">
        <Background />
      </div>

      <div className="w-full content_wrapper flex flex-col z-[2] py-10 md:py-20">
        <div className="w-full min-h-[307px] bg-white flex">
          <div className="flex-1 bg-red-500"></div>
          <div className="flex-1 bg-green-500 flex justify-center items-center">
            {/* <GenericHeading
              headingType="h1"
              align="text-center"
              customStyles={true}
              fontStyle="font-great-vibes"
              textColor="text-bordo"
            >
              <h1>{heading}</h1>
            </GenericHeading> */}
          </div>
        </div>
        <div className="w-full h-[474px]">
          <GenericImage
            src={(media as Media).url || ''}
            alt={(media as Media).alt || ''}
            wrapperClassName="w-full h-full relative"
            fill={true}
            priority={true}
            focalX={(media as Media).focalX || 50}
            focalY={(media as Media).focalY || 50}
            imageClassName="w-full h-full object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroCommon
