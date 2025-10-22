import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { FormBlock } from '@/blocks/Form/config'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      label: 'Навиционни Линкове',
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 3,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      label: 'Категориини Линкове',
      name: 'categoryItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 4,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'ctaItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 1,
      label: 'Бутони',
    },
    {
      name: 'logo',
      type: 'upload',
      maxDepth: 2,
      relationTo: 'media',
      required: true,
      label: 'Лого',
    },
    {
      name: 'form',
      type: 'blocks',
      blocks: [FormBlock],
      label: 'Форма за Абониране',
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
