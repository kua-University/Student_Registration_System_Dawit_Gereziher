import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import '../Style/paymentPage.css';
import CheckoutForm from './CheckoutForm';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_51QZnvkLSI0xKb8ioRT7IdVgooo2mmhw1VIDDVfplEb4R7V54fSR1WcXsLqXtiOInfPmVCbEqE3gLK1Z2i0GhDiz100qnPiQfnW');

const PaymentPage = ({onValueChange}) => {
  const [clientSecret, setClientSecret] = useState('');
  const [amount, setAmount] = useState(''); // Allow user to enter amount
  const [isLoading, setIsLoading] = useState(false);
  const [paymentId, setPaymentId] = useState('');

  const handleCreatePaymentIntent = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/payments', { 
        amount,
        paymentMethod: 'card', // Send amount to backend
      });
      
      const { paymentId, clientSecret } = response.data;
      setPaymentId(paymentId);
      if (clientSecret) {
        setClientSecret(clientSecret);
      } else {
        alert('Failed to create payment intent.');
      }
    } catch (error) {
      console.error('Error fetching client secret:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      {!clientSecret ? (
        <div>
          <label>
            Enter Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              required
            />
          </label>
          <button onClick={handleCreatePaymentIntent} disabled={isLoading}>
            {isLoading ? 'Creating Payment...' : 'Proceed to Payment'}
          </button>
        </div>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} paymentId={paymentId} onValueChange={onValueChange}/>
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
