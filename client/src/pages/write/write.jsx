import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/context";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../Firebase.js";
import userRequest from "../../requestMethod";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filName = new Date().getTime() + file.name;
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
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          console.log("File available at", downloadURL);
          const newPost = {
            username: user.username,
            title,
            desc,
            photo: downloadURL
          }
          console.log(newPost);
          try {
              const res = await userRequest.post("/posts", newPost);
              console.log(res.data);
              window.location.replace("/post/" + res.data._id);
            } catch (err) {
              console.log(err);
            }
        });
      }
    );
  };

  return (
    <div className="write">
      {file && (<img className="writeImg" src={URL.createObjectURL(file)} alt="" />)}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input type="file"
            id="fileInput"
            style={{ display: "none" }}
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input type="text"
            placeholder="Title"
            className="writeInput"
            // autofocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">Publish</button>
      </form>
    </div>
  )
}
