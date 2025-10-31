'use client'

import React, { useEffect } from 'react'
import subCategoryRaw from '../../../../sub-category-seed.json'

const categoryMap = {
  thematic: {
    id: 3,
    title: 'Тематични подаръци',

    heading: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,

        children: [
          {
            tag: 'h2',
            type: 'heading',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                mode: 'normal',
                text: 'Тематични подаръци',
                type: 'text',
                style: '',
                detail: 0,
                format: 1,
                version: 1,
              },
            ],
            direction: null,
          },
        ],
        direction: null,
        textFormat: 1,
      },
    },

    description: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,

        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                mode: 'normal',
                text: 'Подзаглавие за категория',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
        ],
        direction: null,
      },
    },

    media: {
      id: 13,
      alt: 'Тематични подаръци',
      updatedAt: '2025-10-23T12:56:21.203Z',
      createdAt: '2025-10-23T12:56:21.203Z',
      url: '/api/media/file/female-holding-gift-box-with-ribbon-in-her-hands-2025-10-09-10-52-32-utc.jpg',
      thumbnailURL: null,
      filename: 'female-holding-gift-box-with-ribbon-in-her-hands-2025-10-09-10-52-32-utc.jpg',
      mimeType: 'image/jpeg',
      filesize: 226217,
      width: 1320,
      height: 1320,
      focalX: 50,
      focalY: 50,
    },
    slug: 'tematichni-podarytsi',
  },
  handmade: {
    id: 4,
    title: 'Ръчноизработени подаръци',

    heading: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,

        children: [
          {
            tag: 'h2',
            type: 'heading',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                mode: 'normal',
                text: 'Ръчноизработени подаръци',
                type: 'text',
                style: '',
                detail: 0,
                format: 1,
                version: 1,
              },
            ],
            direction: null,
            textFormat: 1,
          },
        ],
        direction: null,
        textFormat: 1,
      },
    },

    description: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,

        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                mode: 'normal',
                text: 'Подзаглавие за категория',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
        ],
        direction: null,
      },
    },

    media: {
      id: 14,
      alt: 'Ръчноизработени подаръци',
      updatedAt: '2025-10-23T12:57:06.166Z',
      createdAt: '2025-10-23T12:57:06.166Z',
      url: '/api/media/file/male-hands-hold-female-hands-in-theirs-heart-in-h-2024-11-25-11-50-29-utc.JPG',
      thumbnailURL: null,
      filename: 'male-hands-hold-female-hands-in-theirs-heart-in-h-2024-11-25-11-50-29-utc.JPG',
      mimeType: 'image/jpeg',
      filesize: 451921,
      width: 1320,
      height: 880,
      focalX: 50,
      focalY: 50,
    },
    slug: 'rychnoizraboteni-podarytsi',
  },
  emotional: {
    id: 2,
    title: 'Емоционални Изненади',

    heading: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,

        children: [
          {
            tag: 'h2',
            type: 'heading',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                mode: 'normal',
                text: 'Емоционални Изненади',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
          },
        ],
        direction: null,
      },
    },

    description: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,

        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                mode: 'normal',
                text: 'Подзаглавие за категория',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
        ],
        direction: null,
      },
    },

    media: {
      id: 12,
      alt: 'Емоционални Изненади',
      updatedAt: '2025-10-23T12:54:31.708Z',
      createdAt: '2025-10-23T12:54:31.708Z',
      url: '/api/media/file/close-friends-sitting-on-the-counterpane-among-pre-2024-10-18-08-47-52-utc.jpg',
      thumbnailURL: null,
      filename: 'close-friends-sitting-on-the-counterpane-among-pre-2024-10-18-08-47-52-utc.jpg',
      mimeType: 'image/jpeg',
      filesize: 290741,
      width: 1320,
      height: 880,
      focalX: 50,
      focalY: 50,
    },
    slug: 'emotsionalni-iznenadi',
  },
  extreme: {
    id: 5,
    title: 'Екстремни преживявания',

    heading: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,

        children: [
          {
            tag: 'h2',
            type: 'heading',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                mode: 'normal',
                text: 'Екстремни преживявания',
                type: 'text',
                style: '',
                detail: 0,
                format: 1,
                version: 1,
              },
            ],
            direction: null,
            textFormat: 1,
          },
        ],
        direction: null,
        textFormat: 1,
      },
    },

    description: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,

        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                mode: 'normal',
                text: 'Подзаглавие за категория',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
        ],
        direction: null,
      },
    },

    media: {
      id: 15,
      alt: 'Екстремни преживявания',
      updatedAt: '2025-10-23T12:58:07.601Z',
      createdAt: '2025-10-23T12:58:07.601Z',
      url: '/api/media/file/parachuting-with-the-sunset-2025-01-28-02-24-55-utc.jpg',
      thumbnailURL: null,
      filename: 'parachuting-with-the-sunset-2025-01-28-02-24-55-utc.jpg',
      mimeType: 'image/jpeg',
      filesize: 199275,
      width: 1320,
      height: 880,
      focalX: 50,
      focalY: 50,
    },
    slug: 'ekstremni-prezhivyavaniya',
  },
  events: {
    id: 6,
    title: 'Организиране на събития',

    heading: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,

        children: [
          {
            tag: 'h2',
            type: 'heading',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                mode: 'normal',
                text: 'Организиране на събития',
                type: 'text',
                style: '',
                detail: 0,
                format: 1,
                version: 1,
              },
            ],
            direction: null,
            textFormat: 1,
          },
        ],
        direction: null,
        textFormat: 1,
      },
    },

    description: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,

        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                mode: 'normal',
                text: 'Подзаглавие за категория',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
        ],
        direction: null,
      },
    },

    media: {
      id: 16,
      alt: 'Организиране на събития',
      updatedAt: '2025-10-23T13:04:25.295Z',
      createdAt: '2025-10-23T13:04:25.295Z',
      url: '/api/media/file/square-wooden-wedding-arch-on-outdoor-sunset-weddi-2024-09-17-06-15-12-utc.jpg',
      thumbnailURL: null,
      filename: 'square-wooden-wedding-arch-on-outdoor-sunset-weddi-2024-09-17-06-15-12-utc.jpg',
      mimeType: 'image/jpeg',
      filesize: 420446,
      width: 1320,
      height: 880,
      focalX: 50,
      focalY: 50,
    },
    slug: 'organizirane-na-sybitiya',
  },
}

