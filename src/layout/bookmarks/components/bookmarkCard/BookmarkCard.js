import { useNavigate } from "react-router-dom";
import "./bookmarkCard.css";

export default function BookmarkCard({
  bookmark,
  index,
  setHovering,
  handleDelete,
  hovering,
  currentUser,
}) {
  const navigate = useNavigate();
  console.log(index)

  return (
    <div
      className="bookmarks__bookmark"
      onClick={() => navigate(`/media/${bookmark.media_id}`)}
      onMouseOver={() => setHovering(index)}
      onMouseOut={() => setHovering(null)}
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
        className={`bookmarks__bookmark--image ${
          hovering === index ? "lighten-image" : ""
        }`}
      />
    </div>
  );
}
