!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}({0:function(e,t){e.exports=void 0},1:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.drawVideoOnCanvas=function e(){u=requestAnimationFrame(e);s&&l||(s=c.clientWidth,l=c.clientHeight,o.width=s,o.height=l,i.width=s,i.height=l);r.drawImage(c,0,0,s,l);a.drawImage(c,0,0,s,l)},t.removeVideoFromCanvas=function(){cancelAnimationFrame(u),r.clearRect(0,0,s,l),a.clearRect(0,0,s,l)};const o=document.querySelector(".monitor__canvas"),r=o.getContext("2d"),i=document.querySelector(".monitor__canvas_copy"),a=i.getContext("2d"),c=document.querySelector(".monitor__screen");let u=null,s=null,l=null},2:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.visualizeAudioStream=function(e){if(!window.AudioContext&&!window.webkitAudioContext)return;f?f.resume():(f=new AudioContext,(g=f.createAnalyser()).smoothingTimeConstant=a,g.fftSize=i,h=f.createGain());(function(e){f.createMediaStreamSource(e).connect(g),g.connect(h),h.connect(f.destination)})(e),_=o.clientWidth,w=o.clientHeight,r.canvas.width=_,r.canvas.height=w;const t=()=>{y=requestAnimationFrame(t);let e=new Float32Array(g.frequencyBinCount);g.getFloatFrequencyData(e);let n=Math.max(...e)+u,o=Math.pow(10,n/20);r.clearRect(0,0,_,w);let i=0,a=w*o,f=Math.trunc(a/c),h=Math.trunc(w/c);for(let e=1;e<=f;e++)r.strokeStyle=e/h>s?e/h>l?d:m:v,r.strokeRect(0,w-i,_,c),i+=c};t()},t.stopAudioStream=async function(){f&&(await f.suspend(),r.clearRect(0,0,_,w),cancelAnimationFrame(y))};const o=document.querySelector(".volume"),r=document.querySelector(".volume__scale").getContext("2d"),i=2048,a=.8,c=3,u=28,s=.5,l=.75,d="#CE0D0C",m="yellow",v="white";let f=null,g=null,h=null,_=null,w=null,y=null},24:function(e,t){},3:function(e,t,n){"use strict";var o=n(2),r=n(1);(()=>{const e={audio:!0,video:!0},t=document.querySelector(".monitor__screen"),n=document.querySelector(".monitor__target"),i=document.querySelector(".monitor__information");let a=null;function c(e){a=e,(0,o.visualizeAudioStream)(e),"srcObject"in t?t.srcObject=e:t.src=URL.createObjectURL(e),t.onloadedmetadata=(()=>{t.play(),s({show:!0}),(0,r.drawVideoOnCanvas)()})}function u(e){console.log(e),function(){if(a)for(let e of a.getTracks())a.removeTrack(e)}(),(0,r.removeVideoFromCanvas)(),(0,o.stopAudioStream)(),s({show:!1})}function s({show:e}){i.classList[e?"add":"remove"]("monitor__information_hide"),n.classList[e?"add":"remove"]("monitor__target_show")}function l(){navigator.mediaDevices.getUserMedia(e).then(c).catch(u)}console.log({avaibleConstrains:navigator.mediaDevices.getSupportedConstraints()}),console.log({devices:navigator.mediaDevices.enumerateDevices().then(e=>e)}),void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=(e=>{let t=navigator.webkitGetUserMedia||navigator.mozGetUserMedia;return t?new Promise((n,o)=>{t.call(navigator,e,n,o)}):Promise.reject(new Error("Can not get connection with Yautja Prime"))})),l(),navigator.permissions.query({name:"camera"}).then(e=>{console.log({state:e.state}),e.onchange=(()=>{l()})}).catch(e=>{console.log(e)})})()},4:function(e,t,n){"use strict";n(24),n(3),n(0)}});
//# sourceMappingURL=main.js.map