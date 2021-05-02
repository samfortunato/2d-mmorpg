import { loadStripe } from '@stripe/stripe-js';

import { HttpService } from './http-service';

const stripePromise = loadStripe('pk_test_a8mVaKnxIvxYfMnGkHoFyvTf');

export class PaymentService {

  static async handlePayment() {
    try {
      const stripe = await stripePromise;
      const url = 'http://ec2-100-25-200-25.compute-1.amazonaws.com:8082/create-checkout-session';
      const opts = { method: 'POST' }

      const session = await HttpService.jsonRequest(url, opts);
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) throw result.error.message;
    } catch (err) {
      console.error(err);
    }
  }

}
