import { getUserData } from './index'
import { CardElement } from '@stripe/react-stripe-js'
import { db } from '../db';

const headers = new Headers();
headers.set('Content-type', 'application/json');
const BASE_URL = 'https://front-todos.web.app';


export const registerCard = async (stripe, elements, history) => {
  const user = await getUserData()
  console.log(user)
  const email = user.email
  const uid = user.id
  const name = user.name

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
      const deleteCustomer = await fetch(BASE_URL + '/v1/customer', {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify({customerId: customerData.id})
      });
      await deleteCustomer.json();
      alert('お客様情報の登録に失敗しました。');
    })
  }
}




const createCustomer = async (email, paymentMethodId, uid) => {
  const response = await fetch(BASE_URL + '/v1/customer', {
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