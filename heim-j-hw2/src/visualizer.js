import * as utils from './utils.js';
import * as sprite from './sprites.js';

let ctx, canvasWidth, canvasHeight, analyserNode, audioData;
let fireworks = [];

const setupCanvas = (canvasElement, analyserNodeRef) => {
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
    // keep a reference to the analyser node
    analyserNode = analyserNodeRef;
    // this is the array where the analyser data will be stored
    audioData = new Uint8Array(analyserNode.fftSize / 2);
    
    fireworks.push(new sprite.FireWork(100, 100, -200))
    fireworks.push(new sprite.FireWork(200, 340, 200))
    fireworks.push(new sprite.FireWork(450, 200, 400))
    fireworks.push(new sprite.FireWork(500, 100, 100))
    fireworks.push(new sprite.FireWork(600, 400, 900))
}

const draw = (params = {}) => {
    // 1 - populate the audioData array with the frequency data from the analyserNode
    if (params.toggleWave) {
        analyserNode.getByteTimeDomainData(audioData); //waveform data
        // Initialize audioData with default values

    } else {
        analyserNode.getByteFrequencyData(audioData); //frequency data

    }

    // 2 - draw background
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = .1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    //draw line
    if (params.showLine) {
        //line
        ctx.save();
        ctx.lineWidth = 3;
        let x = -(canvasWidth / audioData.length);
        let num = 0

        //make the lines
        for (let i = 0; i < 20; i++) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgb(199, 199, 199)";
            let y = num;
            num += 40
            utils.makeLine(ctx, x, y, audioData, canvasWidth)
        }

    }


    //draw bars
    if (params.showBars) {

        let margin = 2;
        let screenWidthForBars = (canvasWidth - (audioData.length) * margin);
        let barWidth = (screenWidthForBars / audioData.length) + 5;
        let topSpacing = 330;

        ctx.save();
        //loop througbh data
        for (let i = 0; i < audioData.length; i++) {
            let barX = margin + i * (barWidth + margin)
            let barHeight = Math.max(audioData[i] + 20, 0);

            let color = Math.round(255 * (i / (audioData.length - 50)));

            ctx.fillStyle = `rgb(${color}, 10, 255, 1)`;
            ctx.fillRect(barX, topSpacing + 256 - audioData[i], barWidth, barHeight);
        }
        ctx.restore();
    }

    //draw circles
    if (params.showCircles) {
        let maxRadius = canvasHeight / 20;
        ctx.save();
        ctx.globalAlpha = 0.5;

        let x = utils.getRandom(40, canvasWidth - 40);
        let y = utils.getRandom(40, canvasHeight - 40);

        for (let i = 0; i < audioData.length; i++) {
            let percent = audioData[i] / 255;
            let circleRadius = percent * maxRadius;

            utils.makeCircle(ctx, x, y, percent, circleRadius)

        }

    }

    //make fireworks
    if (params.showFireworks) {

        for (let s of fireworks) {
            s.draw(ctx);

            s.update(audioData)

        }

    }


    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width;
    // B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
    for (let i = 0; i < length; i++) {
        // C) randomly change every 20th pixel to red

        //invert
        if (params.showInvert) {
            let red = data[i], green = data[i + 1], blue = data[i + 2];
            data[i] = 255 - red; //set red
            data[i + 1] = 255 - green //set green
            data[i + 2] = 255 - blue //set blue
            //data[1 +3] is alpha
        }

    } // end for

    // D) copy image data back to canvas
    ctx.putImageData(imageData, 0, 0);

}

export { setupCanvas, draw };