!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}({0:function(e,t){e.exports=void 0},1:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.drawVideoOnCanvas=function e(){requestAnimationFrame(e);u&&s||(u=c.clientWidth,s=c.clientHeight,o.width=u,o.height=s,i.width=u,i.height=s);r.drawImage(c,0,0,u,s);a.drawImage(c,0,0,u,s)};var o=document.querySelector(".monitor__canvas"),r=o.getContext("2d"),i=document.querySelector(".monitor__canvas_copy"),a=i.getContext("2d"),c=document.querySelector(".monitor__screen"),u=null,s=null},2:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.visualizeAudioStream=function(e){(function(e){r.createMediaStreamSource(e).connect(i),i.connect(a),a.connect(r.destination)})(e),c=s.clientWidth,u=s.clientHeight,d.canvas.width=c,d.canvas.height=u,function e(){requestAnimationFrame(e);var t=new Float32Array(i.frequencyBinCount);i.getFloatFrequencyData(t);var n=Math.max.apply(Math,function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(t))+v,o=Math.pow(10,n/20);d.clearRect(0,0,c,u);for(var r=0,a=u*o,s=Math.trunc(a/l),_=Math.trunc(u/l),w=1;w<=s;w++)d.strokeStyle=w/_>m?w/_>f?g:h:y,d.strokeRect(0,u-r,c,l),r+=l}()};var o=window.AudioContext||window.webkitAudioContext,r=void 0,i=void 0,a=void 0,c=void 0,u=void 0,s=document.querySelector(".volume"),d=document.querySelector(".volume__scale").getContext("2d"),l=3,v=28,m=.5,f=.75,g="#CE0D0C",h="yellow",y="white";o?(r=new o,(i=r.createAnalyser()).smoothingTimeConstant=.8,i.fftSize=2048,a=r.createGain()):console.log("Динамики повреждены")},24:function(e,t){},3:function(e,t,n){"use strict";var o=n(2),r=n(1);!function(){var e={audio:!0,video:!0},t=document.querySelector(".monitor__screen"),n=document.querySelector(".monitor__target"),i=document.querySelector(".monitor__information"),a=null;function c(e){a=e,(0,o.visualizeAudioStream)(e),"srcObject"in t?t.srcObject=e:t.src=URL.createObjectURL(e),t.onloadedmetadata=function(){t.play(),s({show:!0}),(0,r.drawVideoOnCanvas)()}}function u(e){console.log(e),function(){if(a){var e=!0,t=!1,n=void 0;try{for(var o,r=a.getTracks()[Symbol.iterator]();!(e=(o=r.next()).done);e=!0){var i=o.value;a.removeTrack(i)}}catch(e){t=!0,n=e}finally{try{!e&&r.return&&r.return()}finally{if(t)throw n}}}}(),s({show:!1})}function s(e){var t=e.show;i.classList[t?"add":"remove"]("monitor__information_hide"),n.classList[t?"add":"remove"]("monitor__target_show")}function d(){navigator.mediaDevices.getUserMedia(e).then(c).catch(u)}console.log({avaibleConstrains:navigator.mediaDevices.getSupportedConstraints()}),console.log({devices:navigator.mediaDevices.enumerateDevices().then(function(e){return e})}),void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=function(e){var t=navigator.webkitGetUserMedia||navigator.mozGetUserMedia;return t?new Promise(function(n,o){t.call(navigator,e,n,o)}):Promise.reject(new Error("Can not get connection with Yautja Prime"))}),d(),navigator.permissions.query({name:"camera"}).then(function(e){console.log({state:e.state}),e.onchange=function(){d()}}).catch(function(e){console.log(e)})}()},4:function(e,t,n){"use strict";n(24),n(3),n(0)}});
//# sourceMappingURL=main.js.map