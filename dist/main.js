(()=>{var t={661:(t,r,n)=>{const e=n(884);t.exports=function(){const t={},r={},n={};let o=0,i=0;function s(r,n,e){if(t[r])return!1;const o=[r],i=r.split(",").map((t=>+t)),s="right"==e?0:1;for(let r=0;r<n-1;r++){if(i[s]=i[s]+1,t[i])return!1;if(i[0]<0||i[0]>9||i[1]<0||i[1]>9)return!1;o.push(Array.from(i).toString())}return o}for(let r=0;r<10;r++)for(let n=0;n<10;n++)t[`${r},${n}`]=void 0;return{coordinates:t,hitCoordinates:r,placeShip:function(r,i,a){const c=s(r,i,a);if(!c)return!1;const u=e(i,c,a);c.forEach((r=>t[r]=u)),n[r]=u,o+=i},receiveAttack:function(n){if("string"!=typeof n)throw new Error("parameter must be a string");if(r[n])return!1;r[n]=!0;const e=t[n];return e?(e.hit(),i++,"hit"):"miss"},allSunken:function(){return i>=o},generateCoordinates:s}}},312:t=>{const r=[document.querySelector(".player-grid"),document.querySelector(".ai-grid")];t.exports={setupGrids:function(){r.forEach((t=>{for(let r=0;r<100;r++){const r=document.createElement("div");r.classList.add("grid-coordinate"),t.append(r)}}))}}},403:(t,r,n)=>{n(661);const e=n(312),o=n(62),i=[5,4,2,2,1],s=["right","bottom"];function a(t){const r=t.board;i.forEach((t=>{const n=s[Math.floor(2*Math.random())];let e=r.placeShip(c(),t,n);for(;!1===e;)e=r.placeShip(c(),t,n)}))}function c(){const[t,r]=[Math.floor(10*Math.random()),Math.floor(10*Math.random())];return[t,r].toString()}t.exports={init:function(){this.player1=o(),this.player0=o(),a(this.player0),a(this.player1),e.setupGrids()}}},62:(t,r,n)=>{const e=n(661);t.exports=function(){return{board:e()}}},884:t=>{t.exports=function(t,r,n){if("number"!=typeof t)throw new Error("Non-number passed as parameter Ship Factory");if(t<1||t>5)throw new Error("Length must be between 1 and 5");if(!Array.isArray(r)||0==r.length)throw new Error("Second parameter must be a non-empty array");return{length:t,hits:0,coords:r,direction:n,hit:function(){this.hits++},isSunk:function(){return this.hits>=this.length}}}}},r={};(function n(e){var o=r[e];if(void 0!==o)return o.exports;var i=r[e]={exports:{}};return t[e](i,i.exports,n),i.exports})(403).init()})();