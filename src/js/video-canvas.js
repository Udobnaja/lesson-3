import {updateCanvasSize} from "./utils/canvas";
const canvas = document.querySelector('.monitor__canvas');
const context = canvas.getContext('2d');
const canvasCopy = document.querySelector('.monitor__canvas_copy');
const contextCopy = canvasCopy.getContext('2d');
const video = document.querySelector('.monitor__screen');
let requestAnimationId = null;

let clientWidth = null;
let clientHeight = null;


export function drawVideoOnCanvas() {
    requestAnimationId = requestAnimationFrame(drawVideoOnCanvas);

    if (!clientWidth || !clientHeight){
        [clientWidth, clientHeight] = updateCanvasSize({node: video, context: context});
        let copy = updateCanvasSize({node: video, context: contextCopy});
    }

    context.drawImage(video, 0, 0, clientWidth, clientHeight);
    contextCopy.drawImage(video, 0, 0, clientWidth, clientHeight);

    // getImageData(); // снижает скорость fps

}

export function removeVideoFromCanvas() {
    cancelAnimationFrame(requestAnimationId);
    context.clearRect(0, 0, clientWidth, clientHeight);
    contextCopy.clearRect(0, 0, clientWidth, clientHeight);
}

/* При ресайзе так же нужно будет пересчитать размеры */

function getImageData() {
    let data = context.getImageData(0,0, clientWidth, clientHeight);
}