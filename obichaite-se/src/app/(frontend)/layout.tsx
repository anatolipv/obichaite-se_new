import React from 'react'
// import { Metadata } from 'next'
import { StoreProvider } from '@/store/StoreProvider'
import '../../assets/styles/general.scss'
import "../../assets/styles/blog.scss"
import { Header } from '@/Header/Component'
import './global.css'
import { kolka, sansation } from '@/app/fonts'
import { Footer } from '@/Footer/Component'
import Search from '@/components/Search/Search'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Product } from '@/payload-types'
import ShoppingCardAside from '@/components/Checkout/ShoppingCardAside'
import ScreenOverlay from '@/components/Custom/ScreenOverlay'
import ScrollToTop from '@/components/Custom/ScrollToTop'
import { Metadata } from 'next'
import GenericNotification from '@/components/Generic/GenericNotification'

const SITE_NAME = 'Обичайте се'

export const metadata: Metadata = {
  metadataBase: new URL('https://obichaite-se-new.vercel.app/'),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s`,
  },
  description: 'Обичайте се - подаръци, които се помнят',
  keywords: ['подарък', 'изненада', 'близък', 'рожден ден', 'имен ден'],
  authors: [{ name: 'Simeon Rudashki' }, { name: 'PlanZ' }, { name: 'Anatoli Vachev' }],
  creator: 'PlanZ',
  publisher: 'PlanZ',
  referrer: 'origin-when-cross-origin',

  alternates: {
    canonical: '/',
    languages: {
      bg: '/',
    },
  },

  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: 'Обичайте се - подаръци, които се помнят',
    url: '/',
    locale: 'bg_BG',
    images: [
      {
        url: `/mobile-hero.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: 'Обичайте се - подаръци, които се помнят',
    images: [
      {
        url: `/mobile-hero.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: ['/favicon.ico'],
  },
  // manifest: '/manifest.json',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE_NAME,
  },
}

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
      <html lang="bg" className={`${kolka.variable} ${sansation.variable}`}>
        <head>
          <link href="/favicon.ico" rel="icon" sizes="32x32" />
          <link href="/favicon.svg" rel="icon" type="image/svg+xml" />

          {/* TODO prefetch to domain */}
          <link rel="preconnect prefetch" href="https://obichaite-se-new.vercel.app/" />
        </head>
        <body>
          <main id="content" className="min-h-[100svh] overflow-x-clip">
            <Search products={productsForSearch.docs as Product[]} />
            <Header />
            {children}
            <Footer />
            <ShoppingCardAside />

            <ScreenOverlay />

            <ScrollToTop />

            <GenericNotification />
          </main>
        </body>
      </html>
    </StoreProvider>
  )
}
