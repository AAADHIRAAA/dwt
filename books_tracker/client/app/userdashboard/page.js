"use client"
import React,{useEffect, useState} from 'react';
import UserDashboardContainer from '../components/userdashboardContainer'; 
import { useClerk } from "@clerk/nextjs";

const UserDashboard = () => {

  const [booksScannedToday, setBooksScannedToday] = useState(0);
  const [pagesScannedToday, setPagesScannedToday] = useState(0);
  const [loggedInUsersCount, setLoggedInUsersCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const { clerkAPIClient } = useClerk();

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
    async function fetchSessionCount() {
      try {
        const sessions = await clerkAPIClient.sessions.getSessionList();
        setSessionCount(sessions.length);
      } catch (error) {
        console.error("Error fetching session count:", error);
      }
    }

    fetchSessionCount();
    // // Fetch data every 10 minutes (adjust the interval as needed)
    // const intervalId = setInterval(fetchData, 5 * 60 * 1000);
    

    // // Clean up the interval when the component unmounts
    // return () => clearInterval(intervalId);
  }, []);
 

  
  return (
    <>
     
    <div style={{ textAlign: 'center' }}>
      <UserDashboardContainer title ="Logged In Users" count={sessionCount}/>
      <UserDashboardContainer title="Books Scanned" count={booksScannedToday} />
      <UserDashboardContainer title="Pages Scanned" count={pagesScannedToday} />
    </div>
    </>
  );
};



export default UserDashboard;