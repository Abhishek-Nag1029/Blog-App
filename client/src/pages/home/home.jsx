import "./home.css";
import Header from "../../components/header/header";
import Posts from "../../components/posts/posts";
import Sidebar from "../../components/sidebar/sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import userRequest from "../../requestMethod";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();  //search contains the query string from the URL.
  const location=useLocation();//This hook returns the current location object, which includes information about the URL
  // console.log("search",search);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await userRequest.get("/posts" + search);  //Adding query parameters to /posts
      setPosts(res.data);
      // console.log(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
