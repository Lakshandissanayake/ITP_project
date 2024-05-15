import React, { useState, useEffect } from 'react';
import axios from "axios";
import './reviews.css';
import FeedbackPDF from './FeedbackPDF'; // Import the FeedbackPDF component
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function ReadFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchType, setSearchType] = useState('');
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const navigate = useNavigate(); // Define navigate function using useNavigate

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/feedback/");
            setFeedbacks(response.data);
            setFilteredFeedbacks(response.data); // Initialize filtered feedbacks with all feedbacks
        } catch (error) {
            console.error("Error fetching feedbacks:", error.message);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
    };

    const handleAddFeedbackClick = () => {
        navigate('/add'); // Use navigate function to navigate to "/add" page
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/feedback/delete/${id}`)
            .then(() => {
                fetchData();
                alert("Remove success");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
        filterFeedbacks(e.target.value);
    };

    const filterFeedbacks = (type) => {
        if (type === '') {
            setFilteredFeedbacks(feedbacks); // If search type is empty, show all feedbacks
        } else {
            const filtered = feedbacks.filter(feedback => feedback.type.toLowerCase().includes(type.toLowerCase()));
            setFilteredFeedbacks(filtered);
            if (filtered.length === 0) {
                alert("No results found");
            }
        }
    };

    return (
        <div>
            <nav className="logo">
                <img src="./img/log.png" alt="" />
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

            <h1 className="mainTitle">All feedbacks</h1>

            <div className="searchBarContainer">
                <input type="text" placeholder="Search feedback type..." value={searchType} onChange={handleSearchTypeChange} className="searchBar" />
                <FeedbackPDF feedbacks={filteredFeedbacks} /> {/* Add the FeedbackPDF component */}
                
            </div>

            <table id="feedbackTable" className="table table-striped">
                <thead>
                    <tr>
                        <th className="email">Email</th>
                        <th className="type">Type</th>
                        <th className="date">Date</th>
                        <th className="description">Description</th>
                        <th className="image">Image</th>
                        <th className="action">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFeedbacks.map((feedback, index) => (
                        <tr key={index}>
                            <td className="email">{feedback.email}</td>
                            <td className="type">{feedback.type}</td>
                            <td className="date">{feedback.date}</td>
                            <td className="description">{feedback.description}</td>
                            <td className="image">
                                <img src={`http://localhost:4000/${feedback.image1.slice(7)}`} alt="Image is loading" className="photo" />
                            </td>
                            <td className="action">
                                <a href="#" className="deleteBtn" onClick={() => handleDelete(feedback._id)}>Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
