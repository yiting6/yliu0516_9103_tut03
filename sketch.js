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

// ------------------ WHEEL LAYOUT ------------------ //

function createWheels() {
  wheels = [];

  let baseR = min(width, height) / 10;      // original size
  let spacingX = baseR * 2;                 
  let spacingY = baseR * sqrt(3);

  let startX = -baseR;
  let startY = -baseR;
  let endX   = width  + baseR;
  let endY   = height + baseR;

  let cols = ceil((endX - startX) / spacingX) + 1;
  let rows = ceil((endY - startY) / spacingY) + 1;

  for (let j = 0; j < rows; j++) {
    let rowOffset = (j % 2 === 0) ? 0 : spacingX / 2;

    for (let i = 0; i < cols; i++) {
      let x = startX + i * spacingX + rowOffset;
      let y = startY + j * spacingY;

      let r = baseR * random(0.75, 0.9);
      r = min(r, baseR);

      wheels.push(new Wheel(x, y, r, pickPalette()));
    }
  }
}

// ------------------ BACKGROUND ------------------ //

function drawBackgroundTexture() {
  background(4, 87, 131); // 小组原来的 teal 背景色
  noStroke();

  for (let p of bgParticles) {
    fill(p.c);
    ellipse(p.x, p.y, p.r, p.r);

    p.x += p.speedX;
    p.y += p.speedY;

    p.speedX += random(-0.02, 0.02);
    p.speedY += random(-0.02, 0.02);
    p.speedX = constrain(p.speedX, -0.5, 0.5);
    p.speedY = constrain(p.speedY, -0.5, 0.5);

    if (p.x < -10) p.x = width + 10;
    if (p.x > width + 10) p.x = -10;
    if (p.y < -10) p.y = height + 10;
    if (p.y > height + 10) p.y = -10;
  }
}

// ------------------ WHEEL CLASS ------------------ //

class Wheel {
  constructor(x, y, r, palette) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.palette = palette;

    // breathing effect
    this.pulsePhase = random(TWO_PI);
    this.pulseSpeed = random(0.1, 1);
    this.pulseAmp = random(0.05, 0.15);

    // audio response
    this.audioRotationFactor = 1.0;
    this.audioPulseFactor = 1.0;
    this.audioScaleFactor = 1.0;

    // Pattern layer
    this.layers = [
      {
        radius: this.r * 0.9,
        dotSize: this.r * random(0.1, 0.14),
        count: 30,
        angle: random(360),
        speed: random(0.4, 0.8),
        style: pickStyleDotHeavy(),
        dotColor: palette.dots1
      },
      {
        radius: this.r * 0.75,
        dotSize: this.r * 0.12,
        count: 20,
        angle: random(360),
        speed: random(-0.6, -0.3),
        style: pickStyleDotHeavy(),
        dotColor: palette.dots2
      },
      {
        radius: this.r * 0.55,
        dotSize: this.r * 0.10,
        count: 18,
        angle: random(360),
        speed: random(0.2, 0.5),
        style: pickStyleDotHeavy(),
        dotColor: palette.dots3
      }
    ];

