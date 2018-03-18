const volume = document.querySelector('.volume');
const volumeScale = document.querySelector('.volume__scale');
const canvasContext = volumeScale.getContext("2d");
const fftSize = 2048;
const smoothing = 0.8;
const decibelHeight = 3;
const filterOffset = 28;
const averageRate = 0.5;
const maxRate = 0.75;
const maxRateColor = '#CE0D0C';
const averageRateColor = 'yellow';
const normalRateColor = 'white';
let audioContext = null;
let analyser = null;
let gainNode = null;
let canvasWidth = null;
let canvasHeight = null;
let requestAnimationId = null;

export function visualizeAudioStream(stream){
    if (!isAudioContextAvailable()) return;

    if (!audioContext){
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        analyser.smoothingTimeConstant = smoothing;
        analyser.fftSize = fftSize;
        gainNode = audioContext.createGain();
    } else {
        audioContext.resume();
    }

    connectNodes(stream);
    updateCanvasSize();

    const loopAnimateDraw = ()  => {
        requestAnimationId = requestAnimationFrame(loopAnimateDraw);

        let buffer = new Float32Array(analyser.frequencyBinCount);
        analyser.getFloatFrequencyData(buffer);

        let range = getBufferRange({buffer});

        drawDecibels({range});
    };

    loopAnimateDraw();
}

export async function stopAudioStream(){
    if (audioContext){
        await audioContext.suspend();
        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        cancelAnimationFrame(requestAnimationId);
    }
}

function connectNodes(stream) {
    let source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(audioContext.destination);
}

function getBufferRange({buffer}) {
    let max = Math.max(...buffer) + filterOffset;
    return Math.pow(10, max / 20);
}

function drawDecibels({range}){
    let y = 0;
    let decibelsTotalHeight = canvasHeight * range;
    let decibelsCount = Math.trunc(decibelsTotalHeight / decibelHeight);
    let capacity = Math.trunc(canvasHeight / decibelHeight);

    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 1; i <= decibelsCount; i++){
        if (i / capacity > averageRate){
            if (i / capacity > maxRate) {
                canvasContext.strokeStyle = maxRateColor;
            } else {
                canvasContext.strokeStyle = averageRateColor;
            }
        } else {
            canvasContext.strokeStyle = normalRateColor;
        }

        canvasContext.strokeRect(0, canvasHeight - y, canvasWidth, decibelHeight);
        y += decibelHeight;
    }
}

function updateCanvasSize() {
    canvasWidth = volume.clientWidth;
    canvasHeight = volume.clientHeight;
    canvasContext.canvas.width = canvasWidth;
    canvasContext.canvas.height = canvasHeight;
}

function isAudioContextAvailable() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    return !!AudioContext;
}


