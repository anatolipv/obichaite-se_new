// storage-adapter-import-placeholder
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { plugins } from './plugins'
import { getServerSideURL } from './utils/getServerSideUrl'
import { Header } from './Header/config'
import { Category } from './collections/Categories/Category'
import { Product } from './collections/Product/Product'
import { Footer } from './Footer/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  defaultDepth: 3,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 360,
          height: 640,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [Users, Media, Pages, Category, Product],
  globals: [Header, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  cors: [getServerSideURL()].filter(Boolean),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: false,
  }),
  sharp,
  plugins: [payloadCloudPlugin(), ...plugins],
  email: nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_FROM_ADDRESS!,
    defaultFromName: process.env.EMAIL_FROM_NAME!,
    transportOptions: {
      host: process.env.SMTP_HOST, //TODO! actual smtp data for the superhosting website
      port: 465,
      secure: '465',
      auth: {
        user: "rudashkimoni@gmail.com",
        pass: "izyawmspdnmfasgi"
      },
    },
  }),
})
