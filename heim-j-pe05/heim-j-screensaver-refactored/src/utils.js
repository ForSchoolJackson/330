
//return random color
export const getRandomColor = (r, g, b, a) => {
    const getByte = () => 50 + Math.round(Math.random() * 200);

    if (r == "rand") {
        r = getByte();
    } if (g == "rand") {
        g = getByte();
    } if (b == "rand") {
        b = getByte();
    } if (a == "rand") {
        a = getByte();
    }
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

//return random integer
export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}