import { useEffect, useState } from "react";
import "./layout.css";
import Header from "./header/Header";
// import FeatureSlider from "./featureSlider/FeatureSlider";
import MediaSlider from "./mediaSlider/MediaSlider";
import { listMedia } from "../utils/api";

export default function Layout() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    listMedia(abortController.signal, "movie", "", "title", "asc", 1000)
      .then((response) => setMedia(response.data))
      .catch(console.log);
    return () => abortController.abort();
  }, []);

  const extractGenre = (genre) => {
    let count = 0;
    let results = [];
    for (let i = 0; i < media.length; i++) {
      if (count === 6) break;
      if (media[i].genres.includes(genre)) {
        results.push(media[i]);
        count++;
      }
    }
    return results;
  };

  return (
    <div>
      <Header />
      {/* <FeatureSlider /> */}
      <MediaSlider title="Action" genre="Action" data={extractGenre("Action")} />
      <MediaSlider title={`Kids & Family`} genre="Family" data={extractGenre("Family")} />
      <MediaSlider title="Drama" genre="Drama" data={extractGenre("Drama")} />
      <MediaSlider title="Comedy" genre="Comedy" data={extractGenre("Comedy")} />
      <MediaSlider title="Music & Musicals" genre="Musical" data={extractGenre("Musical")} />
    </div>
  );
}
