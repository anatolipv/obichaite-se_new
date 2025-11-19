'use client'

import { useEffect, useState } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { setNeedToMakeOrder, setTryToMakePayment } from '@/store/features/checkout'

export function PaymentForm() {
  const dispatch = useAppDispatch()
  const tryToMakePayment = useAppSelector((state) => state.checkout.tryToMakePayment)
  const stripe = useStripe()
  const elements = useElements()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handlePayment = async () => {
    setErrorMessage(null)

    if (!stripe || !elements) {
      return
    }

    const result = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })

    if (result.error) {
      setErrorMessage(result.error.message ?? 'Плащането не беше успешно.')
    } else if (result.paymentIntent?.status === 'succeeded') {
      dispatch(setNeedToMakeOrder(true))
    }

    dispatch(setTryToMakePayment(false))
  }

  useEffect(() => {
    if (!tryToMakePayment) return

    handlePayment()
  }, [tryToMakePayment])

  return (
    <div>
      <PaymentElement />

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  )
}
