import './css/card.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import imf from "../page/img/pay.png"
import imd from "../page/img/dogy.png"

const Update = () => {

  const { id } = useParams();

  console.log(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ExpDate: '',
    CCV: '',
  });


    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log("logged")
    e.preventDefault();
    try {
      const response = await axios.post(`/don/update/${id}`, formData);
      console.log(response.data);
      navigate('/myCards'); // Redirect to the home page URL
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    navigate('/myCards'); // Navigate programmatically to '/drivers' route
  };

  

  return (
    <>
    <nav className="top">
      <nav className="logo">
        <img src="/img/log.png" alt="" />
      </nav>
      <nav className="hadder">
      <a href="">HOME</a>
      <a href="/res">RESERVATION</a>
          <a href="/blog">BLOG</a>
          <a href="/pet">PET REGISTRATION</a>
          <a href="/home">DONATION</a>
          <a href="/feedback">FEEDBACK</a>
      </nav>
    </nav>

    <nav className="title">
      <h1>ENTER CARD DETAILS</h1>
    </nav>

    <nav className="form">
      <nav className="left">
        <img src={imf} alt="" />
      </nav>

      <nav className="mid">

      <form onSubmit={handleSubmit} id="add-form">
  <nav className="frm">
    <p>EXPDATE</p>
    <input
      value={formData.ExpDate}
      onChange={handleChange}
      name="ExpDate"
      className="long"
      type="date"
      placeholder="DD/MM/YYYY"
      required
    />

    <p>CCV CODE</p>
    <input
      value={formData.CCV}
      onChange={handleChange}
      name="CCV"
      className="short"
      type="number"
      placeholder="XXX"
      required
    />
  </nav>
  <button type="submit" className="buttonS">Submit</button>
</form>

      </nav>

      <nav className="right">
        <img src={imd} alt="" />
      </nav>
    </nav>
  
  </>
  );
};

export default Update;
