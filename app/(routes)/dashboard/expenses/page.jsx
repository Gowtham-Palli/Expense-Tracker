"use client"
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable'
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { desc, eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'

const ExpensesDashboard = () => {
    const [expenseList, setExpenseList] = useState([])
    const {user} = useUser();

    useEffect(()=>{
        user&&getAllExpensesList()
    },[user])
    const getAllExpensesList = async () => {
        const result = await db.select({
          id:Expenses.id,
          name:Expenses.name,
          amount:Expenses.amount,
          createdAt:Expenses.createdAt
        }).from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.id))
        
        setExpenseList(result);
      }
  return (
    <div className='p-8 min-h-screen'>
      <ExpenseListTable expenseList={expenseList} refreshData={()=>getAllExpensesList()}/>
    </div>
  )
}

export default ExpensesDashboard
