"use client"
import React from 'react';
import Spreadsheet from '../components/spreadsheet';
import Header from "../components/header";
import Image from 'next/image';

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
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
        <div >
              {/* <Profile/> */}
              <h1 className='custom-heading'>Digitized Work Tracker</h1>
          </div>
          <Spreadsheet />
      
        </div>
        <div>
        <button  onClick={scrollToBottom} style={{ position: 'fixed', bottom: '40px', right: '40px' }}>
        <Image src="/scroll-down.png" alt="Scrolldown" width={20} height={20} />
        </button>
        </div>
      </main>

    </div>
    </>
  )
}