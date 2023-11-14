"use client"
import React from "react";
import Link from "next/link";

const Header = () => {

  return (
    <header>
        <nav className="ml-auto">
          <>
          <Link href="/dashboard" className="mr-8">
              Home
            </Link>
          <Link href="/profile" className="mr-8">
              Profile
            </Link>
            <Link href="http://localhost:5000/logout" className="mr-8">
            Logout
          </Link>
          </>
        </nav>
    </header>
  );
};

export default Header;
