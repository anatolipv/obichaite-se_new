'use client'

import React, { useEffect, useState } from 'react'
import { GenericHeading, GenericParagraph, TextArea, TextInput } from '../Generic'
import { useAppDispatch } from '@/hooks/redux-hooks'
import { email } from 'payload/shared'
import RadioSelect from '../Generic/RadioSelect'
import { useCheckout } from '@/hooks/useCheckout'
import { priceToEuro } from '@/utils/calculatePriceFromLvToEuro'
import { ArrowIcon } from '@/assets/icons'
import ErrorMessageBox from '../Generic/ErrorMessage'

export const checkoutValuesInitialState: {
  name: string
  phone: string
  email: string
  courier: 'speedy' | 'econt'
  deliveryKind: 'office' | 'address'
  deliveryTown: string
  deliveryOffice: string
  paymentMethod: 'cash' | 'card'
  message: string
} = {
  name: '',
  phone: '',
  email: '',
  courier: 'speedy',
  deliveryKind: 'office',
  deliveryTown: '',
  deliveryOffice: '',
  paymentMethod: 'cash',
  message: '',
}

const CheckoutForm = () => {
  const dispatch = useAppDispatch()

  const { calculateTotalPrice, calculateRemainSum } = useCheckout()

  const [formValues, setFormValues] = useState(checkoutValuesInitialState)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    deliveryTown: '',
    deliveryOffice: '',
  })

  const remain = Number(calculateRemainSum().toFixed(0))

  //TODO check for persisting data
  //TODO after request make notification
  //TODO after success send email to both customer and admin

  const submitHandler = async () => {
    setError('')

    const nameError = formValues.name.length < 3 ? 'Името трябва да е поне 3 символа' : ''
    const phoneError = formValues.phone.length < 10 ? 'Телефонът трябва да поне 10 символа' : ''
    const emailError =
      !formValues.email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)
        ? 'Въведете валиден имейл'
        : ''
    const deliveryTownError =
      formValues.deliveryTown.length < 3 ? 'Населено място трябва да е поне 3 символа' : ''
    const deliveryOfficeError =
      formValues.deliveryOffice.length < 3 ? 'Полето трябва да е коректно попълнено' : ''

    if (nameError || phoneError || emailError || deliveryTownError || deliveryOfficeError) {
      setErrors({
        name: nameError,
        email: emailError,
        phone: phoneError,
        deliveryTown: deliveryTownError,
        deliveryOffice: deliveryOfficeError,
      })
      return
    }
  }

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

        <div className="w-full">
          <RadioSelect
            options={[
              { label: 'Speedy', value: 'speedy' },
              { label: 'Econt', value: 'econt' },
            ]}
            label="Куриер"
            formValues={formValues}
            setFormValues={setFormValues}
            name="courier"
            required={true}
          />
        </div>

        <div className="w-full">
          <RadioSelect
            options={[
              { label: 'Офис', value: 'office' },
              { label: 'Адрес', value: 'address' },
            ]}
            label="Вид Доставка"
            formValues={formValues}
            setFormValues={setFormValues}
            name="deliveryKind"
            required={true}
          />
        </div>

        <div className="w-full flex flex-col gap-m">
          <TextInput
            name="deliveryTown"
            label="Град/Село"
            formValues={formValues}
            setFormValues={setFormValues}
            extraClass="w-full"
            placeholder="София..."
            required={true}
            error={errors.deliveryTown}
            autoFocus={false}
          />
          <TextInput
            name="deliveryOffice"
            label={formValues.deliveryKind === 'office' ? '"Офис (име/код)"' : 'Адрес'}
            formValues={formValues}
            setFormValues={setFormValues}
            extraClass="w-full"
            placeholder={
              formValues.deliveryKind === 'office'
                ? '"Централен офис.../931522..."'
                : 'Град София, ЖК Младост бл. 331...'
            }
            required={true}
            error={errors.deliveryOffice}
            autoFocus={false}
          />
        </div>

        <div className="w-full">
          <RadioSelect
            options={[
              { label: 'Наложен платеж', value: 'cash' },
              { label: 'Картa (myPOS)', value: 'card' },
            ]}
            label="Начин на плащане"
            formValues={formValues}
            setFormValues={setFormValues}
            name="paymentMethod"
            required={true}
          />
        </div>

        <div className="w-full">
          <TextArea
            name="message"
            label="Bележка към поръчката"
            formValues={formValues}
            setFormValues={setFormValues}
            extraClass="w-full"
            placeholder={'Имам бележка относно...'}
            required={true}
            error={('message' in errors && (errors.message as string)) || ''}
            autoFocus={false}
          />
        </div>

        <div className="w-full flex justify-center items-center bg-brown/80 py-4">
          <GenericParagraph
            fontStyle="font-kolka font-[500]"
            pType="small"
            textColor="text-white"
            extraClass="px-1 text-center"
          >
            {remain < 0 ? (
              <span className="uppercase">Доставката е безплатна!</span>
            ) : (
              <>
                Добави артикули за още {calculateRemainSum().toFixed(2)} лева и доставката ще е
                безплатна
              </>
            )}
          </GenericParagraph>
        </div>
        <div className="w-full flex flex-col gap-3 py-4">
          <div className="w-full flex justify-between items-center border-[1px] border-bordo   bg-bordo px-2 py-4">
            <GenericParagraph textColor="text-white" extraClass="font-[700]">
              Сума всичко:{' '}
            </GenericParagraph>

            <GenericParagraph
              fontStyle="font-kolka font-[500]"
              pType="small"
              textColor="text-white"
            >
              {calculateTotalPrice().toFixed(2)} лв ({priceToEuro(calculateTotalPrice())}€)
            </GenericParagraph>
          </div>

          <div>
            <GenericParagraph pType="small">Цените са с ДДС (ако е приложимо).</GenericParagraph>
          </div>

          <div>* Вие получавате -10% отстъпка от крайната цена!.</div>

          <div className="w-full py-2">
            <button
              className="w-full rounded-[24px] fle  justify-center items-center red_background py-4 px-4
          [&>div>div>svg]:hover:animate-bounce disabled:cursor-not-allowed disabled:opacity-50
          "
              aria-label="Към поръчка"
              type="button"
              onClick={() => submitHandler()}
            >
              <div className="flex justify-center items-center">
                <GenericParagraph
                  fontStyle="font-sansation font-[700]"
                  pType="small"
                  textColor="text-white"
                  extraClass="uppercase"
                >
                  Завърши поръчката
                </GenericParagraph>

                <div className="w-[20px] h-[20px] flex justify-center items-center ml-1">
                  <ArrowIcon color="white" />
                </div>
              </div>
            </button>
          </div>

          {error && <ErrorMessageBox error={error} />}
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm
