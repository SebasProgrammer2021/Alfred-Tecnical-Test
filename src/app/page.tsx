"use client"
import useStore from "@/store/store";
import Image from "next/image";

function Counter() {
  const { count, inc } = useStore()
  return (
    <div>
      <span className="border border-amber-200 p-4 block">{count}</span>
      <br/>
      <button onClick={inc}>one up</button>
    </div>
  )
}


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>test</h1>
        <Counter />
      </main>
    </div>
  );
}
