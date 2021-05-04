const functions = require("firebase-functions");
const stripe = require('stripe')(functions.config().stripe.key)
const cors = require('cors')

const sendResponse = (response, statusCode, body) => {
  response.send({
    statusCode,
    headers: {"Access-Control-Allow-Origin": "*"},
    body: JSON.stringify(body)
  });
};

exports.createPaymentIntent= functions.https.onRequest((req, res) => {
  const corsHandler = cors({origin: true});

  corsHandler(req, res, () => {
    if (req.method !== 'POST') {
      sendResponse(res, 405, {error: "Invalid Request"})
    }

    return stripe.paymentIntents.create({
      amount: req.body.amount,
      confirm: true,
      currency: 'JPY',
      customer: req.body.customerId,
      metadata: {idempotencyKey: req.body.paymentMethodId}, // 冪等性を保つ＝二重決済を防ぐために、この決済でkeyとなる値を渡す
      payment_method: req.body.paymentMethodId
    }).then((paymentIntent) => {
      sendResponse(res, 200, paymentIntent);
    }).catch((error) => {
      console.error(error);
      sendResponse(res, 500, {error: error})
    })

  })
})

exports.stripeCustomer = functions.https.onRequest((req, res) => {
  const corsHandler = cors({origin: true});

  corsHandler(req, res, () => {
    if (req.method === 'POST') {
      return stripe.customers.create({
        description: "yuuki's customer",
        email: req.body.email,
        metadata: {userId: req.body.userId},
        payment_method: req.body.paymentMethod,
      }).then((customer) => {
        sendResponse(res, 200, customer);
      }).catch((error) => {
        console.error(error);
        sendResponse(res, 500, {error: error})
      })
    } else if (req.method === 'DELETE') {
      return stripe.customers.del(
        req.body.customerId
      ).then((customer) => {
        sendResponse(res, 200, customer);
      }).catch((error) => {
        console.error(error);
        sendResponse(res, 500, {error: error})
      })
    } else {
      sendResponse(res, 405, {error: "Invalid Request"})
    }
  })
})

exports.updatePaymentMethod = functions.https.onRequest((req, res) => {
  const corsHandler = cors({origin: true});

  corsHandler(req, res, () => {
    if (req.method !== 'POST') {
      sendResponse(res, 405, {error: "Invalid Request"})
    }

    return stripe.paymentMethods.detach(
      req.body.prevPaymentMethodId
    ).then((prevPaymentMethod) => {
      return stripe.paymentMethods.attach(
        req.body.nextPaymentMethodId,
        {customer: req.body.customerId}
      ).then((nextPaymentMethod) => {
        sendResponse(res, 200, nextPaymentMethod);
      })

    }).catch((error) => {
      console.error(error);
      sendResponse(res, 500, {error: error})
    })

  })
})