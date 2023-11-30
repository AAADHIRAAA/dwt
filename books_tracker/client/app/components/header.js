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
      const currentDate= new Date().toLocaleDateString();
      if (!storedFirstLoginTimes[user.id] || storedFirstLoginTimes[user.id].date !== currentDate) {
        const currentTime = new Date().toLocaleString();
        storedFirstLoginTimes[user.id] = { date: currentDate, time: currentTime };
        localStorage.setItem('firstLoginTimes', JSON.stringify(storedFirstLoginTimes));
        setLoginTime(currentTime);
      } else {
        setLoginTime(storedFirstLoginTimes[user.id].time);
      }
    }
    
 }, [user]);


  return (
    <header className="bg-gray-100 py-1 px-2 flex flex-wrap justify-between items-center">
         {user &&(
          <>
          <nav className="flex items-center">
            <>
            <div>
            <Link href="/dashboard" >
             <h2 className=" mb-3 text-sky-800 text-lg sm:text-xl md:text-xl  xl:text-xl">#ServantsOfKnowledge</h2>
            </Link>
            </div>
            
             <div className="  ml-4 text-sky-800 text-lg ">{loginTime && 
             <h2 className=" mb-3 text-sky-800 text-lg sm:text-xl md:text-xl  xl:text-xl">LoginTime: {loginTime}</h2>}
             </div> 
            </>

          </nav>
                 
            </>
         )}
         {!user &&(
            // <div className="ml-16 mr-16 ">
            <h2 className="mb-3 text-sky-800 text-lg sm:text-xl md:text-xl  xl:text-xl">#ServantsOfKnowledge</h2>
            // </div>
         )}
          
            
        <nav className="flex items-center">
          <>
          {!user && (
            <>
              <Link href="/machine" className="mr-4">
                <h2 className="mb-3 text-sky-800 text-lg">
                 Login
                </h2>
              </Link>
              <div className="mr-2">
                <UserButton afterSignOutUrl="/"/>
              </div>
            </>
          )}
         
       
            {user && (
              <>
               {isAdmin && (
                <Link href=" /admin" className="mr-4">
                  <h2 className="mb-3 text-sky-800 text-lg sm:text-xl md:text-xl  xl:text-xl">Admin Page</h2></Link>
                )}
              <div  className="mr-4">
            {selectedScribe && (
              <h2 className="mb-3 text-sky-800 text-lg sm:text-xl md:text-xl  xl:text-xl">
                {selectedScribe}
              </h2>
                )}
              </div>
         
                <Link href="/workreport" className="mr-4 ml-1">
                  <h2 className="mb-3 text-sky-800 text-lg sm:text-xl md:text-xl  xl:text-xl">Dashboard</h2>
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
