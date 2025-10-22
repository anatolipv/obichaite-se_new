import React from 'react'

import type { Footer, Media } from '@/payload-types'

import { getCachedGlobal } from '@/utils/getGlobals'
import { BlobV2, RichText } from '@/components/Custom'
import Link from 'next/link'
import { GenericHeading, GenericImage } from '@/components/Generic'
import { generateHref, LinkObject } from '@/utils/generateHref'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData.navItems
    ? footerData.navItems.map((item) => {
        return (
          <li className="w-fit flex items-center" key={item.id || item?.link?.label}>
            <Link
              href={generateHref(item as LinkObject)}
              aria-label={item?.link?.label}
              target={item?.link?.newTab ? '_blank' : '_self'}
              className="hover:opacity-75 transition-all duration-300 ease-in-out"
              prefetch={true}
            >
              <span className="text-[24px] font-montserrat-semiBoldItalic text-primaryWhite leading-[120%]">
                {item?.link?.label}
              </span>
            </Link>
          </li>
        )
      })
    : []

  const regulatoryItems = footerData.regulatoryLinks
    ? footerData.regulatoryLinks.map((item, index) => {
        const isItLast = index === footerData.regulatoryLinks!.length - 1
        return (
          <React.Fragment key={item.id || item?.link?.label}>
            <li className="w-fit flex items-center">
              <Link
                href={generateHref(item as LinkObject)}
                aria-label={item?.link?.label}
                target={item?.link?.newTab ? '_blank' : '_self'}
                className="hover:opacity-75 transition-all duration-300 ease-in-out"
                prefetch={true}
              >
                <span className="text-[14px] font-montserrat-semiBoldItalic text-primaryWhite leading-[120%]">
                  {item?.link?.label}
                </span>
              </Link>
            </li>
            {!isItLast && (
              <span className="text-[14px] font-montserrat-semiBoldItalic text-primaryWhite leading-[120%]">
                |
              </span>
            )}
          </React.Fragment>
        )
      })
    : []

  const socialImages = footerData.socialLinks
    ? footerData.socialLinks.map((item, index) => {
        return (
          <li
            className="w-fit flex items-center"
            key={item.id || index}
            title={`
            ${item.link?.label}`}
          >
            <Link
              href={generateHref(item as LinkObject)}
              aria-label={item?.link?.label}
              target={item?.link?.newTab ? '_blank' : '_self'}
              className="hover:opacity-75 transition-all duration-300 ease-in-out"
              prefetch={true}
              rel="noopener noreferrer"
            >
              <GenericImage
                src={(item?.media as Media)?.url as string}
                alt={(item?.media as Media)?.alt as string}
                wrapperClassName="w-[32px] h-[32px] flex items-center justify-center relative"
                imageClassName="w-full h-full object-contain"
                fill={true}
              />
            </Link>
          </li>
        )
      })
    : []

  return (
    <footer
      id="footer"
      className="REF_OBSERVE_ME border-t border-primaryGrayAccent pt-[40px] pb-[160px] xl:py-[80px] relative flex flex-col"
    >
      <BlobV2 />
      <div className="w-full content_wrapper pt-2 pb-14 md:py-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-11 relative z-[5] gap-[40px] xl:gap-[unset]">
        <div className="w-full justify-center items-center flex xl:justify-start xl:items-start xl:col-span-2">
          <Link href="/" className="flex items-center gap-4">
            <span className="sr-only">(България Помни)</span>
            <GenericImage
              src={(footerData.logo as Media)?.url as string}
              alt={(footerData.logo as Media)?.alt as string}
              wrapperClassName="w-[150px] aspect-[5/3] flex items-center justify-center relative"
              imageClassName="w-full h-full object-contain"
              fill={true}
            />
          </Link>
        </div>

        <div className="w-full flex flex-col gap-m justify-center items-center xl:justify-start xl:items-start xl:col-span-3">
          <GenericHeading
            align="text-left"
            extraClass="uppercase border-b-[1px] border-primaryWhite pb-2 w-fit"
            fontStyle="font-montserrat-semibold"
            headingType="h5"
            textColor="text-primaryWhite"
          >
            <h6>за нас</h6>
          </GenericHeading>

          <div className="w-fit">
            <RichText
              data={footerData?.contacts as SerializedEditorState}
              className="font-montserrat-regular text-[20px] text-primaryWhite [&_p]:text-[16px]"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-m justify-center items-center xl:justify-start xl:items-start xl:col-span-3">
          <GenericHeading
            align="text-left"
            extraClass="uppercase border-b-[1px] border-primaryWhite pb-2 w-fit"
            fontStyle="font-montserrat-semibold"
            headingType="h5"
            textColor="text-primaryWhite"
          >
            <h6>навигация</h6>
          </GenericHeading>

          <ul className="flex flex-col gap-4 justify-center items-center xl:justify-start xl:items-start">
            {navItems}
          </ul>
        </div>

        <div className="w-full flex flex-col gap-m justify-center items-center xl:justify-start xl:items-start xl:col-span-3">
          <GenericHeading
            align="text-left"
            extraClass="uppercase border-b-[1px] border-primaryWhite pb-2 w-fit"
            fontStyle="font-montserrat-semibold"
            headingType="h5"
            textColor="text-primaryWhite"
          >
            <h6>социални мрежи</h6>
          </GenericHeading>

          <ul className="flex gap-4">{socialImages}</ul>
        </div>
      </div>

      <ul className="flex flex-wrap w-full max-w-[90%] mx-auto justify-center items-center gap-2 md:gap-4 relative z-[5] mt-6 md:mt-12">
        {regulatoryItems}
      </ul>

      <div className="absolute bottom-0 w-full border-t-[1px] border-primaryGrayAccent flex flex-col md:flex-row justify-between items-center py-2 px-2 xl:px-4 z-[5]">
        <p className="font-montserrat-regular text-[16px] leading-[120%] text-primaryWhite text-center md:text-left">
          България Помни е независим дигитален архив с биографии, събития и епохи от българската
          история.© {new Date().getFullYear()} Всички права запазени.
        </p>
        <div className="w-full bg-primaryGrayAccent h-[1px] md:hidden my-2"></div>
        <p className="font-montserrat-regular text-[16px] leading-[120%] text-primaryWhite">
          Генерирано от <span className="font-montserrat-semibold">Симеон Рудашки</span>{' '}
        </p>
      </div>
    </footer>
  )
}
