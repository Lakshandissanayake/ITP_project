import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import NavBar from '../NavBar/NavBar'
import "../Blog.css";
function AddBlog() {
  const navigate = useNavigate(); // Changed variable name to navigate
  const [inputs, setInputs] = useState({
    imgurl: "",
    name: "",
    gmail: "",
    topic: "",
    Content: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("Post successfully!");
    navigate("/");
  };
  const sendRequest = async () => {
    await axios.post("http://localhost:4000/blogger", {
      imgurl: inputs.imgurl,
      name: inputs.name,
      gmail: inputs.gmail,
      topic: inputs.topic,
      Content: inputs.Content,
    });
  };
  return (
    <div>
      <div className="nav_dis">
        <NavBar/>
      </div>
      <div className="children_div_admin">
        <h1 className="topic_blog" style={{color:"white"}}>
          Create New<span className="sub_topic_blog" style={{color:"white"}}> Blog Post</span>{" "}
        </h1>
        <div className="item_full_box">
          <form className="item_form_admin" onSubmit={handleSubmit}>
            <label className="form_box_item_lable">Img Url</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              value={inputs.imgurl}
              onChange={handleChange}
              name="imgurl"
              required
            />
            <br></br>
            <label className="form_box_item_lable"> Writer name</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              value={inputs.name}
              onChange={handleChange}
              name="name"
              required
            />
            <br></br>
            <label className="form_box_item_lable">gmail</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="email"
              value={inputs.gmail}
              onChange={handleChange}
              name="gmail"
              required
            />
            <br></br>
            <label className="form_box_item_lable">topic</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              value={inputs.topic}
              onChange={handleChange}
              name="topic"
              required
            />
            <br></br>
            <label className="form_box_item_lable">Content</label>
            <br></br>
            <textarea
              className="form_box_item_input"
              type="text"
              rows={7}
              value={inputs.Content}
              onChange={handleChange}
              name="Content"
              required
            />
            <br></br>
            <button type="submit" className="admin_form_cneter_btn">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
