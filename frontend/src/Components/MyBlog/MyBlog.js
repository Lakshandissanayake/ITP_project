import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import NavBar from "../NavBar/NavBar";
import "../Blog.css";
function MyBlog() {
  const [blog, setBlog] = useState([]);
  const [gmail, setGmail] = useState("");
  const handleChange = (e) => {
    setGmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Check Gmail first
      const response = await axios.get(
        `http://localhost:4000/blogger?gmail=${gmail}`
      );
      console.log("Response:", response.data);
      const relevantCard = response.data.blog.filter(
        (blog) => blog.gmail === gmail
      );
      //Display Related Card
      setBlog(relevantCard);

      if (relevantCard.length === 0) {
        alert("No  found,Plase enter valid Gmail address");
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };
  /*Delete Code */
  const deleteHandler = async (_id) => {
    //delete Confirmation
    const confirmed = window.confirm(
      "Are you sure you want to delete this Blog?"
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:4000/blogger/${_id}`);
        window.alert(" deleted successfully!");
        window.location.reload();
      } catch (error) {
        // Handle deletion error if needed
        console.error("Error deleting Blog details:", error);
      }
    }
  };
  // Function to truncate content to 80 words
  const truncateContent = (content) => {
    const words = content.split(" ");
    if (words.length > 20) {
      return words.slice(0, 20).join(" ") + "...";
    } else {
      return content;
    }
  };
  /*PDF Function */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: " Details Report",
    onafterprint: () => alert(" Details Report Successfully Download !"),
  });
  return (
    <div>
      <div className="blog_main">
      <NavBar />
        <br></br> <br></br>
        <div className="item_full_box">
          <form className="item_form_admin" onSubmit={handleSubmit}>
            <label className="form_box_item_lable" htmlFor="gmail">
              Enter Your Gmail
            </label>
            <br></br>
            <input
              className="form_box_item_input"
              type="email"
              id="gmail"
              name="gmail"
              value={gmail}
              onChange={handleChange}
              required
            />
            <br></br> <br></br>
            <button className="centerbtn_blog" type="submit">
              Check
            </button>
          </form>
        </div>
        <br></br>
        <div className="tbl_data_new">
          <button className="dwonrep" onClick={handlePrint}>
            Download Report
          </button>
        </div>
        <div className="tbl_data" ref={ComponentsRef}>
          <table className="table_details_admin">
            <thead>
              <tr className="tble_card_details_tr">
                <th className="admin_tbl_th">imgurl</th>
                <th className="admin_tbl_th">name</th>
                <th className="admin_tbl_th">gmail</th>
                <th className="admin_tbl_th">topic</th>
                <th className="admin_tbl_th">Content</th>
                <th className="admin_tbl_th conwith">action</th>
              </tr>
            </thead>
            {blog.map((item, index) => (
              <tbody>
                <tr key={index}>
                  <td className="admin_tbl_td">
                    <img
                      src={item.imgurl}
                      alt="img"
                      className="img_admin_tbl"
                    />
                  </td>
                  <td className="admin_tbl_td">{item.name}</td>
                  <td className="admin_tbl_td">{item.gmail}</td>
                  <td className="admin_tbl_td">{item.topic}</td>

                  <td className="admin_tbl_td">
                    {truncateContent(item.Content)}
                  </td>
                  <td className="admin_tbl_td">
                    <Link
                      to={`/updaetblog/${item._id}`}
                      className="booknow_btn"
                    >
                      Update
                    </Link>
                    <button
                      className="btn_dash_admin_dlt"
                      onClick={() => deleteHandler(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyBlog;
