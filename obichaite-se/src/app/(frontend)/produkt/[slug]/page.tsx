import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import SingleProduct from '@/components/Product/SingleProduct'
import { generateMeta } from '@/utils/generateMeta'
import configPromise from '@payload-config'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const blogs = await payload.find({
    collection: 'product',
    limit: 1000,
    select: {
      slug: true,
    },
    where: {
      and: [
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
  })

  const params = blogs.docs
    .filter((doc) => !!doc.slug)
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ProductSinglePage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/category/' + slug
  const product = await queryProductBySlug({ slug })
  if (!product) return <PayloadRedirects url={url} />

  //TODO add best seller section of this subcategory 
  //TODO add promotions section of this sub category
  //TODO add related products of this category

  return (
    <>
      <article className="w-full">
        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}

        <div className='w-full pt-[52px] md:pt-[140px] bg-pink/30'>
          <SingleProduct product={product} />
        </div>

        {/* <HeroCommon {...hero} /> */}

        {/* {!!layout && <RenderBlocks blocks={layout} observe={false} />} */}
      </article>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryProductBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'product',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
