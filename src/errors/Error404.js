import { useNavigate } from "react-router-dom";
import "./error404.css";

export default function Error404() {
  const navigate = useNavigate();
  
  return (
    <div className="error__screen">
      <div className="error__wrapper">
        <div className="error__title--wrapper">
          <div className="error__title">404</div>
          <div className="error__text">Not Found</div>
        </div>
        <div className="error__links">
          <button className="link" onClick={()=> navigate("/")}>Go Home ?</button>
          <button className="link" onClick={()=> navigate(-1)}>Go Back ?</button>
        </div>
      </div>
    </div>
  );
}