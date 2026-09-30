(function(){"use strict";
var header=document.getElementById('siteHeader');
if(header){var onScroll=function(){header.classList.toggle('is-stuck',window.scrollY>40)};onScroll();window.addEventListener('scroll',onScroll,{passive:true})}
var toggle=document.getElementById('navToggle'),nav=document.getElementById('primaryNav');
if(toggle&&nav){toggle.addEventListener('click',function(){var open=document.body.classList.toggle('nav-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu')});nav.addEventListener('click',function(e){if(e.target.tagName==='A'){document.body.classList.remove('nav-open');toggle.setAttribute('aria-expanded','false')}})}
var track=document.getElementById('workTrack'),prev=document.getElementById('prevBtn'),next=document.getElementById('nextBtn'),counter=document.getElementById('counter');
var filters=Array.prototype.slice.call(document.querySelectorAll('[data-work-filter]'));
if(!track||!prev||!next||!counter)return;
var cards=Array.prototype.slice.call(track.children),activeFilter='all',page=0;
function pad(n){return(n<10?'0':'')+n}
function pageSize(){return window.matchMedia('(max-width:680px)').matches?1:(window.matchMedia('(max-width:1240px)').matches?2:4)}
function filteredCards(){return cards.filter(function(card){return activeFilter==='all'||(card.getAttribute('data-categories')||'').split(/\s+/).indexOf(activeFilter)>-1})}
function render(){
 var size=pageSize(),items=filteredCards(),pages=Math.max(1,Math.ceil(items.length/size));
 page=Math.max(0,Math.min(page,pages-1));
 var visible=items.slice(page*size,(page+1)*size);
 cards.forEach(function(card){card.hidden=visible.indexOf(card)===-1});
 track.classList.toggle('is-short-page',size>1&&visible.length>0&&visible.length<size);
 counter.textContent=pad(page+1)+' \\u2014 '+pad(pages);
 prev.disabled=page===0;next.disabled=page===pages-1;
}
function go(step){
 var pages=Math.max(1,Math.ceil(filteredCards().length/pageSize()));
 page=Math.max(0,Math.min(page+step,pages-1));render();
}
prev.addEventListener('click',function(){go(-1)});
next.addEventListener('click',function(){go(1)});
filters.forEach(function(button){button.addEventListener('click',function(){
 activeFilter=button.getAttribute('data-work-filter');page=0;
 filters.forEach(function(item){var selected=item===button;item.classList.toggle('is-active',selected);item.setAttribute('aria-pressed',String(selected))});
 render();
})});
var resizeTimer;
window.addEventListener('resize',function(){window.clearTimeout(resizeTimer);resizeTimer=window.setTimeout(render,120)});
render()
})();