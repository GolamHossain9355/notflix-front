import "./header.css";
import SearchBarIconOnly from "../../searchBar/SearchBarIconOnly";

export default function Header({ title, main }){

  return (
    <div>
      <SearchBarIconOnly/>
      <div className={`header__wrapper ${main ? "main-wrapper" : ""}`}>
        <h1 className={`header-title ${main ? "main-title" : ""}`}>{title}</h1>
      </div>
    </div>
  )
}