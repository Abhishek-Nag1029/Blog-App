import "./header.css"

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
      className="headerImg" src="https://images.pexels.com/photos/12355873/pexels-photo-12355873.jpeg?auto=compress&cs=tinysrgb&w=600"
      about="alt"
      />
    </div>
  ) 
}
