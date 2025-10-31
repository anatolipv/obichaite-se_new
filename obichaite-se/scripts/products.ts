// import { getPayload } from 'payload'
// import config from '@payload-config'
// import products from '../../products.json'
// import sectionCategories from '../../section_categories.json'
// import sectionProducts from '../../section_products.json'
// import categories from '../categories.json'

// const subCategory = [
//   {
//     id: 88,
//     title: 'Цветя',
//   },
//   {
//     id: 87,
//     title: 'Стъклени пожелания',
//   },
//   {
//     id: 86,
//     title: 'Свещници',
//   },
//   {
//     id: 85,
//     title: 'Бижутерки',
//   },
//   {
//     id: 84,
//     title: 'Арома дифузери',
//   },
//   {
//     id: 83,
//     title: 'Плюшени играчки',
//   },
//   {
//     id: 82,
//     title: 'Часовници',
//   },
//   {
//     id: 81,
//     title: 'Вази',
//   },
//   {
//     id: 80,
//     title: 'Лампи',
//   },
//   {
//     id: 79,
//     title: 'Декорации',
//   },
//   {
//     id: 78,
//     title: 'Манерки',
//   },
//   {
//     id: 77,
//     title: 'Акрилни сърца и огледала',
//   },
//   {
//     id: 76,
//     title: 'Фотоалбуми и фоторамки',
//   },
//   {
//     id: 75,
//     title: 'Аксесоари за вино',
//   },
//   {
//     id: 74,
//     title: 'Бележници и тефтери',
//   },
//   {
//     id: 73,
//     title: 'Подаръчни комплекти',
//   },
//   {
//     id: 72,
//     title: 'Чаши',
//   },
//   {
//     id: 71,
//     title: 'SPA пакет в хотел по избор',
//   },
//   {
//     id: 70,
//     title: 'Custom изненада',
//   },
//   {
//     id: 69,
//     title: 'Предложение за брак',
//   },
//   {
//     id: 68,
//     title: 'Бебешка изненада',
//   },
//   {
//     id: 67,
//     title: 'Опознай природата',
//   },
//   {
//     id: 66,
//     title: 'Годишнина - нашата история',
//   },
//   {
//     id: 65,
//     title: 'Пикник любов',
//   },
//   {
//     id: 64,
//     title: 'Романтична вечеря',
//   },
//   {
//     id: 63,
//     title: 'Пътуваща изненада',
//   },
//   {
//     id: 62,
//     title: 'Изненада по време на разходка',
//   },
//   {
//     id: 61,
//     title: 'Изненада у дома',
//   },
//   {
//     id: 60,
//     title: 'Въжена градина и тролей',
//   },
//   {
//     id: 59,
//     title: 'Каньонинг',
//   },
//   {
//     id: 58,
//     title: 'Рафтинг',
//   },
//   {
//     id: 57,
//     title: 'Изненада на работното място',
//   },
//   {
//     id: 56,
//     title: 'Подаръци за шефове',
//   },
//   {
//     id: 55,
//     title: 'Подаръци за счетоводители',
//   },
//   {
//     id: 54,
//     title: 'Подаръци за мъже',
//   },
//   {
//     id: 53,
//     title: 'Подаръци за юбилей',
//   },
//   {
//     id: 52,
//     title: 'Подаръци за сватба',
//   },
//   {
//     id: 51,
//     title: 'Подаръци за ловджии',
//   },
//   {
//     id: 50,
//     title: 'Подаръци за рибари',
//   },
//   {
//     id: 49,
//     title: 'Подаръци за рожден ден',
//   },
//   {
//     id: 48,
//     title: 'Подаръци за маникюристки',
//   },
//   {
//     id: 47,
//     title: 'Подаръци за мама',
//   },
//   {
//     id: 46,
//     title: 'Арт галерия Меразчиеви',
//   },
//   {
//     id: 45,
//     title: 'Кетъринг услуги',
//   },
//   {
//     id: 44,
//     title: 'Цялостно организиране на училищни празненства',
//   },
//   {
//     id: 43,
//     title: 'Цялостно организиране на фирмени мероприятия',
//   },
//   {
//     id: 42,
//     title: 'Цялостно организиране на балове',
//   },
//   {
//     id: 41,
//     title: 'Цялостно организиране на кръщенета',
//   },
//   {
//     id: 40,
//     title: 'Цялостно организиране на сватби и кръщенета',
//   },
//   {
//     id: 39,
//     title: 'Украса и цялостно организиране на рожден ден',
//   },
//   {
//     id: 38,
//     title: 'Украса и организиране на детски партита и рождени дни',
//   },
//   {
//     id: 37,
//     title: 'ATV приключение',
//   },
//   {
//     id: 36,
//     title: 'SPA пакет в хотел по избор',
//   },
//   {
//     id: 35,
//     title: 'Пакет „Бебешка изненада“',
//   },
//   {
//     id: 34,
//     title: 'Пакет „Опознай природата“',
//   },
//   {
//     id: 33,
//     title: 'Пакет „Годишнина – Нашата история“',
//   },
//   {
//     id: 32,
//     title: 'Пакет „Пикник любов“',
//   },
//   {
//     id: 31,
//     title: 'Пакет „Романтична вечеря“',
//   },
//   {
//     id: 30,
//     title: 'Пакет „Пътуваща изненада“',
//   },
//   {
//     id: 29,
//     title: 'Пакет „Изненада по време на разходка“',
//   },
//   {
//     id: 28,
//     title: 'Пакет „Изненада у дома“',
//   },
//   {
//     id: 27,
//     title: 'Пакет „Изненада на работното място“',
//   },
//   {
//     id: 26,
//     title: 'Пакет „Подари песен“',
//   },
//   {
//     id: 25,
//     title: 'Изкушения от дърво',
//   },
//   {
//     id: 24,
//     title: 'Лазерно гравиране върху метал',
//   },
//   {
//     id: 23,
//     title: 'Гипсови отливки',
//   },
//   {
//     id: 22,
//     title: 'Уникални 3D лампи',
//   },
//   {
//     id: 21,
//     title: 'Подаръчни кошници',
//   },
//   {
//     id: 20,
//     title: 'Кошници с цветя и букети',
//   },
//   {
//     id: 19,
//     title: 'Подаръци за фризьори',
//   },
//   {
//     id: 18,
//     title: 'Подаръци за лекари',
//   },
//   {
//     id: 17,
//     title: 'Подаръци за зъболекари',
//   },
//   {
//     id: 16,
//     title: 'Подаръци за козметички',
//   },
//   {
//     id: 15,
//     title: 'Подаръци за именден',
//   },
//   {
//     id: 14,
//     title: 'Подаръци за дядо',
//   },
//   {
//     id: 13,
//     title: 'Подаръци за гримьорки',
//   },
//   {
//     id: 12,
//     title: 'Подаръци за деца',
//   },
//   {
//     id: 11,
//     title: 'Подаръци за адвокати',
//   },
//   {
//     id: 10,
//     title: 'Подаръци за бебета',
//   },
//   {
//     id: 9,
//     title: 'Подаръци за бащи',
//   },
//   {
//     id: 8,
//     title: 'Подаръци за баби',
//   },
//   {
//     id: 7,
//     title: 'Подаръци за кръщене',
//   },
//   {
//     id: 6,
//     title: 'Подаръци за дипломиране',
//   },
//   {
//     id: 5,
//     title: 'Подаръци за учители',
//   },
//   {
//     id: 4,
//     title: 'Подаръци за 8 март',
//   },
//   {
//     id: 3,
//     title: 'Подаръци за половинката',
//   },
//   {
//     id: 1,
//     title: 'Тест',
//   },
// ]

