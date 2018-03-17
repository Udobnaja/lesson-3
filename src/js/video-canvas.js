const canvas = document.querySelector('.monitor__canvas');
const context = canvas.getContext('2d');
const canvasCopy = document.querySelector('.monitor__canvas_copy');
const contextCopy = canvasCopy.getContext('2d');
const video = document.querySelector('.monitor__screen');

let clientWidth = null;
let clientHeight = null;


export function drawVideoOnCanvas() {
    requestAnimationFrame(drawVideoOnCanvas);
    if (!clientWidth || !clientHeight){
        setCanvasSizes();
    }

    context.drawImage(video, 0, 0, clientWidth, clientHeight);
    contextCopy.drawImage(video, 0, 0, clientWidth, clientHeight);

    // getImageData(); // снижает скорость fps

}

/* При ресайзе так же нужно будет пересчитать размеры */

function setCanvasSizes() {
    clientWidth = video.clientWidth;
    clientHeight = video.clientHeight;
    canvas.width = clientWidth;
    canvas.height = clientHeight;
    canvasCopy.width = clientWidth;
    canvasCopy.height = clientHeight;
}

function getImageData() {
    let data = context.getImageData(0,0, clientWidth, clientHeight);
}