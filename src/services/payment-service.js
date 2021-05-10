import { loadStripe } from '@stripe/stripe-js';

import { HttpService } from './http-service';

const stripePromise = loadStripe('pk_live_t13oysBWiwRYn7mFxTWa0sqh');

export class PaymentService {

  static async handlePayment() {
    try {
      const stripe = await stripePromise;
      const url = 'https://payments.superatomic.net/create-checkout-session';
      const opts = { method: 'POST' }

      const session = await HttpService.jsonRequest(url, opts);
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) throw result.error.message;
    } catch (err) {
      console.error(err);
    }
  }

}
