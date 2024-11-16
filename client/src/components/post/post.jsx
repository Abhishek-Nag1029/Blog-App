import "./post.css"
import { Link } from "react-router-dom";

export default function Post({ post }) {
  console.log("post", post)
  return (
    <div className="post">
      <img
        className="postImg"
        src={post.photo ? post.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtVkxVwrxxHvw9vqCa3olS0XHIdeVKFPwOQ&usqp=CAU"}
        alt="noImg"
      />
      <div className="postInfo">
        <div className="postCats">
          {post?.categories?.map((c) => (
            <span className="postCat"> <Link className="link" to="/posts?cat=Music">
              {c?.name}
            </Link></span>
          ))}
        </div>

        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle"> {post.title}</span>

        </Link>

        <hr />
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