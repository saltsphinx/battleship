(()=>{var t={661:(t,r,e)=>{const n=e(884);t.exports=function(){const t={},r={},e={};let i=0,o=0;function s(r,e,n){if(t[r])return!1;const i=[r],o=r.split(",").map((t=>+t)),s="right"==n?1:0;for(let r=0;r<e-1;r++){if(o[s]=o[s]+1,t[o])return!1;if(o[0]<0||o[0]>9||o[1]<0||o[1]>9)return!1;i.push(Array.from(o).toString())}return i}for(let r=0;r<10;r++)for(let e=0;e<10;e++)t[`${r},${e}`]=void 0;return{ships:e,coordinates:t,hitCoordinates:r,placeShip:function(r,o,a){const c=s(r,o,a);if(!c)return!1;const u=n(o,c,a);c.forEach((r=>t[r]=u)),e[r]=u,i+=o},receiveAttack:function(e){if("string"!=typeof e)throw new Error("parameter must be a string");if(r[e])return!1;r[e]=!0;const n=t[e];return n?(n.hit(),o++,"hit"):"miss"},allSunken:function(){return o>=i},generateCoordinates:s}}},312:t=>{const r=[document.querySelector(".player-grid"),document.querySelector(".ai-grid")],e={},n={},i=[e,n],o=document.querySelector(".notifier");let s,a;t.exports={resetGrids:function(){r.forEach((t=>{let r=t.firstChild;for(;r;)r.remove(),r=t.firstChild})),function(){for(let t=0;t<2;t++){const e=r[t],n=i[t];for(let t=0;t<10;t++)for(let r=0;r<10;r++){const i=[t,r].toString(),o=document.createElement("div");o.classList.add("grid-coordinate",i),e.append(o),n[i]=o}}}()},setupEnemy:function(t){r[1].addEventListener("click",t)},hitNotifier:function(t,r=6500){s&&(s(!0),clearTimeout(a));const e=new Promise((t=>s=t));var n;o.textContent=t,o.classList.remove("hide"),Promise.race([e,(n=r,new Promise((t=>{a=setTimeout((()=>t(!1)),n)})))]).then((t=>{t||o.classList.add("hide")}))},playerGrid:e,aiGrid:n}},403:(t,r,e)=>{const n=e(312),i=e(62);let o=!1;const s=[5,4,2,2,1],a=["right","bottom"];function c(t){const r=t.board;s.forEach((t=>{const e=a[Math.floor(2*Math.random())];let n=r.placeShip(u(),t,e);for(;!1===n;)n=r.placeShip(u(),t,e)}))}function u(){const[t,r]=[Math.floor(10*Math.random()),Math.floor(10*Math.random())];return[t,r].toString()}function f(t){if(!o)return;const r=t.target;if(r.classList.contains("grid-coordinate")){if(r.classList.contains("hit"))return n.hitNotifier("Square has already been attacked.",2500);r.classList[1],console.log("is square: "+r.classList[1])}}t.exports={init:function(){this.player=i(),this.ai=i(),c(this.player),c(this.ai),n.resetGrids(),function(t){const r=n.playerGrid,e=t.ships;Object.values(e).forEach((t=>{const e=t.coords,n=t.direction;for(let t=0;t<e.length;t++){const i=r[e[t]];i.classList.add(n,"ship"),0==t&&i.classList.add("first"),t==e.length-1&&i.classList.add("last")}}))}(this.player),n.setupEnemy(f),n.hitNotifier("Your turn",15e3),o=!0}}},62:(t,r,e)=>{const n=e(661);t.exports=function(){const t=n();return{board:t,ships:t.ships}}},884:t=>{t.exports=function(t,r,e){if("number"!=typeof t)throw new Error("Non-number passed as parameter Ship Factory");if(t<1||t>5)throw new Error("Length must be between 1 and 5");if(!Array.isArray(r)||0==r.length)throw new Error("Second parameter must be a non-empty array");return{length:t,hits:0,coords:r,direction:e,hit:function(){this.hits++},isSunk:function(){return this.hits>=this.length}}}}},r={};(function e(n){var i=r[n];if(void 0!==i)return i.exports;var o=r[n]={exports:{}};return t[n](o,o.exports,e),o.exports})(403).init()})();