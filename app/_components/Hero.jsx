import { SignUpButton } from '@clerk/nextjs'
import React from 'react'

const Hero = () => {
    return (
        <section className="relative lg:grid lg:h-screen lg:place-content-center overflow-hidden">
  {/* Background Image with blur */}
  <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center blur-sm brightness-75 z-0"></div>

  {/* Foreground content */}
  <div className="relative z-10 mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
    <div className="mx-auto max-w-prose text-center">
      <h1 className="text-4xl font-bold text-white sm:text-5xl">
        Manage Your Expense
        <hr className="my-2 border-white/30" />
        <strong className="text-indigo-300">Control Your Money </strong>
      </h1>

      <p className="mt-4 text-base text-white/90 sm:text-lg/relaxed">
        Start crediting your money and Save a ton
      </p>

      <div className="mt-4 flex justify-center gap-4 sm:mt-6">
        <SignUpButton
          className="inline-block rounded border border-indigo-500 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
          href="/sign-up"
        >
          Get Started
        </SignUpButton>
      </div>
    </div>
  </div>
</section>

    )
}

export default Hero