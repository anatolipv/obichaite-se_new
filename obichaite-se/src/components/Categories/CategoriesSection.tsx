import { Category, Media } from '@/payload-types'
import React from 'react'
import { GenericButton, GenericHeading, GenericImage, GenericParagraph } from '../Generic'
import { RichText } from '../Custom'
import Link from 'next/link'

const CategoriesSection = ({ categories }: { categories: Category[] }) => {
  const categoriesContent = categories.map((category, index) => {
    const isIndexOdd = index % 2 === 0

    const media = category.media as Media
    const mediaMobile = category.mediaMobile as Media

    return (
      <li
        key={category.id}
        className={`w-full h-[400px] md:h-[340px] relative flex items-center p-6 ${
          isIndexOdd ? 'justify-start' : 'justify-end'
        }`}
      >
        <>
          <GenericImage
            src={media.url as string}
            alt={media.alt}
            wrapperClassName="absolute z-[0] inset-0 portrait:hidden landscape:block"
            imageClassName="w-full h-full object-cover"
            fill={true}
            focalX={media?.focalX || 50}
            focalY={media?.focalY || 50}
            sizes="100vw"
            updatedAt={media?.updatedAt as string}
          />
          <GenericImage
            src={mediaMobile.url as string}
            alt={mediaMobile.alt}
            wrapperClassName="absolute z-[0] inset-0 portrait:block landscape:hidden"
            imageClassName="w-full h-full object-cover"
            fill={true}
            focalX={mediaMobile?.focalX || 50}
            focalY={mediaMobile?.focalY || 50}
            sizes="100vw"
            updatedAt={mediaMobile?.updatedAt as string}
          />
        </>

        <div
          className={`w-full md:w-[50%] bg-black/70 md:h-full relative z-[2] flex flex-col justify-center  gap-s py-8 md:py-6 px-6
        ${isIndexOdd ? 'md:items-start' : 'md:items-end'}
        `}
        >
          {category.description && (
            <GenericParagraph
              fontStyle="font-kolka font-[500]"
              textColor="text-pink"
              extraClass={`text-center ${isIndexOdd ? 'md:text-left' : 'md:text-right'}`}
            >
              <RichText data={category.description}></RichText>
            </GenericParagraph>
          )}
          {category.heading && (
            <GenericHeading
              headingType="h4"
              fontStyle="font-sansation font-[700]"
              textColor="text-white"
              extraClass={`${isIndexOdd ? 'md:text-left' : 'md:text-right'} text-center`}
            >
              <RichText data={category.heading}></RichText>
            </GenericHeading>
          )}
          <div className="pt-4">
            <Link prefetch={true} href={`/kategorii/${category.slug}`}>
              <GenericButton styleClass="w-full md:w-auto" variant="outLined">
                Виж повече
              </GenericButton>
            </Link>
          </div>
        </div>
      </li>
    )
  })

  return (
    <section className="w-full min-h-[100svh] py-10 md:py-20 flex bg-pink/30">
      <div className="w-full content_wrapper m-auto">
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">{categoriesContent}</ul>
      </div>
    </section>
  )
}

export default CategoriesSection
