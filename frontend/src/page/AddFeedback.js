import React, { useEffect, useState } from "react";
import './AddFeedback.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function AddFeedback() {

    const navigate = useNavigate();
    const[email,setEmail]=useState("");
    const[type,setType]=useState("");
    const[image1,setImage1]=useState(null);
    const[image2,setImage2]=useState(null);
    const[date,setDate]=useState("");
    const[description,setDescription]=useState("");

    async function sendData(e){
        e.preventDefault();

        const formdata = new FormData();
        // const files = [image1 , image2];
        formdata.append('files', image1);
        //formdata.append('files', image2);
        console.log(formdata);
        axios.post('http://localhost:4000/upload', formdata , {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        .then(res => console.log(res))
        .catch(err => console.log(err));
        const feedbackN = new FormData();
        feedbackN.append('email', email);
        feedbackN.append('type' , type);
        feedbackN.append('image' , image1);
        feedbackN.append('date', date);
        feedbackN.append('description' , description);
        console.log(feedbackN.email);

        const newFeedback={
            email,
            type,
            image1,
            image2,
            date,
            description
        };
        
        await axios.post("http://localhost:4000/feedback/add", feedbackN , {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        .then(() => {
            alert("Feedback Added");

            setEmail("");
            setType("");
            setImage1("");
            setImage2("");
            setDate("");
            setDescription("");
            navigate('/feedback');
        
        })
        .catch(err => {
            alert(err);
        });
    }

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
            <nav>
                <div className="container">
                    <div className="pet-care-form">
                        <h2>Review Form</h2>
                    </div>
                    <form onSubmit={sendData} id="add-form" encType="multipart/form-data">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required placeholder="Enter your email" 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)} />

                        <label htmlFor="type">Type:</label>
                        <select id="type" name="type" required value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="" disabled>Select Type</option>
                            <option value="suggestion">Suggestion</option>
                            <option value="complaint">Complaint</option>
                        </select>

                        <label htmlFor="image1">Pet's photos after treatments:</label>
                        <input type="file" id="image1" name="image1" accept="image/*" multiple={false} 
                        onChange={(e)=> setImage1(e.target.files[0])} />

                        {/* <label htmlFor="image2">Pet's photos after treatments:</label>
                        <input type="file" id="image2" name="image2" accept="image/*" multiple={false}
                        onChange={(e)=> setImage2(e.target.files[0])} /> */}

                        <label htmlFor="date">Date:</label>
                        <input type="date" id="date" name="date" required 
                        value={date}
                        onChange={(e)=> setDate(e.target.value)} />

                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" required placeholder="Share your experience with us"
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}></textarea>

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </nav>
        </div>
    );
}
