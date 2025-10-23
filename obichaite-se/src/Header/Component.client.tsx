'use client'
import React, { useCallback, useEffect, useState } from 'react'

import { Header, Media } from '@/payload-types'
import { generateHref, LinkObject } from '@/utils/generateHref'
import Link from 'next/link'
import { DataFromGlobalSlug } from 'payload'
import { useAppDispatch } from '@/hooks/redux-hooks'
import { GenericImage, GenericParagraph } from '@/components/Generic'
import { ArrowIcon, MenuIcon, SearchLogo, ShoppingCartIcon, UserProfileIcon } from '@/assets/icons'

const HeaderClient = ({ headerData }: { headerData: DataFromGlobalSlug<'header'> }) => {
  const dispatch = useAppDispatch()
  const { categoryItems, logo } = headerData as Header

  const [searchOpen, setSearchOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [openCategoryIndex, setOpenCategoryIndex] = useState(-1)

  const closeSearchHandler = useCallback(() => setSearchOpen(false), [])

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [openMenu])

  const linksContent = categoryItems?.map((item, i) => {
    if (!item?.link?.label) return null

    return (
      <li className="w-fit flex items-center" key={`${item?.link?.label}${i}`}>
        <Link
          href={generateHref(item as LinkObject)}
          aria-label={item?.link?.label}
          target={item?.link?.newTab ? '_blank' : '_self'}
          className="[&>button>span]:hover:underline transition-all duration-300 ease-in-out"
          prefetch={true}
        >
          <div
            className="w-full h-full flex items-center gap-[4px] relative"
            onMouseEnter={() => setOpenCategoryIndex(i + 1)}
          >
            <span className="text-[14px] font-sensation font-[400] text-white">
              {item?.link?.label}
            </span>
            <button
              className={`flex justify-center items-center w-[16px] h-[16px]
                transition-transform duration-500 ease-in-out ${
                  openCategoryIndex === i + 1 ? 'rotate-[-90deg]' : 'rotate-90'
                }`}
            >
              <ArrowIcon color="white" />
            </button>

            <div
              className={`w-full h-[1px] absolute top-full bg-white left-0
                transition-[max-width] duration-500 ease-in-out
            ${openCategoryIndex === i + 1 ? 'max-w-full' : 'max-w-0'}`}
            ></div>
          </div>
        </Link>
      </li>
    )
  })

  const currentMedia = categoryItems?.[openCategoryIndex - 1]?.media as Media

  const currentChildren =
    openCategoryIndex !== -1 ? categoryItems?.[openCategoryIndex - 1]?.children : null

  const childrenContent = !!currentChildren
    ? currentChildren.map((item) => {
        return (
          <li
            key={item.id}
            className="w-[24%] min-w-[24%] h-[60px] hover:border-[1px] hover:border-brown rounded-[16px] 
            hover:bg-brown transition-[colors,box-shadow] duration-500 ease-in-out [&>a>button>span]:hover:text-white hover:shadow-lg"
          >
            <Link
              href={generateHref(item as LinkObject)}
              aria-label={item?.link?.label}
              target={item?.link?.newTab ? '_blank' : '_self'}
              prefetch={true}
              className="w-full h-full"
            >
              <button className="w-full h-full flex justify-center items-center">
                <span className="text-[14px] font-sensation font-[400] text-brown transition-colors duration-500">
                  {item?.link?.label}
                </span>
              </button>
            </Link>
          </li>
        )
      })
    : []

  return (
    <header
      className="w-full fixed z-[11] top-0 left-0 right-0 flex flex-col bg-white"
      onMouseLeave={() => setOpenCategoryIndex(-1)}
    >
      <nav
        className="w-full content_wrapper_mobile-full bg-white flex justify-between items-center h-[52px] md:h-[70px]"
        // style={{ overflowX: 'visible', overflowY: 'visible' }}
        onMouseEnter={() => setOpenCategoryIndex(-1)}
      >
        <Link href={'/'} aria-label="Отиди на начална страница">
          <GenericImage
            src={(logo as Media)?.url as string}
            alt={(logo as Media)?.alt as string}
            wrapperClassName="w-[116px] h-[41px] md:w-[158px] md:h-[50px] flex items-center justify-center relative"
            imageClassName="w-full h-full object-contain"
            fill={true}
          />
        </Link>

        <ul className="flex items-center gap-2 px-2">
          <li>
            <Link href={'/login'} aria-label="Към вход" className="flex items-center gap-2">
              <GenericParagraph
                pType="regular"
                extraClass="hidden md:block"
                fontStyle="font-sansation font-[700]"
              >
                Вход
              </GenericParagraph>
              <button
                className="w-[32px] h-[32px] md:w-[48px] md:h-[48px] rounded-full flex justify-center items-center border-[1px] border-brown p-[5px]"
                aria-label="Потребител / Вход"
                title="Потребител"
              >
                <UserProfileIcon />
              </button>
            </Link>
          </li>
          <li>
            <button
              className="w-[32px] h-[32px] md:w-[48px] md:h-[48px] rounded-full flex justify-center items-center border-[1px] border-brown pb-[7px] pt-[5px]"
              aria-label="Търсене на продукт"
              title="Търсене на продукт"
            >
              <SearchLogo />
            </button>
          </li>
          <li className="flex items-center gap-2">
            <div className="hidden flex-col md:flex">
              <GenericParagraph pType="small" textColor="text-brown">
                Количка
              </GenericParagraph>
              {/* //TODO dynamic price */}
              <GenericParagraph pType="small" textColor="text-bordo" extraClass="tracking-tighter">
                0.00 BGN
              </GenericParagraph>
            </div>
            <button
              className="w-[32px] h-[32px] md:w-[48px] md:h-[48px] rounded-full flex justify-center items-center border-[1px] border-brown p-[3px] relative"
              aria-label="Потребител количка"
              title="Потребител количка"
            >
              <div
                className="absolute z-[2] top-[-5px] right-[-5px] w-[16px] h-[16px] md:w-[20px] md:h-[20px] rounded-full bg-bordo text-white
              flex justify-center items-center"
              >
                {/* //TODO dynamic count */}
                <p className="text-white font-sensation font-[700] text-[10px] md:text-[12px]">0</p>
              </div>
              <ShoppingCartIcon />
            </button>
          </li>
          <li className="md:hidden">
            <button
              className="w-[34px] h-[34px] rounded-full flex justify-center items-center border-[1px] border-brown pb-[7px] pt-[5px]"
              aria-label="Меню отваряне"
              title="Меню отваряне"
            >
              {/* //TODO change the icon */}
              <MenuIcon />
            </button>
          </li>
        </ul>
      </nav>
      <nav className="w-full bg-brown justify-between items-center h-[70px] hidden md:flex">
        <ul
          className="content_wrapper_mobile-full w-full flex justify-between items-center gap-2 px-2"
          aria-label="Навигация на категории"
        >
          {linksContent}
        </ul>
      </nav>
      <div
        className={`w-full h-[400px] bg-white absolute top-full left-0 right-0 z-[-1] border-b-[1px] border-brown
          transition-[transform,opacity] duration-500 ease-in-out p-6 white_background_forms ${
            openCategoryIndex > -1
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : 'translate-y-[-400px] opacity-0 pointer-events-none'
          }`}
      >
        <div className="w-full h-full content_wrapper flex justify-stretch items-stretch">
          <nav className="w-[75%] h-full p-6">
            <ul className="w-full h-full flex flex-wrap gap-2 max-h-[376px] overflow-y-auto">
              {childrenContent}
            </ul>
          </nav>
          <div className="w-[25%] min-w-[25%] h-full p-6">
            {currentMedia?.url && (
              <GenericImage
                src={currentMedia?.url || ''}
                alt={currentMedia?.alt || ''}
                wrapperClassName="w-full h-full aspect-square rounded-[16px] overflow-hidden relative"
                imageClassName="w-full h-full object-cover"
                fill={true}
                focalX={currentMedia?.focalX || 50}
                focalY={currentMedia?.focalY || 50}
                sizes="512px"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderClient
