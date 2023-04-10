import { useRef, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createComment, deleteComment, getComments } from "../../../utils/api";
import profileImages from "../../../data/profileImages";
import "./comments.css";

export default function Comments({ mediaId, data, stars, setComments }) {
  const [rating, setRating] = useState(5);
  const { currentUser } = useAuth();
  const newCommentRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();

    try {
      await createComment({
        media_id: mediaId,
        user_id: currentUser.uid,
        display_name: currentUser.displayName,
        user_image: currentUser.photoURL,
        body: newCommentRef.current.value,
        rating: rating,
        signal: abortController.signal,
      });

      const response = await getComments({
        mediaId,
        signal: abortController.signal,
      });
      setComments(response.data);
    } catch (err) {
      console.error(err);
    }
    newCommentRef.current.value = "";
    setRating(5);
    return () => abortController.abort();
  };

  // starButtons creates user rating controller
  const starButtons = [];
  for (let i = 1; i <= 5; i++) {
    starButtons.push(
      <button
        key={i}
        type="button"
        onClick={() => setRating(i)}
        className={`star-button ${rating >= i ? "star-full" : "star-empty"}`}
      >
        <FontAwesomeIcon icon={faStar} fixedWidth />
      </button>
    );
  }

  const handleDelete = async (cid) => {
    const abortController = new AbortController();
    try {
      await deleteComment({
        media_id: mediaId,
        comment_id: cid,
        signal: abortController.signal,
      });
      const response = await getComments({
        mediaId,
        signal: abortController.signal,
      });
      setComments({ type: "setComments", payload: response.data});
    } catch (err) {
      console.error(err);
    }
    return () => abortController.abort();
  };

  return (
    <div className="comments__wrapper">
      <div className="">
        <form onSubmit={submitHandler} className="new-comment__form">
          <div>
            <label className="new-comment__label">New Comment</label>
            <div className="red-line"/>
            <textarea
              className="new-comment__input"
              type="text"
              name="newComment"
              id="newComment"
              rows="3"
              ref={newCommentRef}
              required
            />
          </div>
          <div className="new-comment__form-buttons">
            {starButtons}{" "}
            <button className="new-comment__submit" type="submit">
              save
            </button>
          </div>
        </form>
      </div>

      <div className="comments__comments-display">
        {data.map((comment, i) => {
          return (
            <div key={i} className="comment">
              <img
                className="comment__user-icon"
                alt="User Icon"
                src={profileImages[Number(comment.user_image)].img}
              />

              <div className="comment__info-wrapper">
                <div className="comment__user-name">{comment.display_name}</div>
                <div className="comment__rating">{stars(comment.rating)}</div>
                <div className="comment__date">{comment.date}</div>
              </div>

              <div className="comment__body span-2">" {comment.body} "</div>

              <div className="comment__remove">
                {comment.user_id === currentUser.uid && (
                  <button
                    onClick={() => handleDelete(comment.comment_id)}
                    className="new-comment__submit delete">
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}