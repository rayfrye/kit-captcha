const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
let isMouseDrawing = false;

function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

//Potentially evaluate density of drawing, require a minimum threshold
//Display how close they are on mouseup
function getDrawingDensity() {
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let nonTransparentPixels = 0;
    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] !== 0) nonTransparentPixels++;
    }

    const totalPixels = canvas.width * canvas.height;
    return nonTransparentPixels / totalPixels; // fraction of canvas used
}

canvas.addEventListener('mousedown', (event) => {
    isMouseDrawing = true;
    ctx.beginPath();
    const pos = getMousePos(event);
    ctx.moveTo(pos.x, pos.y);
});

canvas.addEventListener('mousemove', (event) => {
    if (isMouseDrawing) {
        const pos = getMousePos(event);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }
});

canvas.addEventListener('mouseup', () => {
    isMouseDrawing = false;
});

canvas.addEventListener('mouseleave', () => {
    isMouseDrawing = false;
});