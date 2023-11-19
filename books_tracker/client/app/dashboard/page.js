"use client"
import React,{useEffect, useState} from 'react';
import Link from 'next/link';
import Header from "../components/header";
import DashboardContainer from '../components/dashboardContainer'; 
import GetAllUsers from '../components/user';

const Dashboard = () => {

  // const { booksScanned, pagesScanned, authorCount, publisherCount } = data;

  
  const [booksScanned, setBooksScanned] = useState(0);
  const [pagesScanned, setPagesScanned] = useState(0);
  const [authorCount, setAuthorCount] = useState(0);
  const [publisherCount, setPublisherCount] = useState(0);
  // const [booksScannedToday, setBooksScannedToday] = useState(0);
  // const [pagesScannedToday, setPagesScannedToday] = useState(0);

 
  

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5200/api/v1/books/overall-statistics');
        const data = await response.json();
        console.log('Fetched data:', data); 
        setBooksScanned(data.booksScanned);
        setPagesScanned(data.pagesScanned);
        setAuthorCount(data.authorCount);
        setPublisherCount(data.publisherCount);
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
    <Header/>
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
    <h1 className='custom-heading'>Digitized Work Tracker</h1>
    </div>
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      
      <DashboardContainer title="Books Scanned" count={booksScanned} />
      <DashboardContainer title="Pages Scanned" count={pagesScanned} />
      <DashboardContainer title="Author Count" count={authorCount} />
      <DashboardContainer title="Publisher Count" count={publisherCount} />
    
    </div>
    <div>
      {/* <GetAllUsers/> */}
    </div>
    <div style={{ position: 'fixed', bottom: '100px', left: '120px' }}>
    <Link href="/spreadsheet">
          <button>Go to Spreadsheet</button>
        </Link>
  </div>
    </>
  );
};



export default Dashboard;