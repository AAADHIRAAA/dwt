"use client"
import React, { useState, useEffect } from 'react';
import { UserProfile ,useUser } from '@clerk/nextjs';
import Header from '../components/Header';

const Profile = () => {
  const [booksScanned, setBooksScanned] = useState(0);
  const [booksScannedtoday, setBooksScannedToday] = useState(0);
  const [pagesScanned, setPagesScanned] = useState(0);
  const [pagesScannedtoday, setPagesScannedToday] = useState(0);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const {  user } = useUser();
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (user) {
      setUserId(user.id);   
    }
    fetchData();
 }, [user,userId]);

 // Fetch data from your backend endpoint
 const fetchData = async () => {
  try {
    setIsLoadingStats(true);
    if(userId){
      const response = await fetch(`http://localhost:5200/api/v1/users/overall-user-statistics/${userId}`);
      const data = await response.json();
      console.log('Fetched data:', data); 
      setBooksScanned(data.booksScanned);
      setPagesScanned(data.pagesScanned);
      const res = await fetch(`http://localhost:5200/api/v1/users/user-today-statistics/${userId}`)
      const dataa = await res.json();
      console.log('Fetched dataa:', dataa); 
      setBooksScannedToday(dataa.booksScannedToday);
      setPagesScannedToday(dataa.pagesScannedToday);
      setIsLoadingStats(false);
    }
    else{
      <div>Loading...</div>
    }
   
  } catch (error) {
    console.error('Error fetching statistics:', error);
  }
};

  // useEffect(() => {
   

  //     // // Fetch data every 10 minutes (adjust the interval as needed)
  //     // const intervalId = setInterval(fetchData, 5 * 60 * 1000);
  //     // // Clean up the interval when the component unmounts
  //     // return () => clearInterval(intervalId);
  // }, [userId]); 


  return (
    <>
     <Header/>
      <div style={{  
            display: 'flex',
            alignItems: 'center',
            }}>
              <UserProfile />
        <div style={{ display:'flex',direction:'row' }}>
        {!isLoadingStats ? (
          <div style={{    
            textAlign: 'center',
            display: 'inline-block',
            height: '200px',
            width: '300px', // Set the width of the container
            marginLeft:'60px',
            borderRadius: '8px', // Add border-radius for rounded corners
            boxShadow: '8px 10px 16px rgba(0.2, 0.1, 0.1, 0.2)', // Add box shadow
            // backgroundColor: '#1e90ff',
            color:'#165eab',
            }}>
            <h3 style={{color:'#165eab',fontWeight:'bolder',marginBottom:'20px',marginTop:'40px'}}>Books Scanned</h3>
            <p><strong>Total Count:</strong> {booksScanned}</p>
            <p><strong>Today Count:</strong> {booksScannedtoday}</p>
          </div>
             ) : (
              <div>Loading...</div>
            )}
             {!isLoadingStats ? (
          <div style={{
              textAlign: 'center',
              display: 'inline-block',
              marginLeft:'40px',
              height: '200px',
              width: '300px', // Set the width of the container
           
              borderRadius: '8px', // Add border-radius for rounded corners
              boxShadow: '8px 10px 16px rgba(0.2, 0.1, 0.1, 0.2)', // Add box shadow
              // backgroundColor: '#1e90ff',
              color:'#165eab',
          }}>
            <h3 style={{color:'#165eab',fontWeight:'bolder',marginBottom:'20px',marginTop:'40px'}}>Pages Scanned</h3>
            <p><strong>Total Count:</strong> {pagesScanned}</p>
            <p><strong>Today Count:</strong> {pagesScannedtoday}</p>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        </div>
        </div>
    </>
  );
};

export default Profile;
