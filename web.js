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

// Capture button functionality
captureButton.addEventListener('click', () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Set the canvas dimensions to the video size
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw the current video frame to the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert the canvas image to a data URL
  const photoDataUrl = canvas.toDataURL();

  // Display the captured photo in the photo box
  capturedPhoto.src = photoDataUrl;
  capturedPhoto.style.display = 'block'; // Ensure it's visible after capture
});

// Mood motivation based on the input
function showMotivation() {
  const mood = moodInput.value.toLowerCase().trim();
  const message = quotes[mood] || quotes["default"];
  quoteBox.textContent = message;

  setTimeout(() => {
    introScreen.style.display = "none";
    mainContent.style.display = "block";
  }, 3000); // show main site after 3 seconds
}
