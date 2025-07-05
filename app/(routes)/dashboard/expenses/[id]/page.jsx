"use client"
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { and, desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { useParams, useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { PenBox, Trash } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import EditBudget from '../_components/EditBudget';

const Expense = () => {
    const { user } = useUser();
    const params = useParams();
    const [expenseList, setExpenseList] = useState([]);
    const router = useRouter();

    const [budgetInfo, setBudgetInfo] = useState()
    useEffect(() => {
        user && getBudgetInfo();
    }, [user])

    const getBudgetInfo = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(and(
                eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress),
                eq(Budgets.id, params.id)
            ))
            .groupBy(Budgets.id);

        setBudgetInfo(result[0]);
        getExpenseList();
    }

    const getExpenseList = async () => {
        const result = await db.select().from(Expenses).where(eq(Expenses.budgetId, params.id)).orderBy(desc(Expenses.id));
        setExpenseList(result);
        console.log(result);
    }

    const deleteBudget=async()=>{
        const deleteExpenseList = await db.delete(Expenses)
                                    .where(eq(Expenses.budgetId, params.id))
                                    .returning();
                                    
        if(deleteExpenseList){
            const result = await db.delete(Budgets)
                                .where(eq(Budgets.id, params.id))
                                .returning();
                                toast('Budget Deleted');
                                router.replace('/dashboard/budgets')
        }
        
    }

    return (
        <div className='p-10 min-h-screen'>
            <h2 className='text-2xl font-bold flex items-center justify-between text-white'>
                My Expenses
                <div className='flex gap-2 items-center'>
                    <EditBudget budgetInfo={budgetInfo} refreshData={()=>getBudgetInfo()} />

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className={'flex gap-2 cursor-pointer'} variant={'destructive'}>
                                <Trash />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your current budget along with expenses
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel >Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={deleteBudget}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
                {budgetInfo ?
                    <BudgetItem budget={budgetInfo} />
                    : <div className='w-full h-[150px] bg-slate-100 rounded-lg animate-pulse'>

                    </div>
                }
                <AddExpense budgetId={params.id} user={user} refreshData={() => getBudgetInfo()} />
            </div>
            <div className='mt-4'>
                <ExpenseListTable expenseList={expenseList} refreshData={() => getBudgetInfo()} />
            </div>


        </div>
    )
}

export default Expense