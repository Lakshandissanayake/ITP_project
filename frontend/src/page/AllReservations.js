import React, { useState, useEffect } from 'react';
import './css/don.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllReservations = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4000/reservation/getAll")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = data.filter(reservation => {
      return (
        reservation.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.petBreed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.symptomsAndOtherNotes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.reservedDoctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.reservationDate.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.reservationTime.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
    <nav className="top">
        <nav className="logo">
          <img src="/img/log.png" alt="" />
        </nav>
        <nav className="hadder">
            <a href="/res">RESERVATION</a>
          <a href="/blog">BLOG</a>
          <a href="/pet">PET REGISTRATION</a>
          <a href="/home">DONATION</a>
          <a href="/feedback">FEEDBACK</a>
          <a href="/in">INVINTORY</a>
          <a href="/emp">EMPLOYEE MANEGMENT</a>
        </nav>
      </nav>
      <br />
      <br />
    <div style={{padding:25}}>
      <center>
      <h1 style={{color:"white"}}>All Reservations</h1>
      </center>
      <input
        type="text"
        placeholder="Search reservations"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <center>
      <div className="search-buttons" style={{marginTop:10}}>
          <Link to="/reservations-by-parent">
            <button>Search Reservations By Parent Name</button>
          </Link>
          &emsp;&emsp;&emsp;
          <Link to="/reservations-by-date">
            <button>Search Reservations By Date</button>
          </Link>
          &emsp;&emsp;&emsp;
          <Link to="/create-reservation">
            <button style={{background:"green"}}>+ Add Reservation</button>
          </Link>
        </div>
        </center>
      <br/><br/>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="reservation-grid">
          {filteredData.map((reservation, index) => (
            <div key={reservation._id} className="reservation-card">
              <h2>{reservation.petName}</h2>
              <p><strong>Parent Name:</strong> {reservation.parentName}</p>
              <p><strong>Phone Number:</strong> {reservation.phoneNumber}</p>
              <p><strong>Pet Breed:</strong> {reservation.petBreed}</p>
              <p><strong>location:</strong> {reservation.location}</p>
              <p><strong>Symptoms and Other Notes:</strong> {reservation.symptomsAndOtherNotes}</p>
              <p><strong>Reserved Doctor:</strong> {reservation.reservedDoctor}</p>
              <p><strong>Reservation Date:</strong> {new Date(reservation.reservationDate).toLocaleDateString('en-GB')}</p>
              <p><strong>Reservation Time:</strong> {reservation.reservationTime}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default AllReservations;
