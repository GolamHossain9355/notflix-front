import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faPenToSquare, faBookBookmark } from "@fortawesome/free-solid-svg-icons";

export default function NavButtons({ setInactive }){
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signOut } = useAuth();

  const handleClick = async () => {
    try {
      setError("");
      setLoading(true);
      setInactive(true)
      await signOut();
    } catch {
      setError("Failed to sign out");
    }
    setLoading(false);
  };

  return (
    <div>
        <div className={`error ${error.length ? "error" : "error--hide"}`}>{error}</div>
        <div className="nav__user-controls">
          <a href="/bookmarks" className="nav__user-controls--button"><FontAwesomeIcon icon={faBookBookmark} fixedWidth /> Bookmarks</a>
          <a href="/edit-profile" className="nav__user-controls--button"><FontAwesomeIcon icon={faPenToSquare} fixedWidth /> Edit Profile</a>
          <button className="nav__user-controls--button" onClick={handleClick} disabled={loading}><FontAwesomeIcon icon={faPowerOff} fixedWidth /> Sign Out</button>
        </div>
    </div>
  )
};