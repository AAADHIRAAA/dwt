"use client"
import React from 'react';
import Header from "../components/Header";
import Image from 'next/image';
import UserDashboard from "../userdashboard/page";
import DataForm from "../components/dataform";

export default function WorkReport() {

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth', 
    });
  };
  return (
    <>
    <Header/>
    
      <main className="flex min-h-screen flex-col items-center justify-between p-15">
      <div>
      
          <div >
           <UserDashboard />
       
          {/* Book Details Section */}
        </div>
        <div>
          <h1 style={{fontSize:'35px', color:'blue',marginTop:'25px',textAlign:'center',fontWeight:'bolder',marginBottom:'25px'}}>Enter the Book Details</h1>
        </div>
        <div>
         <DataForm />
          </div>
        </div>
        <div>
        <button  onClick={scrollToBottom} style={{ position: 'fixed', bottom: '40px', right: '40px' }}>
        <Image src="/scroll-down.png" alt="Scrolldown" width={20} height={20} />
        </button>
        </div>
        
      </main>
  
    </>
  )
}