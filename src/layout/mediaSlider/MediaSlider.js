import Loading from "../components/loading/Loading"
import MediaCard from "./components/mediaCard/MediaCard"
import "./mediaSlider.css"

export default function MediaSlider({ title, genre, data }) {

   return (
      <div className="media-slider__wrapper">
         {data.length === 0 ? (
            <Loading />
         ) : (
            <div className="media-slider__grid">
               <div className="media-slider__head">
                  <h2 className="media-slider__head--title">{title}</h2>
                  <a className="media-slider__head--view-all" href={`/genre/${genre}`}>
                     View All
                  </a>
               </div>
               <div className="red-line"/>
               <div className="media-slider__card-deck">
                  {data.map((media, i) => {
                     return ( <MediaCard key={i} media={media}/> )
                  })}
               </div>
            </div>
         )}
      </div>
   )
}
