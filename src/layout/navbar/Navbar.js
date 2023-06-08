import NavControl from "./components/navControl/NavControl";
import NavProfile from "./components/navProfile/NavProfile";
import NavGenreButtons from "./components/navGenreButtons/NavGenreButtons";
import UserControls from "./components/userControls/UserControls";
import "./navbar.css";

export default function Navbar({ inactive, setInactive }){

  return (
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
  );
};