import { SignIn, SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="flex min-h-screen justify-center items-center bg-black px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl items-center">
        {/* Left Side: Animated Logo Title */}
        <div className="flex justify-center">
          <div className="relative p-1 rounded-full">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-borderPulse"></div>

            {/* Inner Content */}
            <div className="relative bg-black text-white text-4xl md:text-5xl font-bold text-center px-10 py-5 rounded-full shadow-md">
              Expense Tracker
            </div>
          </div>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="flex justify-center">
          <SignIn />
        </div>
      </div>
    </div>
  )
}
