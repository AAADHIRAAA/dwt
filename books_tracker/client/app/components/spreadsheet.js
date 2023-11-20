import React, { useState, useEffect,useMemo } from 'react';
import { useTable, useFetch } from 'react-table';
import { useUser } from "@clerk/nextjs";


const Spreadsheet = () => {
 const [rowData, setRowData] = useState([]);
 const {  user } = useUser();
 const [userId, setUserId] = useState(null);

 useEffect(() => {
    
  if (user) {
    setUserId(user.id);
    console.log('User ID:', user.id);
  }
}, [user]);

 const columns = useMemo(
  () => [
     {
       Header: 'Book Name',
       accessor: 'title',
     },
     {
       Header: 'Total Pages Scanned',
       accessor: 'pages_scanned',
     },
     {
      Header: 'Archieve Identifier',
      accessor: 'ID_url',
    },
    {
      Header: 'Author Name',
      accessor: 'author_name',
    },
    {
      Header: 'Publisher Name',
      accessor: 'publisher_name',
    },
    {
      Header: 'Year of Publication',
      accessor: 'year',
    },
    {
      Header: 'ISBN',
      accessor: 'isbn',
    },
    {
      Header:'Language',
      accessor:'language',
    }
     
  ],
  []
 );

 const fetchData = async () => {
    // const response = await fetch(`http://localhost:5200/api/v1/users/view-books/${userId}`);
    // const data = await response.json();
    // setRowData(data);
    try {
      const response = await fetch(`http://localhost:5200/api/v1/users/view-books/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setRowData(data);
      console.log('Fetched Data:', data);
      console.log('Row Data:', rowData); // Log immediately after setRowData
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }

 };


 useEffect(() => {
    
    fetchData();
    const intervalId = setInterval(fetchData, 10 * 60 * 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
 }, [userId]);

 const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
 } = useTable({ columns, data: rowData });
 console.log(rowData);
 return (
    <div>
      <table {...getTableProps()} style={{ width: '100%' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                 return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
 );
};

export default Spreadsheet;