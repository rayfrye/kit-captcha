const canvasTouch = document.getElementById('drawCanvas');
const ctxTouch = canvasTouch.getContext('2d');
let isDrawingTouch = false;

function getDrawingDensityTouch() {
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const submit = document.getElementById('submit');

    let nonTransparentPixels = 0;
    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] !== 0) nonTransparentPixels++;
    }

    const totalPixels = canvas.width * canvas.height;
    var density = nonTransparentPixels / totalPixels;

    if (density >= 0.01) {
        submit.disabled = false;
    } else {
        submit.disabled = true;
    }

    return density;
}

function getPos(e) {
    const rect = canvasTouch.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
}

canvasTouch.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDrawingTouch = true;
    ctxTouch.beginPath();
    const pos = getPos(e);
    ctxTouch.moveTo(pos.x, pos.y);
});

canvasTouch.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (isDrawingTouch) {
        const pos = getPos(e);
        ctxTouch.lineTo(pos.x, pos.y);
        ctxTouch.stroke();
    }
    getDrawingDensityTouch();
});

canvasTouch.addEventListener('touchend', () => {
    isDrawingTouch = false;
    getDrawingDensityTouch();
});
