import { useState, useEffect } from 'react';
import { deleteBookmark,  getBookmarksWithMediaData } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../components/loading/Loading';
import './bookmarks.css';

export default function Bookmarks() {
  const [ bookmarks, setBookmarks ] = useState([]);
  const [ genres, setGenres ] = useState([])
  const [ show, setShow ]= useState("all");
  const [ refresh, setRefresh ] = useState(true);
  const { currentUser } = useAuth();
  
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

  const handleSort = (event) => {
    if(event.target.value === "") return;
    let result;

    // Sort by Year Released
    if(event.target.value === "yearAsc") result = bookmarks.sort((a,b)=> b.year_released.slice(0, 4) - a.year_released.slice(0, 4));
    if(event.target.value === "yearDesc") result = bookmarks.sort((a,b)=> a.year_released.slice(0, 4) - b.year_released.slice(0, 4));

    // Sort Alphabetically
    if (event.target.value === "alphabeticalDesc") {
      result = bookmarks.sort((a,b)=> {
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        return 0;
      });
    }
    if (event.target.value === "alphabeticalAsc") {
      result = bookmarks.sort((a,b)=> {
        if(a.title < b.title) return 1;
        if(a.title > b.title) return -1;
        return 0;
      });
    }

    // Sort by Imdb Rating
    if(event.target.value === "imdbAsc") result = bookmarks.sort((a,b)=> Number(b.imDb_rating) - Number(a.imDb_rating));
    if(event.target.value === "imdbDesc") result = bookmarks.sort((a,b)=> Number(a.imDb_rating) - Number(b.imDb_rating));

    setBookmarks(result);
    setRefresh(!refresh);
  }

  return (
    <div className="bookmarks__wrapper">
      {bookmarks.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <div className="bookmarks__controls">

            <label htmlFor="sort">Show:</label>
            <select className="bookmarks__controls--sort" name="sort" id="sort" onChange={(event) => setShow(event.target.value)}>
              <option value="all">All</option>
              {genres.map((genre, i)=>{
                return ( <option key={i} value={genre}>{genre}</option> )
              })}
            </select>

            <label htmlFor="sort">Sort:</label>
            <select className="bookmarks__controls--sort" name="sort" id="sort" onChange={handleSort}>
              <option value="">Select an Option</option>
              <option value="alphabeticalAsc">{`Alphabetical (Asc)`}</option>
              <option value="alphabeticalDesc">{`Alphabetical (Dsc)`}</option>
              <option value="imdbAsc">{`Imdb Rating (Asc)`}</option>
              <option value="imdbDesc">{`Imdb Rating (Dsc)`}</option>
              <option value="yearAsc">{`Year Released (Asc)`}</option>
              <option value="yearDesc">{`Year Released (Dsc)`}</option>
            </select>
          </div>

          <div className="bookmarks__cards">
            {bookmarks.map((bookmark, i) => {
              if (show === "all" || bookmark.genres.includes(show)) {
                return (
                  <div key={i} className="bookmarks__bookmark">
                    <div className="bookmarks_bookmark--title">{bookmark.title}</div>
                    <div className="bookmarks_bookmark--date">{bookmark.content_rating} - {bookmark.year_released.slice(0, 4)}</div>
                    <a href={`/media/${bookmark.media_id}`}><img src={bookmark.image} alt={bookmark.title} className="bookmarks__bookmark--image"/></a>
                    <button onClick={()=> handleDelete(currentUser.uid, bookmark.media_id)} className="bookmarks_bookmark--remove-button">Delete</button>
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