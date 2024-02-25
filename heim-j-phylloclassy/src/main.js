//phyllo flower class
class PhylloFlower {
    //construcor
    constructor( centerX, centerY, divergence, c, n) {
        this.n = 0;
        this.centerX = centerX;
        this.centerY = centerY;
        this.divergence = divergence;
        this.c = c;
        this.radius = 2;
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
    //restart loop
    restartLoop() {
        // Fill the entire canvas with black color
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //reset variables
        this.n = 0;
    }
    //draw method
    draw(ctx) {
        // each frame draw a new dot
        let a = this.n * this.dtr(this.divergence); //angle
        let r = this.c * Math.sqrt(this.n); //radius

        // calculate the `x` and `y`
        this.x = r * Math.cos(a) + this.centerX;
        this.y = r * Math.sin(a) + this.centerY;

        let color = `hsl(${this.n / 5 % 361},100%,50%)`;
        this.drawCircle(ctx, this.x, this.y, 1, color);

        this.n++;

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

    loop();
}

//loop to create pattern
function loop() {
    setTimeout(loop, 1000 / fps);

    sprites.push(new PhylloFlower(200, 200, 137.5, 4));
    sprites.push(new PhylloFlower(450, 200, 137.1, 3))

    for (let sprite of sprites) {
        sprite.draw(ctx);
    }


}

//canvas click event (draw flower)
const canvasClicked = (e) => {
    //find mouseX and mouseY
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;

    sprites.push(new PhylloFlower(mouseX, mouseY, 137.3, 2))

}

//restart button
document.querySelector("#btn-restart").onclick = (e) => {

    for (let sprite of sprites) {
        sprite.restartLoop();
    }

    //remove clicked sprites
    sprites = [];

}

//onclick event
canvas.onclick = canvasClicked;
