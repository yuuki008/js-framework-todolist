import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js/pure'
import { Elements } from '@stripe/react-stripe-js'
import { PaymentEdit } from '../components/PaymentEdit'
import { listenAuthState } from '../fetch/index'
import { useHistory } from 'react-router-dom'

const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_API_KEY
console.log(STRIPE_PUBLIC_KEY)
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)


export const PaymentEditWrapper = () => {
  const history = useHistory()
  const [user, setUserData] = useState({})

  const getUserData = async () => {
    const data = await listenAuthState()
    if (!data) return history.push('/signin')
    setUserData(data)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <Elements stripe={stripePromise}>
      <PaymentEdit user={user}/>
    </Elements>
  )
}

