async function captureImage() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageUrl = canvas.toDataURL();
  capturedPhoto.src = imageUrl;
  capturedPhoto.style.display = "block";

  // Analyze mood
  const mood = await analyzeMood(canvas);
  document.getElementById("moodInput").value = mood;
}

async function analyzeMood(canvas) {
  // Load the model
  const model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
  );

  // Detect faces
  const predictions = await model.estimateFaces({
    input: canvas,
    returnTensors: false,
    flipHorizontal: false,
  });

  if (predictions.length === 0) {
    return "No face detected";
  }

  // Simple mood detection (demo only)
  const keyPoints = predictions[0].scaledMesh;
  const mouthOpen = keyPoints[13][1] - keyPoints[14][1]; // Vertical distance between lips
  const eyebrowRaise = keyPoints[159][1] - keyPoints[386][1]; // Eyebrow position

  if (mouthOpen > 10) return "happy";
  else if (eyebrowRaise < -5) return "sad";
  else if (eyebrowRaise > 5) return "surprised";
  else return "neutral";
}