    // internal core pattern
    this.innerPattern = {
      radius: this.r * 0.35,
      dotSize: this.r * 0.08,
      count: 30,
      angle: random(360),
      speed: random(-0.7, 0.7),
      style: random(["solid", "dots", "rays"])
    };
  }

  // update method
  update() {
    for (let layer of this.layers) {
      layer.angle += layer.speed;
    }

    if (this.innerPattern.style !== "solid") {
      this.innerPattern.angle += this.innerPattern.speed;
    }

    this.pulsePhase += this.pulseSpeed;
  }

  // audio driver update
  updateAudio(bass, mid, treble, volume) {
    // calculate the audio impact factor
    this.audioRotationFactor = 1 + volume * 1.5;
    this.audioPulseFactor = 1 + bass * 2;
    this.audioScaleFactor = 1 + mid * 0.3;

    // audio influence through rotation
    for (let layer of this.layers) {
      layer.angle += layer.speed * this.audioRotationFactor;
    }

    if (this.innerPattern.style !== "solid") {
      this.innerPattern.angle += this.innerPattern.speed * this.audioRotationFactor;
    }

    // audio influence pulses
    this.pulsePhase += this.pulseSpeed * this.audioPulseFactor;
    this.pulseAmp = 0.05 + bass * 0.2; // low-frequency enhanced pulse amplitude
  }

  // display
  display() {
    push();
    translate(this.x, this.y);

    // application of audio influence scaling
    let baseScale = 1 + sin(this.pulsePhase) * this.pulseAmp;
    let audioScale = this.audioScaleFactor;
    scale(baseScale * audioScale);

    // keep original
    fill(this.palette.outer);
    ellipse(0, 0, this.r * 2);

    fill(this.palette.ring1);
    ellipse(0, 0, this.r * 1.9);

    this.drawPatternLayer(this.layers[0]);
    fill(this.palette.ring2);
    ellipse(0, 0, this.r * 1.55);
    this.drawPatternLayer(this.layers[1]);
    this.drawPatternLayer(this.layers[2]);
    fill(this.palette.ring3);
    ellipse(0, 0, this.r * 0.95);

    push();
    rotate(this.innerPattern.angle);
    if (this.innerPattern.style === "solid") {
      fill(this.palette.inner);
      ellipse(0, 0, this.r * 0.6);
    } else if (this.innerPattern.style === "dots") {
      fill(this.palette.dots3);
      this.drawDotRing(
        this.innerPattern.radius,
        this.innerPattern.dotSize,
        this.palette.dots3,
        this.innerPattern.count
      );
      fill(this.palette.inner);
      ellipse(0, 0, this.r * 0.5);
    } else if (this.innerPattern.style === "rays") {
      this.drawRays(this.innerPattern.radius, this.palette.rays, this.innerPattern.count);
      fill(this.palette.inner);
      ellipse(0, 0, this.r * 0.5);
    }
    fill(this.palette.center);
    ellipse(0, 0, this.r * 0.32);
    fill(0);
    ellipse(0, 0, this.r * 0.12);
    pop();

    this.drawTail();
    pop();
  }

  // pattern layer
  drawPatternLayer(layer) {
    push();
    rotate(layer.angle);
    if (layer.style === "dots") {
      this.drawDotRing(layer.radius, layer.dotSize, layer.dotColor, layer.count);
    } else if (layer.style === "rays") {
      this.drawRays(layer.radius, this.palette.rays, layer.count);
    }
    pop();
  }

  drawDotRing(radius, dotSize, col, count) {
    fill(col);
    noStroke();
    for (let i = 0; i < count; i++) {
      let a = (360 / count) * i;
      let x = cos(a) * radius;
      let y = sin(a) * radius;
      ellipse(x, y, dotSize, dotSize);
    }
  }

  drawRays(radius, col, count) {
    stroke(col);
    strokeWeight(this.r * 0.05);
    noFill();
    for (let i = 0; i < count; i++) {
      let a = (360 / count) * i;
      let x1 = cos(a) * (radius * 0.4);
      let y1 = sin(a) * (radius * 0.4);
      let x2 = cos(a) * radius;
      let y2 = sin(a) * radius;
      line(x1, y1, x2, y2);
    }
    noStroke();
  }

  drawTail() {
    push();
    stroke(this.palette.tail);
    strokeWeight(this.r * 0.08);
    noFill();
    let start = createVector(0, 0);
    let ctrl = createVector(this.r * 0.7, -this.r * 0.5);
    let end = createVector(this.r * 1.2, -this.r * 0.1);
    beginShape();
    vertex(start.x, start.y);
    quadraticVertex(ctrl.x, ctrl.y, end.x, end.y);
    endShape();
    noStroke();
    pop();
  }
}

// ------------------ COLOUR PALETTES ------------------ //

function pickPalette() {
  let options = [
    {
      outer:  "#FFFFFF", ring1:  "#FF7EB6", ring2:  "#FF96BF", ring3:  "#FFB7D4",
      dots1:  "#E83432", dots2:  "#FFFFFF", dots3:  "#FF7AAE", rays:   "#FF4C8B",
      inner:  "#E92D72", center: "#000000", tail:   "#FF4F9D"
    },
    {
      outer:  "#FF9A00", ring1:  "#FFAF37", ring2:  "#FFC260", ring3:  "#FFDD9E",
      dots1:  "#E83432", dots2:  "#FF81B9", dots3:  "#FF507C", rays:   "#E83432",
      inner:  "#FF4D84", center: "#000000", tail:   "#FF4F9D"
    },
    // ... palettes
    {
      outer:  "#FDC54C", ring1:  "#F275BD", ring2:  "#C964C5", ring3:  "#66A4C0",
      dots1:  "#C76A00", dots2:  "#FDC54C", dots3:  "#EF75D1", rays:   "#C76A00",
      inner:  "#9ECCE0", center: "#000000", tail:   "#FF4F9D"
    }
  ];
  return random(options);
}

// ------------------ INPUT ------------------ //

function keyPressed() {
  if (key === 'a' || key === 'A') {
    animateWheels = !animateWheels;
  }
  
  if (key === 'm' || key === 'M') {
    if (!audioStarted) {
      initializeAudio();
    } else {
      isMicOn = !isMicOn;
    }
  }
}
