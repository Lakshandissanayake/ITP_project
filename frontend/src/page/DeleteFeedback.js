import React, { useState, useEffect } from 'react';
import axios from "axios";
import './ReadFeedback.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function ReadFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const navigate = useNavigate(); // Define navigate function using useNavigate

    useEffect(() => {
        async function getFeedbacks() {
            try {
                const response = await axios.get("http://localhost:4000/feedback/");
                setFeedbacks(response.data);
            } catch (error) {
                console.error("Error fetching feedbacks:", error.message);
            }
        }

        getFeedbacks();
    }, []);

    const handleAddFeedbackClick = () => {
        navigate('/add'); // Use navigate function to navigate to "/add" page
    };

    const handleDeleteFeedback = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/feedback/delete/${id}`);
            // After successful deletion, remove the deleted feedback from the state
            setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
            console.log("Feedback deleted successfully.");
        } catch (error) {
            console.error("Error deleting feedback:", error.message);
        }
    };

    return (
        <div>
            <h1 className="mainTitle">What do you think about our services</h1>
            <button onClick={handleAddFeedbackClick}>Add Feedback</button>

            <div className="container1">
                <div className="star">
                    {[...Array(5)].map((_, index) => (
                        <a href="#" key={index} className="bi-star-fill"></a>
                    ))}
                </div>
            </div>

            <div className="reviews">
                {feedbacks.map((feedback, index) => (
                    <FeedbackList key={index} feedback={feedback} onDeleteFeedback={handleDeleteFeedback} />
                ))}
            </div>
        </div>
    );
}

function FeedbackList({ feedback, onDeleteFeedback }) {
    const handleDelete = () => {
        onDeleteFeedback(feedback.id);
    };

    return (
        <div className="r1">
            <div className="top">
                <h1>{feedback.email}</h1>
            </div>
            <div className="bottom">
                <p name="description" id="des">{feedback.description}</p>
                <div className="r2">
                    <h1>pet's photos after treatments :</h1>
                    <img src={feedback.image2} alt="" className="photo" />
                </div>
                <div className="button1">
                    <a href={`/edit/${feedback.id}`}><button className="editBtn">Edit</button></a>
                    <button className="deleteBtn" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}
