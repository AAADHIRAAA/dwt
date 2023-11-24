// components/DataForm.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

const DataForm = () => {

  const {  user } = useUser();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);   
  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setUserName(user.fullName);
    }
 }, [user]);
  const router = useRouter();
  const [selectedScribe, setSelectedScribe] = useState(null);
  const getScribeNumber = () => {
    const storedScribe = localStorage.getItem('selectedScribe');
    if (!storedScribe) {
      router.push('/');
    } else {
      setSelectedScribe(storedScribe);
    }
 };

 useEffect(() => {
    getScribeNumber();
 }, []);
  const [formData, setFormData] = useState({
    title: '',
    pages_scanned: '',
    ID_url: '',
    author_name: '',
    publisher_name: '',
    year: '',
    isbn:'',
    language:''
  });

  

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

       // Validate that "Year" and "Pages Scanned" are positive numbers
     const isValid = validateForm()
     if(isValid){
      const data = {
        title: formData.title,
        pages_scanned: formData.pages_scanned,
        ID_url: formData.ID_url,
        author_name: formData.author_name,
        publisher_name: formData.publisher_name,
        year: formData.year,
        isbn: formData.isbn,
        language: formData.language,
        scribe_number: selectedScribe,
        userId: userId,
        userName: userName,
     };

      const response = await fetch('http://localhost:5200/api/v1/books/save-book-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    

      if (response.ok) {
        setFormData({
          title: '',
          pages_scanned: '',
          ID_url: '',
          author_name: '',
          publisher_name: '',
          year: '',
          isbn:'',
          language:''
        });
      } else {
        console.error('Failed to submit the form to the backend');
      }
    }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  const validateForm = () => {
    const { title, pages_scanned, ID_url, author_name, publisher_name, year, isbn, language } = formData;

    if (!title || !pages_scanned || !ID_url || !author_name || !publisher_name || !year || !isbn || !language) {
      alert('All fields are required');
      return false;
    }

    if (pages_scanned <= 0) {
      alert('Total pages scanned should be a positive number');
      return false;
    }

    if (year <= 0) {
      alert('Year of publication should be a positive number');
      return false;
    }

    return true;
 };

  return (
    // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
    //   <div style={{ backgroundColor: '#fff5ee', padding: '50px', borderRadius: '8px', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', width: '650px' ,height:'580px'}}>
    //     <form onSubmit={handleSubmit}>
    //       <label style={{ marginBottom: '25px', display: 'block' }}>
    //         Book Name:
    //         <input type="text" name="title" value={formData.title} onChange={handleInputChange} required style={{ marginLeft: '100px', padding: '5px', backgroundColor: '#dcdcdc'}} />
    //       </label>
    //       <label style={{ marginBottom: '25px', display: 'block' }}>
    //         Total Pages Scanned:
    //         <input type="number" name="pages_scanned" value={formData.pages_scanned} onChange={handleInputChange} required style={{ marginLeft: '40px', padding: '5px', backgroundColor: '#dcdcdc' }} />
    //       </label>
    //       <label style={{ marginBottom: '25px', display: 'block' }}>
    //         Archive Identifier:
    //         <input type="text" name="ID_url" value={formData.ID_url} onChange={handleInputChange} required style={{ marginLeft: '64px', padding: '5px', backgroundColor: '#dcdcdc' }} />
    //       </label>
    //       <label style={{ marginBottom: '25px', display: 'block' }}>
    //         Author Name:
    //         <input type="text" name="author_name" value={formData.author_name} onChange={handleInputChange} required style={{ marginLeft: '90px', padding: '5px', backgroundColor: '#dcdcdc' }} />
    //       </label>
    //       <label style={{ marginBottom: '25px', display: 'block' }}>
    //         Publisher Name:
    //         <input type="text" name="publisher_name" value={formData.publisher_name} onChange={handleInputChange} required style={{ marginLeft: '74px', padding: '5px', backgroundColor: '#dcdcdc' }} />
    //       </label>
    //       <label style={{ marginBottom: '25px', display: 'block' }}>
    //         Year of Publication:
    //         <input type="number" name="year" value={formData.year} onChange={handleInputChange} required style={{ marginLeft: '55px', padding: '5px', backgroundColor: '#dcdcdc' }} />
    //       </label>
    //       <label style={{ marginBottom: '25px', display: 'block' }}>
    //         ISBN:
    //         <input type="string" name="isbn" value={formData.isbn} onChange={handleInputChange} required style={{ marginLeft: '152px', padding: '5px', backgroundColor: '#dcdcdc' }} />
    //       </label>
    //       <label style={{ marginBottom: '25px', display: 'block' }}>
    //         Language:
    //         <input type="text" name="language" value={formData.language} onChange={handleInputChange} required style={{ marginLeft: '117px', padding: '5px', backgroundColor: '#dcdcdc' }} />
    //       </label>
    //       <div>
    //           <button style={{ backgroundColor: "#1e90ff", color: "white", float: 'right',marginBottom:'10px' }} type="submit">Submit</button>
    //         </div>
    //     </form>
    //   </div>
    //   <div style={{ position: 'fixed', bottom: '20px', left: '100px', display: 'flex', alignItems: 'center' }}>
    //     <div style={{ marginRight: '20px' }}>
    //         <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'blue' }}>Table View</h2>
    //     </div>
    //     <div>
    //       <Link href="/spreadsheet">
    //         <button style={{ backgroundColor: "#1e90ff", color: "white" }}>View</button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ backgroundColor: '#fff5ee', padding: '50px', borderRadius: '8px', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', width: '600px', height: '780px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginLeft:'130px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label>
              Book Name:
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required style={{ padding: '10px', backgroundColor: '#dcdcdc' }} />
            </label>
            <label>
              Total Pages:
              <input type="number" name="pages_scanned" value={formData.pages_scanned} onChange={handleInputChange} required style={{ padding: '10px', backgroundColor: '#dcdcdc' }} />
            </label>
            <label>
              Archive Identifier:
              <input type="text" name="ID_url" value={formData.ID_url} onChange={handleInputChange} required style={{ padding: '10px', backgroundColor: '#dcdcdc' }} />
            </label>
          {/* </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}> */}
            <label>
              Author Name:
              <input type="text" name="author_name" value={formData.author_name} onChange={handleInputChange} required style={{ padding: '10px', backgroundColor: '#dcdcdc' }} />
            </label>
            <label>
              Publisher Name:
              <input type="text" name="publisher_name" value={formData.publisher_name} onChange={handleInputChange} required style={{ padding: '10px', backgroundColor: '#dcdcdc' }} />
            </label>
            <label>
              Year of Publication:
              <input type="number" name="year" value={formData.year} onChange={handleInputChange} required style={{ padding: '10px', backgroundColor: '#dcdcdc' }} />
            </label>
          {/* </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}> */}
            <label>
              ISBN:
              <input type="string" name="isbn" value={formData.isbn} onChange={handleInputChange} required style={{ padding: '10px', backgroundColor: '#dcdcdc' }} />
            </label>
            <label>
              Language:
              <input type="text" name="language" value={formData.language} onChange={handleInputChange} required style={{ padding: '10px', backgroundColor: '#dcdcdc' }} />
            </label>
            <div style={{ marginTop: 'auto',marginLeft:'50px' }}>
              <button style={{ backgroundColor: '#1e90ff', color: 'white', padding: '10px', width: '80%', boxSizing: 'border-box', borderRadius: '5px' }} type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div style={{ position: 'fixed', bottom: '20px', left: '100px', display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'blue' }}>Table View</h2>
        </div>
        <div>
          <Link href="/spreadsheet">
            <button style={{ backgroundColor: '#1e90ff', color: 'white', padding: '10px', borderRadius: '5px' }}>View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DataForm;
