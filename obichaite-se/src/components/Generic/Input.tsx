import * as React from 'react'

//TODO correct font family and styles for input

const GenericInput: React.FC<
  {
    ref?: React.Ref<HTMLInputElement>
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ type, className, ref, ...props }) => {
  return (
    <input
      className={`
        'flex w-full text-[14px] md:text-[18px] py-3 px-4 rounded-[16px] !bg-primaryBlack/80 glass placeholder:opacity-70 !font-montserrat-regular
        ${className}`}
      style={{ color: 'white' }}
      ref={ref}
      type={type}
      {...props}
    />
  )
}

export default GenericInput
