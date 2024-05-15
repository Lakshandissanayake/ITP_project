import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Blog.css";
import { useReactToPrint } from "react-to-print";
import NavBar from "../NavBar/NavBar";
import { LuPencilLine } from "react-icons/lu";
const URL = "http://localhost:4000/blogger";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
function BlogHome() {
  // fetch data
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setBlog(data.blog));
  }, []);

  /* Search Function */
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filtered = data.blog.filter((blog) =>
        Object.values(blog).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setBlog(filtered);
      setNoResults(filtered.length === 0);
    });
  };

  // Function to truncate content to 50 words
  const truncateContent = (content) => {
    const words = content.split(" ");
    if (words.length > 40) {
      return words.slice(0, 40).join(" ") + "...";
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
    <div className="blog_main">
      <NavBar />
      <div className="blog_submin">
        <div className="actionset_home">
          <button
            className="booknow_blog"
            onClick={() => (window.location.href = "/addblog")}
          >
            Create Blog
          </button>
          <tr>
            <td className="">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                className="serch_inpt"
                placeholder="Search Here..."
              ></input>
            </td>
            <td>
              <button onClick={handleSearch} className="booknow_blog">
                Search
              </button>
            </td>
          </tr>
          <div className="dwonboxset">
            <button
              className="booknow_blog"
              onClick={() => (window.location.href = "/myblog")}
            >
              My Blog
            </button>
            <button className="booknow_blog" onClick={handlePrint}>
              Download All Blog
            </button>
          </div>
        </div>
        {noResults ? (
          <div>
            <br></br>
            <h1 className="con_topic">
              No <span className="clo_us"> Found</span>{" "}
            </h1>
          </div>
        ) : (
          <div className="card_blog " ref={ComponentsRef}>
            {" "}
            {blog.map((item, index) => (
              <div className="box_blog" key={index}>
                <div className="card_conta">
                  <img src={item.imgurl} alt="img" className="cat_img_blog" />
                </div>
                <div className="contaent_body">
                  <div className="card_contaname">{item.topic}</div>

                  <div className="card_conta">
                    {truncateContent(item.Content)}
                  </div>
                  <div className="card_contatopic">
                    {" "}
                    <LuPencilLine className="pen" />
                    <i> {item.name}</i>
                  </div>
                </div>
                <div className="">
                  {/* Pass item._id to deleteHandler */}
                  <Link to={`/viewblog/${item._id}`} className="centerbtn_blog">
                    Read More..
                  </Link>
                </div>
                <br></br>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogHome;
