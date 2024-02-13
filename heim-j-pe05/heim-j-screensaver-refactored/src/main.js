
//global variable
let ctx;
let paused = false;
let played = false;
let canvas;
let createRectangles = true;
let createCircles = true;
let createLines = true;

//initial setup
const init = () => {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    drawRectangle(ctx, 0, 0, 640, 480, "#a8ffe6");

    setupUI();
    update();
}

//import utils
import { getRandomColor } from "./utils.js";
import { getRandomInt } from "./utils.js";

//import canvas utils
import { drawRectangle } from "./canvas-utils.js";
import { drawArc } from "./canvas-utils.js";
import { drawLine } from "./canvas-utils.js";

//update the animation 
const update = () => {
    //leave update function if paused
    if (paused) return;

    //if not
    window.requestAnimationFrame(update)

    //radomize which one drawn
    if (getRandomInt(1, 20) == 1) {
        if (createRectangles) drawRandomRect(ctx);

    } else if (getRandomInt(1, 10) == 1) {
        if (createLines) drawRandomLine(ctx)

    } else {
        if (createCircles) drawRandomCirle(ctx)
    }

}

//make random rects
const drawRandomRect = (ctx) => {
    return drawRectangle(ctx, getRandomInt(-100, 620), getRandomInt(-10, 460), getRandomInt(100, 300), getRandomInt(10, 30), getRandomColor(20, "rand", "rand", .5));
}
//makes random circle
const drawRandomCirle = (ctx) => {
    return drawArc(ctx, getRandomInt(20, 620), getRandomInt(20, 460), getRandomInt(0, 20), getRandomColor(240, "rand", "rand", .2));
}
//makes random line
const drawRandomLine = () => {
    return drawLine(ctx, getRandomInt(20, 600), getRandomInt(20, 400), getRandomInt(20, 600), getRandomInt(20, 400), getRandomInt(1, 3), "pink");
}

//canvas click event (spray paint)
const canvasClicked = (e) => {
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;

    for (let i = 0; i < 10; i++) {
        let x = getRandomInt(-100, 100) + mouseX;
        let y = getRandomInt(-100, 100) + mouseY;

        drawArc(ctx, x, y, getRandomInt(10, 20), "black", 10, getRandomColor(20, "rand", "rand", .5), 0, Math.PI * 2);

    }
}

//ui setup
const setupUI = () => {
    document.querySelector("#btn-pause").onclick = () => {
        paused = true;
        played = false;
    };
    document.querySelector("#btn-play").onclick = () => {
        paused = false;
        if (!played) {
            update();
        }
        played = true;
    }
    document.querySelector("#btn-clear").onclick = () => {
        drawRectangle(ctx, 0, 0, 640, 480, "#a8ffe6");
    };

    //onclick event
    canvas.onclick = canvasClicked;

    // checkbox presses
    document.querySelector("#cb-rectangles").onclick = (e) => createRectangles = e.target.checked;
    document.querySelector("#cb-circles").onclick = (e) => createCircles = e.target.checked;
    document.querySelector("#cb-lines").onclick = (e) => createLines = e.target.checked;

}

init();