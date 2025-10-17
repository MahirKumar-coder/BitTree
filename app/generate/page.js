"use client"

import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

// DEVELOPER NOTE: CSS import ko yahan se hata diya gaya hai kyunki yeh build error de raha tha.
// Toast notifications ko aache se style karne ke liye, is line ko apne root layout file (jaise app/layout.js) mein import karein:
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';

const Generate = () => {

    const searchParams = useSearchParams();

    const [links, setLinks] = useState([{ link: "", linkText: "" }])
    const [handle, setHandle] = useState(searchParams.get('handle'))
    const [pic, setPic] = useState("")
    const [desc, setDesc] = useState("")

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        // Create a new array to avoid mutating state directly
        const updatedLinks = links.map((item, i) => {
            if (i === index) {
                // Update the specific property (link or linkText)
                return { ...item, [name]: value };
            }
            return item;
        });
        setLinks(updatedLinks);
    };

    const addLink = () => {
        setLinks([...links, { link: "", linkText: "" }]);
    }

    // FIX: Removed unused parameters (text, link, handle) that were shadowing the state variables.
    const submitLinks = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "links": links,
            "handle": handle, // Now correctly uses the 'handle' from state
            "pic": pic,
            "desc": desc
        });

        console.log(raw)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const r = await fetch("http://localhost:3000/api/add", requestOptions)
        const result = await r.json()
        if(result.success){
            toast.success(result.message)
            setLinks([])
            setPic("")
            setHandle("")
        }else{
            toast.error(result.message)
        }
    }
    return (
        <div className=' min-h-screen grid grid-cols-2'>
            <div className="col1 flex justify-center items-center flex-col">
                <div className='flex flex-col gap-5 my-8'>
                    <h1 className='font-bold text-4xl text-grey-900'>Create your Bittree</h1>
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step1: Claim your Handle</h2>
                        <div className='mx-4'>
                            <input value={handle || ""} onChange={e => { setHandle(e.target.value) }} className='px-4 py-4 my-2 focus:outline-black rounded-full' type="text" placeholder='Choose a handle' />
                        </div>
                    </div>
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step2: Add Links</h2>
                        {links && links.map((item, index) => {
                            return <div key={index} className='mx-4'>
                                {/* Correctly bound to link */}
                                <input
                                    name="link"
                                    value={item.link || ""}
                                    onChange={e => handleChange(index, e)}
                                    className='px-4 py-4 mx-2 my-2 focus:outline-black rounded-full'
                                    type="text"
                                    placeholder='Enter link text'
                                />
                                {/* Correctly bound to linkText */}
                                <input
                                    name="linkText"
                                    value={item.linkText || ""}
                                    onChange={e => handleChange(index, e)}
                                    className='px-4 py-4 mx-2 my-2 focus:outline-black rounded-full'
                                    type="text"
                                    placeholder='Enter link'
                                />
                            </div>
                        })}
                        <button onClick={() => addLink()} className='p-5 py-2 mx-2 bg-black text-white font-bold rounded-3xl'>+ Add Link</button>
                    </div>
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step3: Add Picture and Description</h2>
                        <div className='mx-4 flex flex-col'>
                            <input value={pic || ""} onChange={e => { setPic(e.target.value) }} className='px-4 py-4 mx-2 my-2 focus:outline-black rounded-full' type="text" placeholder='Enter link to your picture' />
                            <input value={desc || ""} onChange={e => { setDesc(e.target.value) }} className='px-4 py-4 mx-2 my-2 focus:outline-black rounded-full' type="text" placeholder='Enter description' />
                            <button disabled={pic == "" || handle == "" || links[0].linkText == ""} onClick={() => { submitLinks() }} className='disabled:bg-slate-500 p-5 py-2 mx-2 w-fit my-5 bg-black text-white font-bold rounded-3xl'>Create your BitTree</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col2 w-full h-screen ">
                <img className='w-full h-full object-contain' src="back.webp" alt="generate your link" />
                <ToastContainer />
            </div>
        </div>
    )
}

export default Generate

