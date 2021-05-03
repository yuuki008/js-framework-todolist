const headers = new Headers();
headers.set('Content-type', 'application/json');
const BASE_URL = 'https://front-todos.web.app';

const createCustomer = async (email, paymentMethodId, uid, username) => {
  const response = await fetch(BASE_URL + '/v1/customer', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      email: email,
      paymentMethod: paymentMethodId,
      userId: uid,
      username: username
    })
  });

  const customerResponse = await response.json();
  return JSON.parse(customerResponse.body);
}