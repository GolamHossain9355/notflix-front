import { useState, useEffect } from "react";
import { listRandomMedia } from "../../utils/api";
import Loading from "../components/loading/Loading";

export default function FeatureSlider() {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadRandomMedia() {
      try {
        const response = await listRandomMedia(abortController.signal, 6);
        setMedias(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    loadRandomMedia();
    return () => abortController.abort();
  }, []);

  return (
    <div className="media-slider__wrapper">
      {medias.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <div className="media-slider__head">
            <h2 className="media-slider__head--title">Want to watch something new?</h2>
          </div>
          <div className="media-slider__cards--wrapper">
            {medias.map((media, i) => {
              return (
                <div className="media-slider__card">
                  <a href={`/media/${media.media_id}`} className="media-slider__card" key={i}>
                    <img src={media.image} className="media-slider__card--image" style={{ width: "300px", height: "400px" }} alt={media.title}/>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}