import React from 'react'
import { loadStripe } from '@stripe/stripe-js/pure'
import { Elements } from '@stripe/react-stripe-js'
import { PaymentEdit } from '../components/PaymentEdit'

const STRIPE_PUBLIC_KEY = "pk_test_51ImD5GB8X8CGc8BDF73kN7CxlmzRmOds4alnZIQyJ9vNvl4KYcrErNfeuR8TtL5A2sVlkRof24ZGsom2vNVu6XKw00zCjXOEnJ"
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

export const PaymentEditWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentEdit/>
    </Elements>
  )
}

