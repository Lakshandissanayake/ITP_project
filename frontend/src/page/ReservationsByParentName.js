import React, { useState } from "react";
import "./css/don.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ReservationsByParentName = () => {
  const [parentName, setParentName] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (parentName.trim() === "") {
      alert("Please enter a parent name.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/reservation/parent/${parentName}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await axios.delete(`http://localhost:4000/reservation/${id}`);
          // Remove the deleted reservation from the data state
          setData(data.filter((reservation) => reservation._id !== id));
          setLoading(false);
          Swal.fire(
            "Deleted!",
            "Your reservation has been deleted.",
            "success"
          );
        } catch (error) {
          alert(error.message);
          setLoading(false);
        }
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`/edit-reservation/${id}`);
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
          <h1 style={{ color: "white" }}>Reservations By Parent Name</h1>

          <div>
            <input
              type="text"
              placeholder="Enter parent name"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
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
            <Link to="/reservations-by-date">
              <button>Search Reservations By Date</button>
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
                <br></br>
                <button
                  onClick={() => handleEdit(reservation._id)}
                  style={{ background: "blue" }}
                >
                  Edit
                </button>
                &emsp;
                <button
                  onClick={() => handleDelete(reservation._id)}
                  style={{ background: "red" }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <center>
            <p>No reservations found for the provided parent name.</p>
          </center>
        )}
      </div>
    </>
  );
};

export default ReservationsByParentName;
