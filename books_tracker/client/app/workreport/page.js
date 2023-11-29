"use client"
import React from 'react';
import Header from "../components/Header";
import Image from 'next/image';
import UserDashboard from "../userdashboard/page";
import DataForm from "../components/dataform";
import { useRouter } from 'next/navigation';
import {  useClerk } from '@clerk/nextjs';
import { useState } from 'react';

export default function WorkReport() {
  const [logoutTime, setLogoutTime] = useState(null);
  const router = useRouter();
  const { signOut } = useClerk();

  const handleLogout = async() => {
    const currentTime = new Date().toISOString();
    setLogoutTime(currentTime); // Store logout time locally
    
    try {
      await signOut();
      // Redirect the user to the desired page after logout
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle error during logout if needed
    }
  
    
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth', 
    });
  };
  return (
    <>
    <Header/>
    <button onClick={handleLogout} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">End the day</button>
    <div className='ml-4 text-blue-600'>{logoutTime && <p>Logout Time: {logoutTime}</p>}</div>
      <main className="flex min-h-screen flex-col items-center justify-between p-15">
      <div>
      
          <div >
           <UserDashboard />
       
          {/* Book Details Section */}
        </div>
        <div>
          <h1 style={{ fontSize:'20px',color:'#165eab',marginTop:'20px',textAlign:'center',fontWeight:'bolder',marginBottom:'20px'}}>Enter the Book Details</h1>
        </div>
        <div>
         <DataForm />
          </div>
        </div>
        <div>
        <button  onClick={scrollToBottom} style={{ backgroundColor:'#165eab',position: 'fixed', bottom: '40px', right: '40px' }}>
        <Image src="/scroll-down.png" alt="Scrolldown" width={30} height={20} />
        </button>
        </div>
        
      </main>
  
    </>
  )
}