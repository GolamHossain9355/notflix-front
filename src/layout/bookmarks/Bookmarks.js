import { useState, useEffect } from 'react';
import { deleteBookmark,  getBookmarksWithMediaData } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../components/loading/Loading';
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import './bookmarks.css';

export default function Bookmarks() {
  const [ bookmarks, setBookmarks ] = useState([]);
  const [ genres, setGenres ] = useState([])
  const [ show, setShow ]= useState("all");
  const [ refresh, setRefresh ] = useState(true);
  const [ arrow, setArrow ] = useState(true);
  const [ sortState, setSortState ] = useState("");
  const { currentUser } = useAuth();
  const [ hovering, setHovering ] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const abortController = new AbortController();
    getBookmarksWithMediaData({
      userId: currentUser.uid,
      signal: abortController.signal,
    })
    .then((response) => {
      setBookmarks(response.data);
    })
    .catch(console.error);
    return () => abortController.abort();
  }, [currentUser.uid]);
  // Find all genres included in the users bookmarks and set them to the genres state.
  if (bookmarks.length && !genres.length) {
    let result = [];
    bookmarks.forEach((bookmark) => {
      let current = bookmark.genres.split(", ")
      current.forEach((genre)=> {
        if (!result.includes(genre)) result.push(genre);
      })
    });
    setGenres(result);
  }
  
  const handleDelete = async (cid, mediaId) => {
    const abortController = new AbortController();
    try {
      await deleteBookmark({
        user_id: cid,
        media_id: mediaId,
        signal: abortController.signal,
      });

      const response = await getBookmarksWithMediaData({
        userId: currentUser.uid,
        signal: abortController.signal,
      })
      setBookmarks(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleSort = (sortType, direction) => {
    setSortState(sortType)
    let result;
    if(direction) {
      // Sort by Year Released
      if(sortType === "year") result = bookmarks.sort((a,b)=> b.year_released.slice(0, 4) - a.year_released.slice(0, 4));
      // Sort Alphabetically
      if (sortType === "alphabetical") {
        result = bookmarks.sort((a,b)=> {
          if(a.title < b.title) return -1;
          if(a.title > b.title) return 1;
          return 0;
        });
      }
      // Sort by Imdb Rating
      if(sortType === "imdb") result = bookmarks.sort((a,b)=> Number(b.imDb_rating) - Number(a.imDb_rating));
    } else {
      // Sort by Year Released
      if(sortType === "year") result = bookmarks.sort((a,b)=> a.year_released.slice(0, 4) - b.year_released.slice(0, 4));
      // Sort Alphabetically
      if (sortType === "alphabetical") {
            result = bookmarks.sort((a,b)=> {
              if(a.title < b.title) return 1;
              if(a.title > b.title) return -1;
              return 0;
            });
          }
      // Sort by Imdb Rating
      if(sortType === "imdb") result = bookmarks.sort((a,b)=> Number(a.imDb_rating) - Number(b.imDb_rating));
    }
    setBookmarks(result);
    setRefresh(!refresh);
  }

  const handleArrowClick = () => {
    if(sortState !== "") handleSort(sortState, !arrow);
    setArrow(!arrow);
  }

  return (
    <div className="bookmarks__wrapper">
      {bookmarks.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <div className="bookmarks__controls">

            <label htmlFor="genres"/>
            <select tabIndex={0} className="bookmarks__controls--sort" defaultValue={""} name="sort" id="sort" onChange={(event) => setShow(event.target.value)}>
            <option disabled={true} value="">Genres</option>
              <option value="all">All</option>
              {genres.map((genre, i)=>{
                return ( <option key={i} value={genre}>{genre}</option> )
              })}
            </select>

            <label htmlFor="sort"/>
            <select className="bookmarks__controls--sort" defaultValue={""} name="sort" id="sort" onChange={(event) => event.target.value !== "" ? handleSort(event.target.value, arrow) : null}>
              <option disabled={true} value="">Sort By</option>
              <option value="alphabetical">{`Alphabetical`}</option>
              <option value="imdb">{`Imdb Rating`}</option>
              <option value="year">{`Year Released`}</option>
            </select>

            <div className="arrow-button__wrapper">
              <button  className={`${arrow ? "arrow-up" : "arrow-down"} arrow-button`} onClick={handleArrowClick}>
                <FontAwesomeIcon icon={faArrowUp}/>
              </button>
            </div>
          </div>

          <div className="bookmarks__card-deck">
            {bookmarks.map((bookmark, i) => {
              if (show === "all" || bookmark.genres.includes(show)) {
                return (
                  <div key={i}
                    className="bookmarks__bookmark"
                    onClick={()=> navigate(`/media/${bookmark.media_id}`)}
                    onMouseOver={() => setHovering(i)}
                    onMouseOut={() => setHovering(null)}
                  >
                    <div className="bookmark__grid">
                      <div className="bookmarks_bookmark--title">{bookmark.title}</div>
                      <div className="bookmarks_bookmark--info">{bookmark.content_rating} - {bookmark.year_released.slice(0, 4)} - {bookmark.imDb_rating}</div>
                      <button onClick={(event)=> {
                          event.stopPropagation()
                          handleDelete(currentUser.uid, bookmark.media_id)
                        }} className="bookmarks_bookmark--remove-button">Delete</button>
                    </div>
                    <img src={bookmark.image} alt={bookmark.title} className={`bookmarks__bookmark--image ${hovering === i ? "lighten-image" : ""}`}/>
                  </div>
                )} else { 
                  return null;
                }
            })}
          </div>
        </div>
      )}
    </div>
  );
}