"use client"
import { ClerkProvider, ClerkLoaded,useClerk } from "@clerk/nextjs";
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';

function MyApp(props) {
  const { Component, pageProps } = props;
  return (
    
    <ClerkProvider {...pageProps}>
       
      <Component {...pageProps} />
      
    </ClerkProvider>
    
  );
}

export default MyApp;
