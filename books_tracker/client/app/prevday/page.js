"use client"
import React, { useState, useEffect } from 'react';


const PrevDay = () => {
  const [booksScanned, setBooksScanned] = useState(0);
  const [pagesScanned, setPagesScanned] = useState(0);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  useEffect(() => {
    fetchData();
        // Fetch data every day (adjust the interval as needed)
      const intervalId = setInterval(fetchData, 24 * 60 * 60 * 1000);
      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
 }, []);

 
 const fetchData = async () => {
  try {
    setIsLoadingStats(true);
    
      const response = await fetch('http://localhost:5200/api/v1/books/statistics-prev-date');
      const data = await response.json();
      console.log('Fetched data:', data); 
      setBooksScanned(data.booksScannedPreviousDay);
      setPagesScanned(data.pagesScannedPreviousDay);
      setIsLoadingStats(false);
    
   
  } catch (error) {
    console.error('Error fetching statistics:', error);
  }
};

  return (
    <>
      <div style={{  
            display: 'flex',
            alignItems: 'center',
            }}>
        <div style={{ display:'flex',direction:'row' }}>
        {!isLoadingStats ? (
          <div style={{    
            textAlign: 'center',
            display: 'inline-block',
            height: '150px',
            width: '250px', // Set the width of the container
            marginLeft:'60px',
            borderRadius: '8px', // Add border-radius for rounded corners
            boxShadow: '8px 10px 16px rgba(0.2, 0.1, 0.1, 0.2)', // Add box shadow
            color:'#165eab',
            }}>
            <h3 style={{color:'#165eab',fontWeight:'bolder',marginBottom:'20px',marginTop:'40px'}}>Books Scanned</h3>
            <p style={{fontSize:'30px'}}>{booksScanned}</p>
          </div>
             ) : (
              <div>Loading...</div>
            )}
             {!isLoadingStats ? (
          <div style={{
              textAlign: 'center',
              display: 'inline-block',
              marginLeft:'40px',
              height: '150px',
              width: '250px', // Set the width of the container
              borderRadius: '8px', // Add border-radius for rounded corners
              boxShadow: '8px 10px 16px rgba(0.2, 0.1, 0.1, 0.2)', // Add box shadow
              color:'#165eab',
          }}>
            <h3 style={{color:'#165eab',fontWeight:'bolder',marginBottom:'20px',marginTop:'40px'}}>Pages Scanned</h3>
            <p style={{fontSize:'30px'}}>{pagesScanned}</p>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        </div>
        </div>
    </>
  );
};

export default PrevDay;
