import './css/card.css';
import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [CardNumber, setCardNumber] = useState("");
  const [ExpDate, setExpDate] = useState("");
  const [CCV, setCCV] = useState("");
  const [Amount, setAmount] = useState("");

  function sendData(e) {
    e.preventDefault();
    const Datas = {
      name,
      CardNumber,
      ExpDate,
      CCV,
      Amount,
    }

    axios.post("http://localhost:4000/don/donate", Datas)
      .then(() => {
        alert("Donation success");
        setName("");
        setCardNumber("");
        setExpDate("");
        setCCV("");
        setAmount("");
        navigate("/allDonations");
      })
      .catch((err) => {
        alert(err);
      })
  }


  return (
    <>
    <nav className="top">
      <nav className="logo">
        <img src="/img/log.png" alt="" />
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

    <nav className="title">
      <h1>ENTER CARD DETAILS</h1>
    </nav>

    <nav className="form">
      <nav className="left">
        <img src="img/pay.png" alt="" />
      </nav>

      <nav className="mid">
        <form id="add-form" onSubmit={sendData}>
          <nav className="frm">
            <p>HOLDER NAME</p>
            <input
             
              name="name"
              className="long"
              type="text"
              placeholder="NAME ON CARD"

              onChange={(e)=>{
                setName(e.target.value)
              }}

              required
            />

            <p>CARD NUMBER</p>
            <input
           
              name="CardNumber"
              className="long"
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              pattern="\d{4}-\d{4}-\d{4}-\d{4}"
              onChange={(e)=>{
                setCardNumber(e.target.value)
              }}
              required
            />

            <p>EXPDATE</p>
            <input
            
              name="ExpDate"
              className="long"
              type="date"
              placeholder="DD/MM/YYYY"
              onChange={(e)=>{
                setExpDate(e.target.value)
              }}
              required
            />

            <p>CCV CODE</p>
            <input
           
              name="CCV"
              className="short"
              type="number"
              placeholder="XXX"
              onChange={(e)=>{
                setCCV(e.target.value)
              }}
              required
            />

            <p>AMOUNT</p>
            <input
           
              name="Amount"
              className="short"
              onChange={(e)=>{
                setAmount(e.target.value)
              }}
              type="number"
              placeholder="Rs."
              required
            />
          </nav>
          <button
           className="button"
          type="submit"
         >submit</button>
          
        </form>
      </nav>

      <nav className="right">
        <img src="img/dogy.png" alt="" />
      </nav>
    </nav>
  </>
  )
}

export default Home