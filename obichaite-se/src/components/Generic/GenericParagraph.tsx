import React from 'react'

type paragraphProps = {
  children: React.ReactNode
  extraClass?: string
  pType?: 'extraSmall' | 'small' | 'regular' | 'large' | 'custom'
  fontStyle?:
    | 'font-montserrat-semibold'
    | 'font-montserrat-bold'
    | 'font-montserrat-regular'
    | 'font-great-vibes'
    | 'font-lobster'
    | 'font-triodion'
    | 'font-montserrat-semiBoldItalic'
    | 'custom'
  textColor?:
    | 'text-primaryWhite'
    | 'text-primaryWhiteAccent'
    | 'text-primaryBlack'
    | 'text-primaryBlackAccent'
}

const fontMap = {
  extraSmall: 'text-xs',
  small: 'text-[12px] md:text-[16px] leading-[120%]',
  regular: 'text-[16px] md:text-[20px] leading-[120%]',
  large: 'text-[18px] md:text-[24px] leading-[120%]',
  custom: 'custom',
}

const GenericParagraph = ({
  children,
  extraClass,
  pType = 'regular',
  fontStyle = 'font-montserrat-regular',
  textColor = 'text-primaryWhite',
}: paragraphProps) => {
  return (
    <div
      className={`tracking-[0.05em] leading-[150%] ${fontStyle !== 'custom' && fontStyle} ${extraClass} ${
        pType !== 'custom' && fontMap[pType]
      } ${textColor}`}
    >
      {children}
    </div>
  )
}

export default GenericParagraph
