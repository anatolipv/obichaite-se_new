import { GenericHeading, GenericMedia, GenericParagraph } from '@/components/Generic'
import GenericButton from '@/components/Generic/GenericButton'
import { Media } from '@/payload-types'
import { generateHref, LinkObject } from '@/utils/generateHref'
import Link from 'next/link'
import React from 'react'

const HeroCommon: React.FC = (props) => {
  // const {
  //   heading,
  //   description,
  //   media,
  //   backgroundOverlay,
  //   links,
  //   scrollArrow,
  //   mediaMobile,
  //   history,
  // } = props

  // const headingFont = history
  //   ? 'text-[40px] md:text-[52px] xl:text-[52px] 2xl:text-[60px] leading-[120%] xl:leading-[110%]'
  //   : 'text-[32px] md:text-[40px] xl:text-[48px] 2xl:text-[48px] leading-[120%] xl:leading-[110%]'

  return (
    <section
      className="REF_OBSERVE_ME w-full min-h-[100svh] flex relative landscape:pb-20 landscape:pt-[160px]"
      id="hero"
    >
      {/* {!!media && !mediaMobile && (
        <div className="absolute inset-0 z-[0] flex landscape:pb-20 landscape:pt-[160px]">
          <GenericMedia
            alt={((media as Media)?.alt as string) || ''}
            id={((media as Media)?.id as string) || ''}
            updatedAt={(media as Media)?.createdAt as string}
            createdAt={''}
            {...(props?.media as object)}
            backgroundOverlay={!!backgroundOverlay}
            imageClassName="w-full h-full object-cover"
            priority={true}
            style={{ transformOrigin: 'center center' }}
            wrapperClassName="m-auto content_wrapper_mobile-full h-full w-full relative"
            fill={true}
            focalX={(media as Media)?.focalX || 50}
            focalY={(media as Media)?.focalY || 50}
            mobileImage={true}
            fetchPriority="high"
            caption={(media as Media)?.caption}
          />
        </div>
      )}

      {!!media && !!mediaMobile && (
        <>
          <div className="absolute inset-0 z-[0] landscape:pb-20 landscape:pt-[160px] portrait:hidden landscape:flex">
            <GenericMedia
              alt={((media as Media)?.alt as string) || ''}
              id={((media as Media)?.id as string) || ''}
              updatedAt={(media as Media)?.createdAt as string}
              createdAt={''}
              {...(props?.media as object)}
              backgroundOverlay={false}
              imageClassName="w-full h-full object-cover"
              priority={true}
              style={{ transformOrigin: 'center center' }}
              wrapperClassName="m-auto content_wrapper_mobile-full h-full w-full relative"
              fill={true}
              focalX={(media as Media)?.focalX || 50}
              focalY={(media as Media)?.focalY || 50}
              fetchPriority="high"
              caption={(media as Media)?.caption}
            />
          </div>
          <div className="absolute inset-0 z-[0] landscape:hidden portrait:flex">
            <div className="absolute inset-0 z-[2] bg-primaryBlack opacity-60"></div>
            <GenericMedia
              alt={((mediaMobile as Media)?.alt as string) || ''}
              id={((mediaMobile as Media)?.id as string) || ''}
              updatedAt={(mediaMobile as Media)?.createdAt as string}
              createdAt={''}
              {...(props?.mediaMobile as object)}
              backgroundOverlay={false}
              imageClassName="w-full h-full object-cover"
              priority={true}
              style={{ transformOrigin: 'center center' }}
              wrapperClassName="m-auto content_wrapper_mobile-full h-full w-full relative"
              fill={true}
              focalX={(mediaMobile as Media)?.focalX || 50}
              focalY={(mediaMobile as Media)?.focalY || 50}
              fetchPriority="high"
              caption={(mediaMobile as Media).caption}
            />
          </div>
        </>
      )}

      <div className="w-full content_wrapper_mobile-full flex-1 flex gap-m relative z-[3]">
        {!!(media as Media)?.caption && (
          <GenericCredits
            media={media as Media}
            wrapperClassName={`absolute bottom-0 right-[4px] flex items-center gap-2 glass rounded-[4px] px-[2px] z-[10]`}
            title={true}
            mobilePopUpPosition={true}
          />
        )}
        <SideBackgroundOverlay visibilityClass="portrait:hidden landscape:flex max-w-[40%]" />
        <div className="w-full max-w-[90%] portrait:mx-auto landscape:mx-[unset] landscape:max-w-fit flex flex-col justify-center items-center relative">
          <hgroup className="w-full flex flex-col gap-s relative z-[3]">
            {heading && (
              <div className="fade_in_appear">
                <GenericHeading
                  headingType="h3"
                  fontStyle={history ? 'font-triodion' : 'font-montserrat-extraBoldItalic'}
                  textColor="text-primaryWhite"
                  align="portrait:text-center landscape:text-left"
                  customStyles={true}
                  extraClass={headingFont}
                >
                  <h1>
                    <RichText data={heading} />
                  </h1>
                </GenericHeading>
              </div>
            )}
            {description && (
              <div
                className="fade_in_appear"
                style={{
                  animationDelay: '0.5s',
                }}
              >
                <GenericParagraph
                  extraClass="portrait:text-center landscape:text-left"
                  fontStyle={history ? 'font-triodion' : 'font-montserrat-semibold'}
                  pType={history ? 'large' : 'regular'}
                  textColor="text-primaryWhiteAccent"
                >
                  <RichText data={description} />
                </GenericParagraph>
              </div>
            )}
            {!!links?.length && (
              <ul
                className="w-fit portrait:mx-auto mt-4 fade_in_appear flex gap-[10px]"
                style={{
                  animationDelay: '1s',
                }}
              >
                {links.map((link) => (
                  <li key={link.id || link?.link?.label}>
                    <Link href={generateHref(link as LinkObject)} prefetch={true}>
                      <GenericButton variant="primary" ariaLabel={link?.link?.label} type="button">
                        {link?.link?.label}
                      </GenericButton>
                    </Link>
                  </li>
                ))}
                <li key={'category'}>
                  <Link href={'/category'} prefetch={true}>
                    <GenericButton variant="outLined" ariaLabel={'Категории'} type="button">
                      Категории
                    </GenericButton>
                  </Link>
                </li>
              </ul>
            )}
          </hgroup>
        </div>
      </div>

      {!!scrollArrow && (
        <div className="absolute bottom-20 left-[50%] translate-x-[-50%] z-[4]">
          <ScrollArrow />
        </div>
      )} */}
    </section>
  )
}

export default HeroCommon
