import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import React from 'react'

function BudgetItem({budget}) {
    const calcPercentage=()=>{
        const perc = (budget?.totalSpend/budget?.amount)*100;
        return perc.toFixed(2);
    }
  return (
    <Link href={'/dashboard/expenses/'+budget?.id}  className='p-5  rounded-lg hover:shadow-md cursor-pointer h-[150px] bg-black'>
        <div className='flex gap-2 items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <h2 className='text-2xl bg-slate-100 p-3 px-4 rounded-full'>{budget?.icon}</h2>
                <div>
                    <h2 className='font-bold text-white'>{budget?.name}</h2>
                    <h2 className='text-white text-sm'>{budget?.totalItem} Items</h2>
                </div>
            </div>
            <h2 className='font-bold text-lg text-white'>${budget?.amount}</h2>
        </div>
        <div className='mt-3'>
            <div className='flex  justify-between items-center mb-3'>
                <h2 className='text-xs text-slate-400'>
                    $ {budget?.totalSpend?budget?.totalSpend:0} Spent
                </h2>
                <h2 className='text-xs text-slate-400'>
                    $ {budget?.amount-budget?.totalSpend} Remaining 
                </h2>
            </div>
            <Progress value={calcPercentage()}/>
        </div>
    </Link>
  )
}

export default BudgetItem