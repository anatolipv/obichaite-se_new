'use client'
import React, { useCallback, useEffect, useState } from 'react'

import { MenuIcon, SearchIcon } from '@/assets/icons'
import { Search } from '@/components/Custom'
import { GenericHeading, GenericImage } from '@/components/Generic'
import GenericButton from '@/components/Generic/GenericButton'
import { Header, Media } from '@/payload-types'
import { generateHref, LinkObject } from '@/utils/generateHref'
import Link from 'next/link'
import { DataFromGlobalSlug } from 'payload'
import { BlogForSearchProps, CategoriesForSearch, SubCategoriesForSearch } from './types'
import { useAppDispatch } from '@/hooks/redux-hooks'
import { setComponentData, setComponents, setIsActive } from '@/store/features/modal'

const HeaderClient = ({
  headerData,
  blogsForSearch,
  categoriesForSearch,
  subCategoriesForSearch,
}: {
  headerData: DataFromGlobalSlug<'header' | 'footer'>
  blogsForSearch: BlogForSearchProps
  categoriesForSearch: CategoriesForSearch
  subCategoriesForSearch: SubCategoriesForSearch
}) => {
  const dispatch = useAppDispatch()
  const { navItems, logo, form } = headerData as Header

  const [searchOpen, setSearchOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  const closeSearchHandler = useCallback(() => setSearchOpen(false), [])

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [openMenu])

  const setFormComponentData = () => {
    if (!form?.[0]) return

    dispatch(setIsActive(true))
    dispatch(setComponentData(form[0]))
    dispatch(setComponents('subscribe'))
  }

  const linksContent = navItems?.map((item, i) => {
    if (!item?.link?.label) return null

    return (
      <li className="w-fit flex items-center" key={`${item?.link?.label}${i}`}>
        <Link
          href={generateHref(item as LinkObject)}
          aria-label={item?.link?.label}
          target={item?.link?.newTab ? '_blank' : '_self'}
          className="hover:opacity-75 transition-all duration-300 ease-in-out"
          prefetch={true}
        >
          <span className="text-[24px] xl:text-[20px] xxl:text-[24px] font-montserrat-semiBoldItalic text-primaryWhite">
            {item?.link?.label}
          </span>
        </Link>

        {i < navItems.length - 1 && (
          <div className="bg-primaryWhite w-[2px] h-[30px] ml-4 hidden xl:block"></div>
        )}
      </li>
    )
  })

  const categoryItems = 'categoryItems' in headerData ? headerData.categoryItems : []

  const categoriesContent = categoryItems?.map((item, i) => {
    if (!item?.link?.label) return null

    return (
      <li className="w-fit flex items-center" key={`${item?.link?.label}${i}`}>
        <Link
          href={generateHref(item as LinkObject)}
          aria-label={item?.link?.label}
          target={item?.link?.newTab ? '_blank' : '_self'}
          className="hover:opacity-75 transition-all duration-300 ease-in-out"
          prefetch={true}
        >
          <span className="text-[24px] font-montserrat-semiBoldItalic text-primaryWhite">
            {item?.link?.label}
          </span>
        </Link>

        {i < categoryItems.length - 1 && (
          <div className="bg-primaryWhite w-[2px] h-[30px] ml-4 hidden xl:block"></div>
        )}
      </li>
    )
  })

  return (
    <header className="w-full h-[60px] xl:h-[82px] fixed z-[11] top-0 left-0 right-0 flex">
      <nav
        className="hidden xl:flex content_wrapper  w-full rounded-bl-[16px] rounded-br-[16px] overflow-x-clip items-center px-4
       bg-primaryBlack/20 glass
       "
        style={{ overflowX: 'visible', overflowY: 'visible' }}
      >
        <div className="flex items-center gap-4">
          <Link href={'/'}>
            <GenericImage
              src={(logo as Media)?.url as string}
              alt={(logo as Media)?.alt as string}
              wrapperClassName="w-[80px] aspect-[5/3] flex items-center justify-center relative"
              imageClassName="w-full h-full object-contain"
              fill={true}
            />
          </Link>

          <div className="hidden xl:block min-w-[300px]">
            <Search
              blogsForSearch={blogsForSearch}
              closeSearchHandler={closeSearchHandler}
              categoriesForSearch={categoriesForSearch}
              subCategoriesForSearch={subCategoriesForSearch}
            />
          </div>
        </div>

        <div className="items-center ml-auto gap-4 hidden xl:flex">
          <ul className="items-center gap-4 flex">{linksContent}</ul>
          <div>
            <GenericButton
              variant="primary"
              ariaLabel="Абонирай се"
              type="button"
              click={() => {
                setFormComponentData()
              }}
            >
              Абонирай се
            </GenericButton>
          </div>
        </div>
      </nav>
      <nav
        className={`flex xl:hidden w-full overflow-x-clip items-center px-4 justify-between  relative
      ${openMenu || searchOpen ? 'bg-primaryBlack' : 'bg-primaryBlack/20 glass'}
      `}
      >
        <Link href="/" className="flex items-center gap-4">
          <GenericImage
            src={(logo as Media)?.url as string}
            alt={(logo as Media)?.alt as string}
            wrapperClassName="w-[48px] h-[48px] flex items-center justify-center relative"
            imageClassName="w-full h-full object-contain"
            fill={true}
          />
        </Link>

        <div className="flex items-center gap-4">
          <button
            aria-label="Отвори Търсене"
            className="size-[32px]"
            onClick={() => {
              setSearchOpen((prev) => !prev)
              setOpenMenu(false)
            }}
          >
            <SearchIcon />
          </button>

          <button
            aria-label="Отвори Меню"
            className="size-[32px]"
            onClick={() => {
              setOpenMenu((prev) => !prev)
              setSearchOpen(false)
            }}
          >
            <MenuIcon />
          </button>
        </div>

        <div
          className={`absolute bottom-0 translate-y-[100%] left-0 right-0 px-4 bg-primaryBlack/80 xl:bg-primaryBlack/20 py-2 xl:py-1 z-[2]
          transition-[transform] duration-300 ease-in-out
          ${searchOpen ? 'translate-x-0' : 'translate-x-[100%]'}
          `}
        >
          <Search
            blogsForSearch={blogsForSearch}
            closeSearchHandler={closeSearchHandler}
            categoriesForSearch={categoriesForSearch}
            subCategoriesForSearch={subCategoriesForSearch}
          />
        </div>

        <div
          className={`absolute h-[calc(100svh-60px)] max-h-[calc(100svh-60px)] overflow-y-auto gray_green_scrollbar bottom-0 translate-y-[100%] 
            left-0 right-0 px-4 bg-primaryBlack pt-4 py-1 z-[2]
                transition-[transform] duration-300 ease-in-out flex flex-col
          ${openMenu ? 'translate-x-0' : 'translate-x-[100%]'}
          `}
          onClick={() => setOpenMenu(false)}
        >
          <div className="w-full my-4 flex flex-col gap-m">
            <GenericHeading
              align="text-center"
              fontStyle="font-montserrat-bold"
              headingType="h4"
              textColor="text-primaryWhite"
              extraClass="border-b-[1px] border-t-[1px] py-1 border-primaryWhite w-full uppercase"
            >
              <h4>Навигация</h4>
            </GenericHeading>
            <ul className="items-center gap-m flex flex-col">{linksContent}</ul>
          </div>

          <div className="w-full my-4 flex flex-col gap-m ">
            <GenericHeading
              align="text-center"
              fontStyle="font-montserrat-bold"
              headingType="h4"
              textColor="text-primaryWhite"
              extraClass="border-b-[1px] border-t-[1px] py-1 border-primaryWhite w-full uppercase"
            >
              <h4>Категории</h4>
            </GenericHeading>

            <ul className="items-center gap-m flex flex-col">{categoriesContent}</ul>
          </div>

          <div className="mt-auto w-full mb-4 sticky bottom-4">
            <GenericButton
              variant="primary"
              ariaLabel="Абонирай се"
              type="button"
              styleClass="w-full"
              click={() => {
                setOpenMenu(false)
                setSearchOpen(false)
                setFormComponentData()
              }}
            >
              Абонирай се
            </GenericButton>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default HeaderClient
