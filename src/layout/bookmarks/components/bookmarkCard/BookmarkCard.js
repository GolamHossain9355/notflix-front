import { useNavigate } from "react-router-dom";
import "./bookmarkCard.css";

export default function BookmarkCard({ bookmark, index, handleDelete, currentUser }) {
  const navigate = useNavigate();

  return (
    <div
      className="bookmarks__bookmark"
      onClick={() => navigate(`/media/${bookmark.media_id}`)}
    >
      <div className="bookmarks_bookmark--remove-button--wrapper">
        <button
          onClick={(event) => {
            event.stopPropagation();
            handleDelete(currentUser.uid, bookmark.media_id);
          }}
          className="bookmarks_bookmark--remove-button"
        >
          X
        </button>
      </div>

      <div className="bookmark__grid">
        <div className="bookmarks_bookmark--title">{bookmark.title}</div>
        <div className="bookmarks_bookmark--info">
          {bookmark.content_rating} - {bookmark.year_released.slice(0, 4)} -{" "}
          {bookmark.imDb_rating}
        </div>
      </div>

      <img
        src={bookmark.image}
        alt={bookmark.title}
        className={`bookmarks__bookmark--image`}
        loading="lazy"
      />
    </div>
  );
}
