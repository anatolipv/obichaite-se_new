import React from 'react'
// import { Metadata } from 'next'
import { StoreProvider } from '@/store/StoreProvider'
import '../../assets/styles/general.scss'
import { Header } from '@/Header/Component'
import './global.css'
import { kolka, sansation } from '@/app/fonts'
import { Footer } from '@/Footer/Component'
import Search from '@/components/Search/Search'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Product } from '@/payload-types'

// const SITE_NAME = 'Обичайте се'

//TODO!
// export const metadata: Metadata = {
//   metadataBase: new URL('https://www.bulgaria-pomni.vercel.app/'),
//   applicationName: SITE_NAME,
//   title: {
//     default: SITE_NAME,
//     template: `%s`,
//   },
//   description:
//     'България Помни – блог за личности и истории, които прославят България. Биографии, събития и културно наследство, поднесени с внимание към детайла.',
//   keywords: [
//     'България',
//     'българска история',
//     'известни българи',
//     'личности',
//     'култура',
//     'история',
//     'биография',
//     'наука',
//     'изкуство',
//   ],
//   authors: [{ name: 'Симеон Рудашки' }],
//   creator: 'България Помни',
//   publisher: 'България Помни',
//   referrer: 'origin-when-cross-origin',

//   alternates: {
//     canonical: '/',
//     languages: {
//       bg: '/',
//       //en: '/en', // TODO: когато има EN версия; до тогава можеш да го махнеш
//     },
//   },

//   openGraph: {
//     type: 'website',
//     siteName: SITE_NAME,
//     title: SITE_NAME,
//     description: 'България Помни – блог за личности и истории, които прославят България.',
//     url: '/',
//     locale: 'bg_BG',
//     images: [
//       {
//         url: '/logo.png',
//         width: 1200,
//         height: 630,
//         alt: SITE_NAME,
//       },
//     ],
//   },

//   twitter: {
//     card: 'summary_large_image',
//     title: SITE_NAME,
//     description: 'България Помни – личности, истории и културно наследство на България.',
//   },

//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },

//   icons: {
//     icon: [
//       { url: '/favicon.ico', sizes: 'any' },
//       { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
//       { url: '/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
//     ],
//     apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
//     shortcut: ['/favicon.ico'],
//   },
//   manifest: '/manifest.json',

//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },

//   appleWebApp: {
//     capable: true,
//     statusBarStyle: 'black-translucent',
//     title: SITE_NAME,
//   },
// }

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config: configPromise })
  const productsForSearch = await payload.find({
    collection: 'product',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    where: {
      and: [
        {
          _status: {
            equals: 'published',
          },
        },
        {
          quantity: {
            not_equals: 0,
          },
        },
      ],
    },
    select: {
      title: true,
      slug: true,
      // media: true,
      description: true,
      heading: true,
      category: true,
      price: true,
      bestSeller: true,
      promoPrice: true,
      havePriceRange: true,
      mediaArray: true,
      priceRange: true,
      shortDescription: true,
    },
  })

  return (
    <StoreProvider>
      <html lang="en" className={`${kolka.variable} ${sansation.variable}`}>
        <body>
          <main id="content" className="min-h-[100svh] overflow-x-clip">
            <Search products={productsForSearch.docs as Product[]} />
            <Header />
            {children}
            <Footer />
          </main>
        </body>
      </html>
    </StoreProvider>
  )
}
