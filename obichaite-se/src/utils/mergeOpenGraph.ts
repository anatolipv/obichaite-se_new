import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Обичайте се - подаръци, които се помнят',
  images: [
    {
      url: `${getServerSideURL()}hero-image.png`,
    },
  ],
  siteName: 'Обичайте се',
  title: 'Обичайте се',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
