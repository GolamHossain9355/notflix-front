import NavControl from "./components/NavControl";
import NavProfile from "./components/NavProfile";
import NavGenreButtons from "./components/NavGenreButtons";
import UserControls from "./components/UserControls";
import "./navbar.css";

export default function Navbar({ inactive, setInactive }){

  return (
    <div>
      <div className={`nav__static-window ${inactive ? "inactive" : ""}`}>
        <div>
          <NavControl inactive={inactive} setInactive={setInactive}/>
        </div>
        <div className="nav__wrapper">
          <NavProfile/>
          <UserControls setInactive={setInactive}/>
          <NavGenreButtons/>
        </div>
      </div>
    </div>
  );
};