import "./header.css";
import SearchBarIconOnly from "../searchBar/SearchBarIconOnly";

export default function Header(){

  return (
    <>
      <SearchBarIconOnly/>
      <div className="header__wrapper">
        <h1 className="main-title">Notflix</h1>
      </div>
    </>
  )
}