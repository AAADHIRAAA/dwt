"use client"
import React,{useEffect, useState} from 'react';
import Link from 'next/link';
import Header from "../components/header";
import DashboardContainer from '../components/dashboardContainer'; 

const Dashboard = () => {

  const [loggedInUsers, setLoggedInUsers] = useState(0);
  const [booksScanned, setBooksScanned] = useState(0);
  const [pagesScanned, setPagesScanned] = useState(0);
  const [authorCount, setAuthorCount] = useState(0);
  const [publisherCount, setPublisherCount] = useState(0);
  const [booksScannedToday, setBooksScannedToday] = useState(0);
  const [pagesScannedToday, setPagesScannedToday] = useState(0);

  // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
  

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/books/overall-statistics');
        const data = await response.json();
        setBooksScanned(data.booksScanned);
        setPagesScanned(data.pagesScanned);
        setAuthorCount(data.authorCount);
        setPublisherCount(data.publisherCount);
        const currentDate = new Date().toISOString().split('T')[0]; 
        const res = await fetch('http://localhost:5000/api/v1/books/statistics-for-date/${currentDate}');
        const dataa = await res.json();
        setBooksScannedToday(dataa.booksScannedToday);
        setPagesScannedToday(dataa.pagesScannedToday);
        const resp = await fetch('http://localhost:5000/api/v1/users/details');
        const dat = await resp.json();
        setLoggedInUsers(dat.loggedInUsers);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, []);
 

  
  return (
    <>
    <Header/>
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
    <h1 className='custom-heading'>Digitized Work Tracker</h1>
    </div>
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <DashboardContainer title="Logged In Users" count={loggedInUsers} />
      <DashboardContainer title="Books Scanned" count={booksScanned} tcount={booksScannedToday}/>
      <DashboardContainer title="Pages Scanned" count={pagesScanned} tcount={pagesScannedToday}/>
      <DashboardContainer title="Author Count" count={authorCount} />
      <DashboardContainer title="Publisher Count" count={publisherCount} />
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