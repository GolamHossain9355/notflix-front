import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMedia, getComments } from "../../utils/api";
import BookmarkButton from "../components/bookmarkButton/BookmarkButton";
import Comments from "./comments/Comments";
import Loading from "../components/loading/Loading";
import "./mediaPage.css";

export default function MediaPage() {
  const [comments, setComments] = useState([]);
  const [media, setMedia ] = useState([])
  const { mediaId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    
    getMedia(abortController.signal, mediaId)
      .then((response) => setMedia(response.data))
      .catch(console.log);

    getComments({
      mediaId,
      signal: abortController.signal,
    })
      .then((response) => setComments(response.data))
      .catch(console.log);

    return () => abortController.abort();
  }, [mediaId]);

  const stars = (num) => {
    let rating = [];

    for (let i = 0; i < num; i++) {
      rating.push(
        <FontAwesomeIcon icon={faStar} fixedWidth key={i} className="star-full"/>
      );
    }

    if (rating.length !== 5) {
      for (let i = 5 - rating.length; i > 0; i--) {
        rating.push(
          <FontAwesomeIcon icon={faStar} fixedWidth key={i} className="star-empty"/>
        );
      }
    }

    return rating;
  };

  return (
    <div>
      {media.length === 0 ? (
        <Loading size="100" ht="100vh" />
      ) : (
        <>
          <div className="media-page__display-media">
            <div className="media-page__main-grid">
              <img src={media.image} className="media-page__image" alt={media.title}/>
              <div className="media-page__sub-grid">
                <div className="media-page__head">
                  <h1 className="media-page__title">{`${media.title}`}</h1>
                  <ul className="media-page__info">
                    <li>{media.year_released}</li>
                    <li>-</li>
                    <li>{media.content_rating}</li>
                    <li>-</li>
                    <li>{media.runtime}</li>
                  </ul>
                  <div>
                    {stars(comments
                        .map((data) => data.rating)
                        .reduce((total, current) => total + current, 0) / comments.length
                    )}
                  </div>
                  <BookmarkButton mediaId={mediaId}/>
                </div>
                  <div className="red-line" />
                <div>
                  <h2 className="media-page__sub-title">Summary -</h2>
                  <article className="media-page__summery">
                    {media.summery}
                  </article>
                </div>
                <div className="media-page__sub-content--wrapper">
                  <section>
                    <h2 className="media-page__sub-title">Notable Crew -</h2>
                    <ul className="media-page__sub-content--list">
                      {media.cast.split(", ").map((member, i) => {
                        return (
                          <li className="media-page__sub-content--item" key={i}>
                            <a
                              className="wiki-link"
                              href={`https://wikipedia.org/wiki/${member
                                .split(" ")
                                .join("_")}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              {member}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </section>

                  <section>
                    <h2 className="media-page__sub-title">Critics -</h2>
                    <ul className="media-page__sub-content--list">
                      <li className="media-page__sub-content--item">
                        Metacritic -{" "}
                        {media.metacritic_rating ||
                          "Rating Not Available"}
                      </li>
                      <li className="media-page__sub-content--item">
                        Imdb - {media.imDb_rating}
                      </li>
                    </ul>
                  </section>
                </div>
              </div>
            </div>
            <div className="media-page__genres--wrapper">
              {media.genres.split(", ").map((genre, i) => {
                return (
                  <a
                    href={`/genre/${genre}`}
                    className="media-page__genre"
                    key={i}
                  >
                    {genre}
                  </a>
                );
              })}
            </div>
            <div className="red-line" />
          </div>
          <Comments
            mediaId={mediaId}
            data={comments}
            stars={stars}
            setComments={setComments}
          />
        </>
      )}
    </div>
  );
}