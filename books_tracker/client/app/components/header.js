"use client"
import React,{useEffect, useState} from "react";
import Link from "next/link";
import {UserButton, useUser} from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Header = () => {

  const [isAdmin, setIsAdmin] = useState(false);
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
    if(user){
      const userRole = user.publicMetadata.userRole;
      setIsAdmin(userRole === 'admin');
    }
   
 }, []);


  return (
    <header>
         {user &&(
          <>
             <Link href="/dashboard" className="ml-16 mr-16 ">
             <h2 style={{ fontSize: '15px', color: '#165eab' }}>#ServantsOfKnowledge</h2>
            </Link>
       
              
            </>
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
         
       
            {user && (
              <>
               {isAdmin && (
                <Link href=" /admin" className="mr-8">
                  <h2 style={{fontSize:'15px',color:'#165eab'}}>Admin Page</h2></Link>
                )}
              <div  className="mr-8">
            {selectedScribe && (
              <h2 style={{ fontSize: '15px', color: '#165eab'}}>
                {selectedScribe}
              </h2>
                )}
            </div>
         
                <Link href="/workreport" className="mr-8">
                  <h2 style={{fontSize:'15px',color:'#165eab'}}>Dashboard</h2>
                </Link>
              
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
