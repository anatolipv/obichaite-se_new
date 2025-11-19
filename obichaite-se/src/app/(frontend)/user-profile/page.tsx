import { GenericButton, GenericHeading, GenericImage } from '@/components/Generic'
import { UserFriendsList, UserOrders } from '@/components/User'
import { getPayload } from 'payload'
import React from 'react'

import configPromise from '@payload-config'
import { Order } from '@/payload-types'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

type Args = {
  searchParams: Promise<{
    userId: number
  }>
}

export default async function UserProfile({ searchParams }: Args) {
  const payload = await getPayload({ config: configPromise })
  const { userId } = await searchParams

  let orders: Order[] = []

  if (userId) {
    const currentOrders = await payload.find({
      collection: 'order',
      where: {
        user: {
          equals: userId,
        },
      },
      limit: 100,
    })

    orders = currentOrders.docs
  }

  return (
    <section className="w-full relative py-10 md:py-20 flex mt-[52px] md:mt-[140px]">
      <GenericImage
        src="/static/auth-background.png"
        alt="auth-background"
        wrapperClassName="w-full h-full absolute top-0 left-0 z-[0]"
        imageClassName="w-full h-full object-cover"
        fill={true}
        sizes="100vw"
        fetchPriority="high"
      />

      <div className="md:px-6 w-full content_wrapper white_background_bubble py-6 md:py-10 relative z-[1] rounded-[24px] flex flex-col gap-10 md:gap-[unset] md:flex-row">
        <>
          {userId ? (
            <>
              <div className="flex-1 px-2 md:px-4">
                <UserOrders orders={orders ?? []} />
              </div>

              <div className="flex-1 px-4">
                <UserFriendsList />
              </div>
            </>
          ) : (
            <div className="mx-auto">
              <GenericHeading
                headingType="h5"
                fontStyle="font-sansation font-[700]"
                textColor="text-bordo"
                extraClass="text-center"
              >
                <h2>За да видите тази страница трябва да сте регистриран потребител</h2>
              </GenericHeading>

              <Link href="/auth/login" className="flex flex-col items-center justify-center mt-4">
                <GenericButton
                  type="button"
                  variant="primary"
                  styleClass="w-full max-w-[300px] mx-auto"
                >
                  Влезте в профила си
                </GenericButton>
              </Link>
            </div>
          )}
        </>
      </div>
    </section>
  )
}
