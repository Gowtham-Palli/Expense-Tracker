import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const CardInfo = ({budgetList}) => {

    const [totalSpend, setTotalSpend] = useState(0);
    const [totalBudget, setTotalBudget] = useState(0);

    useEffect(() => {
      budgetList&&calculateBudget();
    }, [budgetList])
    
    const calculateBudget=()=>{
        let totalSpend_ = 0;
        let totalBudget_ = 0;
        budgetList.forEach(element => {
            totalSpend_=totalSpend_+element.totalSpend;
            totalBudget_=totalBudget_+Number(element.amount);
        });
        setTotalBudget(totalBudget_);
        setTotalSpend(totalSpend_);
    }
  return (
    <div>
        {budgetList?.length>0?
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'> 
            <div className='p-7 rounded-lg flex items-center justify-between bg-black'>
                <div>
                    <h2 className='text-sm text-white'>Total Budget</h2>
                    <h2 className='font-bold text-2xl text-white'>${totalBudget}</h2>
                </div>
                <PiggyBank className='bg-pink-600 p-3 h-12 w-12 rounded-full'/>
            </div>
            <div className='p-7 rounded-lg flex items-center justify-between bg-black'>
                <div>
                    <h2 className='text-sm text-white'>Total Spend</h2>
                    <h2 className='font-bold text-2xl text-white'>${totalSpend}</h2>
                </div>
                <ReceiptText className='bg-sky-600 p-3 h-12 w-12 rounded-full '/>
            </div>
            <div className='p-7 rounded-lg flex items-center justify-between bg-black'>
                <div>
                    <h2 className='text-sm text-white'>No.Of Budgets</h2>
                    <h2 className='font-bold text-2xl text-white'>{budgetList?.length}</h2>
                </div>
                <Wallet className='bg-emerald-600 p-3 h-12 w-12 rounded-full '/>
            </div>
        </div>
        :
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {[1, 2, 3].map((item, index) => (
                <div key={index} className='h-[150px] w-full bg-slate-200 animate-pulse rounded-lg'>

                </div>
            ))}
        </div>
        }
    </div>
  )
}

export default CardInfo