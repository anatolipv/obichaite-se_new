import React from 'react'
import ErrorMessageBox from './ErrorMessage'

export type TextInputProps<T> = {
  name: string
  label: string
  formValues: object
  setFormValues: React.Dispatch<React.SetStateAction<T>>
  placeholder: string
  error?: string
  extraClass?: string
  required?: boolean
  voice?: boolean
  autoFocus?: boolean
  type?: 'text' | 'password' | 'number'
}

const TextArea = <T,>({
  name,
  label,
  formValues,
  setFormValues,
  placeholder,
  error,
  extraClass,
  required = false,
  autoFocus = false,
}: TextInputProps<T>) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={name} className="font-georgia font-[400] text-brown">
        {label}
        {required && <span className="text-primaryBlue"> *</span>}
      </label>

      <div className="relative flex w-full items-center justify-between">
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          value={formValues[name as keyof object]}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChangeHandler(e as any)}
          autoFocus={autoFocus}
          className={`w-full rounded-[12px] bg-brown/20 border-brown/20
            focus:outline focus:outline-1 focus:outline-white p-3 font-sansation font-[400] text-brown outline-none 
          placeholder:text-brown/80
          ${extraClass}`}
          rows={6}
        />
      </div>

      {!!error && <ErrorMessageBox error={error} />}
    </div>
  )
}

export default TextArea