// const categoriesDocs = [
//   {
//     id: 6,
//     title: 'events',
//   },
//   {
//     id: 5,
//     title: 'extreme',
//   },
//   {
//     id: 4,
//     title: 'handamade',
//   },
//   {
//     id: 3,
//     title: 'thematic',
//   },
//   {
//     id: 2,
//     title: 'emotional',
//   },
//   {
//     id: 1,
//     title: 'products',
//   },
// ]

// //533

// const mapped = products.slice(500).map((product) => {
//   const id = product.id

//   const findedProduct = sectionProducts.find((sectionProduct) => {
//     return sectionProduct.id === id
//   })

//   const subCategoryOfProduct = sectionCategories.find((subCategory) => {
//     return subCategory.id === findedProduct?.id
//   })

//   let backUpCategory: any = categories[0]
//   if (!subCategoryOfProduct) {
//     backUpCategory = categories.find((category) => {
//       return category.id === product?.category_id
//     })
//   }

//   if (!subCategoryOfProduct && !backUpCategory) {
//     console.log(product)
//   }

//   const subCategoryTitleToMatch = !subCategoryOfProduct
//     ? backUpCategory?.name
//     : subCategoryOfProduct?.title

//   const categoryKeyMatch = !subCategoryOfProduct ? 'products' : subCategoryOfProduct?.section_key

