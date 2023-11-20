"use client"
import React,{useEffect, useState} from "react";
import Link from "next/link";
import {UserButton} from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Header = () => {
  
  const router = useRouter();
  const [selectedScribe, setSelectedScribe] = useState(null);
  const getScribeNumber = () => {
    const storedScribe = localStorage.getItem('selectedScribe');
    if (!storedScribe) {
      router.push('/');
    } else {
      setSelectedScribe(storedScribe);
    }
 };

 useEffect(() => {
    getScribeNumber();
 }, []);


  return (
    <header>
         <div  className="ml-16 mr-16">
            {selectedScribe && (
              <h2 style={{ fontSize: '15px', color: 'white' }}>
                {selectedScribe}
              </h2>
            )}
          </div>
        <nav className="ml-auto">
          <>
         
          <Link href="/dashboard" className="mr-8">
              <h2 style={{fontSize:'15px',color:'white'}}>Admin</h2>
            </Link>
            <Link href="/form" className="mr-8">
              <h2 style={{fontSize:'15px',color:'white'}}>Home</h2>
            </Link>
          <Link href="/profile" className="mr-8">
          <h2 style={{fontSize:'15px',color:'white'}}>Profile</h2>
            </Link>
          <div className="mr-4">
            <UserButton afterSignOutUrl="/"/>
          </div>
          </>
        </nav>
    </header>
  );
};

export default Header;
