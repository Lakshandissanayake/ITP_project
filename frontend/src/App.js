import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './page/Home';
import AllDonations from './page/AllDonations'; 
import MyCards from './page/MyCards'; 
import MyDonations from './page/MyDonations'; 
import Update from './page/Update'; 
import Success from './page/Success'; 
import AddBlog from "./Components/AddBlog/AddBlog";
import BlogHome from "./Components/BlogHome/BlogHome";
import BlogView from "./Components/BlogView/BlogView";
import MyBlog from "./Components/MyBlog/MyBlog";
import UpdateBlog from "./Components/UpdateBlog/UpdateBlog";
import Addpet from './page/addpet';
import Readpets from './page/readpets';
import Updatepet from './page/updatepet';
import AddFeedback from './page/AddFeedback';
import ReadFeedback from './page/ReadFeedback';
import Reviews from './page/Reviews';
import Updatefeedback from './page/updatefeedback';
import CreateReservation from './page/CreateReservation';
import AllReservations from './page/AllReservations'; 
import ReservationsByParentName from './page/ReservationsByParentName'; 
import ReservationsByDate from './page/ReservationsByDate';
import EditReservation from './page/EditReservation'; 
import LandingPage from './page/LandingPage';
import Homein from './Components/home';
import CreateDriver from './Components/createDriver';
import UpdateForm from './Components/subcomponents/updateForm';
import Updateinvintory from './Components/update';
import Report from './Components/report';
import axios from 'axios';
import Homeemp from './Components/homeemp';
import CreateDriveremp from './Components/createDriveremp'; // Assuming this component exists
import Updateemp from './Components/updateemp'
import Reportemp from './Components/reportemp';
import HM from './page/Main';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {


  const[file,setFile]=useState(null)
  const handleUpload=(e)=>{

    const formdata=new FormData()
    formdata.append('file',file)
    axios.post('http://localhost:4000/upload',formdata)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }



  return (
    <>
      <Router>
      <Routes>
        <Route exact path='/home' element={<Home/>} />
        <Route exact path='/allDonations' element={<AllDonations />} />
        <Route exact path='/myCards' element={<MyCards />} />
        <Route exact path='/mydonations' element={<MyDonations />} />
        <Route exact path='/update/:id' element={<Update/>} />
        <Route exact path='/success' element={<Success />} />
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/blog" element={<BlogHome />} />
        <Route path="/viewblog/:id" element={<BlogView />} />
        <Route path="/myblog" element={<MyBlog />} />
        <Route path="/updaetblog/:id" element={<UpdateBlog />} />
        <Route exact path='/add' element={<Addpet/>} />
        <Route exact path='/pet' element={<Readpets/>} />
        <Route exact path='/updatePet/:id' element={<Updatepet/>} />
        <Route exact path='/addfeedback' element={<AddFeedback/>} />
        <Route exact path='/feedback' element={<ReadFeedback />} />
        <Route exact path='/updatefeedback/:id' element={<Updatefeedback/>} />
        <Route exact path='/reviews' element={<Reviews/>} />
        <Route exact path='/res' element={<LandingPage/>} />
        <Route exact path='/create-reservation' element={<CreateReservation/>} />
        <Route exact path='/all-reservations' element={<AllReservations />} />
        <Route exact path='/reservations-by-parent' element={<ReservationsByParentName />} />
        <Route exact path='/reservations-by-date' element={<ReservationsByDate />} />
        <Route exact path='/edit-reservation/:id' element={<EditReservation/>} />
        <Route exact path="/in" element={<Homein />} />
        <Route path="/createDriver" element={<CreateDriver />} />
        <Route path="/updateDriver/:driverId" element={<Updateinvintory/>} />
        <Route path="/report" element={<Report/>} />
        <Route path="/emp" element={<Homeemp />} />
        <Route path="/createDriveremp" element={<CreateDriveremp />} />
        <Route path="/updateItememp/:id" element={<Updateemp />} />
        <Route path="/reportemp" element={<Reportemp />} />
        <Route path="/" element={<HM />} />
      </Routes>
    </Router>
      
    </>
  );
}

export default App;
