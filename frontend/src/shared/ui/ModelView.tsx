import { ModelViewerElement } from "@google/model-viewer";
import { FC, useEffect, useRef } from "react";

type ModelViewProps = {
  src: string;
  poster?: string;
};

type CustomProgressEvent = {
  detail?: {
    totalProgress: number;
  };
};

const ModelView: FC<ModelViewProps> = ({ src, poster }) => {
  const viewerRef = useRef<ModelViewerElement | null>(null);

  const onProgress = (
    event: ProgressEvent<EventTarget> & CustomProgressEvent
  ) => {
    if (event.target instanceof HTMLElement) {
      const progressBar = event.target?.querySelector(".progress_bar");
      const updatingBar = event.target?.querySelector(".update_bar");

      if (updatingBar instanceof HTMLElement && event.detail) {
        updatingBar.style.width = `${event.detail?.totalProgress * 100}%`;
      }

      if (event.detail?.totalProgress === 1) {
        progressBar?.classList.add("hide");
      } else {
        progressBar?.classList.remove("hide");
      }
    }
  };

  useEffect(() => {
    const viewer = viewerRef.current;

    if (viewer) {
      viewer.addEventListener("progress", onProgress);

      return () => {
        viewer.removeEventListener("progress", onProgress);
      };
    }
  }, [viewerRef]);

  return (
    <model-viewer
      ref={viewerRef}
      src={src}
      style={{
        width: "100%",
        height: "100%",
      }}
      poster={poster ? poster : "/static/icons/cube.svg"}
      shadow-intensity="1"
      camera-controls
      auto-rotate
      autoplay
    >
      <div className="progress_bar hide" slot="progress-bar">
        <div className="update_bar"></div>
      </div>
    </model-viewer>
  );
};

export default ModelView;
