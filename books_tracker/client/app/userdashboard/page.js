"use client"
import React,{useEffect, useState} from 'react';
import UserDashboardContainer from '../components/userdashboardContainer'; 
import { Clerk } from '@clerk/clerk-react';


const UserDashboard = () => {

  const [booksScannedToday, setBooksScannedToday] = useState(0);
  const [pagesScannedToday, setPagesScannedToday] = useState(0);
  const [loggedInUsersCount, setLoggedInUsersCount] = useState(0);
  
  
       const getSessionCount = async () => {
         try {
          const { users } = useClerk();
          const loggedInUsers = users.filter((user) => user.isSignedIn);
          setLoggedInUsersCount(loggedInUsers.length);
          //  const sessions = await Clerk.sessions.get();
          //  setLoggedInUsersCount(sessions.length);
           console.log(loggedInUsersCount);
         } catch (error) {
           console.error('Error fetching sessions:', error);
         }
       };
   
       
    

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
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);
    // Listen for changes in user state
    // Clerk.addListener(() => {
    //   getSessionCount();
    // });
    getSessionCount();
    // Clerk.removeListener(() => {
    //   getSessionCount();
    // });
    const interval = setInterval(getSessionCount, 5 * 60 * 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId,interval);
  }, []);
 

  
  return (
    <>
     
    <div style={{ textAlign: 'center' }}>
      <UserDashboardContainer title ="Logged In Users" count={loggedInUsersCount}/>
      <UserDashboardContainer title="Books Scanned" count={booksScannedToday} />
      <UserDashboardContainer title="Pages Scanned" count={pagesScannedToday} />
    </div>
    </>
  );
};



export default UserDashboard;