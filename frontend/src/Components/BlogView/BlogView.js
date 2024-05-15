import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../Blog.css";
import { useReactToPrint } from "react-to-print";
import NavBar from "../NavBar/NavBar";
import { LuPencilLine } from "react-icons/lu";
import { useParams } from "react-router";
function BlogView() {
  const [inputs, setInputs] = useState({});
  const id = useParams().id;
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/blogger/${id}`);
        setInputs(response.data.blog);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);
  /*PDF Function */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: " Details Report",
    onafterprint: () => alert(" Details Report Successfully Download !"),
  });
  return (
    <div>
      <div className="nav_dis">
        <NavBar />
      </div>
      <br></br> 
      <div className="tbl_data_new">
        <button className="dwonrep" onClick={handlePrint}>
          Download Blog
        </button>
      </div>
      <div className="main_page_view"  ref={ComponentsRef}>
        <h1 className="b_name">{inputs.topic}</h1>
        <div className="box_view_blog">
          <img src={inputs.imgurl} alt="img" className="imgview" />
          <h3 className="blogname">{inputs.topic}</h3>
          <h3 className="blogpara">{inputs.Content}</h3>
          <div className="card_contatopic newpdn">
            <LuPencilLine className="pen" />
            <i> {inputs.name}</i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogView;
