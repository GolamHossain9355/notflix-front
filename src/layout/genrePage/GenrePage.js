import { useEffect, useState } from "react";
import Loading from "../components/loading/Loading";
import { useParams } from "react-router-dom";
import { listMedia } from "../../utils/api";
import Header from "../components/header/Header"
import "./genrePage.css";

export default function GenrePage() {
  const [medias, setMedias] = useState([]);
  const { genre } = useParams();
  
  useEffect(() => {
    const abortController = new AbortController();
    listMedia(abortController.signal, "movie", genre, "title", "asc", 100)
      .then((response) => setMedias(response.data))
      .catch(console.log);
    return () => abortController.abort();
  }, [genre]);

    return (
      <div className="genre-page__wrapper">

        { medias.length === 0 ? 
        <div>
          <Header title={genre} main={false}/>
          <Loading ht="100vh" size="90"/>
        </div>
        :

        <div>
          <Header title={genre} main={false}/>
          <div className="genre-page__media--grid">
            {medias.map((media, i) => {
              return (
                <div className="genre-page__media" key={i}>
                  <a href={`/media/${media.media_id}`}>
                    <img src={media.image} className="genre-page__media--image" alt={media.title}/>
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        }
      </div>
    );
}