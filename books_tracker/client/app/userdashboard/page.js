"use client"
import React,{useEffect, useState} from 'react';
import Link from 'next/link';
import Header from "../components/header";
import UserDashboardContainer from '../components/userdashboardContainer'; 

const UserDashboard = () => {

  // const { booksScanned, pagesScanned, authorCount, publisherCount } = data;
 
  const [booksScannedToday, setBooksScannedToday] = useState(0);
  const [pagesScannedToday, setPagesScannedToday] = useState(0);

 
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5200/api/v1/books/statistics-for-date');
        const data = await response.json();
        console.log('Fetched data:', data); 
        setBooksScannedToday(data.booksScannedToday);
        setPagesScannedToday(data.pagesScannedToday);
      
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

     // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
    // Fetch data every 10 minutes (adjust the interval as needed)
    const intervalId = setInterval(fetchData, 10 * 60 * 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
 

  
  return (
    <>

    <div style={{ textAlign: 'center' }}>
      
      <UserDashboardContainer title="Books Scanned" count={booksScannedToday} />
      <UserDashboardContainer title="Pages Scanned" count={pagesScannedToday} />
      
    
    </div>
    </>
  );
};



export default UserDashboard;