//   return {
//     title: product.name,
//     heading: {
//       root: {
//         type: 'root',
//         format: '',
//         indent: 0,
//         version: 1,

//         children: [
//           {
//             tag: 'h2',
//             type: 'heading',
//             format: 'start',
//             indent: 0,
//             version: 1,

//             children: [
//               {
//                 mode: 'normal',
//                 text: product.name,
//                 type: 'text',
//                 style: '',
//                 detail: 0,
//                 format: 0,
//                 version: 1,
//               },
//             ],
//             direction: null,
//           },
//         ],
//         direction: null,
//       },
//     },
//     shortDescription: product.description,
//     description: {
//       root: {
//         type: 'root',
//         format: '',
//         indent: 0,
//         version: 1,

//         children: [
//           {
//             type: 'paragraph',
//             format: '',
//             indent: 0,
//             version: 1,

//             children: [
//               {
//                 mode: 'normal',
//                 text: product.description,
//                 type: 'text',
//                 style: '',
//                 detail: 0,
//                 format: 0,
//                 version: 1,
//               },
//             ],
//             direction: null,
//             textStyle: '',
//             textFormat: 0,
//           },
//         ],
//         direction: null,
//       },
//     },
//     mediaArray: [{ file: 25 }],
//     meta: {
//       title: product.name,
//       image: 41,
//       description: product.description,
//     },
//     price: Number(product.price),
//     quantity: 100,
//     promoPrice: null,
//     bestSeller: false,
//     havePriceRange: false,
//     priceRange: null,
//     publishedAt: null,
//     slug: product.name.replace(/\s+/g, '-').toLowerCase(),
//     slugLock: false,
//     _status: 'published',
//     subCategoryTitle: subCategoryTitleToMatch,
//     category: categoriesDocs.find((category) => category.title === categoryKeyMatch)?.id || 1,
//     subCategory:
//       subCategory.find((category) => category.title === subCategoryTitleToMatch)?.id || 89,
//   }
// })

// async function upsertProduct(
//   payload: Awaited<ReturnType<typeof getPayload>>,
//   item: (typeof mapped)[number],
// ) {
//   //guard to skip already existing products
//   const existingProduct = await payload.find({
//     collection: 'product',
//     limit: 1,
//     where: {
//       title: {
//         equals: item.title,
//       },
//     },
//   })

//   if (existingProduct.docs.length > 0) {
//     return { action: 'skipped', reason: 'product already exists', item }
//   }

//   await payload.create({
//     collection: 'product',
//     data: item as any,
//   })
//   return { action: 'created', slug: item.slug }
// }

// async function main() {
//   const payload = await getPayload({ config })

//   // Load your array
//   const items: typeof mapped = mapped

//   // Process sequentially (keeps it simple and respects rate-limits/hooks)
//   const results = []
//   for (const item of items) {
//     // Basic guard
//     if (!item.title || !item.slug) {
//       results.push({ action: 'skipped', reason: 'missing title/slug', item })
//       continue
//     }
//     results.push(await upsertProduct(payload, item))
//   }

//   // Pretty log
//   const created = results.filter((r) => r.action === 'created').length
//   const updated = results.filter((r) => r.action === 'updated').length
//   const skipped = results.filter((r) => r.action === 'skipped').length
//   console.log(`Seed complete. created=${created}, updated=${updated}, skipped=${skipped}`)
// }

// await main()
