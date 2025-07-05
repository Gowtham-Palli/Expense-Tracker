"use client"
import { useEffect } from "react";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      redirect("/dashboard");
    }
  }, [user]);
  return (
    <div className="bg-black min-h-screen">
      <Header/>
      <Hero/>
    </div>
  );
}
