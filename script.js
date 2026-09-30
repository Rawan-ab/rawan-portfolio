(function(){"use strict";
var header=document.getElementById('siteHeader');
if(header){var onScroll=function(){header.classList.toggle('is-stuck',window.scrollY>40)};onScroll();window.addEventListener('scroll',onScroll,{passive:true})}
var toggle=document.getElementById('navToggle'),nav=document.getElementById('primaryNav');
if(toggle&&nav){toggle.addEventListener('click',function(){var open=document.body.classList.toggle('nav-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu')});nav.addEventListener('click',function(e){if(e.target.tagName==='A'){document.body.classList.remove('nav-open');toggle.setAttribute('aria-expanded','false')}})}
var track=document.getElementById('workTrack'),prev=document.getElementById('prevBtn'),next=document.getElementById('nextBtn'),counter=document.getElementById('counter');
if(!track||!prev||!next||!counter)return;
var cards=Array.prototype.slice.call(track.children),index=0;function pad(n){return(n<10?'0':'')+n}
function render(){counter.textContent=pad(index+1)+' \u2014 '+pad(cards.length);prev.disabled=index===0;next.disabled=index===cards.length-1}
function go(step){index=Math.min(cards.length-1,Math.max(0,index+step));render();cards[index].scrollIntoView({behavior:'smooth',block:'nearest',inline:'nearest'})}
prev.addEventListener('click',function(){go(-1)});next.addEventListener('click',function(){go(1)});
if('IntersectionObserver'in window){var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting&&e.intersectionRatio>.6){var i=cards.indexOf(e.target);if(i>-1&&i!==index){index=i;render()}}})},{threshold:[.6]});if(window.matchMedia('(max-width:680px)').matches)cards.forEach(function(c){io.observe(c)})}render()
})();