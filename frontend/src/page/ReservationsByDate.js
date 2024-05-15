import React, { useState } from "react";
import "./css/don.css";
import axios from "axios";
import { Link } from "react-router-dom";

const ReservationsByDate = () => {
  const [reservationDate, setReservationDate] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (reservationDate.trim() === "") {
      alert("Please enter a reservation date.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/reservation/date/${reservationDate}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
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
      <div style={{ padding: 25 }}>
        <center>
          <h1 style={{ color: "white" }}>Reservations By Date</h1>

          <div>
            <input
              type="date"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              style={{ width: "80%", padding: 10, marginRight: 10 }}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </center>
        <center>
          <div className="search-buttons" style={{ marginTop: 10 }}>
            <Link to="/all-reservations">
              <button>All Reservations</button>
            </Link>
            &emsp;&emsp;&emsp;
            <Link to="/reservations-by-parent">
              <button>Search Reservations By Parent Name</button>
            </Link>
            &emsp;&emsp;&emsp;
            <Link to="/create-reservation">
              <button style={{ background: "green" }}>+ Add Reservation</button>
            </Link>
          </div>
        </center>
        <br />
        <br />
        {loading ? (
          <p>Loading...</p>
        ) : data.length > 0 ? (
          <div className="reservation-grid">
            {data.map((reservation, index) => (
              <div key={reservation._id} className="reservation-card">
                <h2>{reservation.petName}</h2>
                <p>
                  <strong>Parent Name:</strong> {reservation.parentName}
                </p>
                <p>
                  <strong>Phone Number:</strong> {reservation.phoneNumber}
                </p>
                <p>
                  <strong>Pet Breed:</strong> {reservation.petBreed}
                </p>
                <p>
                  <strong>Symptoms and Other Notes:</strong>{" "}
                  {reservation.symptomsAndOtherNotes}
                </p>
                <p>
                  <strong>Reserved Doctor:</strong> {reservation.reservedDoctor}
                </p>
                <p>
                  <strong>Reservation Date:</strong>{" "}
                  {new Date(reservation.reservationDate).toLocaleDateString(
                    "en-GB"
                  )}
                </p>

                <p>
                  <strong>Reservation Time:</strong>{" "}
                  {reservation.reservationTime}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <center>
            <p>No reservations found for the provided date.</p>
          </center>
        )}
      </div>
    </>
  );
};

export default ReservationsByDate;
