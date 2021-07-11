(this["webpackJsonpsound-recorder"]=this["webpackJsonpsound-recorder"]||[]).push([[0],[,,,,,,,,,,,,,,function(e,t,n){},,function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),c=n(8),a=n.n(c),i=(n(14),n(7)),s=n.n(i),u=n(9),d=n(2),l=n(3),f=(n(16),n(0)),j=function(e){var t=e.stream,n=e.name,r=e.onDeleteHandler,o=e.onEditNameHandler,c=e.id;return Object(f.jsxs)("article",{id:c,children:[Object(f.jsx)("audio",{controls:"controls",src:t,preload:"auto",role:"application",children:"Sorry, your browser doesn't support recording audio."}),Object(f.jsxs)("p",{children:[Object(f.jsx)("span",{className:"name",role:"presentation",children:n}),Object(f.jsx)("button",{onClick:function(e){o(e)},className:"editName",title:"Click to edit name",children:"\u270f\ufe0f"})]}),Object(f.jsx)("button",{onClick:function(e){r(e)},className:"delete",children:"Delete"})]})};j.defaultProps={stream:{stream:"blob:http://localhost",name:"Default recording name",id:"id0"}};var b=j,m=(n(18),function(e){var t,n,o,c,a,i,s,u=e.stream,d=e.barColor,l=void 0===d?[0,0,0]:d,j=Object(r.useRef)();Object(r.useEffect)((function(){o=j.current.getContext("2d"),t=j.current,window.onresize=function(){t.width=document.querySelector("body").offsetWidth},window.onresize(),b(u)}),[]);var b=function(e){n||(n=new(window.AudioContext||window.webkitAudioContext));var t=n.createMediaStreamSource(e);(c=n.createAnalyser()).fftSize=256,i=c.frequencyBinCount,a=new Uint8Array(i),t.connect(c),window.requestAnimationFrame(m)},m=function e(n){if(s!==n){var r=t.width,u=t.height;c.getByteTimeDomainData(a);var d,f=r/i,j=0;o.clearRect(0,0,r,u);for(var b=0;b<i;b++)d=a[b],o.fillStyle="rgb(".concat(l[0],", ").concat(l[1],", ").concat(l[2],")"),o.fillRect(j,u,f,0-d/2),j+=f+1;s=n}window.requestAnimationFrame(e)};return Object(f.jsx)(f.Fragment,{children:Object(f.jsx)("canvas",{ref:j,className:"visualizer"})})});n(19);var O=function(e){var t=e.stream,n=function(e){var t=Object(r.useState)(!1),n=Object(d.a)(t,2),o=n[0],c=n[1],a=Object(r.useState)([]),i=Object(d.a)(a,2),s=i[0],u=i[1],f=Object(r.useState)([]),j=Object(d.a)(f,2),b=j[0],m=j[1],O=Object(r.useMemo)((function(){return new MediaRecorder(e)}),[e]);return O.onstop=function(){var e=new Blob(b,{type:"audio/ogg; codecs=opus"}),t=window.URL.createObjectURL(e);u((function(e){return[].concat(Object(l.a)(e),[{stream:t,name:(new Date).toISOString().split(".")[0].split("T").join(" "),id:"id".concat(window.performance.now().toString())}])})),m([]),c(!1)},O.onstart=function(){c(!0)},O.ondataavailable=function(e){m((function(t){return[].concat(Object(l.a)(t),[e.data])}))},{recorder:O,recordings:s,setRecordings:u,isRecording:o}}(t),o=n.recorder,c=n.recordings,a=n.setRecordings,i=n.isRecording,s="record-play",u=Object(r.useMemo)((function(){return i?"".concat(s," recording-audio"):s}),[i]),j=Object(r.useMemo)((function(){return i?"Stop":"Record"}),[i]),O=function(e){var t,n=e.target.parentNode.parentNode.attributes.id.value,r=Object(l.a)(c),o=c.filter((function(e){return e.id===n&&e})),i=c.indexOf(o[0]),s=null!==(t=window.prompt("Enter a new name",o[0].name))&&void 0!==t?t:o[0].name;o[0].name=s,r.splice(i,1,o[0]),a(r)},p=function(e){var t=e.target.parentNode.attributes.id.value,n=window.confirm("Are you sure you want to delete this recording?");if(!0===n){var r=c.filter((function(e){return t!==e.id}));e.target.parentNode.classList.add("vanish"),setTimeout((function(){a(Object(l.a)(r))}),900)}};return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(m,{stream:t,isRecording:i,barColor:[18,124,85]}),Object(f.jsx)("button",{onClick:function(){i?o.stop():o.start(1e3)},className:u,children:j}),Object(f.jsx)("section",{children:c.map((function(e,t){return Object(f.jsx)(b,{stream:e.stream,name:e.name,id:e.id,onDeleteHandler:p,onEditNameHandler:O},e.id)}))})]})};n(20);var p=function(){var e=Object(r.useMemo)((function(){return{audio:!0}}),[]),t=Object(r.useState)(null),n=Object(d.a)(t,2),o=n[0],c=n[1],a=Object(r.useState)(null),i=Object(d.a)(a,2),l=i[0],j=i[1];return Object(r.useEffect)((function(){if(!o){var t=!1;return function(){var n=Object(u.a)(s.a.mark((function n(){var r;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,navigator.mediaDevices.getUserMedia(e);case 3:r=n.sent,t||c(r),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),t||j(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})));return function(){return n.apply(this,arguments)}}()(),function(){t=!0,o&&(o.getAudioTracks&&o.getAudioTracks().map((function(e){return e.stop()})),o.stop&&o.stop())}}}),[e,o,l]),Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)("header",{children:Object(f.jsx)("h1",{children:"Sound Recorder"})}),Object(f.jsx)("main",{children:null===o?Object(f.jsx)("button",{className:"record-play",children:"Loading\u2026"}):Object(f.jsx)(O,{stream:o})})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var h=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,22)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,c=t.getLCP,a=t.getTTFB;n(e),r(e),o(e),c(e),a(e)}))};a.a.render(Object(f.jsx)(o.a.StrictMode,{children:Object(f.jsx)(p,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)})),h()}],[[21,1,2]]]);
//# sourceMappingURL=main.3f6b49ce.chunk.js.map