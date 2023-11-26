"use client"
import React,{useEffect, useState} from 'react';
import Header from "../components/Header";
import Link from 'next/link';
import DashboardContainer from '../components/dashboardContainer'; 

import { useUser} from '@clerk/nextjs';

const MonthStats = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [booksScanned, setBooksScanned] = useState(0);
  const [pagesScanned, setPagesScanned] = useState(0);
  const [authorCount, setAuthorCount] = useState(0);
  const [publisherCount, setPublisherCount] = useState(0);
  const { user } = useUser();
 
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5200/api/v1/admin/statistics-for-month');
        const data = await response.json();
        console.log('Fetched data:', data); 
        setBooksScanned(data.booksScannedThisMonth);
        setPagesScanned(data.pagesScannedThisMonth);
        setAuthorCount(data.distinctAuthorsThisMonth);
        setPublisherCount(data.distinctPublishersThisMonth);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    useEffect(()=>{
      if(user){
        const userRole = user.publicMetadata.userRole;
        setIsAdmin(userRole === 'admin');
      }
    },[user]);
     // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
   
    // Fetch data every minute (adjust the interval as needed)
    const intervalId = setInterval(fetchData,  60 * 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
 

  
  return (
    <>
    {!isAdmin &&(
        <>
        <div style={{ textAlign: 'center', marginTop: '60px' }}><h1 style={{fontSize:'30px', color:'black'}}>This Page is restricted</h1></div>
        <div  style={{ textAlign: 'center', marginTop: '60px' }}>
        <Link href="/workreport">Return to Homepage</Link></div>
        </>
    )}
    {isAdmin &&(
        <>
        <Header/>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h1  className='custom-heading' >Admin Panel</h1>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          
          <DashboardContainer title="Books Scanned" count={booksScanned} />
          <DashboardContainer title="Pages Scanned" count={pagesScanned} />
          <DashboardContainer title="Author Count" count={authorCount} />
          <DashboardContainer title="Publisher Count" count={publisherCount} />
        
        </div>
         <div style={{ marginLeft:'680px', marginTop: '40px',display:'flex', direction:'row' ,gap:'20px'}}>
         <div style={{
              textAlign: 'center',
              display: 'inline-block',
              marginLeft:'40px',
              height: '80px',
              width: '200px', // Set the width of the container
              borderRadius: '8px', // Add border-radius for rounded corners
              boxShadow: '8px 10px 16px rgba(0.2, 0.1, 0.1, 0.2)', // Add box shadow
              backgroundColor:'#165eab',
          }}>
        <Link href="/monthstats">
        <h1  style={{color:'white',marginTop:'20px',fontSize:'20px'}} >Month Stats</h1>
        </Link>
        </div>
        <div style={{
              textAlign: 'center',
              display: 'inline-block',
              marginLeft:'40px',
              height: '80px',
              width: '200px', // Set the width of the container
              borderRadius: '8px', // Add border-radius for rounded corners
              backgroundColor:'#165eab',
              boxShadow: '8px 10px 16px rgba(0.2, 0.1, 0.1, 0.2)', // Add box shadow
             
          }}>
        <Link href="/digitizedstats">
        <h1 style={{color:'white',marginTop:'20px',fontSize:'20px'}}>Digitized Books Stats</h1>
        </Link>
        </div>
        </div>
       {/* <div style={{marginTop:'30px',marginBottom:'60px'}}>
            <LeaderBoardMonth/>
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
        
        </div>
        <div style={{marginTop:'30px',marginBottom:'60px'}}>
            <SpreadsheetMonth/>
        </div>
        */}
       
        </> 
      
    )}
    
    </>
  );
};



export default MonthStats;
