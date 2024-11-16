import "./header.css"

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        {/* <span className="headerTitleSm">React & Node</span> */}
        <span className="headerTitleLg">BlogSphere</span>
      </div>
      <img
      className="headerImg" src="https://images.pexels.com/photos/3847645/pexels-photo-3847645.jpeg?auto=compress&cs=tinysrgb&w=600"
      about="alt"
      />
    </div>
  ) 
}
