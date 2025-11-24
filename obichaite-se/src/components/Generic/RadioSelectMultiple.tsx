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

const RadioSelectMultiple = <T,>({
  options,
  label,
  formValues,
  setFormValues,
  name,
  required,
}: SelectProps<T>) => {
  const optionsContent = options.map((option) => {
    const isSelected = formValues[name as keyof object] === option.value

    return (
      <button
        key={option.value}
        className={`w-full border-[1px] border-brown/80 h-[50px] text-brown
          ${isSelected ? 'bg-brown text-white' : ''} hover:opacity-80 hover:shadow-sm transition-color duration-300 ease-in-out
        `}
        type="button"
        onClick={() => onSelectHandler(option.value)}
      >
        {option.label}
      </button>
    )
  })

  const onSelectHandler = (value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={name} className="font-kolka font-[500] text-brown">
        {label}
        {required && <span className="text-primaryBlue"> *</span>}
      </label>

      <div className="w-full flex flex-wrap">{optionsContent}</div>
    </div>
  )
}

export default RadioSelectMultiple
