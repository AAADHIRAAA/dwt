// components/DataForm.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const DataForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    pages_scanned: '',
    ID_url: '',
    author_name: '',
    publisher_name: '',
    year: ''
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5200/api/v1/books/save-book-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If the backend successfully processes the data, redirect to another page
        // router.push('/anotherPage');
        setFormData({
          title: '',
          pages_scanned: '',
          ID_url: '',
          author_name: '',
          publisher_name: '',
          year: '',
        });
      } else {
        console.error('Failed to submit the form to the backend');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }

   
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <div style={{ backgroundColor: '#fff5ee', padding: '50px', borderRadius: '8px', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', width: '700px' ,height:'500px'}}>
        <form onSubmit={handleSubmit}>
          <label style={{ marginBottom: '25px', display: 'block' }}>
            Book Name:
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required style={{ marginLeft: '100px', padding: '5px', backgroundColor: '#dcdcdc' }} />
          </label>
          <label style={{ marginBottom: '25px', display: 'block' }}>
            Total Pages Scanned:
            <input type="number" name="pages_scanned" value={formData.pages_scanned} onChange={handleInputChange} required style={{ marginLeft: '30px', padding: '5px', backgroundColor: '#dcdcdc' }} />
          </label>
          <label style={{ marginBottom: '25px', display: 'block' }}>
            Archive Identifier:
            <input type="text" name="ID_url" value={formData.ID_url} onChange={handleInputChange} required style={{ marginLeft: '60px', padding: '5px', backgroundColor: '#dcdcdc' }} />
          </label>
          <label style={{ marginBottom: '25px', display: 'block' }}>
            Author Name:
            <input type="text" name="author_name" value={formData.author_name} onChange={handleInputChange} required style={{ marginLeft: '90px', padding: '5px', backgroundColor: '#dcdcdc' }} />
          </label>
          <label style={{ marginBottom: '25px', display: 'block' }}>
            Publisher Name:
            <input type="text" name="publisher_name" value={formData.publisher_name} onChange={handleInputChange} required style={{ marginLeft: '72px', padding: '5px', backgroundColor: '#dcdcdc' }} />
          </label>
          <label style={{ marginBottom: '15px', display: 'block' }}>
            Year of Publication:
            <input type="number" name="year" value={formData.year} onChange={handleInputChange} required style={{ marginLeft: '51px', padding: '5px', backgroundColor: '#dcdcdc' }} />
          </label>
          <div>
              <button style={{ backgroundColor: "#1e90ff", color: "white", float: 'right' }} type="submit">Submit</button>
            </div>
        </form>
      </div>
      <div style={{ position: 'fixed', bottom: '20px', left: '100px', display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'blue' }}>Table View</h2>
        </div>
        <div>
          <Link href="/spreadsheet">
            <button style={{ backgroundColor: "#1e90ff", color: "white" }}>View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DataForm;
