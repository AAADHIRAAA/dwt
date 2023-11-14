// components/Home.js
import React from "react";

const Home = () => {
  const headingStyle = {
    fontSize: "2rem", // You can adjust the font size as needed
    fontWeight: "bold", // This makes the text bold
    textAlign: "center", // Center the text if desired
    margin: "10px 0", 
    color:"blue"
  };
  return (
    <div>   
    <h1 style={headingStyle}>DIGITIZED WORK TRACKER</h1>
    </div>
  );
};

export default Home;
