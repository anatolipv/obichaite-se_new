import { Blog } from '@/payload-types'

export const sortBlogWithMocks = (blogs: Blog[]) => {
  const result = blogs.sort((a, b) => {
    const am = a.slug?.toLowerCase().includes('vuprositelen') ? 1 : 0
    const bm = b.slug?.toLowerCase().includes('vuprositelen') ? 1 : 0
    return am - bm
  })

  return result
}
