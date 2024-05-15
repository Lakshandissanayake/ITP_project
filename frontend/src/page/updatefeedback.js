import './AddFeedback.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function Update() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        description: '',
        type: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/feedback/update/${id}`, formData);
            console.log(response.data.status);
            alert("Feedback updated")
            navigate('/feedback'); // Redirect to the appropriate page after submission
        } catch (error) {
            console.error(error);
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
          <a href="/in">INVINTORY</a>
          <a href="/emp">EMPLOYEE MANEGMENT</a>

            </nav>
            <nav>
                <div className="container">
                    <div className="pet-care-form">
                        <h2>Review Form</h2>
                    </div>
                    <form onSubmit={handleSubmit} id="add-form" encType="multipart/form-data">
                        <label htmlFor="type">Type:</label>
                        <select id="type" name="type" required value={formData.type} onChange={handleChange}>
                            <option value="" disabled>Select Type</option>
                            <option value="suggestion">Suggestion</option>
                            <option value="complaint">Complaint</option>
                        </select>

                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" value={formData.description} required placeholder="Share your experience with us" onChange={handleChange}></textarea>

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </nav>
        </div>
    );
}
