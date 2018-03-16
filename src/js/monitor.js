import { visualizeAudioStream } from './audio';
import { drawVideoOnCanvas } from "./video-canvas";

(() => {
    const constraints = { audio: true, video: true};
    const video = document.querySelector('.monitor__screen');
    const targetCursor = document.querySelector('.monitor__target');
    const monitorInformation = document.querySelector('.monitor__information');

    let mediaStream = null;

    console.log({avaibleConstrains: navigator.mediaDevices.getSupportedConstraints()});
    console.log({devices: navigator.mediaDevices.enumerateDevices().then(r => r)});
    
    function initializeMediaDeviceSupport() {
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
        }

        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = (constraints) => {
                let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                if (!getUserMedia) {
                    return Promise.reject(new Error('Can not get connection with Yautja Prime'));
                }

                return new Promise((resolve, reject) =>{
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            }
        }
    }
    
    function startVideo(stream) {

        mediaStream = stream;

        /* Посмотреть, что происходить с потоком и какой использует аудио апи */
        visualizeAudioStream(stream);
        
        if ("srcObject" in video) {
            video.srcObject = stream;
        } else {
            video.src = URL.createObjectURL(stream);
        }

        video.onloadedmetadata = () => {
            video.play();
            toggleVideoVisibility({show: true});
            drawVideoOnCanvas();
        }
    }
    
    function stopVideo(e) {
        console.log(e);
        removeTracksFromMediaStream();
        toggleVideoVisibility({show: false});
    }
    
    function toggleVideoVisibility({show}) {
        // video.classList[show? 'add' : 'remove']('monitor__screen_show');
        monitorInformation.classList[show? 'add' : 'remove']('monitor__information_hide');
        targetCursor.classList[show? 'add' : 'remove']('monitor__target_show');
    }
    
    function removeTracksFromMediaStream() {
        if (mediaStream){
            for (let track of mediaStream.getTracks()){
                mediaStream.removeTrack(track);
            }
        }
    }

    function startGettingMediaStream() {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(startVideo)
            .catch(stopVideo);
    }

    initializeMediaDeviceSupport();
    startGettingMediaStream();

    // enum PermissionName {
    //     "geolocation",
    //         "camera",
    //         "microphone",
    //         "speaker",
    //         "device-info",
    //         "bluetooth",
    //         "ambient-light-sensor",
    //         "accelerometer",
    //         "gyroscope",
    //         "magnetometer",
    //         "clipboard",
    // };

    navigator.permissions.query({name:'camera'}).then((permissionStatus) => {

        console.log({state: permissionStatus.state});
        /*
         enum PermissionState {
             "granted",
             "denied",
             "prompt",
         }; */

        permissionStatus.onchange = () => {
            startGettingMediaStream();
        };
    }).catch((e) => {
        console.log(e)
    });
})();