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
  const [loginTime, setLoginTime] = useState(null);
 
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
      const storedFirstLoginTimes = JSON.parse(localStorage.getItem('firstLoginTimes')) || {};
      const currentTime = new Date().toLocaleString();

      if (!storedFirstLoginTimes[user.id]) {
        storedFirstLoginTimes[user.id] = currentTime;
        localStorage.setItem('firstLoginTimes', JSON.stringify(storedFirstLoginTimes));
        setLoginTime(currentTime);
      } else {
        setLoginTime(storedFirstLoginTimes[user.id]);
      }
    }
    
 }, [user]);


  return (
    <header className="bg-gray-100 py-4 px-6 flex justify-between items-center">
         {user &&(
          <>
          <nav className="flex items-center">
            <>
            <Link href="/dashboard" >
             <h2 className="text-blue-600 text-lg font-semibold">#ServantsOfKnowledge</h2>
            </Link>
           <div className="ml-8 text-blue-600">{loginTime && <p>Login Time: {loginTime}</p>}</div> 
            </>

          </nav>
             
              
            </>
         )}
         {!user &&(
            <div className="ml-16 mr-16 ">
            <h2 className="text-blue-600 text-lg font-semibold">#ServantsOfKnowledge</h2>
            </div>
         )}
          
            
        <nav className="flex items-center">
          <>
          {!user && (
            <>
              <Link href="/machine" className="mr-4">
                <h2 className="text-blue-600">
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
                <Link href=" /admin" className="mr-4">
                  <h2 className="text-blue-600">Admin Page</h2></Link>
                )}
              <div  className="mr-4">
            {selectedScribe && (
              <h2 className="text-blue-600">
                {selectedScribe}
              </h2>
                )}
            </div>
         
                <Link href="/workreport" className="mr-4">
                  <h2 className="text-blue-600">Dashboard</h2>
                </Link>
              
                <div className="mr-4">
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
