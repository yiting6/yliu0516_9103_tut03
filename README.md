# 🎵 Pacita Abad - Wheels of Fortune Audio-Driven Animation

## 🎮 Interaction Guide

**Keyboard Controls:**
- **A Key**: Toggle all animations ON/OFF
- **M Key**: Start/Stop microphone input

**First Time Setup:**
- Click the canvas to allow microphone permissions
- Play music or speak to see audio-driven animations

## 🎨 Animation Method

**Audio-Driven Animation Approach:**
I implemented real-time audio analysis to create dynamic visual responses. The artwork listens to environmental sounds and transforms them into animated patterns.

## ✨ Visual Response System

**Frequency Mapping:**
- **Bass Frequencies** → Wheel rotation speed and pulsation
- **Mid Frequencies** → Size scaling and layer movement  
- **Treble Frequencies** → Color shifts and ray thickness

**Real-time Features:**
- 64-band frequency analysis
- Smooth audio transitions
- Individual wheel sensitivity
- Multi-layer visual responses

## 🔄 Unique Differentiators

**Compared to Group Members:**
- **Input Source**: Live microphone audio vs. time/mouse/random
- **Response Type**: Organic frequency analysis vs. programmed patterns
- **Interaction**: Environmental sound response vs. direct user control

## 🛠️ Technical Implementation

**Core Components:**
```javascript
// Audio analysis system
fft = new p5.FFT(0.8, 64);
mic = new p5.AudioIn();
wheel.updateAudio(bass, mid, treble);
```

**Enhanced Features:**
- Multi-band frequency processing
- HSL color transformations  
- Performance optimization
- Responsive canvas design

## 📁 Code Enhancements

**Added to Group Foundation:**
- Audio system initialization
- Real-time spectrum analysis
- Individual wheel audio response
- Interactive control system

## 🎯 Creative Vision

This project transforms Pacita Abad's geometric patterns into a living soundscape. Each wheel acts as an auditory receptor, creating a visual orchestra that dances with environmental sounds.

## 🔗 References

**Technical Credits:**
- p5.js Sound Library
- Web Audio API
- FFT Analysis techniques
- Team foundation code

**Experience Tip:** Try different music genres to discover unique visual patterns!