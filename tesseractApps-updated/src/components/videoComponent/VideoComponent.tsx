import "./VideoStyles.css";
import React, { useRef, useState } from "react";
import video from "../../assets/homepage-video.mp4";
const VideoComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  console.log(isHovered);
  // const [volume, setVolume] = useState(1);

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle volume change
  // const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newVolume = parseFloat(e.target.value);
  //   setVolume(newVolume);
  //   if (videoRef.current) {
  //     videoRef.current.volume = newVolume;
  //   }
  // };

  return (
    <div
      className="video-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={video}
        className="video"
        onClick={togglePlay}
      />

      {/* Hover Overlay with Play button */}
      {!isPlaying && (
        <div className="overlay">
          <div className="overlay-play-background">
            <div className="play-icon-background" onClick={togglePlay}>
              <div className="play-icon">▶</div>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      {/* <div className="controls">
        <button onClick={togglePlay}>{isPlaying ? "⏸ Pause" : "▶ Play"}</button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolume}
        />
      </div> */}
    </div>
  );
};

export default VideoComponent;
