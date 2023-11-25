"use client"
import React,{useEffect, useState} from "react";
import Link from "next/link";
import {UserButton, useUser} from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Header = () => {
  
  const router = useRouter();
  const [selectedScribe, setSelectedScribe] = useState(null);
  const { user } = useUser();

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
         {user &&(
             <Link href="/dashboard" className="ml-16 mr-16 ">
             <h2 style={{ fontSize: '15px', color: '#165eab' }}>#ServantsOfKnowledge</h2>
            </Link>
         )}
         {!user &&(
            <div className="ml-16 mr-16 ">
            <h2 style={{ fontSize: '15px', color: '#165eab' }}>#ServantsOfKnowledge</h2>
            </div>
         )}
          
            
        <nav className="ml-auto">
          <>
          {!user && (
            <>
              <Link href="/machine" className="mr-8">
                <h2 style={{ fontSize: "15px", color: '#165eab'}}>
                 Login
                </h2>
              </Link>
              <div className="mr-4">
                <UserButton afterSignOutUrl="/"/>
              </div>
            </>
          )}
         
          {/* <Link href="/dashboard" className="mr-8">
              <h2 style={{fontSize:'15px',color:'white'}}>Admin</h2>
            </Link> */}
            {user && (
              <>
              <div  className="mr-8">
            {selectedScribe && (
              <h2 style={{ fontSize: '15px', color: '#165eab'}}>
                {selectedScribe}
              </h2>
                )}
            </div>
         
                <Link href="/workreport" className="mr-8">
                  <h2 style={{fontSize:'15px',color:'#165eab'}}>Home</h2>
                </Link>
                {/* <Link href="/profile" className="mr-8">
                  <h2 style={{fontSize:'15px',color:'#165eab'}}>Profile</h2>
                </Link> */}
                <div className="mr-8">
                  <UserButton afterSignOutUrl="/"/>
                </div>
                
              </>
            )}
            
          </>
        </nav>
       
    </header>
  );
};

export default Header;
