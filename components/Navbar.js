"use client"

import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname()
  const showNavbar = ["/", "/generate"].includes(pathname)
  return (
    <>
      {showNavbar && <nav className='bg-white flex justify-between w-[80vw] fixed top-10 right-[10vw] rounded-full p-5 px-7'>
        <div className="logo flex gap-20 items-center">
          <Link href={"/"}>
            <img className='h-8' src="logo.svg" alt="" />
          </Link>
          <ul className='flex gap-10'>
            <Link href={"/"}><li>Products</li></Link>
            <Link href={"/"}><li>Templates</li></Link>
            <Link href={"/"}><li>Marketplace</li></Link>
            <Link href={"/"}><li>Learn</li></Link>
            <Link href={"/"}><li>Pricing</li></Link>
          </ul>
        </div>
        <div className='flex gap-3'>
          <button className="login bg-gray-400 p-4 rounded-lg font-bold">Log in</button>
          <button className="signup bg-gray-900 text-white p-4 rounded-full font-bold"> Sign up free</button>
        </div>
      </nav>}
    </>
  )
}

export default Navbar
