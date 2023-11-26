"use client"
import React,{useEffect, useState} from 'react';
import Image from 'next/image';
import Header from "../components/Header";
import Link from 'next/link';
import DashboardContainer from '../components/dashboardContainer'; 
import LeaderBoardMonth from '../components/leaderboard-month';
import SpreadsheetMonth from '../components/spreadsheet-month';
import { useUser} from '@clerk/nextjs';

const AdminPage = () => {
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

     // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
    if(user){
        const userRole = user.publicMetadata.userRole;
        setIsAdmin(userRole === 'admin');
      }
    // Fetch data every minute (adjust the interval as needed)
    const intervalId = setInterval(fetchData,  60 * 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
 
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth', // Optional: Adds smooth scrolling behavior
    });
  };
  
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
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h1  className='custom-heading' >Month Stats</h1>
        </div>
        <div style={{marginTop:'30px',marginBottom:'60px'}}>
            <LeaderBoardMonth/>
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h1  className='custom-heading' >Digitized Books Stats</h1>
        </div>
        <div style={{marginTop:'30px',marginBottom:'60px'}}>
            <SpreadsheetMonth/>
        </div>
       
        <button  onClick={scrollToBottom} style={{ position: 'fixed', bottom: '40px', right: '40px' }}>
            <Image src="/scroll-down.png" alt="Scrolldown" width={20} height={20} />
            </button>
        </> 
      
    )}
    
    </>
  );
};



export default AdminPage;
