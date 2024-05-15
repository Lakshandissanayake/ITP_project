import React, { useState, useEffect } from 'react';
import axios from "axios";
import './ReadFeedback.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import StarRating from 'react-star-ratings'; // Import StarRating component

export default function ReadFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [rating, setRating] = useState(0); // State for the overall rating
    const [submitted, setSubmitted] = useState(false); // State to track whether rating is submitted
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

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/feedback/");
            setFeedbacks(response.data);
        } catch (error) {
            console.error("Error fetching feedbacks:", error.message);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/updatefeedback/${id}`);
    };

    const handleAddFeedbackClick = () => {
        navigate('/addfeedback'); // Use navigate function to navigate to "/add" page
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

    // Function to handle rating change
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    // Function to handle submission of rating
    const handleSubmitRating = () => {
       
        setSubmitted(true);

       
        
        axios.post('http://localhost:4000/submit-rating', { rating })
            .then(response => {
                console.log('Rating submitted successfully:', response.data);
                // Optionally, display a message to the user
                // setSuccessMessage('Thank you for rating!');
            })
            .catch(error => {
                console.error('Error submitting rating:', error);
                // Optionally, display an error message to the user
                // setErrorMessage('Failed to submit rating. Please try again later.');
            });
        
    };

    return (
        <div className="bodyNew">
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

            <h1 className="mainTitle">What do you think about our services</h1>
            {/* Star rating component */}
            <div className="starContainer">
                <StarRating
                    rating={rating}
                    starHoverColor="yellow"
                    changeRating={handleRatingChange}
                />
                {submitted && <p>Thank you for rating!</p>} {/* Display thank you message if rating is submitted */}
            </div>

            <button className="addFeedbackButton" onClick={handleAddFeedbackClick}>Add Feedback</button>


            <div className="container1">
                <div className="star">
                    {[...Array(5)].map((_, index) => (
                        <a href="#" key={index} className="bi-star-fill"></a>
                    ))}
                </div>
            </div>

            <div>
                <div className="reviews">
                    {feedbacks.map((feedback, index) => (
                        <div className="r1" key={index}>
                            <div className="top">
                                <h1 className="feedbackEmail">{feedback.email}</h1>
                            </div>
                            <div className="bottom">
                                <p name="description" id="des">{feedback.description}</p>
                                <div className="r2">
                                    <h1 className='feedbackImage'>Pet's photos after treatments:</h1>
                                    <img src={`http://localhost:4000/${feedback.image1.slice(7)}`} alt="Image is loading" className="photo" />
                                </div>
                               
                                <div className='newBtnDiv'>
                                    <button className="editBtnP" onClick={() => handleUpdate(feedback._id)}>Edit</button>
                                    <button className="deleteBtnP" onClick={() => handleDelete(feedback._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
