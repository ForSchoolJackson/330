// 1 - our WebAudio context, **we will export and make this public at the bottom of the file**
let audioCtx;

// **These are "private" properties - these will NOT be visible outside of this module (i.e. file)**
// 2 - WebAudio nodes that are part of our WebAudio audio routing graph
let element, sourceNode, analyserNode, gainNode, distortionFilter, highBiquadFilter, lowBiquadFilter;

// 3 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
    gain: .5,
    numSamples: 256
});

// 4 - create a new array of 8-bit integers (0-255)
// this is a typed array to hold the audio frequency data
let audioData = new Uint8Array(DEFAULTS.numSamples / 2);

// **Next are "public" methods - we are going to export all of these at the bottom of this file**
const setupWebaudio = (filePath) => {
    // 1 - The || is because WebAudio has not been standardized across browsers yet
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    // 2 - this creates an <audio> element
    element = new Audio();

    // 3 - have it point at a sound file
    loadSoundFile(filePath);

    // 4 - create an a source node that points at the <audio> element
    sourceNode = audioCtx.createMediaElementSource(element);

    // 5 - create an analyser node
    // note the UK spelling of "Analyser"
    analyserNode = audioCtx.createAnalyser();

    // fft stands for Fast Fourier Transform
    analyserNode.fftSize = DEFAULTS.numSamples;

    // 7 - create a gain (volume) node
    gainNode = audioCtx.createGain();
    gainNode.gain.value = DEFAULTS.gain;

    //create filters and distortion
    highBiquadFilter = audioCtx.createBiquadFilter();
    highBiquadFilter.type = "highshelf";

    lowBiquadFilter = audioCtx.createBiquadFilter();
    lowBiquadFilter.type = "lowshelf";

    distortionFilter = audioCtx.createWaveShaper();
    distortionFilter.type = "distortion";


    // 8 - connect the nodes - we now have an audio graph
    sourceNode.connect(gainNode);
    gainNode.connect(highBiquadFilter);
    highBiquadFilter.connect(lowBiquadFilter);
    lowBiquadFilter.connect(distortionFilter);
    distortionFilter.connect(analyserNode);

    //connect to destination
    analyserNode.connect(audioCtx.destination);
}

//load
const loadSoundFile = (filePath) => {
    element.src = filePath;
}

//play
const playCurrentSound = () => {
    element.play();
}

//pause
const pauseCurrentSound = () => {
    element.pause();
}

//volume change
const setVolume = (value) => {
    // make sure that it's a Number rather than a String
    value = Number(value);
    gainNode.gain.value = value
}

//change highShelf
function toggleHighshelf(params = {}) {
    if (params.highshelf) {
        highBiquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime); // we created the `biquadFilter` (i.e. "treble") node last time
        highBiquadFilter.gain.setValueAtTime(25, audioCtx.currentTime);
    } else {
        highBiquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);
    }
}

//change lowShelf
function toggleLowshelf(params = {}) {
    if (params.lowshelf) {
        lowBiquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
        lowBiquadFilter.gain.setValueAtTime(15, audioCtx.currentTime);
    } else {
        lowBiquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);
    }
}

//change distortion
function toggleDistortion(params = {}) {
    if (params.distortion) {
        distortionFilter.curve = null; // being paranoid and trying to trigger garbage collection
        distortionFilter.curve = makeDistortionCurve(params.distortionAmount);
    } else {
        distortionFilter.curve = null;
    }
}

//changes based on slider
function makeDistortionCurve(amount = 20) {
    let n_samples = 256, curve = new Float32Array(n_samples);
    for (let i = 0; i < n_samples; ++i) {
        let x = i * 2 / n_samples - 1;
        curve[i] = (Math.PI + amount) * x / (Math.PI + amount * Math.abs(x));
    }
    return curve;
}

//export
export { audioCtx, setupWebaudio, playCurrentSound, pauseCurrentSound, loadSoundFile, setVolume, analyserNode, toggleHighshelf, toggleLowshelf, toggleDistortion, makeDistortionCurve };
