const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://obichaite-se-new.vercel.app'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/pages-sitemap.xml',
    '/*',
    '/posts/*',
    '/admin/*',
    '/produkt-sitemap.xml',
    '/subCategory-sitemap.xml',
    '/category-sitemap.xml',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/produkt-sitemap.xml`,
      `${SITE_URL}/subCategory-sitemap.xml`,
      `${SITE_URL}/category-sitemap.xml`,
    ],
  },
}
