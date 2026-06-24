import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import "./VideoModal.css";
export default function VideoModal({
  onClose,
  videoData,
}: {
  onClose: () => void;
  videoData: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="pr-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Start Plan Overview"
    >
      <div className="pr-modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="pr-modal-close"
          onClick={onClose}
          aria-label="Close video"
        >
          <X size={20} />
        </button>
        <video
          ref={videoRef}
          className="pr-modal-video"
          src={videoData}
          controls
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
}
