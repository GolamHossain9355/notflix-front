import "./mediaSlider.css"
import Loading from "../components/loading/Loading"

export default function MediaSlider({ title, genre, data }) {

   return (
      <div className="media-slider__wrapper">
         {data.length === 0 ? (
            <Loading />
         ) : (
            <div>
               <div className="media-slider__head">
                  <h2 className="media-slider__head--title">{title}</h2>
                  <div>
                     <a className="media-slider__head--view-all" href={`/genre/${genre}`}>
                        View All
                     </a>
                  </div>
               </div>
               <div className="media-slider__cards--wrapper">
                  {data.map((media, i) => {
                     return (
                        <div className="media-slider__card" key={i}>
                           <a
                              href={`/media/${media.media_id}`}
                              className="media-slider__card"
                              key={i}
                           >
                              <img
                                 src={media.image}
                                 className="media-slider__card--image"
                                 alt={media.title}
                              />
                           </a>
                        </div>
                     )
                  })}
               </div>
            </div>
         )}
      </div>
   )
}
