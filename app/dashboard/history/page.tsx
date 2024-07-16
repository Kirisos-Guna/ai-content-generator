import Templates from '@/app/(data)/Templates'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { currentUser } from '@clerk/nextjs/server'
import { desc, eq } from 'drizzle-orm'
import Image from 'next/image'
import React from 'react'
import Footer from '../_components/Footer'
import { TEMPLATE } from '../_components/TemplateListSection'
import CopyButton from './_components/CopyButton'

export interface HISTORY {
    id: Number,
    formData: string,
    aiResponse: string,
    templateSlug: string,
    createdBy: string,
    createdAt: string
}

async function History() {
    const user = await currentUser();

    // @ts-ignore
    const HistoryList: HISTORY[] = await db.select().from(AIOutput).where(eq(AIOutput?.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(AIOutput.id));

    const GetTemplateName = (slug: string) => {
        const template: TEMPLATE | any = Templates?.find((item) => item.slug == slug)
        return template;
    }

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className='m-5 p-5 border rounded-lg bg-white flex-grow'>
                    <h2 className='font-bold text-3xl'>History</h2>
                    <p className='text-gray-500'>Search your previously generated AI content</p>
                    <div className='hidden sm:grid sm:grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3'>
                        <h2 className='col-span-2'>TEMPLATE</h2>
                        <h2 className='col-span-2'>AI RESPONSE</h2>
                        <h2>DATE</h2>
                        <h2>WORDS</h2>
                        <h2>COPY</h2>
                    </div>
                    {HistoryList.map((item: HISTORY, index: number) => (
                        <React.Fragment key={index}>
                            <div className='hidden sm:grid sm:grid-cols-7 my-5 py-3 px-3'>
                                <h2 className='col-span-2 flex gap-2 items-center'>
                                    <Image src={GetTemplateName(item?.templateSlug)?.icon} width={25} height={25} alt='icon' />
                                    {GetTemplateName(item.templateSlug)?.name}
                                </h2>
                                <h2 className='col-span-2 line-clamp-3 mr-3'>{item?.aiResponse}</h2>
                                <h2>{item.createdAt}</h2>
                                <h2>{item?.aiResponse.length}</h2>
                                <h2>
                                    <CopyButton aiResponse={item.aiResponse} />
                                </h2>
                            </div>
                            <div className='sm:hidden my-5 py-3 px-3 border-b'>
                                <div className='grid grid-cols-2 gap-4 mb-4'>
                                    <h3 className='font-bold bg-secondary py-2 px-3 rounded'>TEMPLATE</h3>
                                    <div className='flex gap-2 items-center justify-center'>
                                        <Image src={GetTemplateName(item?.templateSlug)?.icon} width={25} height={25} alt='icon' />
                                        <span>{GetTemplateName(item.templateSlug)?.name}</span>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4 mb-4'>
                                    <h3 className='font-bold bg-secondary py-2 px-3 rounded'>AI RESPONSE</h3>
                                    <p className='line-clamp-3 mr-3 text-center'>{item?.aiResponse}</p>
                                </div>
                                <div className='grid grid-cols-2 gap-4 mb-4'>
                                    <h3 className='font-bold bg-secondary py-2 px-3 rounded'>DATE</h3>
                                    <p className='text-center'>{item.createdAt}</p>
                                </div>
                                <div className='grid grid-cols-2 gap-4 mb-4'>
                                    <h3 className='font-bold bg-secondary py-2 px-3 rounded'>WORDS</h3>
                                    <p className='text-center'>{item?.aiResponse.length}</p>
                                </div>
                                <div className='grid grid-cols-2 gap-4 mb-4'>
                                    <h3 className='font-bold bg-secondary py-2 px-3 rounded'>COPY</h3>
                                    <div className='text-center'>
                                        <CopyButton aiResponse={item.aiResponse} />
                                    </div>
                                </div>
                            </div>
                            <hr className='sm:hidden' />
                        </React.Fragment>
                    ))}
                </div>
                <Footer />
            </div>
        </>
    )
}

export default History
