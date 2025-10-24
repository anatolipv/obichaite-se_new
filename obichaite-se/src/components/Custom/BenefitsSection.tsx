import { Media, Page } from '@/payload-types'
import React from 'react'
import Background from './Background'
import { GenericHeading, GenericImage } from '../Generic'

const BenefitsSection = ({ benefits }: { benefits: Page['benefits'] }) => {
  const benefitsContent = benefits
    ? benefits.map((benefit) => {
        const media = benefit.media as Media
        return (
          <li className="w-full" key={benefit.id}>
            <div className="w-full flex flex-col items-center justify-center gap-m relative z-[3]">
              <GenericImage
                src={media.url as string}
                alt={media.alt}
                wrapperClassName="w-[150px] h-[150px] md:w-[256px] md:h-[256px] relative"
                imageClassName="w-full h-full object-contain"
                fill={true}
                unoptimized={true}
                sizes="256px"
                updatedAt={media?.updatedAt as string}
              />

              <GenericHeading
                headingType="h5"
                fontStyle="font-sansation font-[700]"
                textColor="text-white"
                align='text-center'
                extraClass='px-4 md:px-6'
              >
                <h4>{benefit.title}</h4>
              </GenericHeading>
            </div>
          </li>
        )
      })
    : []

  return (
    <section className="w-full py-10 md:py-20 relative min-h-[100svh] md:min-h-[80svh] flex">
      <Background />

      <div className="w-full content_wrapper grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 my-auto">
        {benefitsContent}
      </div>
    </section>
  )
}

export default BenefitsSection
