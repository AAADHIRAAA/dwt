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
              Admin
            </Link>
          {/* <Link href="/profile" className="mr-8">
              Profile
            </Link> */}
            {/* <Link href="http://localhost:5200/logout" className="mr-8">
            Logout
          </Link> */}
          <div>
            <UserButton afterSignOutUrl="/"/>
          </div>
          </>
        </nav>
    </header>
  );
};

export default Header;
