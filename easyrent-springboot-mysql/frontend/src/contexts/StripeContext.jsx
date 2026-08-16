import React, { createContext, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const StripeContext = createContext();

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const StripeProvider = ({ children }) => {
    return (
        <StripeContext.Provider value={{ stripePromise }}>
            {children}
        </StripeContext.Provider>
    );
};

export const useStripe = () => {
    const context = useContext(StripeContext);
    if (!context) {
        throw new Error('useStripe must be used within StripeProvider');
    }
    return context;
};
