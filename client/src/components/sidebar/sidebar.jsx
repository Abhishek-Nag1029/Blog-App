import { Link } from "react-router-dom";
import "./sidebar.css"
import { useEffect, useState } from "react";
import axios from "axios";
import userRequest from '../../requestMethod'

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await userRequest.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""></img>
        <p>Do adipisicing ullamco amet ullamco eiusmod irure.
          Nulla exercitation minim deserunt minim consectetur
          duis minim et anim consequat exercitation est.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats?.map((c) => (
            <Link className="link" to={`/?cat=${c.name}`}>
              <li className="sidebarListItem">
                {c?.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US </span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  );
}
