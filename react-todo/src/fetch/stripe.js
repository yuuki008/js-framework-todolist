import { getUserData } from './index'
import { CardElement } from '@stripe/react-stripe-js'
import { db } from '../db';

const headers = new Headers();
headers.set('Content-type', 'application/json');
const BASE_URL = process.env.REACT_APP_BASE_URL

// test card === 5555 5555 5555 4444 4444444444444


export const registerCard = async (stripe, elements, history, userId) => {
  const user = await getUserData(userId)
  if (!user) return
  console.log(user)
  const email = user.email
  const uid = user.id
  const customer_id = user.customer_id
  const prevPaymentMethodId = user.payment_method_id

  if (!stripe || !elements) return

  const cardElement = elements.getElement(CardElement);
  if (!cardElement) return
  //入力されたカード情報がcardElementと同じかどうか確認している　不正なものじゃない確認！
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });
  if (error) return
  const paymentMethodId = paymentMethod?.id

  if (customer_id === "") {
    const customerData = await createCustomer(email, paymentMethodId, uid)
    if (!customerData.id) {
      alert('お客様情報の登録に失敗しました。');
    } else {
      const updateUserState = {
        customer_id: customerData.id,
        payment_method_id: paymentMethodId
      }
      db.collection('users').doc(uid)
        .update(updateUserState)
        .then(() => {
          alert('お客様情報を登録しました。');
          history.push('/mypage')
        }).catch(async (error) => {
        console.error(error);
        const deleteCustomer = await fetch(BASE_URL + '/stripeCustomer', {
          method: 'DELETE',
          headers: headers,
          body: JSON.stringify({customerId: customerData.id})
        });
        await deleteCustomer.json();
        alert('お客様情報の登録に失敗しました。');
      })
    }
  } else {
    const updateResponse = await updatePaymentMethod(customer_id, prevPaymentMethodId, paymentMethodId)

    if (!updateResponse) {
      alert('お客様情報の更新に失敗しました。')
    } else {
      const updateUserState = { payment_method_id: paymentMethodId }
      db.collection('users').doc(uid)
      .update(updateUserState)
      .then(() => {
        alert('お客様情報を更新しました。');
        history.push('/mypage')
      })
        .catch(() => {
        alert('お客様情報の登録に失敗しました。')
      })
    }
  }
}




const createCustomer = async (email, paymentMethodId, uid) => {
  const response = await fetch(BASE_URL + '/stripeCustomer', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      email: email,
      paymentMethod: paymentMethodId,
      userId: uid,
    })
  });

  const customerResponse = await response.json();
  return JSON.parse(customerResponse.body);
}

const updatePaymentMethod = async (customerId, prevPaymentMethodId, nextPaymentMethodId) => {
  const response = await fetch(BASE_URL + 'updatePaymentMethod', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      customerId: customerId,
      prevPaymentMethodId: prevPaymentMethodId,
      nextPaymentMethodId: nextPaymentMethodId
    })
  });

  const paymentMethodResponse = await response.json()
  const paymentMethod = JSON.parse(paymentMethodResponse.body)
  return paymentMethod.card
}