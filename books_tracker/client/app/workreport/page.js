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