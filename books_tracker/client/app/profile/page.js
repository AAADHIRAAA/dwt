"use client"
import React, { useState, useEffect } from 'react';
import Header from "../components/header";


const Profile = () => {
  const [booksScanned, setBooksScanned] = useState(0);
  const [booksScannedtoday, setBooksScannedToday] = useState(0);
  const [pagesScanned, setPagesScanned] = useState(0);
  const [pagesScannedtoday, setPagesScannedToday] = useState(0);

  
  const [name, setName] = useState('Padma Priya');
  const [email, setEmail] = useState('priya@example.com');

  useEffect(() => {
    // Fetch data from your backend endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/users/overall-user-statistics');
        const data = await response.json();
        setBooksScanned(data.booksScanned);
        setPagesScanned(data.pagesScanned);
        const res = await fetch('http://localhost:5000/api/v1/users/user-today-statistics')
        const dataa = await res.json();
        setBooksScannedToday(dataa.booksScannedToday);
        setPagesScannedToday(dataa.pagesScannedToday);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, []); 
  return (
    <>
      <Header/>
      <div style={{ marginTop: '100px',marginLeft:'60px', 
            display: 'flex',
            alignItems: 'center',
            }}>

        <div style={{ // Set the width of the container
            padding: '150px', // Set the padding inside the container
            borderRadius: '8px', // Add border-radius for rounded corners
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
            backgroundColor:'#cfe2f3', 
             zIndex: 0,
            }}>
        
        <div style={{ marginTop:'10px', marginBottom:'80px',zIndex: 1 }}>
        <img src="/profile-logo.png" alt="Profile Logo" width="200px" height="250px" />
        </div>
          <div  style={{ marginBottom: '20px' }}>
            <label  style={{ marginRight: '10px', color:'blue' , fontWeight:'bolder', fontSize:'25px',fontFamily:'serif'}}>{name} </label>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '10px' ,color:'blue', fontWeight:'bolder', fontSize:'25px', fontFamily:'serif'}}>{email}</label>
          </div>
       
       </div>
        <div style={{ marginLeft: '400px',display:'flex',direction:'row' }}>
          <div style={{    
            textAlign: 'center',
            display: 'inline-block',
            height: '200px',
            width: '300px', // Set the width of the container
            padding: '20px', // Set the padding inside the container
            borderRadius: '8px', // Add border-radius for rounded corners
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
            backgroundColor: '#1e90ff',
            color:'white',
            }}>
            <h3 style={{color:'white',fontWeight:'bolder',marginBottom:'30px',marginTop:'10px'}}>Books Scanned</h3>
            <p><strong>Total Count:</strong> {booksScanned}</p>
            <p><strong>Today Count:</strong> {booksScannedtoday}</p>
          </div>
          <div style={{
              textAlign: 'center',
              display: 'inline-block',
              marginLeft:'40px',
              height: '200px',
              width: '300px', // Set the width of the container
              padding: '20px', // Set the padding inside the container
              borderRadius: '8px', // Add border-radius for rounded corners
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
              backgroundColor: '#1e90ff',
              color:'white',
          }}>
            <h3 style={{color:'white',fontWeight:'bolder',marginBottom:'30px',marginTop:'10px'}}>Pages Scanned</h3>
            <p><strong>Total Count:</strong> {pagesScanned}</p>
            <p><strong>Today Count:</strong> {pagesScannedtoday}</p>
          </div>
        </div>
        </div>
    </>
  );
};

export default Profile;
