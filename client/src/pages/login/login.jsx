import { Link } from "react-router-dom"
import "./login.css"
import { useContext, useRef } from "react";
import { Context } from "../../context/context";
import axios from "axios";

export default function Login() {
    const userRef=useRef();
    const passwordRef=useRef();
    const {dispatch,isFetching}=useContext(Context);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try {
            const res = await axios.post("/auth/login", {
              username: userRef.current.value,
              password: passwordRef.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
          }
        };
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>

                <label>Username</label>
                <input type="text"
                 className="loginInput"
                  placeholder="Enter Your Username..."
                  ref={userRef}
                   />
                <label>Password</label>
                <input type="password"
                 className="loginInput"
                  placeholder="Enter Your Password..."
                  ref={passwordRef}
                   />
                <button className="loginButton" type="submit" disabled={isFetching}>
                Login
                </button>
            </form>
            <button className="loginRegisterButton">
            <Link className="link" to="/Register"> Register</Link></button>
        </div>
    )
}
