"use client"
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router= useRouter() 
 const [data,setData]= useState("nothing")
 const getUserDetails=async()=>{
  const res= await axios.post("api/users/me")
  console.group(res.data.data)
  setData(res.data.data._id)
 }
 const logout=async()=>{
   
  try {
    await axios.get('/api/users/logout')
    toast('Logout Success')
    router.push('/')
    
  } catch (error:any) {

    console.log(error.message)
    toast(error.message);
  }
 }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
     <h1>Profile page</h1>
     <h2>{data=== "nothing"? "Nothing to display" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
     <hr />
     <button className='bg-blue-500 hover:bg-blue-700 mt-4 font-bold py-2 px-4
     rounded' onClick={logout}>Logout</button>
        <button className='bg-green-500 hover:bg-green-700 mt-4 font-bold py-2 px-4
     rounded' onClick={getUserDetails}>Get user Details </button>
    </div>

  )
}

