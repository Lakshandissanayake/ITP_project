import "./css/card.css";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CreateReservation = () => {
  const navigate = useNavigate();

  const [parentName, setParentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [location, setlocation] = useState("");
  const [symptomsAndOtherNotes, setSymptomsAndOtherNotes] = useState("");
  const [reservedDoctor, setReservedDoctor] = useState("active");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");

  function sendData(e) {
    e.preventDefault();
    const data = {
      parentName,
      phoneNumber,
      petName,
      petBreed,
      location,
      symptomsAndOtherNotes,
      reservedDoctor,
      reservationDate,
      reservationTime,
    };

    console.log(data);

    axios
      .post("http://localhost:4000/reservation/create", data)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Reservation successful !!",
          showConfirmButton: false,
          timer: 1500,
        });
        setParentName("");
        setPhoneNumber("");
        setPetName("");
        setPetBreed("");
        setlocation("");
        setSymptomsAndOtherNotes("");
        setReservationDate("");
        setReservationTime("");

        navigate("/all-reservations");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  }

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
      <br />
      <br />
      <center>
        <nav>
          <h1 style={{ color: "white" }}>MAKE A RESERVATION</h1>
        </nav>
      </center>
      <br></br>
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
          <Link to="/reservations-by-date">
            <button>Search Reservations By Date</button>
          </Link>
        </div>
      </center>
      <br />
      <br />
      <center>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div>
                <form onSubmit={sendData}>
                  <p>PARENT NAME</p>
                  <input
                    name="parentName"
                    type="text"
                    placeholder="Parent's Name"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    required
                  />

                  <p>PHONE NUMBER</p>
                  <input
                    name="phoneNumber"
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />

                  <p>PET NAME</p>
                  <input
                    name="petName"
                    type="text"
                    placeholder="Pet's Name"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    required
                  />

                  <p>PET BREED</p>
                  <input
                    name="petBreed"
                    type="text"
                    placeholder="Pet's Breed"
                    value={petBreed}
                    onChange={(e) => setPetBreed(e.target.value)}
                    required
                  />


<p>PET BREED</p>
                  <input
                    name="location"
                    type="text"
                    placeholder="location"
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                    required
                  />

                  <p>SYMPTOMS AND OTHER NOTES</p>
                  <textarea
                    name="symptomsAndOtherNotes"
                    placeholder="Symptoms and other notes"
                    value={symptomsAndOtherNotes}
                    onChange={(e) => setSymptomsAndOtherNotes(e.target.value)}
                    required
                  />

                  <p>RESERVED DOCTOR</p>
                  <select
                    name="reservedDoctor"
                    value={reservedDoctor}
                    onChange={(e) => setReservedDoctor(e.target.value)}
                    required
                  >
                    <option value="">Select Doctor</option>
                    <option value="Doctor Smith Johnson">
                      Doctor Smith Johnson
                    </option>
                    <option value="Doctor Jenna Brown">
                      Doctor Jenna Brown
                    </option>
                    <option value="Doctor David Bard">Doctor David Bard</option>
                  </select>

                  <p>RESERVATION DATE</p>
                  <input
                    name="reservationDate"
                    type="date"
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    required
                  />

                  <p>RESERVATION TIME</p>
                  <input
                    name="reservationTime"
                    type="time"
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    required
                  />
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <button type="submit">MAKE RESERVATION</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </center>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};

export default CreateReservation;
