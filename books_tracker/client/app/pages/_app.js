"use client"
import { ClerkProvider } from "@clerk/nextjs";
import { AppProps } from "next/app";

function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
