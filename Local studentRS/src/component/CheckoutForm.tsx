import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ clientSecret, paymentId, onValueChange}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentIntet, setPaymentIntet] = useState({});

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setPaymentStatus("Stripe hasn't loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error('Payment failed:', error.message);
      setPaymentStatus(`Payment failed. ${error.message}.`);
      axios.put(`http://localhost:3000/api/payments/${paymentId}`, {
        status: 'failed',
      });
      setIsLoading(false);
    } else if (paymentIntent) {
      setPaymentStatus('Payment successful!');
      console.log(paymentIntent);
      onValueChange(paymentId);
      setPaymentIntet(paymentIntent);
      alert('Payment Successful');
      axios.put(`http://localhost:3000/api/payments/${paymentId}`, {
        status: 'completed',
      });
    }
  };

  // Extract payment intent details
  const { id, amount, currency, status, payment_method_types } = paymentIntet;

  // Convert amount from cents to dollars
  const formattedAmount = (amount / 100).toFixed(2);

  return (
    <>
        <form onSubmit={handlePaymentSubmit}>
          <CardElement />
          <button type="submit" disabled={isLoading}> {isLoading ? 'Confirming Payment...' : 'Confirm Payment'}</button>
          <p className='error'>{paymentStatus}</p>
        </form>
    </>
  );
};

export default CheckoutForm;
