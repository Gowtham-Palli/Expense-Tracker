import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const ExpenseListTable = ({ expenseList, refreshData }) => {
    const deleteExpense = async (expense) => {
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, expense.id))
            .returning();

        if (result) {
            toast('Expense Deleted');
            refreshData();
        }
    }
    return (
        <div className='mt-3'>
            <h2 className='font-bold text-lg text-white'>Latest Expenses</h2>
            <div className='grid grid-cols-4 p-2 bg-slate-700 mt-3'>
                <h2 className='font-bold w-full text-center'>Name</h2>
                <h2 className='font-bold w-full text-center'>Amount</h2>
                <h2 className='font-bold w-full text-center'>Date</h2>
                <h2 className='font-bold w-full text-center'>Action</h2>
            </div>
            {expenseList.map((expenses, index) => (
                <div key={index} className='grid grid-cols-4 p-2 bg-black'>
                    <h2 className='text-white w-full text-center'>{expenses.name}</h2>
                    <h2 className='text-white w-full text-center'>{expenses.amount}</h2>
                    <h2 className='text-white w-full text-center'>{expenses.createdAt}</h2>
                    <h2 className='w-full place-items-center'>
                        <Trash className='text-red-600'
                            onClick={() => deleteExpense(expenses)}
                        />
                    </h2>
                </div>
            ))}
        </div>
    )
}

export default ExpenseListTable