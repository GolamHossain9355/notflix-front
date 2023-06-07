import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./searchBar.css";
import "../genrePage/genrePage.css";
import Loading from "../components/loading/Loading";
import { listMediaBySearchWord } from "../../utils/api";

export default function SearchBar() {
  const [foundMedia, setFoundMedia] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    setFoundMedia([]);
    const abortcontroller = new AbortController();

    if (searchWord.length === 0) return setFoundMedia([]);

    async function loadFoundMedia() {
      try {
        const response = await listMediaBySearchWord({
          searchWord: searchWord,
          limit: 12,
          signal: abortcontroller.signal,
        });
        if (response.data.length) setFoundMedia(response.data);
        else if (!response.data.length && searchWord.length > 0) setFoundMedia(["empty"])
      } catch (e) {
        console.error(e);
      }
    }
    setTimeout(() => {
      loadFoundMedia();
    }, 500);

    return () => abortcontroller.abort();
  }, [searchWord]);

  return (
    <>
      <div className="search-bar">
        <div>
          <input
            className="search-bar__input"
            type="text"
            id="searchBar"
            onChange={(event) => setSearchWord(event.target.value)}
            autoComplete="off"
            />
          <div className="search-bar__submit">
            <FontAwesomeIcon className="search-bar__icon" icon={faMagnifyingGlass} />
          </div>
        </div>
      </div>

      <div className="genre-page__wrapper">
        {foundMedia.length === 0 && searchWord.length ? (
          <Loading size="90" />
        ) : (
          <div>
            <div className="genre-page__media--grid">
              { foundMedia[0] !== "empty" &&
                  foundMedia?.map((media, i) => {
                    return (
                      <div className="genre-page__media" key={i}>
                        <a href={`/media/${media.media_id}`}>
                          <img src={media.image} className="genre-page__media--image" alt={media.title} />
                        </a>
                      </div>
                    )})
              }
            </div>
          </div>
        )}
      </div>
      {foundMedia[0] === "empty" &&
        <div className="no-results">Your search returned no results.</div>
      }
    </>
  );
}