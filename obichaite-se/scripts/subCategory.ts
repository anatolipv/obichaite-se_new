import { getPayload } from 'payload'
import configPromise from '@payload-config'

const payload = await getPayload({ config: configPromise })

const allSubCategoriesPublished = await payload.find({
  collection: 'sub-category',
  limit: 100,
  draft: false,
  overrideAccess: true,
  depth: 0,
})

for (const subCategory of allSubCategoriesPublished.docs.slice(50)) {
  //find all with meta title "test"

  const haveTitleTest = subCategory?.meta?.title?.toLowerCase().includes('test')

  try {
    const res = await payload.update({
      collection: 'sub-category',
      id: subCategory.id,
      data: {
        meta: {
          title: haveTitleTest ? subCategory.title : subCategory.meta?.title,
          image: 749,
          description: `${subCategory.title} Под Категория - изберете вашия желан продукт`,
        },
      },
    })

    if (!!res) console.log('updated', res.id)
  } catch (error) {
    console.log(error)
  }
}
