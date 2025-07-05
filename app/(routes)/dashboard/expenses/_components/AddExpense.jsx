import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import moment from 'moment'
import React, { useState } from 'react'
import { toast } from 'sonner'

const AddExpense = ({budgetId, user, refreshData}) => {

    const addNewExpense=async()=>{
        const result = await db.insert(Expenses).values({
            name:name,
            amount:amount,
            budgetId:budgetId,
            createdAt:moment().format('DD/MM/yyy'),
        }).returning({insertedId:Budgets.id})
        setName('');
        setAmount('');
        if(result){
            refreshData();
            toast('New Expense Added')
        }
    }

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    return (
        <div className='p-5 rounded-lg bg-black'>
            <h2 className='text-lg font-bold text-white'>Add Expense</h2>
            <div className='mt-2'>
                <h2 className='font-medium my-1 text-white'>Expense Name</h2>
                <Input
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Home Decor"
                    value={name}
                    />
            </div>
            <div className='mt-2'>
                <h2 className='text-white font-medium my-1'>Expense Amount</h2>
                <Input
                    type={'number'}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 5000$"
                    value={amount}
                />
            </div>
            <Button
                disabled={!(name && amount)}
                onClick={addNewExpense}
                className={'w-full mt-5 text-black bg-white'}
                >
                Add New Expense
            </Button>
        </div>
    )
}

export default AddExpense
