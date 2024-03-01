import { ModelViewerElement } from "@google/model-viewer";

async function posterCreator(modelViewer: ModelViewerElement) {
  modelViewer.pause();
  modelViewer.currentTime = 0;

  const cameraOrbit = modelViewer.cameraOrbit;
  modelViewer.cameraOrbit = ""; //null
  modelViewer.cameraOrbit = cameraOrbit;
  modelViewer.autoRotate = false;
  modelViewer.interactionPrompt = "none";
  modelViewer.resetTurntableRotation();
  modelViewer.jumpCameraToGoal();

  await new Promise<void>((resolve) =>
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    })
  );

  const posterBlob = await modelViewer.toBlob({
    idealAspect: true,
    mimeType: "image/webp",
    qualityArgument: 0.85,
  });

  modelViewer.play();
  modelViewer.autoRotate = true;
  modelViewer.interactionPrompt = "auto";
  modelViewer.play();
  modelViewer.autoRotate = true;
  modelViewer.interactionPrompt = "auto";

  const file = new File([posterBlob], "poster.webp");
  return file;
}

export default posterCreator;
