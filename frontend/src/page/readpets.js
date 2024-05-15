import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/readpet.css';

export default function ReadPets() {
    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:4000/pet/");
                setPets(response.data);
            } catch (error) {
                console.error("Error fetching pets:", error.message);
            }
        }

        fetchData(); // Call fetchData function to fetch data when component mounts
    }, []); // Empty dependency array to ensure the effect runs only once when component mounts
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/pet/");
            setPets(response.data);
        } catch (error) {
            console.error("Error fetching pets:", error.message);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/updatepet/${id}`);
        console.log(id)
    };

    const handleAddFeedbackClick = () => {
        navigate('/add'); // Use navigate function to navigate to "/add" page
    };
    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/pet/delete/${id}`)
            .then(() => {
                fetchData();
                alert("Remove success");
            })
            .catch((err) => {
                alert(err.message);
            });
    };
    
    const navtoaddpet = () => {
        navigate('/add'); // Navigate to the /addpet page
    };

    const navtorew = () => {
        navigate('/reviews'); // Navigate to the /addpet page
    };

    const navtores = () => {
        navigate('/res'); // Navigate to the /addpet page
    };

    const navtodon = () => {
        navigate('/myCards'); // Navigate to the /addpet page
    };


    return (
        <div>
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
            </nav>
            <center>
                <h2 className="pet-Name">MY PET</h2>
            </center>

            <div className="container">
                {pets.map((pet) => (
                    <div className="profile-container" key={pet._id}>
                       { console.log(pet.photo)}


                       <img src={`http://localhost:4000/${pet.photo}`} alt= {pet.photo} className="profile-photo" />
                        <div className="profile-details">
                            <p className="pet-id">Pet ID: #{pet._id}</p>
                            <p className="pet-info">Pet name: {pet.name}</p>
                            <p className="pet-info">Age: <span className="pet-age">{pet.age} years</span></p>
                            <p className="pet-info">Gender: <span className="pet-gender">{pet.gender}</span></p>
                            <p className="pet-info">Breed: <span className="pet-breed">{pet.breed}</span></p>
                            <p className="pet-info">Weight: <span className="pet-weight">{pet.weight} kg</span></p>
                        </div>
                        <div className="button-container">
                            <button className="buttonedit" onClick={() => handleUpdate(pet._id)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(pet._id)} >Delete</button>
                        </div>
                    </div>
                ))}
                <div className="additional-buttons">
                    <div className="additional-button">
                        <p>Add New Pet</p>
                        <button className="add-pet-button" onClick={navtoaddpet} >Add New Pet</button>
                    </div>
                    <div className="additional-button">
                        <p>Medical Information</p>
                        <button className="medical-info-button" onClick={navtores} >Medical Information</button>
                    </div>

                    <div className="additional-button">
                        <p>My donations</p>
                        <button className="saved-articles-button" onClick={navtodon} >My donations</button>
                    </div>
                    <div className="additional-button">
                        <p>My feedbacks</p>
                        <button className="saved-articles-button" onClick={navtorew} >My feedbacks</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
