!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}({0:function(e,t){e.exports=void 0},1:function(e,t,n){"use strict";var o;o=document.querySelector("video"),console.log({avaibleConstrains:navigator.mediaDevices.getSupportedConstraints()}),console.log({devices:navigator.mediaDevices.enumerateDevices().then(function(e){return e})}),void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=function(e){var t=navigator.webkitGetUserMedia||navigator.mozGetUserMedia;return t?new Promise(function(n,o){t.call(navigator,e,n,o)}):Promise.reject(new Error("Ошибка в монитор предатора"))}),navigator.mediaDevices.getUserMedia({audio:!0,video:!0}).then(function(e){"srcObject"in o?o.srcObject=e:o.src=URL.createObjectURL(e),o.onloadedmetadata=function(e){o.play()}}).catch(function(e){console.log(e.name+": "+e.message)})},16:function(e,t){},2:function(e,t,n){"use strict";n(16),n(1),n(0)}});
//# sourceMappingURL=main.js.map