const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors=require("cors");

app.use(cors(
  {
    origin:["http://localhost:3000","https://blog-chi-three-26.vercel.app"]
  }
))

dotenv.config();
app.use(express.json());

app.use("/images", express.static(path.join(__dirname,"/images")));



mongoose
  .connect(process.env.MONGO_URL, {  
    family: 4,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
// var cors = require('cors');
// app.use(cors({origin: true, credentials: true}));

app.listen("5000", () => {
  console.log("Backend is running.");
});