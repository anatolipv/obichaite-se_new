// import React, { Fragment } from 'react'

// import type {
//   HistorySection,
//   NewestSection,
//   ShowCategoriesSection,
//   TestimonialsSection,
//   MediaBlock as MediaBlockProps,
//   BlogContent as BlogContentType,
//   ContentBlock as ContentBlockType,
//   FormBlock as FormBlockType,
//   ExternalVideo,
// } from '@/payload-types'

// import { MediaBlock } from '@/blocks/MediaBlock/Component'
// import HistorySectionBlock from './HistorySection/Component'
// import NewestSectionBlock from './NewestSection/Component'
// import TestimonialsSectionBlock from './Testimonials/Component'
// import ShowCategoriesSectionBlock from './ShowCategories/Component'
// import BlogContent from './BlogContent/Component'
// import { ContentBlock } from './Content/Component'
// import { FormBlock } from './Form/Component'
// import ExternalVideoBlock from './ExternalVideo/Component'

// const blockComponents = {
//   mediaBlock: MediaBlock,
//   historySection: HistorySectionBlock,
//   newestSection: NewestSectionBlock,
//   testimonialsSection: TestimonialsSectionBlock,
//   showCategories: ShowCategoriesSectionBlock,
//   blogContent: BlogContent,
//   content: ContentBlock,
//   formBlock: FormBlock,
//   externalVideo: ExternalVideoBlock,
// }

// export const RenderBlocks: React.FC<{
//   blocks: (
//     | NewestSection
//     | ShowCategoriesSection
//     | TestimonialsSection
//     | HistorySection
//     | MediaBlockProps
//     | BlogContentType
//     | ContentBlockType
//     | (FormBlockType & { id?: string | null })
//     | ExternalVideo
//   )[]
//   observe?: boolean
// }> = (props) => {
//   const { blocks } = props

//   const haveObservation = props?.observe ?? true

//   const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

//   if (hasBlocks) {
//     return (
//       <Fragment>
//         {blocks.map((block, index) => {
//           const { blockType } = block

//           if (blockType && blockType in blockComponents) {
//             const Block = blockComponents[blockType as keyof typeof blockComponents]

//             if (Block) {
//               return (
//                 <div
//                   className={`transition-opacity duration-1000 ease-in-out ${haveObservation && 'REF_OBSERVE_ME opacity-0'}`}
//                   key={`${blockType}-${index}`}
//                   id={block?.id as string}
//                 >
//                   <Block {...(block as any)} />
//                 </div>
//               )
//             }
//           }
//           return null
//         })}
//       </Fragment>
//     )
//   }

//   return null
// }
