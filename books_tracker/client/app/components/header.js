"use client"
import React from "react";
import Link from "next/link";
import {auth, UserButton} from '@clerk/nextjs';

const Header = () => {
    
  return (
    <header>
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
