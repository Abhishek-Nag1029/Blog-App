import "./home.css"
import Header from "../../components/header/header"
import Posts from "../../components/posts/posts"
import Sidebar from "../../components/sidebar/sidebar"
import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import userRequest from "../../requestMethod"

export default function Home() {
  const [posts,setPosts]=useState([]); 
  const {search}=useLocation();
  
  useEffect(()=>{
    const fetchPosts =async()=>{
      const res=await userRequest.get("/posts"+search);
      setPosts(res.data);
    }
    fetchPosts();
  },[search])
  return (
    <>
    <Header/>
      <div className="home">
      <Posts posts={posts}/>
      <Sidebar/>
    </div>
    </>
    
  )
}
