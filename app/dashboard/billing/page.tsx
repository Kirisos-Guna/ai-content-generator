"use client";
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import Footer from '../_components/Footer';

function Billing() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useUser();
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const createSubscription = async () => {
    setLoading(true);
    setError('');
    try {
      const resp = await axios.post('/api/create-subscription', {});
      console.log(resp.data);
      await onPayment(resp.data.id);
    } catch (error) {
      console.error('Error creating subscription:', error);
      setError('Failed to create subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onPayment = (subId: string) => {
    return new Promise((resolve, reject) => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: subId,
        name: 'AI Content Generator',
        description: 'Monthly Subscription',
        handler: async (resp: { razorpay_payment_id?: string }) => {
          console.log(resp);
          if (resp.razorpay_payment_id) {
            await saveSubscription(resp.razorpay_payment_id);
          }
          resolve(resp);
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            reject(new Error('Payment cancelled'));
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    });
  };

  const saveSubscription = async (paymentId: string) => {
    try {
      const result = await db.insert(UserSubscription)
        .values({
          email: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
          active: true,
          paymentId: paymentId,
          joinDate: moment().format('DD/MM/yyyy')
        });
      console.log(result);
      if (result) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error saving subscription:', error);
      setError('Failed to save subscription. Please contact support.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <h2 className='text-center font-bold text-3xl my-3'>Upgrade With Monthly Plan</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
          {!userSubscription && (
            <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-900">
                  Free
                  <span className="sr-only">Plan</span>
                </h2>
                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> 0$ </strong>
                  <span className="text-sm font-medium text-gray-700">/month</span>
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-700"> 10,000 Words/Month </span>
                </li>
                <li className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-700"> All Content Templates </span>
                </li>
                <li className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-700"> Unlimted Download & Copy </span>
                </li>
                <li className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-700"> 1 Month of History </span>
                </li>
              </ul>
              <a
                href="#"
                className="mt-8 block rounded-full 
                border border-indigo-600 
                px-12 py-3 text-center text-sm font-medium bg-gray-500 text-white
                hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              >
                Currently Active Plan
              </a>
            </div>
          )}
          <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Monthly
                <span className="sr-only">Plan</span>
              </h2>
              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> 2.99$ </strong>
                <span className="text-sm font-medium text-gray-700">/month</span>
              </p>
            </div>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700"> Unlimited/Month </span>
              </li>
              <li className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700"> All Template Access </span>
              </li>
              <li className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700"> Unlimated Download & Copy  </span>
              </li>
              <li className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700"> 1 Year of History </span>
              </li>
            </ul>
          </div>
        </div>

        <Button
          disabled={loading || !!userSubscription}
          onClick={createSubscription}
          className='w-full rounded-full mt-5 p-6'
          variant='outline'
        >
          {loading && <Loader2Icon className='animate-spin mr-2' />}
          {userSubscription ? 'Active Plan' : 'Get Started'}
        </Button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <Footer />
    </div>
  );
}

export default Billing;