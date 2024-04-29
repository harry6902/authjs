"use client"
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import use from 'react';

export default function LoginPage() {
  const router =useRouter()
  const [user,setUser]=useState({
    email:"",
    
    password:""
  })
  const [buttonDisabled,setButtonDisabled]=useState(false)
  const [loading,setLoading]=useState(false);

  const onLogIn =async()=>{
   try {
    setLoading(true)
   const response=await axios.post("/api/users/login",user)
   console.log("LogIn success", response.data)
   router.push('/profile')
   } catch (error:any) {
    console.log("Log in failed ")
    toast.error(error.message)
    
   }
  }
  useEffect(() => {
  if(user.email.length>0 &&  user.password.length>0){
    setButtonDisabled(false);
  }
  else{
    setButtonDisabled(true)
  }
  }, [user])
  
  return (
    <div>
         <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1>{loading ? "Processing" :"Logging"}</h1>
          <hr />
        
           <label className='mt-3 mb-1' htmlFor="email">email</label>
          <input className='bg-white text-black p-2'
          placeholder='email'
          id='email'
          value={user.email}
          onChange={(e)=>{
            setUser({...user,email:e.target.value})
          }}
          type="text"
           />
           <hr />
           <label className='mt-3 mb-1' htmlFor="password">password</label>
          <input className='bg-white text-black p-2 '
          placeholder='password'
          id='password'
          value={user.password}
          onChange={(e)=>{
            setUser({...user,password:e.target.value})
          }}
          type="password"
           />
           <hr />
           

            {buttonDisabled && <p className='mt-5 text-red-600'>Please Enter the details</p>}
            {!buttonDisabled && <button onClick={onLogIn} className='mt-5 border rounded bg-white text-black p-2'>LogIn</button>}
           
           <Link href={"/signup"}>Visit signUp Page</Link>
         </div>
    </div>
  )
}


