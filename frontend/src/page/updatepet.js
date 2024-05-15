import './css/addpet.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function Update() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        age: '',
        weight: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:4000/pet/update/${id}`, formData);
            console.log(response.data);
            alert("Pet Updated"); // Notify user about successful update
            navigate('/pet'); // Redirect to the appropriate page after submission
        } catch (error) {
            console.error(error);
            alert("Failed to update pet"); // Notify user about failure
        }
    };

    return (
        <div>
            <nav className="logo">
                <img src="./log.png" alt="" />
            </nav>
            <nav className="hadder">
                
            <a href="/res">RESERVATION</a>
          <a href="/blog">BLOG</a>
          <a href="/pet">PET REGISTRATION</a>
          <a href="/home">DONATION</a>
          <a href="/feedback">FEEDBACK</a>

            </nav>
            <nav>
                <div className="container">
                    <div className="pet-care-form">
                        <h2>Edit Form</h2>
                    </div>
                    <form onSubmit={handleSubmit} id="add-form" encType="multipart/form-data">
                        <label htmlFor="age">Age:</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} />

                        <label htmlFor="weight">Weight:</label>
                        <input type="number" name="weight" value={formData.weight} onChange={handleChange} />

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </nav>
        </div>
    );
}
