import "./post.css"
import { Link } from "react-router-dom";

export default function Post({post}) {
  const PF="https://blog-app-eight-nu.vercel.app/images/";
  return (
    <div className="post">
    {post.photo && <img
      className="postImg"
      src={PF+post.photo}
      alt=""
      />}
      
      <div className="postInfo">
        <div className="postCats">
            {post.categories.map((c)=>(
              <span className="postCat"> <Link className="link" to="/posts?cat=Music">
              {c.name}
            </Link></span>
            ))}
        </div>
        
        <Link to={`/post/${post._id}`} className="link">
        <span className="postTitle"> {post.title}</span>
           
          </Link>
       
        <hr/>
        <span className="postDate">
            {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">
      {post.desc}
      </p>
    </div>
  );
}
