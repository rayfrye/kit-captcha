const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
let isMouseDrawing = false;
let currentColor = '#000000'; // Default color

// document.getElementById('colorPicker').addEventListener('input', (e) => {
//     currentColor = e.target.value;
// });
function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

//Potentially evaluate density of drawing, require a minimum threshold
//Display how close they are on mouseup?
//This at least prevents blank submissions.
//It might be interesting to adjust this up to require more drawing.
function getDrawingDensity() {
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const submit = document.getElementById('submit');

    let nonTransparentPixels = 0;
    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] !== 0) nonTransparentPixels++;
    }

    const totalPixels = canvas.width * canvas.height;
    var density = nonTransparentPixels / totalPixels;

    // if(density > 0 && density < .05){
    //     document.getElementById('prompt').innerHTML += '<p>Keep going!</p>';
    // }
    if (density >= .01) {
        submit.disabled = false;
    } else {
        submit.disabled = true;
    }
    
    return density;
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
        ctx.strokeStyle = currentColor; // Apply current color
        ctx.stroke();
    }
});

canvas.addEventListener('mouseup', () => {
    isMouseDrawing = false;
    getDrawingDensity();
});

canvas.addEventListener('mouseleave', () => {
    isMouseDrawing = false;
    getDrawingDensity();
});