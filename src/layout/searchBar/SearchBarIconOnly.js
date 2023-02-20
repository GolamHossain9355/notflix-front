import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./searchBarIconOnly.css";

function SearchBarIconOnly() {
  const navigate = useNavigate();

  const doNotShowSearchBarIconPaths = [
    "/search-media",
    "/sign-in",
    "/sign-up",
    "/edit-profile",
  ];

  const handleClick = (_event) => {
    navigate("/search-media", { replaced: false });
  };

  return (
    <div
      className={`search-bar-icon-only__container ${
        doNotShowSearchBarIconPaths.some(
          (path) => path === window.location.pathname
        ) && "display-none"
      }`}
    >
      <FontAwesomeIcon
        className="search-bar__icon--only"
        icon={faMagnifyingGlass}
        onClick={handleClick}
      />
    </div>
  );
}

export default SearchBarIconOnly;