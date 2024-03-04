//mkae firework like shapes
class FireWork {
    //construcor
    constructor(centerX, centerY, add) {
        this.n = 20;
        this.centerX = centerX;
        this.centerY = centerY;
        this.add = add
        this.divergence = 137.1;
        this.c = 3;
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
    //draw method
    draw(ctx) {

        for (let i = 0; i < this.n; i++) {
            let aFlower = i * 137.1 * (Math.PI / 180)
            let rFlower = 2 * Math.sqrt(i);

            //get X and Y
            let x = rFlower * Math.cos(aFlower) + this.centerX;
            let y = rFlower * Math.sin(aFlower) + this.centerY;

            //draw the circles
            let red = Math.round(255 * (1 - i / this.n));
            let color = `rgb(${red}, 10, 100)`;
            this.drawCircle(ctx, x, y, 1, color);
        }

    }
    update(audioData) {
        let add = 0
        for (let i = 0; i < audioData.length; i++) {
            add += audioData[i];
        }
        let average = add / (audioData.length + this.add);
        this.n = Math.floor(1000 * (average / 200));

    }
}

//traingle class
class Triangle{
    constructor(centerX, centerY, add) {
    }

    draw(){

    }
    update(){

    }

}

export { FireWork, Triangle };