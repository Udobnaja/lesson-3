import {updateCanvasSize} from './utils/canvas';
const volumeNode = document.querySelector('.volume');
const volumeScaleNode = volumeNode.querySelector('.volume__scale');
const volumeContext = volumeScaleNode.getContext('2d');
const frequencyNode = document.querySelector('.sound-frequency');
const waveCanvas = frequencyNode.querySelector('.sound-frequency__wave');
const waveContext = waveCanvas.getContext('2d');
const fftSize = 2048;
const smoothing = 0.8;
const decibelHeight = 3;
const filterOffset = 28;
const averageRate = 0.5;
const maxRate = 0.75;
const waveWidth = 1;
const maxRateColor = '#CE0D0C';
const averageRateColor = 'yellow';
const normalRateColor = 'white';
let audioContext = null;
let analyser = null;
let gainNode = null;
let volumeNodeWidth = null;
let volumeNodeHeight = null;
let frequencyNodeWidth = null;
let frequencyNodeHeight = null;
let requestAnimationId = null;

export function visualizeAudioStream(stream) {
    if (!isAudioContextAvailable()) {
        return;
    }

    if (!audioContext) {
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        analyser.smoothingTimeConstant = smoothing;
        analyser.fftSize = fftSize;
        gainNode = audioContext.createGain();
    } else {
        audioContext.resume();
    }

    connectNodes(stream);
    [volumeNodeWidth, volumeNodeHeight] = updateCanvasSize({node: volumeNode, context: volumeContext});
    [frequencyNodeWidth, frequencyNodeHeight] = updateCanvasSize({node: frequencyNode, context: waveContext});
    const loopAnimateDraw = () => {
        requestAnimationId = requestAnimationFrame(loopAnimateDraw);

        let buffers = new Float32Array(analyser.frequencyBinCount);
        analyser.getFloatFrequencyData(buffers);

        let range = getBufferRange({buffers});

        drawDecibels({range});

        analyser.getFloatTimeDomainData(buffers);

        drawFrequencyWaves({buffers});
    };

    loopAnimateDraw();
}

export async function stopAudioStream() {
    if (audioContext) {
        await audioContext.suspend();
        volumeContext.clearRect(0, 0, volumeNodeWidth, volumeNodeHeight);
        waveContext.clearRect(0, 0, frequencyNodeWidth, frequencyNodeHeight);
        cancelAnimationFrame(requestAnimationId);
    }
}

function connectNodes(stream) {
    let source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(audioContext.destination);
}

function getBufferRange({buffers}) {
    let max = Math.max(...buffers) + filterOffset;
    return Math.pow(10, max / 20);
}

function drawDecibels({range}) {
    let y = 0;
    let decibelsTotalHeight = volumeNodeHeight * range;
    let decibelsCount = Math.trunc(decibelsTotalHeight / decibelHeight);
    let capacity = Math.trunc(volumeNodeHeight / decibelHeight);

    volumeContext.clearRect(0, 0, volumeNodeWidth, volumeNodeHeight);

    for (let i = 1; i <= decibelsCount; i++) {
        if (i / capacity > averageRate) {
            if (i / capacity > maxRate) {
                volumeContext.strokeStyle = maxRateColor;
            } else {
                volumeContext.strokeStyle = averageRateColor;
            }
        } else {
            volumeContext.strokeStyle = normalRateColor;
        }

        volumeContext.strokeRect(0, volumeNodeHeight - y, volumeNodeWidth, decibelHeight);
        y += decibelHeight;
    }
}

function isAudioContextAvailable() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    return Boolean(AudioContext);
}

function drawFrequencyWaves({buffers}) {
    waveContext.clearRect(0, 0, frequencyNodeWidth, frequencyNodeHeight);
    waveContext.beginPath();
    waveContext.lineWidth = waveWidth;
    waveContext.strokeStyle = normalRateColor;
    waveContext.moveTo(0, frequencyNodeHeight / 2);
    const length = buffers.length;
    for (let i = 1; i < buffers.length; i++) {
        let val = (buffers[i] + 1) / 2;
        let x = frequencyNodeWidth * (i / length);
        let y = val * frequencyNodeHeight;
        waveContext.lineTo(x, y);
    }
    waveContext.stroke();
}
