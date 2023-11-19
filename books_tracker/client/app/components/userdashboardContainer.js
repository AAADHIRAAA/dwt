// components/Dashboard.js

import React, { useState, useEffect } from "react";

const UserDashboardContainer = ({ title, count}) => {

  return (
    <>
    <div style={{
      textAlign: 'center',
      display: 'inline-block',
      margin: '10px',
      height:'150px',
      width: '300px', // Set the width of the container
      borderRadius: '8px', // Add border-radius for rounded corners
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', // Add box shadow
      backgroundColor: '#1e90ff', // Set background color
      color:'#ffffff'
    }}>
      <h3 style={{ fontWeight:'bold',textAlign:'center',color:'white',marginBottom:'20px',marginTop:'30px',fontSize:'20px'}}>{title}</h3>
      <p style={{textAlign:"center",fontSize:'15px'}}>Total: {count}</p>

  </div>
    </>
  );
};

export default UserDashboardContainer;
