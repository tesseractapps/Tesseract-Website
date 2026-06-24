import { Play } from "lucide-react";
import "./VideoModal.css";
const VideoThumbnailPlayButton = ({
  onClick,
  videoData,
  marginTop,
  marginBottom,
  center,
}: {
  onClick: () => void;
  videoData: string;
  marginTop?: string;
  marginBottom?: string;
  center?: boolean;
}) => {
  return (
    <button
      type="button"
      id="pr-featured-header-video"
      className={center ? "pr-featured-header-video-center" : ""}
      onClick={onClick}
      aria-label="Play Start Plan Overview video"
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
          <Play size={22} fill="currentColor" />
        </div>
        <span className="pr-video-thumb-caption">Watch overview</span>
      </div>
    </button>
  );
};

export default VideoThumbnailPlayButton;
