'use client'

import React from 'react'

export type SelectProps<T> = {
  options: { label: string; value: string }[]
  label: string
  formValues: object
  setFormValues: React.Dispatch<React.SetStateAction<T>>
  name: string
  required?: boolean
}

const RadioSelect = <T,>({
  options,
  label,
  formValues,
  setFormValues,
  name,
  required,
}: SelectProps<T>) => {
  console.log(options, label)

  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={name} className="font-kolka font-[500] text-brown">
        {label}
        {required && <span className="text-primaryBlue"> *</span>}
      </label>

      <div className="w-full flex">
        <button className="flex-1 border-[1px] border-brown/80 rounded-[8px]">
          {options[0].label}
        </button>
        <button className="flex-1 border-[1px] border-brown/80 rounded-[8px]">
          {options[1].label}
        </button>
      </div>
    </div>
  )
}

export default RadioSelect
