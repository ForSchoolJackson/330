function drawSquare1(ctx, x, y, width, height, fillStyle) {
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, width, height);
    ctx.restore();
}

function drawSquare2(ctx, x, y, width, height, rotation, fillstyle, scale) {
    ctx.save();
    ctx.fillStyle = fillstyle;
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);
    ctx.fillRect(0 - width / 2, 0 - height / 2, width, height);
    ctx.restore();
}

export{drawSquare1, drawSquare2};