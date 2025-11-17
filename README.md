# yliu0516_9103_tut03
Creative coding major project

# 🎵 Pacita Abad - Wheels of Fortune Audio-Driven Animation

## 🎮 Interaction Guide

| Key | Function | Status Indicator |
|-----|----------|------------------|
| **A** | Toggle ALL animations | Visual feedback on wheel movement |
| **M** | Start/Stop microphone | Audio visualization appears |
| **Click** | Allow microphone access | Browser permission dialog |

**Pro Tip:** Play music or speak into your microphone to see real-time visual responses!

## 🎨 Animation Method: Audio-Driven

I chose **Audio-Driven Animation** to create a living artwork that responds to environmental sounds. The piece uses real-time audio analysis to transform sound into visual poetry.

## ✨ Visual Response System

### 🎵 Frequency Mapping
| Frequency Range | Visual Effect | Color Response |
|-----------------|---------------|----------------|
| **Bass** (20-140Hz) | Wheel pulsation & rotation speed | 🔴 Deep red accents |
| **Mid** (140-2600Hz) | Size scaling & layer movement | 🟢 Green spectrum shifts |
| **Treble** (2600-20000Hz) | Ray thickness & fine details | 🔵 Blue highlight variations |

### 🎛️ Dynamic Properties
- **Real-time FFT analysis** - 64 frequency bins
- **Smooth audio transitions** - No visual jumps
- **Individual wheel sensitivity** - Unique responses per wheel
- **Multi-layer animation** - Dots, rays, and cores move independently

## 🔄 Unique Differentiators

| Aspect | My Audio Approach | Other Methods |
|--------|-------------------|---------------|
| **Input Source** | Microphone/environment | Time counters / Mouse / Random |
| **Response Type** | Live frequency analysis | Pre-programmed patterns |
| **Visual Dynamics** | Organic, music-driven | Mechanical / User-controlled |
| **Engagement** | Passive environmental | Active interaction |

## 🛠️ Technical Architecture

### Core Components
    // Audio Analysis Engine
fft = new p5.FFT(0.8, 64);        // Smooth frequency analysis
mic = new p5.AudioIn();           // Live audio input
wheel.updateAudio(bass, mid, high); // Per-wheel audio processing

### Enhanced Features

🔊 Multi-band EQ Response - Separate bass/mid/treble handling
🎨 HSL Color Transforms - Dynamic hue shifting
⚡ Performance Optimized - Efficient real-time processing
📱 Responsive Design - Works on all screen sizes

## 📁 Code Enhancements

Built upon group foundation with:

initializeAudio() - Complete audio pipeline setup
updateAudioAnalysis() - Real-time spectrum processing
Wheel.updateAudio() - Individual wheel sound response
Interactive control system with visual feedback

## 🎯 Creative Vision

This implementation transforms Pacita Abad's static geometric patterns into a living soundscape. Each wheel becomes an auditory receptor, creating a collective visual orchestra that dances with environmental sounds.

## 🔗 Credits & References

p5.js Sound Library - Official Docs
Web Audio API - Modern browser audio standards
FFT Analysis - Digital signal processing techniques
Team Foundation - Base wheel design and color palettes

💡 Experience Tip: For best results, try different music genres or ambient sounds to discover unique visual patterns!
