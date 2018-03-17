const volume = document.querySelector('.volume');
const volumeScale = document.querySelector('.volume__scale');
const canvasContext = volumeScale.getContext("2d");
const fftSize = 2048;
const smoothing = 0.8;
const scaleItemHeight = 3;
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

    const drawScale = ()  => {
        requestAnimationFrame(drawScale);
        let buffer = new Float32Array(analyser.frequencyBinCount);
        analyser.getFloatFrequencyData(buffer);

        let max = Math.max(...buffer) + filterOffset;
        let level = Math.pow(10, max / 20);

        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

        let y = 0;
        let newHeight = canvasHeight * level;
        let scaleItemsCount = Math.trunc(newHeight / scaleItemHeight);
        let capacity = Math.trunc(canvasHeight / scaleItemHeight);
        for (let i = 1; i <= scaleItemsCount; i++){
            if (i / capacity > averageRate){
                if (i / capacity > maxRate) {
                    canvasContext.strokeStyle = maxRateColor;
                } else {
                    canvasContext.strokeStyle = averageRateColor;
                }
            } else {
                canvasContext.strokeStyle = normalRateColor;
            }

            canvasContext.strokeRect(0, canvasHeight - y, canvasWidth, scaleItemHeight);
            y += scaleItemHeight;
        }
    };

    drawScale();
}

export async function stopAudioStream(){
    if (audioContext){
        await audioContext.suspend();
        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
    }
}

function connectNodes(stream) {
    let source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(audioContext.destination);
}

/* При ресайзе так же нужно будет пересчитать размеры */

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


