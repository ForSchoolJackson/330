//phyllo flower class
class PhylloFlower {
    //construcor
    constructor(n, centerX, centerY, divergence, c) {
        this.n = 0;
        this.centerX = centerX;
        this.centerY = centerY;
        this.divergence = divergence;
        this.c = c;
    }
    //draw method
    draw(ctx) {
         //increase c and radius
    c += 0.01;
    radius += 0.01

    // each frame draw a new dot
    let a = n * utils.dtr(divergence); //angle
    let r = c * Math.sqrt(n); //radius

    // calculate the `x` and `y`
    let x = r * Math.cos(a) + canvasWidth / 2;
    let y = r * Math.sin(a) + canvasHeight / 2;

    let color = `hsl(${n / 5 % 361},100%,50%)`;
    utils.drawCircle(ctx, x, y, radius, color);

    n++;

    //loop back through
    if (n > 1150) {
        restartLoop();
    }

    }
    // calculate degrees
    dtr(degrees) {
        return degrees * (Math.PI / 180);
    }
    //make circle
    drawCircle(ctx, x, y, radius, color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

}

//globals
const canvasWidth = 640, canvasHeight = 480;
const fps = 60;
let ctx;
let sprites = [];

window.onload = init

//initialize
function init() {
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

   // loop();
}

//loop to create pattern
function loop() {
    setTimeout(loop, 1000 / fps);

    let flower1 = new PhylloFlower(200, 200, 137.5, 4)
    let flower2 = new PhylloFlower(450, 200, 137.5, 3)

    flower1.draw();
    flower2.draw();

}

//canvas click event (draw flower)
const canvasClicked = (e) => {
    //find mouseX and mouseY
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;

    for (let i = 0; i < 40; i++) {
        let aFlower = i * utils.dtr(137.1)
        let rFlower = 2 * Math.sqrt(i);

        //get X and Y
        let x = rFlower * Math.cos(aFlower) + mouseX;
        let y = rFlower * Math.sin(aFlower) + mouseY;

        //draw the circles
        let color = `hsl(${i % 200},100%,50%)`;
        utils.drawCircle(ctx, x, y, 1, color);
    }

}

const restartLoop = () => {
    // Fill the entire canvas with black color
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //reset variables
    n = 1;
    c = 2;
    radius = 2;


}

//restart button
document.querySelector("#btn-restart").onclick = (e) => {

    restartLoop();

}

//onclick event
canvas.onclick = canvasClicked;
