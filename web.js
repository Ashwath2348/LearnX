const video = document.getElementById("webcam");
const canvas = document.getElementById("captureCanvas");
const context = canvas.getContext("2d");

captureBtn.addEventListener("click", async () => {
  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;

  // Set canvas size dynamically just in case
  canvas.width = videoWidth;
  canvas.height = videoHeight;

  // Draw the current video frame to canvas
  context.drawImage(video, 0, 0, videoWidth, videoHeight);

  // Analyze the canvas image for expressions
  const detections = await faceapi
    .detectSingleFace(canvas)
    .withFaceExpressions();

  if (detections) {
    const expressions = detections.expressions;
    let mood = 'default';
    let max = 0;

    for (const [expression, confidence] of Object.entries(expressions)) {
      if (confidence > max) {
        max = confidence;
        mood = expression;
      }
    }

    quoteBox.textContent = quotes[mood] || quotes.default;
  } else {
    quoteBox.textContent = "No face detected. Try again!";
  }
});