const Page = () => {
  //   useEffect(() => {
  //     const maped = subCategoryRaw.map((item, index) => ({
  //       id: index + 2,
  //       title: !!item.title ? item.title : item.name,
  //       slug: item.slug.split(' ').join('-'),
  //       meta: {
  //         title: 'Test',
  //         image: 2,
  //         description: '{Title} Под Категория - изберете вашия желан продукт',
  //       },
  //       parentCategory: !!item?.section_key
  //         ? categoryMap?.[item?.section_key as unknown as keyof typeof categoryMap]?.id || 6
  //         : example.parentCategory.id,
  //       slugLock: false,
  //       _status: 'published',
  //       updatedAt: '2025-10-30T08:45:56.512Z',
  //       createdAt: '2025-10-30T08:44:16.900Z',
  //     }))

  //     console.log(maped)
  //   }, [])

  return <div>Page</div>
}

export default Page

export const example = {
  id: 1,
  title: 'Тест',
  meta: {
    title: 'Test',

    image: {
      id: 2,
      alt: 'Лого',
      updatedAt: '2025-10-22T10:36:02.444Z',
      createdAt: '2025-10-22T10:35:53.526Z',
      url: '/api/media/file/logo-full.png',
      thumbnailURL: null,
      filename: 'logo-full.png',
      mimeType: 'image/png',
      filesize: 9771,
      width: 308,
      height: 100,
      focalX: 50,
      focalY: 50,
    },
    description: '{Title} Под Категория - изберете вашия желан продукт',
  },
  parentCategory: {
    id: 1,
    title: 'Продукти',
    heading: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,

        children: [
          {
            tag: 'h2',
            type: 'heading',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                mode: 'normal',
                text: 'Продукти',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
          },
        ],
        direction: null,
      },
    },

    description: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,

        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                mode: 'normal',
                text: 'Подзаглавие за категория',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
        ],
        direction: null,
      },
    },

    media: {
      id: 11,
      alt: 'Общи артикули',
      updatedAt: '2025-10-23T12:52:25.436Z',
      createdAt: '2025-10-23T12:50:18.699Z',
      url: '/api/media/file/abstract-picture-for-valentine-day-vintage-filter-2025-03-24-11-06-56-utc.jpg',
      thumbnailURL: null,
      filename: 'abstract-picture-for-valentine-day-vintage-filter-2025-03-24-11-06-56-utc.jpg',
      mimeType: 'image/jpeg',
      filesize: 500287,
      width: 1320,
      height: 905,
      focalX: 50,
      focalY: 50,
    },
    slug: 'produkti',
  },
  publishedAt: null,
  slug: 'test',
  slugLock: false,
  updatedAt: '2025-10-30T08:45:56.512Z',
  createdAt: '2025-10-30T08:44:16.900Z',
  _status: 'published',
}

const singleProductSection = {
  id: '56',
  section_key: 'thematic',
  product_id: '128',
  category_id: '4',
  sort_order: '0',
  is_active: '1',
  created_at: '2025-10-04 19:03:53',
  updated_at: '2025-10-04 19:03:53',
}

const productSingle = {
  id: '128',
  name: 'Фотоалбум "Честито дипломиране!" в кутия',
  sku: '20843424',
  description:
    'Фотоалбум "Честито дипломиране!" в кутия \/за 200 снимки с размер 15 см. х 10 см.\/.\r\n- с място за отбелязване на събитията\r\nРазмер - 26,5 см. х 21 см. х 5,5 см.\r\nЦената е за 1 брой.',
  price: '26.90',
  price_eur: null,
  image: 'products\/p_68c52ebede6530.43814495.webp',
  tags: '',
  created_at: '2025-09-13 11:43:42',
  updated_at: '2025-10-04 20:32:55',
  in_stock: '1',
  category_id: '8',
}

const subCategory = {
  id: '4',
  section_key: 'thematic',
  title: 'Подаръци за дипломиране',
  slug: 'graduation',
  sort_order: '0',
  is_active: '1',
  created_at: '2025-09-29 10:19:42',
  updated_at: '2025-09-29 10:19:42',
}

const categorySingleProducts = {
  id: '2',
  name: 'Чаши',
  slug: 'mugs',
  created_at: '2025-09-10 12:35:03',
  title_bg: null,
  title_en: null,
  is_active: '1',
}
