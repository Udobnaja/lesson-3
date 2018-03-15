(function () {
    const constraints = { audio: true, video: true};
    const video = document.querySelector('video');

    console.log({avaibleConstrains: navigator.mediaDevices.getSupportedConstraints()});
    console.log({devices: navigator.mediaDevices.enumerateDevices().then(r => r)});


    // проверка устройств

    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }

    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = (constraints) => {
            let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            if (!getUserMedia) {
                return Promise.reject(new Error('Ошибка в монитор предатора'));
            }

            return new Promise((resolve, reject) =>{
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            if ("srcObject" in video) {
                video.srcObject = stream;
            } else {
                video.src = URL.createObjectURL(stream);
            }
            video.onloadedmetadata = function(e) {
                video.play();
            };
        })
        .catch((err) => { console.log(err.name + ": " + err.message); }); /* прокидывать на монитор ошибку */

    // проверка на пермишены

    // navigator.permissions.query({name:'camera'}).then(function(result) {
    //     if (result.state == 'granted') {
    //
    //     } else if (result.state == 'prompt') {
    //
    //     } else if (result.state == 'denied') {
    //
    //     }
    //     result.onchange = function() {
    //
    //     };
    // });
})();