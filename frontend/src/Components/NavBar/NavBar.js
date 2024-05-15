import React from "react";
import Logo from "./img/log.png";
function NavBar() {
  return (
    <div>
      <div className="navbar">
        <div className="navitem_nav_bar">
          <div>
            <img src={Logo} alt="logonav" className="logo_nav" />
          </div>
          <div className="nav_bar_items">
            <h3 onClick={() => (window.location.href = "/")}>HOME</h3>
            <h3 onClick={() => (window.location.href = "/feedback")}>FEEDBACK</h3>
            <h3 onClick={() => (window.location.href = "/res")}>RESERVATION</h3>
            <h3 onClick={() => (window.location.href = "/blog")}>BLOG</h3>
            <h3 onClick={() => (window.location.href = "/pet")}>PET</h3>
            <h3 onClick={() => (window.location.href = "/home")}>DONATION</h3>
            <h3 onClick={() => (window.location.href = "/in")}>INVENTORY</h3>
            <h3 onClick={() => (window.location.href = "/emp")}>EMPLOYEE</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
