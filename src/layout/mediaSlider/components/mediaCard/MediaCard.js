import "./mediaCard.css";

export default function MediaCard({ media }){


  return (
    <div className="media-slider__card">
      <a
        href={`/media/${media.media_id}`}
      >
        <img
            src={media.image}
            className="media-slider__card--image"
            alt={media.title}
            loading="lazy"
        />
      </a>
    </div>
  )
}