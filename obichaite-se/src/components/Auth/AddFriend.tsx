'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { setIsLoading, setUser } from '@/store/features/root'

import React, { useState, useTransition } from 'react'
import { DateInput, GenericButton, TextInput } from '../Generic'
import { addFriendForCurrentUser } from '@/action/friends'
import dayjs from 'dayjs'

const AddFriendComponent = ({
  showFormHandler,
}: {
  showFormHandler: (boolean: boolean) => void
}) => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector((state) => state.root.user?.id)
  const [ok, setOk] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  const [formValues, setFormValues] = useState({
    name: '',
    date: '',
    email: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    date: '',
  })

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    const nameError = formValues.name.length < 3 ? 'Името трябва да е поне 3 символа' : ''
    const emailError =
      !formValues.email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)
    //if date is in the feature add validation with dayjs
    const dateError = dayjs(formValues.date).isAfter(dayjs(), 'day')

    if (nameError || emailError || dateError) {
      setErrors({
        name: nameError ? 'Името трябва да е поне 3 символа' : '',
        email: emailError ? 'Въведете валиден имейл' : '',
        date: dateError ? 'Въведете валидна дата' : '',
      })

      return
    }

    setError(null)
    start(async () => {
      try {
        if (!userId) {
          setError('Неуспешна добавяне, моля опитайте по-късно')
          return
        }

        const res = await addFriendForCurrentUser(userId, formValues)
        if (!res?.ok) {
          setError('Неуспешна добавяне, моля опитайте по-късно')
          return
        }

        setOk(true)

        if (!!res.user) {
          dispatch(setUser(res.user))
        }
      } catch (err) {
        console.log(err)
        setError('Неуспешна добавяне, моля опитайте по-късно')
      }
    })
  }

  return (
    <>
      {ok ? (
        <p className="mt-3 text-[20px] font-sansation text-center">
          Успешна добавяне! <br />
          <GenericButton
            styleClass="w-full md:w-fit"
            type="button"
            click={() => showFormHandler(true)}
          >
            Добави приятел
          </GenericButton>
        </p>
      ) : (
        <form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
          <div className="w-full flex flex-col md:flex-row gap-4">
            <TextInput
              name="name"
              label="Име"
              formValues={formValues}
              setFormValues={setFormValues}
              extraClass="w-full"
              placeholder="Иван Иванов"
              required={true}
              error={errors.name}
              autoFocus={false}
            />
          </div>

          <div className="w-full flex flex-col gap-4">
            <DateInput
              name="date"
              label="Дата на раждане"
              formValues={formValues}
              setFormValues={setFormValues}
              extraClass="w-full"
              placeholder="DD-MM-YYYY"
              error={errors.date}
              required={true}
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
              error={errors.email}
              autoFocus={false}
            />
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
              {pending ? <span className="animate-pulse">Зареждане</span> : 'Добави'}
            </GenericButton>
          </div>

          {error && <p className="text-red-600 w-full max-w-[300px]">{error}</p>}
        </form>
      )}
    </>
  )
}

export default AddFriendComponent
