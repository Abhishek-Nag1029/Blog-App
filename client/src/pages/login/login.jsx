import { Link } from "react-router-dom"
import "./login.css"
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/context";
import axios from "axios";
import userRequest from "../../requestMethod";

export default function Login() {
    const userRef=useRef();
    const passwordRef=useRef();  //use context for setup
    const {dispatch,isFetching}=useContext(Context);  //dispatch A function that you call to send actions to the reducer, which updates the state based on the action type.
    const [error, setError] = useState(false);
    const handleSubmit=async (e)=>{
        e.preventDefault();
        setError(false);
        dispatch({type:"LOGIN_START"});  //dispatch is used to update the state .it sends actions to the reducer
        try {
            const res = await userRequest.post("/auth/login", {
              username: userRef.current.value,
              password: passwordRef.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          } catch (err) {
            setError(true);
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
                  placeholder="Please enter Your Password..."
                  ref={passwordRef}
                   />
                <button className="loginButton" type="submit" disabled={isFetching}>
                Login
                </button>
                {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          {" "}
          Wrong Username or Password {" "}
        </span>
      )}
            </form>
            <button className="loginRegisterButton">
            <Link className="link" to="/Register"> Register</Link></button>
        </div>
    )
}
