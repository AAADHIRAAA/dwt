// pages/display-data.js
"use client"


const DisplayData = () => {
  const { formData } = useFormDataContext();

  return (
    <div>
      <h1>Display Data</h1>
      {formData && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              {/* Add more columns based on your form fields */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formData.name}</td>
              <td>{formData.age}</td>
              {/* Display more data based on your form fields */}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayData;
