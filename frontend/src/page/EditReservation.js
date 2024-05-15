import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditReservation = () => {
  const { id } = useParams(); // Get reservation ID from URL
  const [reservationData, setReservationData] = useState({
    parentName: "",
    phoneNumber: "",
    petName: "",
    petBreed: "",
    symptomsAndOtherNotes: "",
    reservedDoctor: "",
    reservationDate: "",
    reservationTime: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/reservation/${id}`);
        response.data.reservationDate = response.data.reservationDate.slice(0, 10);
        setReservationData(response.data);
        setLoading(false);
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    };

    fetchReservationData();
  }, [id]);

  const handleChange = (e) => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`http://localhost:4000/reservation/${id}`, reservationData);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Reservation updated successfully!",
      });

      navigate("/all-reservations");
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
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
      <nav className="title">
        <h1>EDIT RESERVATION</h1>
      </nav>
      <br></br>
    <div>
      <center>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div>
                <form onSubmit={handleSubmit}>
                  <p>PARENT NAME</p>
                  <input
                    name="parentName"
                    type="text"
                    placeholder="Parent's Name"
                    value={reservationData.parentName}
                    onChange={handleChange}
                    required
                  />

                  <p>PHONE NUMBER</p>
                  <input
                    name="phoneNumber"
                    type="text"
                    placeholder="Phone Number"
                    value={reservationData.phoneNumber}
                    onChange={handleChange}
                    required
                  />

                  <p>PET NAME</p>
                  <input
                    name="petName"
                    type="text"
                    placeholder="Pet's Name"
                    value={reservationData.petName}
                    onChange={handleChange}
                    required
                  />

                  <p>PET BREED</p>
                  <input
                    name="petBreed"
                    type="text"
                    placeholder="Pet's Breed"
                    value={reservationData.petBreed}
                    onChange={handleChange}
                    required
                  />

                  <p>SYMPTOMS AND OTHER NOTES</p>
                  <textarea
                    name="symptomsAndOtherNotes"
                    placeholder="Symptoms and other notes"
                    value={reservationData.symptomsAndOtherNotes}
                    onChange={handleChange}
                    required
                  />

                  <p>RESERVED DOCTOR</p>
                  <select
                    name="reservedDoctor"
                    value={reservationData.reservedDoctor}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Doctor</option>
                    <option value="Doctor Smith Johnson">Doctor Smith Johnson</option>
                    <option value="Doctor Jenna Brown">Doctor Jenna Brown</option>
                    <option value="Doctor David Bard">Doctor David Bard</option>
                  </select>

                  <p>RESERVATION DATE</p>
                  <input
                    name="reservationDate"
                    type="date"
                    value={reservationData.reservationDate}
                    onChange={handleChange}
                    required
                  />

                  <p>RESERVATION TIME</p>
                  <input
                    name="reservationTime"
                    type="time"
                    value={reservationData.reservationTime}
                    onChange={handleChange}
                    required
                  />
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <button type="submit">UPDATE RESERVATION</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </center>
    </div>
    <br></br><br></br><br></br>
    </>
  );
};

export default EditReservation;
