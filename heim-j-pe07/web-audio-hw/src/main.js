/*
  main.js is primarily responsible for hooking up the UI to the rest of the application 
  and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

//imports
import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './visualizer.js';

//params object
const drawParams = {
  showGradient: true,
  showBars: true,
  showCircles: false,
  showNoise: true
}

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
  sound1: "media/New Adventure Theme.mp3"
});

function init() {
  audio.setupWebaudio(DEFAULTS.sound1);
  console.log("init called");
  console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
  let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
  setupUI(canvasElement);

  canvas.setupCanvas(canvasElement, audio.analyserNode);

  loop();
}

function setupUI(canvasElement) {
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#fsButton");

  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  };

  //PLAY BUTTON
  playButton.onclick = e => {
    console.log(`audioCtx.state before = ${audio.audioCtx.state}`)


    //check if in suspend state (autoplay)
    if (audio.audioCtx.state == "suspended") {
      audio.audioCtx.resume();
    }
    console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
    if (e.target.dataset.playing == "no") {
      //if currently paused, play it
      audio.playCurrentSound();
      e.target.dataset.playing = "yes";

    } else {
      audio.pauseCurrentSound();
      e.target.dataset.playing = "no";
    }

  };

  //VOLUME SLIDER
  //get references to them
  let volumeSlider = document.querySelector("#volumeSlider");
  let volumeLabel = document.querySelector("#volumeLabel");

  //change on input
  volumeSlider.oninput = e => {
    //set gain
    audio.setVolume(e.target.value);
    //update value on label
    volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));
  };

  //set initial
  volumeSlider.dispatchEvent(new Event("input"));

  //TRACK SELECT
  let trackSelect = document.querySelector("#trackSelect");
  //onchange event
  trackSelect.onchange = e => {
    audio.loadSoundFile(e.target.value);
    //pause current if playing
    if (playButton.dataset.playing == "yes") {
      playButton.dispatchEvent(new MouseEvent("click"));
    }
  };

} // end setupUI

//DATA VISULIZE
function loop() {
  canvas.draw(drawParams);
  requestAnimationFrame(loop);


}

export { init };