"use client"
import React, { useState, useEffect } from 'react';
import { UserProfile ,useUser } from '@clerk/nextjs';
import Header from '../components/Header';

const Profile = () => {
  const [booksScanned, setBooksScanned] = useState(0);
  const [booksScannedtoday, setBooksScannedToday] = useState(0);
  const [pagesScanned, setPagesScanned] = useState(0);
  const [pagesScannedtoday, setPagesScannedToday] = useState(0);
  const {  user } = useUser();
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (user) {
      setUserId(user.id);
      
    }
 }, [user]);

  useEffect(() => {
    // Fetch data from your backend endpoint
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5200/api/v1/users/overall-user-statistics/${userId}`);
        const data = await response.json();
        setBooksScanned(data.booksScanned);
        setPagesScanned(data.pagesScanned);
        const res = await fetch(`http://localhost:5200/api/v1/users/user-today-statistics/${userId}`)
        const dataa = await res.json();
        setBooksScannedToday(dataa.booksScannedToday);
        setPagesScannedToday(dataa.pagesScannedToday);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, [userId]); 
  return (
    <>
     <Header/>
      <div style={{  
            display: 'flex',
            alignItems: 'center',
            }}>
              <UserProfile />
        <div style={{ display:'flex',direction:'row' }}>
          <div style={{    
            textAlign: 'center',
            display: 'inline-block',
            height: '200px',
            width: '300px', // Set the width of the container
            marginLeft:'60px',
            borderRadius: '8px', // Add border-radius for rounded corners
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
            backgroundColor: '#1e90ff',
            color:'white',
            }}>
            <h3 style={{color:'white',fontWeight:'bolder',marginBottom:'20px',marginTop:'40px'}}>Books Scanned</h3>
            <p><strong>Total Count:</strong> {booksScanned}</p>
            <p><strong>Today Count:</strong> {booksScannedtoday}</p>
          </div>
          <div style={{
              textAlign: 'center',
              display: 'inline-block',
              marginLeft:'40px',
              height: '200px',
              width: '300px', // Set the width of the container
           
              borderRadius: '8px', // Add border-radius for rounded corners
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
              backgroundColor: '#1e90ff',
              color:'white',
          }}>
            <h3 style={{color:'white',fontWeight:'bolder',marginBottom:'20px',marginTop:'40px'}}>Pages Scanned</h3>
            <p><strong>Total Count:</strong> {pagesScanned}</p>
            <p><strong>Today Count:</strong> {pagesScannedtoday}</p>
          </div>
        </div>
        </div>
    </>
  );
};

export default Profile;
