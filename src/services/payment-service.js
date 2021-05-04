import { loadStripe } from '@stripe/stripe-js';

import { HttpService } from './http-service';

const stripePromise = loadStripe('pk_test_a8mVaKnxIvxYfMnGkHoFyvTf');

export class PaymentService {

  static async handlePayment() {
    try {
      const stripe = await stripePromise;
      const url = 'http://lb-2d-mmorpg-payments-355078289.us-east-1.elb.amazonaws.com/create-checkout-session';
      const opts = { method: 'POST' }

      const session = await HttpService.jsonRequest(url, opts);
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) throw result.error.message;
    } catch (err) {
      console.error(err);
    }
  }

}
