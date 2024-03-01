import { ModelViewerElement } from "@google/model-viewer";
import { ForwardedRef, forwardRef, useEffect } from "react";

type ModelPreviewProps = {
  src: string;
  poster?: string;
  rendered: boolean;
  setRendered: (bool: boolean) => void;
};

type CustomProgressEvent = {
  detail?: {
    totalProgress: number;
  };
};

const ModelPreview = forwardRef<ModelViewerElement, ModelPreviewProps>(
  (
    { src, poster = "", rendered, setRendered },
    ref: ForwardedRef<ModelViewerElement>
  ) => {
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
      if (!rendered) {
        setRendered(true);
      }
    }, []);

    useEffect(() => {
      if (rendered && ref && "current" in ref) {
        const viewer = ref.current;

        if (viewer) {
          viewer.addEventListener("progress", onProgress);

          return () => {
            viewer.removeEventListener("progress", onProgress);
          };
        }
      }
    }, [rendered]);

    return (
      <model-viewer
        ref={ref}
        src={src}
        poster={poster}
        style={{ width: "100%", height: "450px" }}
      >
        <div className="progress_bar hide" slot="progress-bar">
          <div className="update_bar"></div>
        </div>
      </model-viewer>
    );
  }
);

export default ModelPreview;
