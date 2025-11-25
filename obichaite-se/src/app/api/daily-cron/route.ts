import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { daysUntilNextOccurrence } from '@/utils/calculateDaysToBirthday'
import { emailTemplates } from '@/emails/OrderToAdminEmail'

export const runtime = 'nodejs' // ensure Node runtime (not edge) for server work

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  console.log('CRON JOB')

  if (!process.env.CRON_SECRET || token !== process.env.CRON_SECRET) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    //get the user with friends
    const payload = await getPayload({ config: configPromise })
    const { docs: usersWithFriends } = await payload.find({
      collection: 'users',
      where: {
        'friends.email': { exists: true },
      },
      limit: 1000,
    })
    const emailsThatNeedToReceive: {
      email: string
      name: string
    }[] = []

    //loop and extract the emails that need to recieve email (their birthday need to be exact 15 days from now)
    usersWithFriends.forEach((user) => {
      if (!user.friends || user.friends.length === 0) return
      user.friends.forEach((friend) => {
        if (!friend.date) return

        const itsRightDifference = daysUntilNextOccurrence(friend.date) === 15

        if (itsRightDifference && friend.email && friend.name) {
          emailsThatNeedToReceive.push({
            email: friend.email,
            name: friend.name,
          })
        }
      })
    })

    for (const target of emailsThatNeedToReceive) {
      const subject = emailTemplates.orders.friendsBirthday.subject({
        friendName: target.name,
      })
      const html = emailTemplates.orders.friendsBirthday.html({
        friendName: target.name,
      })

      await payload.sendEmail({
        to: target.email,
        subject,
        html,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[CRON_DAILY_ERROR]', error)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
