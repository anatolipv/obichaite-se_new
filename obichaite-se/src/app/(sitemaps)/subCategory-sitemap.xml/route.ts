import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { Category } from '@/payload-types'

const getPropertiesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://obichaite-se.com/'

    const results = await payload.find({
      collection: 'sub-category',
      overrideAccess: false,
      draft: false,
      depth: 1,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
        parentCategory: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((property) => Boolean(property?.slug))
          .map((property) => {
            const parent = property.parentCategory as Category
            return {
              loc: `${SITE_URL}/kategorii/${parent?.slug}/${property?.slug}`,
              lastmod: property.updatedAt || dateFallback,
            }
          })
      : []

    return sitemap
  },
  ['subCategory-sitemap'],
  {
    tags: ['subCategory-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPropertiesSitemap()

  return getServerSideSitemap(sitemap)
}
