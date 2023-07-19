import { useContext } from "react";
import TopBar from "./components/topbar/topbar";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Settings from "./pages/settings/settings";
import Single from "./pages/single/single";
import Write from "./pages/write/write";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Context } from "./context/context";

function App() {
  const {user}=useContext(Context);
  return (
    <Router>
      <TopBar />
     <Routes>
        <Route exact path="/" element={<Home/>}/>
          {/* <Home />
        </Route> */}
        <Route exact path="/posts" element={<Home/>}/>
        <Route path="/register" element={user? <Home/>:<Register/>}/>
          {/* <Register />
        </Route> */}
        <Route path="/login" element={user? <Home/>:<Login/>}/>
          {/* < />
        </Route> */}
        <Route path="/write" element={user? <Write/>:<Login/>}/>
          {/* <Write />
        </Route> */}
        <Route path="/settings" element={user? <Settings/>:<Login/>}/> 
          {/* <Settings />
        </Route> */}
        <Route path="/post/:postId" element={<Single/>}/>
          {/* <Single />
        </Route> */}
      </Routes>
    </Router>

  );
}

export default App;
