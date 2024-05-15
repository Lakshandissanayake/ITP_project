import React, { useState, useEffect } from 'react';
import './css/don.css';
import axios from 'axios';

const AllDonations = () => {
  const [Data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    function getData() {
      axios.get("http://localhost:4000/don/my")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getData();
  }, []);

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter data based on search query
  const filteredData = Data.filter((data) => {
    return data.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <nav className="top">
        <nav className="logo">
          <img src="img/log.png" alt="" />
        </nav>
        <nav className="hadder">
            <a href="/res">RESERVATION</a>
          <a href="/blog">BLOG</a>
          <a href="/pet">PET REGISTRATION</a>
          <a href="/home">DONATION</a>
          <a href="/feedback">FEEDBACK</a>
          <a href="/in">INVINTORY</a>
          <a href="/emp">EMPLOYEE MANEGMENT</a>
          <a href="http://localhost:4000/don/generateReport">Download Report</a>
        </nav>
      </nav>

      <nav className="title">
        <h1>DONATIONS</h1>
      </nav>

      <form className="search-form">
        <input 
          type="text" 
          name="name" 
          placeholder="Search by name" 
          value={searchQuery}
          onChange={handleSearchInputChange} 
        />
        <input className='button' type="button" value="Search"/>
      </form>

      <nav className="main">
        <nav className="ima">
          {filteredData.map((data, index) => (
            <nav className="box" key={index}>
              <nav className="lbox">
                <h1>Rs</h1>
                <h2>{data.Amount}</h2>
                <p>{data.name}</p>
                <p>{data.CardNumber}</p>
                <p>{data.created}</p>
                <p>ONLINE PAYMENT</p>
              </nav>
            </nav>
          ))}
        </nav>
      </nav>
    </div>
  );
}

export default AllDonations;
