//mkae firework like shapes
class FireWork {
    //construcor
    constructor(centerX, centerY, add) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.add = add
        this.n = 0;
        this.divergence = 137.1;
        this.c = 3;
        this.radius = 2;
    }
    // calculate degrees
    dtr(degrees) {
        return degrees * (Math.PI / 180);
    }
    //make the circles
    drawCircle(ctx, x, y, radius, color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    //draw fireworks
    draw(ctx) {

        for (let i = 0; i < this.n; i++) {
            let aFlower = i * this.dtr(137.1)
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
    //add more dots with music
    update(audioData) {
        let add = 0
        for (let i = 0; i < audioData.length; i++) {
            add += audioData[i];
        }
        let average = add / (audioData.length + this.add);
        this.n = Math.floor(1000 * (average / 200) + 10);

    }
}

//traingle class
class Triangle {
    //constructor
    constructor(x, y, add) {
        this.x = x;
        this.y = y;
        this.add = add;
        this.rotate = 0;
    }
    drawTriangle(ctx, x, y, size, color) {
        //make height based on the size
        //baied on pythogroean theroem
        let height = Math.sqrt(2/3) * size;

        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y - height / 2);
        ctx.lineTo(x + size / 2, y + height / 2);
        ctx.lineTo(x - size / 2, y + height / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    //draw the triangles
    draw(ctx) {
        let color = "rgb(180, 10, 100)"
        //tranlsate and rotate triangle
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotate)
        this.drawTriangle(ctx, 0, 0, this.add, color)
        ctx.restore();

    }
    //rotate triangles with music
    update(audioData) {
        let speed = 0.1;
        let audioRotate = audioData[0]/255 * speed;
        this.rotate += audioRotate;

       // this.rotate += speed;

    }

}

export { FireWork, Triangle };