"use client"
import { ClerkProvider } from "@clerk/nextjs";
import { AppProps } from "next/app";
import { FormDataProvider } from '../context/formDataContext';
function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    
    <ClerkProvider {...pageProps}>
      
      <Component {...pageProps} />
      
    </ClerkProvider>
    
  );
}

export default MyApp;
