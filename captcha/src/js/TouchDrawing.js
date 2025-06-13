const canvasTouch = document.getElementById('drawCanvas');
const ctxTouch = canvasTouch.getContext('2d');
let isDrawingTouch = false;

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
});

canvasTouch.addEventListener('touchend', () => {
    isDrawingTouch = false;
});
