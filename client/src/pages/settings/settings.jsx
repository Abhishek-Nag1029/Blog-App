import "./settings.css"
import Sidebar from "../../components/sidebar/sidebar"
import { useContext, useState } from "react"
import { Context } from "../../context/context"
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../Firebase.js";
import userRequest from "../../requestMethod";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  console.log("user", user)
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    dispatch({ type: "UPDATE_START" });
    e.preventDefault();
    const filName = new Date().getTime() + (file ? file.name : user.profilePic);
    const storage = getStorage(app);
    const storageRef = ref(storage, filName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("default");
        }
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          const updatedUser = {
            userId: user._id,
            username,
            email,
            profilePic: downloadURL
          };
          console.log("updatedUser", updatedUser);
          try {
            const res = await userRequest.put(process.env.REACT_APP_BACKEND_URI + "/users/" + user._id, updatedUser);
            console.log(res.data);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
          } catch (err) {
            console.log(err);
            dispatch({ type: "UPDATE_FAILURE" });
          }
        });
      }
    );
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file) : user.profilePic}
              alt=""
              className="abc" />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text"
            placeholder={user.username}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input type="email" placeholder={user.email} value={email} onChange={e => setEmail(e.target.value)} />
          <button className="settingsSubmit" type="submit">Update</button>
          {success && <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>Profile has been updated successfully...</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
