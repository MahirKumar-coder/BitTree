"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function Home() {

  const router = useRouter()
  const [text, setText] = useState("")

  const createTree = () => {
    router.push(`/generate?handle=${text}`)
  }
  
  
  return (
    <main>
      <section className="bg-[#d2e823] min-h-[100vh] grid grid-cols-2">
        
        <div className="flex justify-center flex-col ml-[10vw] gap-3">
          <p className="text-[#254f1a] font-bold text-7xl">A link in bio built</p>
          <p className="text-[#254f1a] font-bold text-7xl">for you.</p>
          <p className="text-[#254f1a] text-xl my-4">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="input flex gap-5">
            <input value={text} onChange={(e)=> setText(e.target.value)} className="px-2 py-2 focus:outline-[#d2e823] rounded-md" type="text" placeholder="Enter your Handle" />
            <button onClick={()=> createTree()} className="bg-[#254f1a] text-white rounded-full px-2 py-2 font-semibold">claim your bittree</button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col mr-[10vw]">
          <img src="/home.png" alt="homepage image" />
        </div>
      </section>
      <section className="bg-red-700 min-h-[100vh]">

      </section>
    </main>
  );
}
