import React, { useState } from "react";
import {useNavigate } from 'react-router-dom';
import './css/addpet.css'
import axios from "axios";

export default function Addpet() {
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [breed, setBreed] = useState("");
    const [weight, setWeight] = useState("");
    const navigate = useNavigate();


    async function sendData(e){
        
        e.preventDefault();


        const petN = new FormData();
        petN.append('photo', photo);
        petN.append('name' , name);
        petN.append('age' , age);
        petN.append('gender', gender);
        petN.append('breed' , breed);
        petN.append('weight' , weight);
    

        const newPet={
            photo,
            name,
            age,
            gender,
            breed,
            weight
        };
        
        await axios.post("http://localhost:4000/pet/add", petN )
        .then(() => {
            alert("Pet Added")
            console.log("ADDED")

            setPhoto("");
            setName("");
            setAge("");
            setGender("");
            setBreed("");
            setWeight("");
            navigate('/pet');
        })
        .catch(err => {
            alert(err);
        });
    }
   

    return (
        <div>
            <nav className="logo">
                <img src="/log.png" alt="" />
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
                        <h2>Pet Registration Form</h2>
                    </div>
                    <form onSubmit={sendData} id="add-form" encType="multipart/form-data">
                        <label htmlFor="photo">Pet Photo:</label>
                        <input type="file" id="photo" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />

                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required placeholder="Enter your pet's name" value={name} onChange={(e) => setName(e.target.value)} />

                        <label htmlFor="age">Age:</label>
                        <input type="number" id="age" name="age" required placeholder="Enter pet's age" value={age} onChange={(e) => setAge(e.target.value)} />

                        <label htmlFor="gender">Gender:</label>
                        <input type="text" id="gender" name="gender" required placeholder="Enter gender" value={gender} onChange={(e) => setGender(e.target.value)} />

                        <label htmlFor="breed">Breed:</label>
                        <input type="text" id="breed" name="breed" required placeholder="Enter breed" value={breed} onChange={(e) => setBreed(e.target.value)} />

                        <label htmlFor="weight">Weight:</label>
                        <input type="number" id="weight" name="weight" required placeholder="Enter pet's weight" value={weight} onChange={(e) => setWeight(e.target.value)} />

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </nav>
        </div>
    );
}
