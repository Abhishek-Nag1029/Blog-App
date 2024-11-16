import axios from "axios";

const userRequest = axios.create({
  baseURL: "https://blog-app-eight-nu.vercel.app/api",
});

export default userRequest;
