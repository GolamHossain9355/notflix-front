import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardFast, faPlay } from "@fortawesome/free-solid-svg-icons";

export default function NavControl({ inactive, setInactive }) {
  return (
    <div>
      <button
        className={`nav__collapse-button ${inactive ? "inactive" : ""}`}
        onClick={() => setInactive(!inactive)}>
        {!inactive ? (
          <FontAwesomeIcon
            icon={faBackwardFast}
            transform="grow-7"
            fixedWidth/>
        ):(
          <FontAwesomeIcon icon={faPlay} transform="grow-7" fixedWidth />
        )}
      </button>
    </div>
  );
}