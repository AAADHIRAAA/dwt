// components/ScribeSelection.js
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ScribeSelection = () => {
  const [selectedScribe, setSelectedScribe] = useState('');
  const router = useRouter();

  const handleSelectionChange = (event) => {
    setSelectedScribe(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedScribe !== '') {
      // Redirect to another page with the selected scribe number
      router.push(`/form`);
    } else {
      // Handle case where no scribe is selected
      alert('Please choose a scribe number');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div style={{ textAlign: 'center', width: '300px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h2>Choose the Scribe Number</h2>
        <select
          value={selectedScribe}
          onChange={handleSelectionChange}
          style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Select</option>
          {[...Array(23).keys()].map((num) => (
            <option key={num + 1} value={`ttscribe ${num + 1}`}>
              ttscribe {num + 1}
            </option>
          ))}
        </select>
        <button
          onClick={handleSubmit}
          style={{ backgroundColor: '#165eab', color: 'white', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};


export default ScribeSelection;