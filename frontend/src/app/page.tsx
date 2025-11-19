"use client";

// componentes
import { Header } from "@/components/Header/header";

export default function Home() {
  return (
    <main className="sm:ml-14">
      <Header />
       <div className="flex justify-between">
        <h1 className="m-5 font-bold text-lg lg:text-2xl">Dashboard Geral</h1>
      </div>
    </main>
  )
}
