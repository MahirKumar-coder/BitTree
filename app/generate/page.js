"use client"; // Sabse zaroori line

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

// NOTE: CSS import yahan se hata diya gaya hai.
// Is line ko apne root layout file (app/layout.js) mein import karein:
// import 'react-toastify/dist/ReactToastify.css';

export default function GenerateForm() {
    const searchParams = useSearchParams();

    // State Initialization
    const [links, setLinks] = useState([{ link: "", linkText: "" }]);
    const [handle, setHandle] = useState('');
    const [pic, setPic] = useState("");
    const [desc, setDesc] = useState("");

    // useEffect URL se 'handle' ko sync karne ke liye
    useEffect(() => {
        setHandle(searchParams.get('handle') || '');
    }, [searchParams]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedLinks = links.map((item, i) => {
            if (i === index) {
                return { ...item, [name]: value };
            }
            return item;
        });
        setLinks(updatedLinks);
    };

    const addLink = () => {
        setLinks([...links, { link: "", linkText: "" }]);
    }

    const submitLinks = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "links": links,
            "handle": handle,
            "pic": pic,
            "desc": desc
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        
        // Use relative path for API call
        const r = await fetch("/api/add", requestOptions);
        const result = await r.json();

        if (result.success) {
            toast.success(result.message);
            setLinks([{ link: "", linkText: "" }]); // Reset to one empty link
            setPic("");
            setHandle("");
            setDesc("");
        } else {
            toast.error(result.message);
        }
    }

    return (
        <div className='min-h-screen grid grid-cols-1 md:grid-cols-2'>
            <div className="col1 flex justify-center items-center flex-col p-4">
                <div className='flex flex-col gap-5 my-8 w-full max-w-md'>
                    <h1 className='font-bold text-4xl text-gray-900'>Create your Bittree</h1>
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 1: Claim your Handle</h2>
                        <div className='mx-4'>
                            <input value={handle || ""} onChange={e => setHandle(e.target.value)} className='w-full px-4 py-3 my-2 border border-gray-300 focus:outline-black rounded-full' type="text" placeholder='Choose a handle' />
                        </div>
                    </div>
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 2: Add Links</h2>
                        {links.map((item, index) => (
                            <div key={index} className='mx-4 flex flex-col sm:flex-row gap-2 my-2'>
                                <input
                                    name="linkText"
                                    value={item.linkText || ""}
                                    onChange={e => handleChange(index, e)}
                                    className='w-full px-4 py-3 border border-gray-300 focus:outline-black rounded-full'
                                    type="text"
                                    placeholder='Enter link text (e.g., Instagram)'
                                />
                                <input
                                    name="link"
                                    value={item.link || ""}
                                    onChange={e => handleChange(index, e)}
                                    className='w-full px-4 py-3 border border-gray-300 focus:outline-black rounded-full'
                                    type="text"
                                    placeholder='Enter link URL (e.g., https://...)'
                                />
                            </div>
                        ))}
                        <button onClick={addLink} className='px-5 py-2 mx-4 bg-black text-white font-bold rounded-full'>+ Add Link</button>
                    </div>
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 3: Add Picture and Description</h2>
                        <div className='mx-4 flex flex-col'>
                            <input value={pic || ""} onChange={e => setPic(e.target.value)} className='w-full px-4 py-3 my-2 border border-gray-300 focus:outline-black rounded-full' type="text" placeholder='Enter link to your picture' />
                            <input value={desc || ""} onChange={e => setDesc(e.target.value)} className='w-full px-4 py-3 my-2 border border-gray-300 focus:outline-black rounded-full' type="text" placeholder='Enter description' />
                            <button
                                disabled={!pic || !handle || links.some(link => !link.link || !link.linkText)}
                                onClick={submitLinks}
                                className='disabled:bg-slate-500 disabled:cursor-not-allowed p-5 py-3 mx-2 w-fit my-5 bg-black text-white font-bold rounded-3xl'
                            >
                                Create your BitTree
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col2 w-full h-full hidden md:block">
                <img className='w-full h-full object-cover' src="/back.webp" alt="generate your link" />
                <ToastContainer />
            </div>
        </div>
    )
}
