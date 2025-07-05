import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className="p-5 border-b shadow-sm flex justify-between items-center relative">
      {/* Centered Logo (hidden on small screens) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 sm:block">
        <Image src="/logo.png" height={100} width={150} alt="logo" />
      </div>

      <div />
      <UserButton />
    </div>
  )
}

export default DashboardHeader
