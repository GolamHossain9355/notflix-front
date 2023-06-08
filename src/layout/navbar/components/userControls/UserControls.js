import { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faPenToSquare, faBookBookmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./userControls.css";

export default function UserControls({ setInactive }){
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
    <>
      <div className={`error ${error.length ? "error" : "error--hide"}`}>{error}</div>
      <div className="nav__user-controls">
        <a href="/bookmarks" className="nav__user-controls--button"><FontAwesomeIcon icon={faBookBookmark} fixedWidth /> Bookmarks</a>
        <a href="/edit-profile" className="nav__user-controls--button"><FontAwesomeIcon icon={faPenToSquare} fixedWidth /> Edit Profile</a>
        <a href="/search-media" className="nav__user-controls--button"><FontAwesomeIcon icon={faMagnifyingGlass} fixedWidth /> Search</a>
        <button className="nav__user-controls--button" onClick={handleClick} disabled={loading}><FontAwesomeIcon icon={faPowerOff} fixedWidth /> Sign Out</button>
      </div>
    </>
  )
};