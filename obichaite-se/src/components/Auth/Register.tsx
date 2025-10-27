'use client'

import { useAppDispatch } from '@/hooks/redux-hooks'
import { setIsLoading } from '@/store/features/root'

import Link from 'next/link'
import React, { useState } from 'react'
import { DateInput, GenericButton, NumberInput, TextInput } from '../Generic'

const RegisterComponent = () => {
  const dispatch = useAppDispatch()
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    email: '',
    password: '',
  })

  return (
    <form
      className="flex w-full flex-col gap-4"
      // onSubmit={submitHandler}
      // action={formAction}
    >
      <div className="w-full flex flex-col md:flex-row gap-4">
        <TextInput
          name="firstName"
          label="Име"
          formValues={formValues}
          setFormValues={setFormValues}
          extraClass="w-full"
          placeholder="Иван"
          required={true}
          // error={errors.title}
          autoFocus={false}
        />
        <TextInput
          name="lastName"
          label="Фамилия"
          formValues={formValues}
          setFormValues={setFormValues}
          extraClass="w-full"
          placeholder="Иванов"
          required={true}
          // error={errors.title}
          autoFocus={false}
        />
      </div>

      <div className="w-full flex flex-col gap-4">
        <DateInput
          name="dateOfBirth"
          label="Дата на раждане"
          formValues={formValues}
          setFormValues={setFormValues}
          extraClass="w-full"
          placeholder="DD-MM-YYYY"
          required={true}
          // error={errors.title}
        />
        <NumberInput
          name="phoneNumber"
          label="Телефонен номер"
          formValues={formValues}
          setFormValues={setFormValues}
          extraClass="w-full"
          placeholder="+359888888888"
          required={true}
          // error={errors.title}
          autoFocus={false}
        />
      </div>
      <div className="mx-auto flex w-full min-w-[300px] flex-col gap-4">
        <TextInput
          name="email"
          label="Емейл"
          formValues={formValues}
          setFormValues={setFormValues}
          extraClass="w-full"
          placeholder="john_doe@gmail.com"
          required={true}
          // error={errors.title}
          autoFocus={false}
        />
        <div>
          <TextInput
            name="password"
            label="Парола"
            formValues={formValues}
            setFormValues={setFormValues}
            extraClass="w-full"
            placeholder="******"
            required={true}
            type="password"
            // error={errors.title}
          />
        </div>
      </div>

      <div className="my-4 flex w-full">
        <GenericButton
          type={'submit'}
          // className="primary-button mx-auto w-full max-w-[300px] font-clash-semibold"
          styleClass="w-full"
          variant="primary"
          click={() => {
            dispatch(setIsLoading(true))
          }}
        >
          Регистрация
        </GenericButton>
      </div>

      <div className="flex w-full items-center justify-center gap-2">
        <p className="text-[14px] text-brown/80">{`Имаш акаунт?`}</p>
        <Link href="/register" className="font-kolka font-[500] text-brown">
          Вход
        </Link>
      </div>
    </form>
  )
}

export default RegisterComponent
