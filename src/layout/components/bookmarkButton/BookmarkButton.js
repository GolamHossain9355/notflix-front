import { useEffect, useState } from "react";
import { createBookmark, deleteBookmark, getBookmarksWithoutMediaData } from "../../../utils/api";
import { useAuth } from "../../../contexts/AuthContext";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bookmarkButton.css";

export default function BookmarkButton({ mediaId }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const abortController = new AbortController();

    getBookmarksWithoutMediaData({
      userId: currentUser.uid,
      signal: abortController.signal,
    })
      .then((response) => {
        setBookmarks(response.data);
      })
      .catch(console.error);

    return () => abortController.abort();
  }, [currentUser.uid]);

  const handleClick = async (e) => {
    e.stopPropagation();
    const abortController = new AbortController();
    try {
      if (isBookmarked) {
        await deleteBookmark({
          user_id: currentUser.uid,
          media_id: mediaId,
        });

        const response = await getBookmarksWithoutMediaData({
          userId: currentUser.uid,
          signal: abortController.signal,
        });

        setBookmarks(response.data);
        setIsBookmarked(false);

      } else {
        await createBookmark({
          user_id: currentUser.uid,
          media_id: mediaId,
        });

        const response = await getBookmarksWithoutMediaData({
          userId: currentUser.uid,
          signal: abortController.signal,
        });

        setBookmarks(response.data);
        setIsBookmarked(true);
        
      }
    } catch (err) {
      console.error(err);
    };

    return () => abortController.abort();
  };

  if (bookmarks.some((bookmark) => bookmark.media_id === Number(mediaId) && isBookmarked !== true)) setIsBookmarked(true);

  return (
    <FontAwesomeIcon
      className={`bookmark-button ${isBookmarked ? "bookmarked" : ""}`}
      icon={faBookBookmark}
      onClick={(e) => handleClick(e)}/>
  );
}