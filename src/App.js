import { useState } from "react";
import Layout from "./layout/Layout";
import { GenrePage, MediaPage, Navbar, SignIn, SignUp, ResetPassword, EditProfile, PrivateRoutes, SearchBar, Bookmarks } from "./layout";
import Error404 from "./errors/Error404";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const [inactive, setInactive] = useState(true);
  const { currentUser } = useAuth();

  return (
    <div className="App">
        { currentUser ? ( <Navbar inactive={inactive} setInactive={setInactive} /> )  : "" }
        <div className={`mainscreen ${inactive ? "inactive" : ""}`}>
          <Router>
            <Routes>
              <Route element={<PrivateRoutes/>}>
                <Route path="/" element={<Layout/>}/>
                <Route path="/genre/:genre" element={<GenrePage/>}/>
                <Route path="/media/:mediaId" element={<MediaPage/>}/>
                <Route path="/search-media" element={<SearchBar />}/>
                <Route path="/bookmarks" element={<Bookmarks />}/>
                <Route path="/edit-profile" element={<EditProfile inactive={inactive} setInactive={setInactive}/>}/>
              </Route>

              <Route path="/sign-in" element={<SignIn />}/>
              <Route path="/sign-up" element={<SignUp />}/>
              <Route path="/reset-password" element={<ResetPassword/>}/>

              <Route path="*" element={<Error404/>} />
            </Routes>
          </Router>
        </div>
    </div>
  );
}

export default App;