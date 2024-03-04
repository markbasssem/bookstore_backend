import { Request, Response, Router } from "express";

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OqYXHDCeh2h0nehqz3DKaqe7jo9JWUuNlUMFJPdgooZTiuAso7NOEgpenjeVIGvjdGnFPB50S8paD8p3MCmHpKd00iVpt1cf1');

const payment = Router();
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

payment.post('/', async (req, res) => {
    console.log("Entered paymentt-sheet")
    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2023-10-16' }
    );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'eur',
        customer: customer.id,
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter
        // is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });
    console.log("exiting payment", paymentIntent.client_secret)
    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: 'pk_test_51OqYXHDCeh2h0nehqVF7ZaXDQnRq4wOLMpzQampJdjrrNX4v6iA6aOclZ7foDj6GbckE1WY7njCZy9FJNQdMWcYT006Yao93uW'
    });
});

export default payment;
