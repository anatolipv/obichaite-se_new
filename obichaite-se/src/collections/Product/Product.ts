import type { CollectionConfig, Field } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utils/generatePreviewPath'
import {
  OverviewField,
  MetaTitleField,
  MetaImageField,
  MetaDescriptionField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
// import { revalidateProduct, revalidateDeleteProduct } from './hooks/revalidateProduct'
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'
import { revalidateDeleteProduct, revalidateProduct } from './hooks/revalidateCategory'

export const Product: CollectionConfig = {
  slug: 'product',
  labels: {
    singular: 'Продукт',
    plural: 'Продукти',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    id: true,
    heading: true,
    description: true,
    shortDescription: true,
    media: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'product',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'product',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'heading',
      type: 'richText',
      label: 'Heading',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      required: true,
      admin: {
        description: 'Заглавие на секцията с Продукта',
      },
    },
    {
      name: 'shortDescription',
      type: 'text',
      label: 'Кратко описание',
      required: true,
      admin: {
        description: 'Описание на Продукта (под заглавието)',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Описание',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      required: true,
      admin: {
        description: 'Описание на Продукта (под заглавието)',
      },
    },
    {
      name: 'mediaArray',
      type: 'array',
      label: 'Снимки',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'file',
          type: 'upload',
          label: 'Снимка',
          relationTo: 'media',
          required: true,
        } as Field,
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'category',
      required: true,
      admin: {
        position: 'sidebar',
        allowCreate: false,
        allowEdit: false,
        appearance: 'drawer',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'quantity',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'havePriceRange',
      type: 'checkbox',
      label: 'Има ли цена в диапазон',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'priceRange',
      type: 'number',
      required: false,
      admin: {
        position: 'sidebar',
        condition: (data) => data.havePriceRange,
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [revalidateDeleteProduct],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
