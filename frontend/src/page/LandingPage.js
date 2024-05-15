import React from "react";
import "./css/land.css";
import {useNavigate} from "react-router-dom";

const LandingPage = () => {

    const navigate = useNavigate();

    const handleReservations = () => {
        navigate("/create-reservation");
    };

    const viewReservations = () => {
        navigate("/all-reservations");
    };

    const veterinarians = [
        {
          vet_id: "1",
          name: "Doctor Smith Johnson",
          specialty: "Small Animals",
          location: "123 Main Street, Cityville",
          contact: {
            phone: "+1-123-456-7890",
            email: "emily.johnson@example.com",
          },
          working_hours: {
            Monday: "9:00 AM - 5:00 PM",
            Tuesday: "9:00 AM - 5:00 PM",
            Wednesday: "9:00 AM - 1:00 PM",
            Thursday: "Closed",
            Friday: "9:00 AM - 5:00 PM",
            Saturday: "10:00 AM - 3:00 PM",
            Sunday: "Closed",
          },
          image_url: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        {
          vet_id: "2",
          name: "Doctor Jenna Brown",
          specialty: "Large Animals",
          location: "456 Elm Street, Townsville",
          contact: {
            phone: "+1-234-567-8901",
            email: "michael.rodriguez@example.com",
          },
          working_hours: {
            Monday: "8:00 AM - 4:00 PM",
            Tuesday: "8:00 AM - 4:00 PM",
            Wednesday: "8:00 AM - 12:00 PM",
            Thursday: "Closed",
            Friday: "8:00 AM - 4:00 PM",
            Saturday: "9:00 AM - 2:00 PM",
            Sunday: "Closed",
          },
          image_url: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        {
          vet_id: "3",
          name: "Doctor David Bard",
          specialty: "Exotic Animals",
          location: "789 Oak Avenue, Villagetown",
          contact: {
            phone: "+1-345-678-9012",
            email: "sarah.chang@example.com",
          },
          working_hours: {
            Monday: "10:00 AM - 6:00 PM",
            Tuesday: "10:00 AM - 6:00 PM",
            Wednesday: "10:00 AM - 2:00 PM",
            Thursday: "Closed",
            Friday: "10:00 AM - 6:00 PM",
            Saturday: "11:00 AM - 4:00 PM",
            Sunday: "Closed",
          },
          image_url: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
      ];

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
        <h1>View Doctors</h1>
      </nav>
      <br></br>
      <button style={{float:"right", marginRight:"10%"}} onClick={viewReservations}>View Reservations</button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    <center>
    <div className="vet-grid">
      {veterinarians.map((vet) => (
        <div key={vet.vet_id} className="vet-card">
          <img src={vet.image_url} alt={vet.name} className="vet-image" />
          <br></br>
          <div className="vet-details">
            <h2>{vet.name}</h2>
            <p><strong>Specialty:</strong> {vet.specialty}</p>
            <p><strong>Location:</strong> {vet.location}</p>
            <p><strong>Contact:</strong> {vet.contact.phone} | {vet.contact.email}</p>
            <br></br>
            <p><strong>Working Hours:</strong></p>
            <ul>
              {Object.entries(vet.working_hours).map(([day, hours]) => (
                <li key={day}><strong>{day}:</strong> {hours}</li>
              ))}
            </ul>
          </div>
          <button onClick={handleReservations}>Add Reservation</button>
        </div>
      ))}
    </div>
    </center>
    <br></br>
    <br></br>
    </>
  );
};

export default LandingPage;
