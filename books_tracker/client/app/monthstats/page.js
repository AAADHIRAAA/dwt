"use client"
import React, { useState, useEffect,useMemo } from 'react';
import { useTable,useSortBy,usePagination} from 'react-table';
import { useUser} from '@clerk/nextjs';
import Header from "../components/Header";
import Link from 'next/link';
import Image from 'next/image';

const LeaderBoardMonth = () => {
 const [isAdmin, setIsAdmin] = useState(false);
 const [rowData, setRowData] = useState([]);
 const [isLoadingStats, setIsLoadingStats] = useState(true);
 const { user } = useUser();
 useEffect(()=>{
  if(user){
    const userRole = user.publicMetadata.userRole;
    setIsAdmin(userRole === 'admin');
  }
 },[user]);
 useEffect(() => {
        fetchData(); 
    const intervalId = setInterval(fetchData, 60 * 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  
}, []);

 const columns = useMemo(
  () => [
    {
      Header: 'Serial Number',
      accessor: (row, index) => index + 1, // Automatically generate serial number
    },
     {
       Header: 'User Name',
       accessor: 'username',
     },
     {
        Header: 'Scribe Number',
        accessor: 'scribeNumber',
      },
      {
        Header: 'Total Books Scanned',
        accessor: 'totalBooks',
      },
     {
       Header: 'Total Pages Scanned',
       accessor: 'totalPages',
     },
     
  ],
  []
 );

 const fetchData = async () => {

    try {
      setIsLoadingStats(true);
      
      const response = await fetch('http://localhost:5200/api/v1/admin/leaderboard-month');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setRowData(data);
      console.log('Fetched Data:', data);
      console.log('Row Data:', rowData); // Log immediately after setRowData
      setIsLoadingStats(false);
      
      
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }

 };


 const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state:{pageIndex},
    pageCount,
    gotoPage,
   
 } = useTable(
  { columns, 
    data: rowData ,
  },
  useSortBy,
  usePagination
  );

 console.log(rowData);


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
    <div style={{marginTop:'50px'}}>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h1  className='custom-heading' >Month Stats</h1>
        </div>
      <table {...getTableProps()} style={{width:'60rem'}}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}  >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} >
                  {column.render('Header')}
                  {
                    column.isSorted && <span>{column.isSortedDesc?" ⬇️ ":" ⬆️ "}</span>
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} >
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} >
                {row.cells.map((cell) => {
                 return <td {...cell.getCellProps()} >{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='btn-container' >
     
          <button disabled={pageIndex===0} onClick={()=>gotoPage(0)}>First</button>

          <button disabled={!canPreviousPage} onClick={previousPage}>Prev</button>
     
          <span>
              {pageIndex+1 }_of_{pageCount}
          </span>
         
          <button disabled={!canNextPage} onClick={nextPage}>Next</button>

          <button disabled={pageIndex >= pageCount - 1} onClick={()=>gotoPage(pageCount -1)}>Last</button>
      </div>
  
    </div>
  
  </>
    )}
      
    </>
 );
};

export default LeaderBoardMonth;