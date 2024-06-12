// import { ModelViewerElement } from "@google/model-viewer";
import { CSSProperties, MutableRefObject, ReactNode } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // "model-viewer": Partial<ModelViewerElement>;
      "model-viewer": ModelViewerElementAttributes;
    }

    interface ModelViewerElementAttributes {
      "ios-src"?: string;
      "camera-controls"?: boolean;
      "shadow-intensity"?: string;
      "auto-rotate"?: boolean;
      children?: (false | Element)[] | ReactNode;
      style: CSSProperties;
      ref?: MutableRefObject;
      src: string;
      poster?: string;
      ar?: boolean;
      id?: string;
      alt?: string;
      autoplay?: boolean;
    }
  }
}
