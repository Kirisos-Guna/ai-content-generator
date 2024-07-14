"use client"
import React, { useState } from 'react';
import { TotalUsageContext } from '../(context)/TotalUsageContext';
import { UpdateCreditUsageContext } from '../(context)/UpdateCreditUsageContext';
import { UserSubscriptionContext } from '../(context)/UserSubscriptionContext';
import Header from './_components/Header';
import Navbar from './_components/navbar';
import SideNav from './_components/SideNav';
function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [totalUsage, setTotalUsage] = useState<Number>(0);
    const [userSubscription, setUserSubscription] = useState<boolean>(false);
    const [updateCreditUsage, setUpdateCreditUsage] = useState<any>()

    return (
        <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
            <UserSubscriptionContext.Provider value={{ userSubscription, setUserSubscription }}>
                <UpdateCreditUsageContext.Provider value={{ updateCreditUsage, setUpdateCreditUsage }}>
                    <div className='bg-slate-100 min-h-screen'>
                        <div className='md:w-64 hidden md:block fixed'>
                            <SideNav />
                        </div>
                        <div className='md:ml-64'>
                            <Header />
                            <main>
                                <Navbar />
                                {children}
                            </main>
                        </div>
                    </div>
                </UpdateCreditUsageContext.Provider>
            </UserSubscriptionContext.Provider>
        </TotalUsageContext.Provider>
    )
}

export default layout
