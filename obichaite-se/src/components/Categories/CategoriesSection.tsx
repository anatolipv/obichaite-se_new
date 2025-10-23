import { Category, Media } from '@/payload-types'
import React from 'react'
import { GenericButton, GenericHeading, GenericImage, GenericParagraph } from '../Generic'
import { RichText } from '../Custom'
import Link from 'next/link'

const CategoriesSection = ({ categories }: { categories: Category[] }) => {
  const categoriesContent = categories.map((category, index) => {
    const isIndexOdd = index % 2 === 0

    const media = category.media as Media

    return (
      <li
        key={category.id}
        className={`w-full h-[400px] md:h-[340px] relative flex items-center p-6 ${
          isIndexOdd ? 'justify-start' : 'justify-end'
        }`}
      >
        <GenericImage
          src={media.url as string}
          alt={media.alt}
          wrapperClassName="absolute z-[0] inset-0"
          imageClassName="w-full h-full object-cover"
          fill={true}
          focalX={media?.focalX || 50}
          focalY={media?.focalY || 50}
          sizes="100vw"
          updatedAt={media?.updatedAt as string}
        />

        <div className="w-full md:w-[55%] bg-black/70 h-full relative z-[2] flex flex-col justify-center gap-s p-6">
          {category.description && (
            <GenericParagraph fontStyle="font-kolka font-[500]" textColor="text-pink">
              <RichText data={category.description}></RichText>
            </GenericParagraph>
          )}
          {category.heading && (
            <GenericHeading
              headingType="h4"
              align="text-left"
              fontStyle="font-sansation font-[700]"
              textColor="text-white"
            >
              <RichText data={category.heading}></RichText>
            </GenericHeading>
          )}
          <div className='pt-4'>
            <Link href={`/category/${category.slug}`}>
              <GenericButton variant="outLined">Виж повече</GenericButton>
            </Link>
          </div>
        </div>
      </li>
    )
  })

  return (
    <section className="w-full min-h-[100svh] py-10 md:py-20 flex bg-pink/30">
      <div className="w-full content_wrapper m-auto">
        <ul className="w-full grid grid-cols-2 gap-6">{categoriesContent}</ul>
      </div>
    </section>
  )
}

export default CategoriesSection
