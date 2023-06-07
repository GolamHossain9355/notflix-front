import { useRef, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createComment, getComments } from "../../../utils/api";
import Comment from "./comment/Comment";
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
            <Comment
              key={comment.cid}
              comment={comment}
              mediaId={mediaId}
              setComments={setComments}
              stars={stars}
            />
          );
        })}
      </div>

    </div>
  );
}