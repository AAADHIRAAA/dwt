// components/Dashboard.js

import React, { useState, useEffect } from "react";

const DashboardContainer = ({ title, count}) => {


  return (
    <>
    <div style={{
      textAlign: 'center',
      display: 'inline-block',
      margin: '20px',
      height:'200px',
      width: '300px', // Set the width of the container
      padding: '20px', // Set the padding inside the container
      borderRadius: '8px', // Add border-radius for rounded corners
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', // Add box shadow
      backgroundColor: '#1e90ff', // Set background color
      color:'#ffffff'
    }}>
      <h3 style={{ fontWeight:'bolder',textAlign:'center',color:'white',marginBottom:'30px',marginTop:'10px',fontSize:'27px'}}>{title}</h3>
      <p style={{textAlign:"center",fontSize:'20px'}}>Total:{count}</p>

  </div>
    </>
  );
};

export default DashboardContainer;
