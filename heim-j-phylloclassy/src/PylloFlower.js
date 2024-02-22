//phyllo flower class
class PhylloFlower {
    //construcor
    constructor(n, centerX, centerY, divergence, c) {
        n = 0;
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

export {PhylloFlower };