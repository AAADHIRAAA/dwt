"use client"
import React from 'react';
import Spreadsheet from '../components/spreadsheet';

export default function Home() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth', // Optional: Adds smooth scrolling behavior
    });
  };
  return (
    <div>
    
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <h1 className='custom-heading'>Digitized Work Tracker</h1>
      
          <Spreadsheet />
      
        </div>
        <div>
        <button onClick={scrollToBottom} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
      Scroll to Bottom
        </button>
        </div>
      </main>

    </div>
  )
}