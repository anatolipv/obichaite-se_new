'use client'

import React, { useState } from 'react'
import { GenericHeading, TextInput } from '../Generic'
import { useAppDispatch } from '@/hooks/redux-hooks'
import { email } from 'payload/shared'
import RadioSelect from '../Generic/RadioSelect'

export const checkoutValuesInitialState: {
  name: string
  phone: string
  courier: 'speedy' | 'econt'
  deliveryKind: 'office' | 'address'
  deliveryTown: string
  deliveryOffice: string
  paymentMethod: string
  message: string
} = {
  name: '',
  phone: '',
  courier: 'speedy',
  deliveryKind: 'office',
  deliveryTown: '',
  deliveryOffice: '',
  paymentMethod: 'cash',
  message: '',
}

const CheckoutForm = () => {
  const dispatch = useAppDispatch()

  const [formValues, setFormValues] = useState(checkoutValuesInitialState)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    deliveryTown: '',
    deliveryOffice: '',
  })

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col gap-s">
        <GenericHeading
          headingType="h4"
          fontStyle="font-sansation font-[700]"
          textColor="text-bordo"
          extraClass="border-b-[1px] border-b-bordo/80 text-center"
        >
          <h2>Поръчка детайли</h2>
        </GenericHeading>
      </div>

      <form className="w-full flex flex-col gap-m py-4">
        <div className="w-full flex flex-col lg:flex-row gap-m">
          <TextInput
            name="name"
            label="Име и Фамилия"
            formValues={formValues}
            setFormValues={setFormValues}
            extraClass="w-full"
            placeholder="Иван Иванов"
            required={true}
            error={errors.name}
            autoFocus={false}
          />
          <TextInput
            name="phone"
            label="Tелефон/Viber"
            formValues={formValues}
            setFormValues={setFormValues}
            extraClass="w-full"
            placeholder="+359888888888"
            required={true}
            error={errors.phone}
            autoFocus={false}
          />
        </div>

        <div className="w-full">
          <TextInput
            name="email"
            label="Емейл"
            formValues={formValues}
            setFormValues={setFormValues}
            extraClass="w-full"
            placeholder="ivan.ivanov@gmail.com"
            required={true}
            error={errors.email}
            autoFocus={false}
          />
        </div>

        {/* <div className="w-full">
          <RadioSelect
            options={[
              { label: 'Склад', value: 'office' },
              { label: 'Адрес', value: 'address' },
            ]}
            label="Доставка"
            formValues={formValues}
            setFormValues={setFormValues}
            name="deliveryKind"
            required={true}
          />
        </div> */}
      </form>
    </div>
  )
}

export default CheckoutForm
