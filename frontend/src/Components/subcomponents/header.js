import React from "react";
import logo from '../image/log.png'; 

const headerStyle = {
  backgroundColor: "#0a1659", 
  color: "white",
  position: "fixed",
  top: 0,
  width: "100%",

  boxShadow: "none", 
  padding: "0.5rem 0",
  display: "flex", 
  justifyContent: "space-between", 
  marginBottom: '10px'
};

const linkStyle = {
  color: "white", 
  textDecoration: "none", 
  margin: "0 1rem", 
};

const logoStyle = {
  height: "100px", 
  marginRight: "2rem", 
  verticalAlign: "middle", 
};


export default function Header() {
  return (
    <>
      <header style={headerStyle}>
      <img src={logo} alt="Logo" style={logoStyle} />
        <nav className="navbar">
          <div style={{ display: "flex" }}>
            <a href="" style={linkStyle}>HOME</a>
            <a href="/res" style={linkStyle}>DOCTOR RESERVATION</a>
            <a href="/blog" style={linkStyle}>BLOG</a>
            <a href="/pet" style={linkStyle}>PET REGISTRATION</a>
            <a href="/feedback" style={linkStyle}>FEEDBACK</a>
            <a href="/in" style={linkStyle}>INVINTORY</a>
            <a href="/home" style={linkStyle}>DONATION</a>
            <a href="/emp" style={linkStyle}>EMPLOYEE</a>
          </div>
        </nav>
      </header>
      <div style={{ paddingTop: "130px" }}>
        {/* All other page content should go here */}
      </div>
    </>
  );
}
