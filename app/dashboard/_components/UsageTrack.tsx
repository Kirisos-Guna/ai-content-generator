"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { AIOutput, UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';

import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { eq } from 'drizzle-orm';
import { useContext, useEffect, useState } from 'react';
import { HISTORY } from '../history/page';

interface UserSubscriptionResult {
  startDate?: string | Date;
  // Add other fields that are in your UserSubscription table
}

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
  const [maxWords, setMaxWords] = useState(10000)
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState<Date | null>(null);

  useEffect(() => {
    user && GetData();
    user && IsUserSubscribe();
  }, [user]);

  useEffect(() => {
    user && GetData();
  }, [updateCreditUsage && user]);

  const GetData = async () => {
    {/* @ts-ignore */ }
    const result: HISTORY[] = await db.select().from(AIOutput).where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));

    GetTotalUsage(result)
  }

  const IsUserSubscribe = async () => {
    try {
      {/* @ts-ignore */ }
      const result: UserSubscriptionResult[] = await db.select().from(UserSubscription).where(eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress));
      console.log(result)
      if (result.length > 0) {
        setUserSubscription(true);
        let startDate: Date;
        if (result[0].startDate) {
          startDate = result[0].startDate instanceof Date ? result[0].startDate : new Date(result[0].startDate);
        } else {
          startDate = new Date();
        }
        const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from start date
        setSubscriptionEndDate(endDate);
      }
    } catch (error) {
      console.error("Error checking user subscription:", error);
      // Handle the error appropriately
    }
  }

  const GetTotalUsage = (result: HISTORY[]) => {
    let total: number = 0;
    result.forEach(element => {
      total = total + Number(element.aiResponse?.length)
    });

    setTotalUsage(total)
    console.log(total);
  }

  const isSubscriptionActive = () => {
    return userSubscription && subscriptionEndDate && new Date() < subscriptionEndDate;
  }

  const getRemainingDays = () => {
    if (subscriptionEndDate) {
      const now = new Date();
      const diffTime = subscriptionEndDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(diffDays, 0);
    }
    return 0;
  }

  return (
    <div className='m-5'>
      <div className='bg-primary text-white p-3 rounded-lg'>
        <h2 className='font-medium'>Credits</h2>
        <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
          <div className='h-2 bg-white rounded-full'
            style={{
              width: totalUsage / maxWords > 1 ? '100%' : (totalUsage / maxWords) * 100 + '%'
            }}
          ></div>
        </div>
        {isSubscriptionActive() ? (
          <h2 className='text-sm my-2'>Unlimited credits: {totalUsage} words used</h2>
        ) : (
          <h2 className='text-sm my-2'>{totalUsage} / {maxWords} words used</h2>
        )}
      </div>
      {!isSubscriptionActive() && (
        <a href="/dashboard/billing">
          <Button variant={'secondary'} className='w-full my-3 text-primary'>Upgrade</Button>
        </a>
      )}
    </div>
  )
}

export default UsageTrack