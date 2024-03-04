const makeColor = (red, green, blue, alpha = 1) => {
  return `rgba(${red},${green},${blue},${alpha})`;
};

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getRandomColor = () => {
  const floor = 35; // so that colors are not too bright or too dark 
  const getByte = () => getRandom(floor, 255 - floor);
  return `rgba(${getByte()},${getByte()},${getByte()},1)`;
};

const getLinearGradient = (ctx, startX, startY, endX, endY, colorStops) => {
  let lg = ctx.createLinearGradient(startX, startY, endX, endY);
  for (let stop of colorStops) {
    lg.addColorStop(stop.percent, stop.color);
  }
  return lg;
};

const makeLine = (ctx, x, y, audioData, canvasWidth) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (let i of audioData) {
    ctx.lineTo(x, y - i);
    x += (canvasWidth / (audioData.length - 50));
  }
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

const makeCircle = (ctx, x, y, percent, radius) => {
  ctx.beginPath();
  ctx.fillStyle = makeColor(255, 150, 240, .5 - percent / 5);
  ctx.arc(x, y, radius * percent, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.closePath();

}

// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
const goFullscreen = (element) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullscreen) {
    element.mozRequestFullscreen();
  } else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
  // .. and do nothing if the method is not supported
};

export { makeColor, getRandom, getRandomColor, getLinearGradient, goFullscreen, makeLine, makeCircle };