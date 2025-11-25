import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getLocationsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://obichaite-se-new.vercel.app'

    const results = await payload.find({
      collection: 'category',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 20,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((location) => Boolean(location?.slug))
          .map((location) => ({
            loc: `${SITE_URL}/kategorii/${location?.slug}`,
            lastmod: location.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['category-sitemap'],
  {
    tags: ['category-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getLocationsSitemap()

  return getServerSideSitemap(sitemap)
}
