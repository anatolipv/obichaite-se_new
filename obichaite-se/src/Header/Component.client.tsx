'use client'
import React, { useCallback, useEffect, useState } from 'react'

import { Header, Media } from '@/payload-types'
import { generateHref, LinkObject } from '@/utils/generateHref'
import Link from 'next/link'
import { DataFromGlobalSlug } from 'payload'
import { useAppDispatch } from '@/hooks/redux-hooks'
import { GenericImage } from '@/components/Generic'
import { SearchLogo, ShoppingCartIcon, UserProfileIcon } from '@/assets/icons'

const HeaderClient = ({ headerData }: { headerData: DataFromGlobalSlug<'header'> }) => {
  const dispatch = useAppDispatch()
  const { categoryItems, logo } = headerData as Header

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

  const linksContent = categoryItems?.map((item, i) => {
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

        {i < categoryItems.length - 1 && (
          <div className="bg-primaryWhite w-[2px] h-[30px] ml-4 hidden xl:block"></div>
        )}
      </li>
    )
  })

  // const categoriesContent = categoryItems?.map((item, i) => {
  //   if (!item?.link?.label) return null

  //   return (
  //     <li className="w-fit flex items-center" key={`${item?.link?.label}${i}`}>
  //       <Link
  //         href={generateHref(item as LinkObject)}
  //         aria-label={item?.link?.label}
  //         target={item?.link?.newTab ? '_blank' : '_self'}
  //         className="hover:opacity-75 transition-all duration-300 ease-in-out"
  //         prefetch={true}
  //       >
  //         <span className="text-[24px] font-montserrat-semiBoldItalic text-primaryWhite">
  //           {item?.link?.label}
  //         </span>
  //       </Link>

  //       {i < categoryItems.length - 1 && (
  //         <div className="bg-primaryWhite w-[2px] h-[30px] ml-4 hidden xl:block"></div>
  //       )}
  //     </li>
  //   )
  // })

  return (
    <header className="w-full h-[60px] xl:h-[70px] fixed z-[11] top-0 left-0 right-0 flex">
      <nav
        className="w-full content_wrapper_mobile-full bg-white flex justify-between items-center"
        // style={{ overflowX: 'visible', overflowY: 'visible' }}
      >
        <Link href={'/'} aria-label="Отиди на начална страница">
          <GenericImage
            src={(logo as Media)?.url as string}
            alt={(logo as Media)?.alt as string}
            wrapperClassName="w-[158px] h-[50px] flex items-center justify-center relative"
            imageClassName="w-full h-full object-contain"
            fill={true}
          />
        </Link>

        <ul className="flex items-center gap-2 px-2">
          <li>
            <button
              className="w-[48px] h-[48px] rounded-full flex justify-center items-center border-[1px] border-brown p-[5px]"
              aria-label="Потребител / Вход"
              title="Потребител"
            >
              <UserProfileIcon />
            </button>
          </li>
          <li>
            <button
              className="w-[48px] h-[48px] rounded-full flex justify-center items-center border-[1px] border-brown pb-[7px] pt-[5px]"
              aria-label="Търсене на продукт"
              title="Търсене на продукт"
            >
              <SearchLogo />
            </button>
          </li>
          <li>
            <button
              className="w-[48px] h-[48px] rounded-full flex justify-center items-center border-[1px] border-brown p-[3px] relative"
              aria-label="Потребител количка"
              title="Потребител количка"
            >
              <div
                className="absolute z-[2] top-[-5px] right-[-5px] w-[20px] h-[20px] rounded-full bg-bordo text-white
              flex justify-center items-center"
              >
                <p className="text-white font-sensation font-[700] text-[12px]">0</p>
              </div>
              <ShoppingCartIcon />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default HeaderClient
