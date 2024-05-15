import React, { useState, useEffect } from 'react';
import './css/cad.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyCards = () => {
  const [Data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:4000/don/cd")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  const handleDelete = (id) => {
    axios.get(`http://localhost:4000/don/delete/${id}`)
      .then(() => {
        fetchData();
        alert("remove success");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

    const handleUpdate = (id) => {
      window.location.href = `/update/${id}`;
    
    }
  

  return (
    <div>
      <nav className="top">
        <nav className="logo">
          <img src="/img/log.png" alt=""/>
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
            
      <nav className="cards" style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '10em', marginTop: '4em' }}>
        {Data.map((row, index) => (
          <div className="cad" key={index} style={{ background: 'url(../img/Rectanglebox.png) no-repeat', height: '17em',width: '31em', margin: '3em', paddingTop: '2em' }}>
            <div className="btn">
              <button onClick={() => handleDelete(row._id)} style={{ transition: '.6s', backgroundColor: '#af564c', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer', marginLeft: '19em' }}>REMOVE</button>
            </div>
            <div className="btnd">
              <button onClick={() => handleUpdate(row._id)} style={{ transition: '.6s', backgroundColor: '#4CAF50', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer' ,marginLeft: '20em' }}>UPDATE</button>
            </div>
            <div className="text" style={{ width: '25em', color: '#F7EEDD', padding: '2em' }}>
              <h1 style={{ marginTop: '-.7em', fontSize: '1.6em', marginBottom: '-.3em' }}>{row.CardNumber}</h1>
              <p>{row.name}</p>
              <p>EXP DATE : {row.ExpDate}</p>
            </div>
          </div>
        ))}
      </nav>
    </div>       
  );
}

export default MyCards;
