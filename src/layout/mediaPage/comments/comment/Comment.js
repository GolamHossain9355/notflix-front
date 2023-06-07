import { useAuth } from '../../../../contexts/AuthContext';
import profileImages from '../../../../data/profileImages';
import { deleteComment, getComments } from '../../../../utils/api';
import './comment.css';

export default function Comment ({ comment, mediaId, setComments, stars }) {
  const { currentUser } = useAuth();

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
    <div className="comment">

      <div className="comment__info-grid">
        <img
          className="comment__user-icon"
          alt="User Icon"
          src={profileImages[Number(comment.user_image)].img}
        />
        <div className="comment__user-name">{comment.display_name}</div>
        <div className="comment__rating">{stars(comment.rating)}</div>
        <div className="comment__date">{comment.date}</div>
      </div>

      <div className="comment__body">" {comment.body} "</div>

      <div className="comment__remove">
        {comment.user_id === currentUser.uid && (
          <button
            onClick={() => handleDelete(comment.comment_id)}
            className="comment__delete">
            Delete
          </button>
        )}
      </div>
    </div>
  )
}