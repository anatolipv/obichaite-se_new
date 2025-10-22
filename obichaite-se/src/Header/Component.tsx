import React from 'react'
import { getCachedGlobal } from '@/utils/getGlobals'

import type { Header } from '@/payload-types'
import HeaderClient from './Component.client'
import { BlogForSearchProps, CategoriesForSearch, SubCategoriesForSearch } from './types'

export async function Header({
  blogsForSearch,
  categoriesForSearch,
  subCategoriesForSearch,
}: {
  blogsForSearch: BlogForSearchProps
  categoriesForSearch: CategoriesForSearch
  subCategoriesForSearch: SubCategoriesForSearch
}) {
  const headerData = (await getCachedGlobal('header', 1)()) as Header

  return (
    <HeaderClient
      headerData={headerData}
      blogsForSearch={blogsForSearch}
      categoriesForSearch={categoriesForSearch}
      subCategoriesForSearch={subCategoriesForSearch}
    />
  )
}
