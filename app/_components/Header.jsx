"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    const { user, isSignedIn } = useUser();
    return (
        <div className='px-4 flex justify-between items-center'>
            <Image src={'/logo.png'}
                alt='logo'
                width={100}
                height={100}
                className='h-[120px] w-[230px]'
            />
            {isSignedIn ?
                <UserButton /> :

                <SignInButton>
                    <Button variant={'outline'}>Login</Button>
                </SignInButton>
            }
        </div>
    )
}

export default Header
