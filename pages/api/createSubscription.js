/* eslint-disable no-undef */
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SERVER_KEY);
module.exports = async (request, res) => {
  const { email, payment_method, name, priceId } = request.body;
  try {
    const customer = await stripe.customers.create({
      email,
      payment_method,
      invoice_settings: {
        default_payment_method: payment_method,
      },
      name,
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: priceId,
        },
      ],
      collection_method: "charge_automatically",
      expand: ["latest_invoice.payment_intent"],
    });

    res.status(200).send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      paymentIntentId: subscription.latest_invoice.payment_intent.id,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};
