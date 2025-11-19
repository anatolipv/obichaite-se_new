'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { User } from '@/payload-types'

export async function addFriendForCurrentUser(
  userId: number,
  input: {
    name: string
    email: string
    date: string
  },
) {
  try {
    const payload = await getPayload({ config: configPromise })

    if (!userId) {
      return { ok: false }
    }

    const me = await payload.findByID({ collection: 'users', id: userId, depth: 0 })

    const current = await payload.findByID({
      collection: 'users',
      id: me.id,
      select: { friends: true, role: true },
      depth: 0,
      overrideAccess: true,
    })

    const friends: User['friends'] = Array.isArray(current.friends) ? (current as User).friends : []

    // Upsert by email (dedupe)
    const nowISO = new Date().toISOString()
    const idx =
      (!!friends &&
        friends.findIndex((f) => f?.email?.toLowerCase() === input.email.toLowerCase())) ||
      -1
    const newEntry = {
      name: input.name?.trim() || '',
      email: input.email?.trim() || '',
      date: input.date ?? nowISO,
    }

    if (idx >= 0 && !!friends) {
      friends[idx] = newEntry
    }
    if (idx === -1 && !!friends) {
      friends.push(newEntry)
    }

    const updated = await payload.update({
      collection: 'users',
      id: me.id,
      data: { friends },
      overrideAccess: true,
      depth: 0,
    })

    return { ok: true, user: updated }
  } catch (error) {
    console.log('error', error)
    return { ok: false }
  }
}

export async function removeFriendForCurrentUser(
  email: string,
  userId: number,
): Promise<{ ok: boolean; user?: User }> {
  try {
    const payload = await getPayload({ config: configPromise })
    const me = await payload.findByID({ collection: 'users', id: userId, depth: 0 })

    const userDoc = await payload.findByID({
      collection: 'users',
      id: me.id,
      select: { friends: true },
      depth: 0,
      overrideAccess: true,
    })

    const friends: User['friends'] = Array.isArray(userDoc.friends) ? userDoc.friends : []

    const targetEmail = String(email).toLowerCase().trim()
    const next = friends.filter((f) => (f?.email ?? '').toLowerCase().trim() !== targetEmail)

    if (next.length === friends.length) {
      return { ok: true }
    }

    const updated = await payload.update({
      collection: 'users',
      id: me.id,
      data: { friends: next },
      overrideAccess: true,
      depth: 0,
    })

    return { ok: true, user: updated }
  } catch (error) {
    console.log('error', error)
    return { ok: false }
  }
}
