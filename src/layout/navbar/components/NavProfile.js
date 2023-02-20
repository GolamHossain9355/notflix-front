import { useAuth } from "../../../contexts/AuthContext";
import profileImages from "../../../data/profileImages";

export default function NavProfile() {
  const { currentUser } = useAuth();
  
  return (
    <div className="nav__profile--wrapper">
      <img src={profileImages[Number(currentUser.photoURL)].img} alt={currentUser.displayName} className="nav__profile--img" />
      <div className="nav__profile--username">{currentUser.displayName}</div>
    </div>
  );
}