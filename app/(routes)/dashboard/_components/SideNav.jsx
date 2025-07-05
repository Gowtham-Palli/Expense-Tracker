"use client"

import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideNav = () => {
    const menulist = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Budgets',
            icon: PiggyBank,
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/expenses'
        },

    ]

    const path = usePathname();
    return (
        <div className='h-screen p-5 shadow-sm bg-black'>
            <div className='place-items-center w-full'>
                <Image src={'/logo.png'}
                    alt='logo'
                    width={160}
                    height={100} />
            </div>

            <div className='mt-5'>
                {menulist.map((menu, index) => (
                    <Link href={menu.path} key={index}>
                        <h2
                            className={`flex gap-2 mb-1 items-center font-medium p-5 cursor-pointer rounded-md
                            hover:text-primary hover:bg-blue-100
                            ${path === menu.path ? 'text-black bg-blue-100' : 'text-white'}
                        `}
                        >
                            <menu.icon />
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>

            <div className='fixed bottom-10 flex items-center gap-2 p-5 text-black text-lg font-medium bg-blue-100 w-[14.3%] rounded-md'>
                <UserButton />
                Profile
            </div>
        </div>
    )
}

export default SideNav
