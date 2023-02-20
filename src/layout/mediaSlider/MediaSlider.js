import { useEffect, useState } from "react"
import { listMedia } from "../../utils/api.js"
import "./mediaSlider.css"
import Loading from "../components/loading/Loading"

export default function MediaSlider({ title, genre }) {
   const [medias, setMedias] = useState([])

   useEffect(() => {
      const abortController = new AbortController()
      listMedia(abortController.signal, "movie", genre, "imDb_rating", "desc", 6)
         .then((response)=> setMedias(response.data))
         .catch(console.log)

      return () => abortController.abort()
   }, [genre])

   return (
      <div className="media-slider__wrapper">
         {medias.length === 0 ? (
            <Loading />
         ) : (
            <div>
               <div className="media-slider__head">
                  <h2 className="media-slider__head--title">{title}</h2>
                  <div>
                     <a
                        className="media-slider__head--view-all"
                        href={`/genre/${genre}`}
                     >
                        View All
                     </a>
                  </div>
               </div>
               <div className="media-slider__cards--wrapper">
                  {medias?.map((media, i) => {
                     return (
                        <div className="media-slider__card">
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
