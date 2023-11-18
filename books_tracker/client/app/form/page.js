"use client"
import React from 'react';
import Spreadsheet from '../components/spreadsheet';
import Header from "../components/header";
import Image from 'next/image';
import UserDashboard from "../userdashboard/page";
import DataForm from "../components/dataform";

export default function Home() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth', // Optional: Adds smooth scrolling behavior
    });
  };
  return (
    <>
    <Header/>
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-10">
        <div>
        <div >
           <UserDashboard />
        </div>
        <div>
          <h1 style={{fontSize:'35px', color:'blue',marginTop:'40px',textAlign:'center',fontWeight:'bolder',marginBottom:'50px'}}>Enter the Book Details</h1>
        </div>
        <div>
         <DataForm/>
          </div>
        </div>
        
      </main>

    </div>
    </>
  )
}