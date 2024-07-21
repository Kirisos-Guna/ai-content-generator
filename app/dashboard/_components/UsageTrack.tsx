"use client";
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { AIOutput, UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { differenceInDays, parseISO } from 'date-fns';
import { eq } from 'drizzle-orm';
import { useContext, useEffect } from 'react';
import { HISTORY } from '../history/page';

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);

  useEffect(() => {
    if (user) {
      GetData();
      CheckSubscription();
    }
  }, [user]);

  useEffect(() => {
    if (user && updateCreditUsage) {
      GetData();
    }
  }, [updateCreditUsage, user]);

  const GetData = async () => {
    const result = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress ?? ''));
    GetTotalUsage(result as HISTORY[]);
  };

  const CheckSubscription = async () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) return;

    const result = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, userEmail));

    if (result.length > 0) {
      const subscriptionStartDate = parseISO(result[0].joinDate ?? '');
      const daysSinceSubscription = differenceInDays(new Date(), subscriptionStartDate);
  
      if (daysSinceSubscription >= 30) {
        // Switch to free plan
        await db
          .update(UserSubscription)
          .set({ active: false })
          .where(eq(UserSubscription.email, userEmail));
        setUserSubscription(false);
        alert("Your 30-day unlimited period has ended. Please upgrade to continue enjoying unlimited access.");
      } else {
        setUserSubscription(true);
      }
    }
  };

  const GetTotalUsage = (result: HISTORY[]) => {
    let total: number = 0;
    result.forEach(element => {
      total += Number(element.aiResponse?.length);
    });

    setTotalUsage(total);
    console.log(total);
  };

  return (
    <div className='m-5'>
      <div className='bg-primary text-white p-3 rounded-lg'>
        <h2 className='font-medium'>Credits</h2>
        <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
          <div
            className='h-2 bg-white rounded-full'
            style={{
              width: userSubscription ? '100%' : (totalUsage / 10000) * 100 + '%'
            }}
          ></div>
        </div>
        <h2 className='text-sm my-2'>{totalUsage} credit used</h2>
        {userSubscription && <h2 className='text-sm'>Unlimited</h2>}
      </div>
      {!userSubscription && (
        <a href='/dashboard/billing'>
          <Button variant={'secondary'} className='w-full my-3 text-primary'>Upgrade</Button>
        </a>
      )}
    </div>
  );
}

export default UsageTrack;
