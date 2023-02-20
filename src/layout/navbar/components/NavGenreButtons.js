import genreData from "../../../data/genreData";

export default function NavButtons(){

  return (
    <div>
      <div className={"nav__genre-buttons--wrapper"}>
        
      <a href="/" className="nav__genre-button">Home</a>
            {genreData.map((button)=>{
              return (
                  <a key={button.id} href={button.url} className="nav__genre-button">{button.title}</a>
              )
            })}

      </div>
    </div>
  )
};