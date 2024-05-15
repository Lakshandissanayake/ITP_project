import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router";
import axios from "axios";
import "../Blog.css";
function UpdateBlog() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const _id = useParams().id;
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:4000/blogger/${_id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.blog));
    };
    fetchHandler();
  }, [_id]);
  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:4000/blogger/${_id}`, {
        imgurl: String(inputs.imgurl),
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        topic: String(inputs.topic),
        Content: String(inputs.Content),
      });
    } catch (error) {
      // Handle error if needed
      console.error("Error updating details:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => {
      window.alert("Update successfully!");
      history("/myblog");
    });
  };
  return (
    <div>
      <div className="nav_dis">
        <NavBar />
      </div>
      <div className="children_div_admin">
        <h1 className="topic_blog">
          update <span className="sub_topic_blog"> Blog Post</span>{" "}
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
            <label className="form_box_item_lable">name</label>
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
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBlog;
