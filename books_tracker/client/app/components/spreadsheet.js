"use client"
import React, { useEffect, useState  } from 'react';
import Image from 'next/image';
const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

const Spreadsheet = () => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const initialRowData = {
    _id: generateUniqueId(),
    col1: '',
    col2: '',
    col3: '',
    col4: '',
    col5: '',
    col6: '',
    isEditable:true,
    isSubmitted:false,
  };
  // const [filters, setFilters] = useState({
  //   col1: '',
  //   col2: '',
  //   col3: '',
  //   col4: '',
  //   col5: '',
  //   col6: '',
  //   col7: '',
  // });
  
  const [editedDataId, setEditedDataId] = useState(null);
  const [rowData, setRowData] = useState([{...initialRowData}]);
  const [newRow,setNewRow] =useState([initialRowData])
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [submittedRows, setSubmittedRows] = useState([]);

  // const [searchQuery, setSearchQuery] = useState('');

  // const handleFilterChange = (e, columnName) => {
  //   const updatedFilters = { ...filters, [columnName]: e.target.value };
  //   setFilters(updatedFilters);
  // };

  // const filteredData = rowData.filter((row) => {
  //   return Object.keys(filters).every((key) => {
  //     if (filters[key]) {
  //       return row[key].toLowerCase().includes(filters[key].toLowerCase());
  //     }
  //     return true;
  //   });
  // });
 
  

  // const handleSearchInputChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };


  const handleEditClick = (rowIndex) => {
    setEditingRowIndex(rowIndex);
    // setEditedDataId(rowData.id);

    console.log(rowIndex);
    // console.log(rowData);
  };
  
  
  const handleSubmit = () => {
    const isAnyFieldEmpty = rowData.some((row) =>
    Object.values(row).some((value) => typeof value === 'string' && value.trim() === '')
  );

  if (isAnyFieldEmpty) {
    alert('Error: All fields must be filled.');
    return;
  }

  // Validate that "Year" and "Pages Scanned" are positive numbers
  const isValidData = rowData.every((row) =>
    typeof row.col2 === 'number' && row.col2 > 0 && typeof row.col6 === 'number' && row.col6 > 0
  );

  // if (!isValidData) {
  //   alert('Error: "Year" and "Pages Scanned" must be positive numbers.');
  //   return;
  // }
    // Send rowData to the backend using an API call
    const newData =  rowData[rowData.length - 1];
    console.log(rowData.length);
    // const newData = rowData.filter((row) => !submittedRows.includes(row.id));
    // Mapping object to map frontend property names to backend property names
    const propertyMapping = {
      _id:'_id',
      col1: 'title',
      col2: 'pages_scanned',
      col3: 'ID_url',
      col4: 'author_name',
      col5: 'publisher_name',
      col6: 'year',
    };
     
    // Transform property names using the mapping object
      const transformedData = {};
      for (const frontendProperty in newData) {
        const backendProperty = propertyMapping[frontendProperty];
        if (backendProperty) {
          transformedData[backendProperty] = newData[frontendProperty];
        }
      }
 
    console.log(newData);
    console.log(transformedData);
    
    fetch('http://localhost:5200/api/v1/books/save-book-data', {
      method: 'POST',
      body: JSON.stringify(transformedData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
      .then((data) => {
        console.log('Data sent to the backend:', data);
        if (data) {      
         newData.isEditable=false;
         newData.isSubmitted=true;
          // Store the ID of the saved data in state
          setEditedDataId(newData.id);
          setSubmittedRows([...submittedRows, newData.id]);
          // Optionally, reset the form or show a success message to the user
          // Create a new empty row in the frontend table
          setNewRow([{ _id: generateUniqueId(), col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', isEditable: true, isSubmitted: false  }]);
          // setRowData([...rowData, { ...initialRowData }]);
          setRowData([...rowData, newRow]);
         
        }
        else{
          console.error('Error: Sending data to backend');
        }
      
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors here
      });
  
  };

  const handleSaveClick = () => {
    const isAnyFieldEmpty = rowData.some((row) =>
    Object.values(row).some((value) => typeof value === 'string' && value.trim() === '')
  );

  if (isAnyFieldEmpty) {
    alert('Error: All fields must be filled.');
    return;
  }

  // Validate that "Year" and "Pages Scanned" are positive numbers
  const isValidData = rowData.every((row) =>
    typeof row.col2 === 'number' && row.col2 > 0 && typeof row.col6 === 'number' && row.col6 > 0
  );

  // if (!isValidData) {
  //   alert('Error: "Year" and "Pages Scanned" must be positive numbers.');
  //   return;
  // }
    if (editingRowIndex!==null) {
      const editedData = rowData[editingRowIndex];
      // Add the 'id' property to the edited data object
      console.log(editedData);
    
      const propertyMapping = {
        _id:'_id',
        col1: 'title',
        col2: 'pages_scanned',
        col3: 'ID_url',
        col4: 'author_name',
        col5: 'publisher_name',
        col6: 'year'
      };
   
      // Transform property names using the mapping object
        const transformedData = {};
        for (const frontendProperty in editedData) {
          const backendProperty = propertyMapping[frontendProperty];
          if (backendProperty) {
            transformedData[backendProperty] = editedData[frontendProperty];
          }
        }
       
   
      console.log(transformedData);
      // Perform API call to update the data in the backend
      fetch(`http://localhost:5200/api/v1/books/update-book-data/${editedData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data updated successfully:', data);
          // Update the rowData state with the updated data
          const updatedRowData = [...rowData];
          updatedRowData[editingRowIndex] = data.data; // Assuming the updated data is returned in the 'data' property
          setRowData(updatedRowData);
          // After successful response, reset editingRowIndex
          setEditingRowIndex(null);
          setEditedDataId(null);
         
        })
        .catch((error) => {
          console.error('Error updating data:', error);
          // Handle errors here
        });
    } else {
      console.error('Error: editedDataId is null or undefined.');
    }
  };

  // const handleNewRowChange = (e, colName) => {
  //   setNewRow((prevRow) => ({
  //     ...prevRow,
  //     [colName]: e.target.value,
  //   }));
  // };
  const handleInputChange = (e, rowIndex, colName) => {

    if (rowIndex >= 0 && rowIndex < rowData.length) {
      const currentRow = rowData[rowIndex];
      console.log(currentRow.isEditable);
      console.log(rowIndex);
      if ((editingRowIndex === rowIndex || rowIndex === 0)) {
        // const updatedRowData = [...rowData];
        // const updatedRow = { ...updatedRowData[rowIndex] };
        // updatedRow[colName] = e.target.value;
        // updatedRowData[rowIndex] = updatedRow;
        // setRowData(updatedRowData);
        const newRowData = [...rowData];
        newRowData[rowIndex][colName] = e.target.value;
        setRowData(newRowData);

      }
    }
  };
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        {/* <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      /> */}
      </div>
      {isMounted && (
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
          <th>Serial No</th>
            <th>Book Name
            {/* <tr>
            <input
                type="text"
                placeholder="Filter..."
                value={filters.col1}
                onChange={(e) => handleFilterChange(e, 'col1')}
              />
              </tr> */}
              </th>
            <th>Total Pages of the Book
            {/* <tr>
            <input
                type="number"
                placeholder="Filter..."
                value={filters.col2}
                onChange={(e) => handleFilterChange(e, 'col2')}
              />
              </tr> */}
            </th>
            <th >Archive Identifier
            {/* <tr>
            <input
                type="text"
                placeholder="Filter..."
                value={filters.col3}
                onChange={(e) => handleFilterChange(e, 'col3')}
              />
              </tr> */}
            </th>
            <th >Author Name
            {/* <tr>
            <input
                type="text"
                placeholder="Filter..."
                value={filters.col4}
                onChange={(e) => handleFilterChange(e, 'col4')}
              />
              </tr> */}
            </th>
            <th >Publisher Name
            {/* <tr>
            <input
                type="text"
                placeholder="Filter..."
                value={filters.col5}
                onChange={(e) => handleFilterChange(e, 'col5')}
              />
              </tr> */}
            </th>
            <th >Year of Publication
            {/* <tr>
            <input
                type="number"
                placeholder="Filter..."
                value={filters.col6}
                onChange={(e) => handleFilterChange(e, 'col6')}
              />
              </tr> */}
            </th>
          </tr>
        </thead>
        <tbody>
        {rowData.map((row, rowIndex) => (
            <tr key={rowIndex}>
               
              <td>{rowIndex + 1}</td>
              
              <td>
                <input
                  type="text"
                  id={`col1-${rowIndex}`}
                  name={`col1-${rowIndex}`}
                  value={rowData.col1}
                  onChange={(e) => handleInputChange(e, rowIndex, `col1`)}
                  disabled={ editingRowIndex !== null && editingRowIndex !== rowIndex}
                />
              </td>
              <td>
                <input
                  type="number"
                  id={`col2-${rowIndex}`}
                  name={`col2-${rowIndex}`}
                  value={rowData.col2}
                  onChange={(e) => handleInputChange(e, rowIndex, 'col2')}
                  disabled={editingRowIndex !== null && editingRowIndex !== rowIndex}
                />
              </td>
              <td>
                <input
                  type="text"
                  id={`col3-${rowIndex}`}
                  name={`col3-${rowIndex}`}
                  value={rowData.col3}
                  onChange={(e) => handleInputChange(e, rowIndex, 'col3')}
                  disabled={editingRowIndex !== null && editingRowIndex !== rowIndex}
                />
              </td>
              <td>
                <input
                  type="text"
                  id={`col4-${rowIndex}`}
                  name={`col4-${rowIndex}`}
                  value={rowData.col4}
                  onChange={(e) => handleInputChange(e, rowIndex, 'col4')}
                  disabled={editingRowIndex !== null && editingRowIndex !== rowIndex}
                />
              </td>
              <td>
                <input
                  type="text"
                  id={`col5-${rowIndex}`}
                  name={`col5-${rowIndex}`}
                  value={rowData.col5}
                  onChange={(e) => handleInputChange(e, rowIndex, 'col5')}
                  disabled={editingRowIndex !== null && editingRowIndex !== rowIndex}
                />
              </td>
              <td>
                <input
                  type="number"
                  id={`col6-${rowIndex}`}
                  name={`col6-${rowIndex}`}
                  value={rowData.col6}
                  onChange={(e) => handleInputChange(e, rowIndex, 'col6')}
                  disabled={editingRowIndex !== null && editingRowIndex !== rowIndex}
                />
              </td>
              <td>
                {submittedRows.includes(rowData.id) && editingRowIndex === rowIndex ? (
                  <button style={{ fontSize: '12px' }} onClick={handleSaveClick}>Save</button>
                ) : submittedRows.includes(rowData.id) ?(
                  <button  onClick={() => handleEditClick(rowIndex)}>
                    <Image src="/OIP.jpg" alt="Edit" width={20} height={20} /></button>
                ):null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      <button style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }} onClick={handleSubmit}>Submit</button>
      {/* <button style={{ margin: '0 10px' }} onClick={() => setRowData([...rowData, { ...initialRowData }])}>Add Row</button> */}
     
    </div>
  );
};

export default Spreadsheet;