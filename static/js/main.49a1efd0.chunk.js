(this["webpackJsonpsound-recorder"]=this["webpackJsonpsound-recorder"]||[]).push([[0],[,,,,,,,,,,,function(e,t,n){},,function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),o=n(5),a=n.n(o),i=(n(11),n(4)),s=n.n(i),u=n(6),d=n(2),l=(n(13),n(0)),j=function(e){var t=e.stream;return Object(l.jsx)(l.Fragment,{children:Object(l.jsxs)("article",{children:[Object(l.jsx)("audio",{controls:"controls",src:t}),Object(l.jsxs)("p",{children:[Object(l.jsx)("span",{className:"name",children:"Unnamed recording"}),Object(l.jsx)("button",{onClick:function(){},className:"editName",title:"Click to edit name",children:"\u270f\ufe0f"})]}),Object(l.jsx)("button",{onClick:function(){},className:"delete",children:"Delete"})]},t.toString())})},b=(n(15),function(){var e=Object(c.useState)("Record"),t=Object(d.a)(e,2),n=t[0],r=t[1],o=Object(c.useState)("record-play"),a=Object(d.a)(o,2),i=a[0],b=a[1],h=Object(c.useState)([]),f=Object(d.a)(h,2),m=f[0],O=f[1],p={audio:!0},g=Object(c.useRef)(null),x=[],v=[i],w=function(){var e=new Blob(x,{type:"audio/ogg; codecs=opus"});x=[];var t=window.URL.createObjectURL(e);m.push({stream:t}),v.pop(),b(v.join(" ")),O(m),r("Record")},k=function(){v.push("recording-audio"),console.log({recordButtonClasses:v}),b(v.join(" ")),r("Stop")},R=function(){var e=Object(u.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==t){e.next=2;break}return e.abrupt("return",navigator.mediaDevices.getUserMedia(p));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("button",{onClick:function(){R(g.current).then((function(e){g.current=new MediaRecorder(e),g.current.onstop=w,g.current.onstart=k,g.current.ondataavailable=function(e){x.push(e.data)}})).catch((function(e){console.log("MR already exists")})).then((function(){"Record"===n?g.current.start():g.current.stop()}))},className:i,children:n}),m.map((function(e,t){return Object(l.jsx)(j,{stream:e.stream},e.stream.toString())}))]})});n(16);var h=function(){return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("header",{children:Object(l.jsx)("h1",{children:"Sound Recorder"})}),Object(l.jsx)("main",{children:Object(l.jsx)(b,{})})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var f=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),o(e),a(e)}))};a.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(h,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)})),f()}],[[17,1,2]]]);
//# sourceMappingURL=main.49a1efd0.chunk.js.map