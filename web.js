const video = document.getElementById("webcam");
const captureButton = document.getElementById("captureButton");
const quoteBox = document.getElementById("quote-box");
const moodInput = document.getElementById("moodInput");
const introScreen = document.getElementById("introScreen");
const mainContent = document.getElementById("mainContent");
const capturedPhoto = document.getElementById("capturedPhoto");

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    alert("Please allow webcam access to proceed.");
    console.error("Webcam error:", err);
  });

const quotes = {
  happy: "That's great! Keep the energy going! 😊",
  sad: "It's okay to feel sad. Brighter days are ahead 🌈",
  tired: "Rest is productive too. Recharge and rise again. 🔋",
  anxious: "You’ve got this — one breath at a time. 💚",
  motivated: "That fire inside you? Let it blaze! 🔥",
  default: "Whatever your mood — you're stronger than you know 💪"
};

// Capture button functionality to trigger photo capture and analysis
captureButton.addEventListener('click', async () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Set canvas size to video size
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw the current video frame onto the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert canvas to base64 PNG
  const imageDataUrl = canvas.toDataURL("image/png");

  // Display the captured photo in the photo box
  capturedPhoto.src = imageDataUrl;
  capturedPhoto.style.display = 'block'; // Ensure it's visible after capture

  // Send the captured image to the Face API for emotion analysis
  const mood = await analyzeMood(imageDataUrl);

  // Display the motivational quote based on the detected mood
  displayMoodQuote(mood);
});

// Function to analyze the mood from the captured image
async function analyzeMood(imageDataUrl) {
  const response = await fetch("https://<your-region>.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion", {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": "<YOUR_FACE_API_KEY>",
      "Content-Type": "application/octet-stream"
    },
    body: makeBlobFromBase64(imageDataUrl)
  });

  const data = await response.json();
  if (data.length > 0) {
    const emotions = data[0].faceAttributes.emotion;
    const topEmotion = Object.entries(emotions).sort((a, b) => b[1] - a[1])[0][0];
    return topEmotion; // Return the most dominant emotion
  }
  return "neutral"; // If no emotion is detected
}

// Helper function to convert base64 string to Blob for API call
function makeBlobFromBase64(dataURL) {
  const byteString = atob(dataURL.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new Blob([ab], { type: 'image/png' });
}

// Display the motivational quote based on detected mood
function displayMoodQuote(mood) {
  const quotes = {
    happy: "That's great! Keep the energy going! 😊",
    sad: "It's okay to feel sad. Brighter days are ahead 🌈",
    angry: "Take a deep breath. You’ve got this! 💪",
    surprised: "Wow! What a moment! 🌟",
    neutral: "Whatever your mood — you're stronger than you know 💪"
  };

  // Set the quote based on the detected mood
  quoteBox.textContent = quotes[mood] || quotes["neutral"];

  // Optionally, transition to the main content after a brief pause
  setTimeout(() => {
    introScreen.style.display = "none";
    mainContent.style.display = "block";
  }, 3000); // Delay 3 seconds before transitioning to the main content
}

