import { Play } from "lucide-react";
import "./VideoModal.css";
const VideoThumbnailPlayButtonMobile = ({
  onClick,
  videoData,
  label = "Overview",
  marginTop,
  marginBottom,
}: {
  onClick: () => void;
  videoData: string;
  /** Accessible name of the video, e.g. "Growth Plan Overview" */
  label?: string;
  marginTop?: string;
  marginBottom?: string;
}) => {
  return (
    <button
      type="button"
      id="pr-featured-watch-mobile"
      onClick={onClick}
      aria-label={`Play ${label} video`}
      style={{
        marginTop: marginTop ? marginTop : 0,
        marginBottom: marginBottom ? marginBottom : 0,
      }}
    >
      <video
        className="pr-video-thumb-preview"
        src={videoData}
        muted
        playsInline
        preload="metadata"
        tabIndex={-1}
      />
      <div className="pr-video-thumb-overlay">
        <div className="pr-video-play-btn">
          <Play size={20} fill="currentColor" />
        </div>
        <span className="pr-video-thumb-caption">Watch overview</span>
      </div>
    </button>
  );
};

export default VideoThumbnailPlayButtonMobile;
