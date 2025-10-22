import * as React from 'react'

const GenericTextarea: React.FC<
  {
    ref?: React.Ref<HTMLTextAreaElement>
  } & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, ref, ...props }) => {
  return (
    <textarea
      className={`flex w-full text-[14px] md:text-[18px] py-3 px-4 rounded-[16px] placeholder:opacity-70 glass !bg-primaryBlack/80
        ${className} !font-montserrat-regular`}
      style={{ color: 'white' }}
      ref={ref}
      {...props}
      rows={6}
    />
  )
}

export default GenericTextarea
