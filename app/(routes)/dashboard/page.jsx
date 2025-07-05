'use client'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import BarCharDashboard from './_components/BarCharDashboard';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

const Dashboard = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([])
  const [expenseList, setExpenseList] = useState([])

  useEffect(() => {
    user && getBudgetList();
  }, [user])


  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpensesList();
  }

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
    .limit(5)
    setExpenseList(result);
  }

  return (
    <div className='p-8 min-h-screen'>
      <h2 className='font-bold text-3xl text-white'>Hi, {user?.fullName}</h2>
      <CardInfo budgetList={budgetList} />

      <div className='mt-6'>
        <BarCharDashboard budgetList={budgetList} />
      </div>
      
      <ExpenseListTable expenseList={expenseList} refreshData={()=>getBudgetList()}/>

    </div>
  )
}

export default Dashboard
