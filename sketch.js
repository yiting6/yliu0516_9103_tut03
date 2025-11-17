// Pacita Abad – Wheels of Fortune inspired sketch with Audio Animation
// Press 'A' to toggle animation | Press 'M' to toggle microphone

let wheels = [];
let animateWheels = true;
let bgParticles = [];
let NUM_PARTICLES = 5580;
let bgDotColors = [
  "#FFFFFF",
  "#C7EBFF",
  "#FFAEC0",
  "#FFCF70",
  "#9EE7C8",
  "#F48BFD",
  "#A7F0FF",
  "#FFC2DD"
];

// Audio analysis variables
let fft;
let mic;
let isMicOn = false;
let audioStarted = false;
let bassEnergy = 0;
let midEnergy = 0;
let trebleEnergy = 0;
let overallVolume = 0;

function setup() {
  createCanvas(windowWidth, windowHeight); // keep original
  angleMode(DEGREES);
  colorMode(RGB, 255, 255, 255, 255);
  noStroke();
  
  // background
  for (let i = 0; i < NUM_PARTICLES; i++) {
    bgParticles.push({
      x: random(width),
      y: random(height),
      r: random(3, 15),
      speedX: random(-0.4, 0.4),
      speedY: random(-0.4, 0.4),
      c: color(255, 255, 255, random(20, 120))
    });
  }

  createWheels();
}

function draw() {
  drawBackgroundTexture(); // maintain the original background of the group

  // audio analysis
  if (audioStarted && isMicOn) {
    updateAudioAnalysis();
  }

  for (let w of wheels) {
    if (animateWheels) {
      if (audioStarted && isMicOn) {
        w.updateAudio(bassEnergy, midEnergy, trebleEnergy, overallVolume);
      } else {
        w.update(); // the original update method
      }
    }
    w.display();
  }
}

function initializeAudio() {
  try {
    fft = new p5.FFT(0.8, 64);
    mic = new p5.AudioIn();
    mic.start();
    fft.setInput(mic);
    isMicOn = true;
    audioStarted = true;
    console.log("Microphone started successfully");
  } catch (error) {
    console.log("Audio initialization failed:", error);
  }
}

function updateAudioAnalysis() {
  if (isMicOn && audioStarted) {
    try {
      let spectrum = fft.analyze();
      bassEnergy = fft.getEnergy("bass");
      midEnergy = fft.getEnergy("mid"); 
      trebleEnergy = fft.getEnergy("treble");
      overallVolume = fft.getEnergy("bass", "treble");
      
      bassEnergy = map(bassEnergy, 0, 255, 0, 1);
      midEnergy = map(midEnergy, 0, 255, 0, 1);
      trebleEnergy = map(trebleEnergy, 0, 255, 0, 1);
      overallVolume = map(overallVolume, 0, 255, 0, 1);
    } catch (error) {
      console.log("Audio analysis error:", error);
    }
  }
}

// ------------------ SETUP HELPERS ------------------ //

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createWheels();   // regenerate layout for new size
}

function pickStyleDotHeavy() {
  return random() < 0.75 ? "dots" : "rays";
}

