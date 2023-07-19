import { Link } from "react-router-dom";
import "./topbar.css"
import { useContext } from "react";
import { Context } from "../../context/context";

export default function TopBar() {
  const {user,dispatch}=useContext(Context);
  const PF="https://blog-app-eight-nu.vercel.app/images/"
  const handleLogout =()=>{
dispatch({type:"LOGOUT"});
  };
  return (
    <div className="top">
      <div className="topLeft">
      <i className="topIcon fa-brands fa-square-facebook"></i>
      <i className="topIcon fa-brands fa-square-twitter"></i>
      <i className="topIcon fa-brands fa-square-pinterest"></i>
      <i className="topIcon fa-brands fa-square-instagram"></i>
     </div>
     <div className="topCenter">
   <ul className="topList">
<li className="topListItem">
  <Link className="link" to="/">HOME</Link>
</li>
<li className="topListItem"><Link className="link" to="/">ABOUT</Link></li>
<li className="topListItem"><Link className="link" to="/ ">CONTACT</Link></li>
<li className="topListItem"><Link className="link" to="/Write">WRITE</Link></li>
<li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>
   </ul>


     </div>
     <div className="topRight">
     {user? (
     <Link to="/settings">
     <img 
     className="topImg"
     src={PF+user.profilePic}
      alt=""/>
     </Link>
      ):(
     <ul className="topList">
     <li className="topListItem">
     <Link className="link" to="/Login">LOGIN</Link>
     </li>
     <li className="topListItem">
     <Link className="link" to="/Register">REGISTER</Link>
     </li>
     
     </ul>
     )}
    
     <i className="topSearchIcon fas fa-search"></i> 
     </div>


    </div>
  )
}
