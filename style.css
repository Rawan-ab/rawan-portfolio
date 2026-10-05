(function(){"use strict";
/* Mobile-only hero blend: keep desktop/tablet styling untouched. */
var mobileHeroStyle=document.createElement('style');
mobileHeroStyle.textContent='@media (max-width:680px){.hero-grid{background:#eadcc9!important;position:relative!important}.hero-grid::before{content:""!important;position:absolute!important;z-index:2!important;inset:0!important;pointer-events:none!important;background:linear-gradient(180deg,#eadcc9 0%,#eadcc9 44%,rgba(234,220,201,.96) 52%,rgba(234,220,201,.72) 61%,rgba(234,220,201,.34) 72%,rgba(234,220,201,0) 84%)!important}.hero-copy{position:relative!important;z-index:3!important}.hero-figure{position:relative!important;z-index:1!important;margin-top:0!important;background:#eadcc9!important}.hero-figure::before{content:""!important;display:block!important;position:absolute!important;z-index:2!important;left:0!important;right:0!important;top:-2px!important;height:42%!important;pointer-events:none!important;background:linear-gradient(180deg,#eadcc9 0%,rgba(234,220,201,.92) 20%,rgba(234,220,201,.58) 48%,rgba(234,220,201,.18) 74%,rgba(234,220,201,0) 100%)!important}.hero-figure img{position:relative!important;z-index:1!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center bottom!important;mix-blend-mode:multiply!important;-webkit-mask-image:linear-gradient(180deg,transparent 0%,rgba(0,0,0,.18) 12%,rgba(0,0,0,.62) 27%,#000 45%)!important;mask-image:linear-gradient(180deg,transparent 0%,rgba(0,0,0,.18) 12%,rgba(0,0,0,.62) 27%,#000 45%)!important}}';
document.head.appendChild(mobileHeroStyle);
var header=document.getElementById('siteHeader');
if(header){var onScroll=function(){header.classList.toggle('is-stuck',window.scrollY>40)};onScroll();window.addEventListener('scroll',onScroll,{passive:true})}
var toggle=document.getElementById('navToggle'),nav=document.getElementById('primaryNav');
if(toggle&&nav){toggle.addEventListener('click',function(){var open=document.body.classList.toggle('nav-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu')});nav.addEventListener('click',function(e){if(e.target.tagName==='A'){document.body.classList.remove('nav-open');toggle.setAttribute('aria-expanded','false')}})}
var track=document.getElementById('workTrack'),prev=document.getElementById('prevBtn'),next=document.getElementById('nextBtn'),counter=document.getElementById('counter');
var filters=Array.prototype.slice.call(document.querySelectorAll('[data-work-filter]'));
if(!track||!prev||!next||!counter)return;
var cards=Array.prototype.slice.call(track.children),activeFilter='all',page=0,mobileScrollTimer;
function pad(n){return(n<10?'0':'')+n}
function pageSize(){return window.matchMedia('(max-width:680px)').matches?1:(window.matchMedia('(max-width:1240px)').matches?2:4)}
function filteredCards(){return cards.filter(function(card){return activeFilter==='all'||(card.getAttribute('data-categories')||'').split(/\s+/).indexOf(activeFilter)>-1})}
function render(resetScroll){
 var size=pageSize(),items=filteredCards(),mobile=size===1,pages=Math.max(1,mobile?items.length:Math.ceil(items.length/size));
 page=Math.max(0,Math.min(page,pages-1));
 var pageCards=mobile?items:items.slice(page*size,(page+1)*size);
 cards.forEach(function(card){card.hidden=pageCards.indexOf(card)===-1});
 track.classList.toggle('is-mobile-carousel',mobile);
 track.classList.toggle('is-short-page',!mobile&&pageCards.length>0&&pageCards.length<size);
 counter.textContent=pad(page+1)+' — '+pad(pages);
 prev.disabled=page===0;next.disabled=page===pages-1;
 if(resetScroll){track.scrollTo({left:0,behavior:'auto'})}
}
function go(step){
 var size=pageSize(),items=filteredCards(),pages=Math.max(1,size===1?items.length:Math.ceil(items.length/size));
 page=Math.max(0,Math.min(page+step,pages-1));render(false);
 if(size===1&&items[page]){track.scrollTo({left:items[page].getBoundingClientRect().left-track.getBoundingClientRect().left+track.scrollLeft,behavior:'smooth'})}
}
function syncMobilePage(){
 if(pageSize()!==1)return;
 window.clearTimeout(mobileScrollTimer);
 mobileScrollTimer=window.setTimeout(function(){
  var items=filteredCards(),rect=track.getBoundingClientRect(),center=rect.left+rect.width/2,bestIndex=-1,bestDistance=Infinity;
  items.forEach(function(card,index){var r=card.getBoundingClientRect(),distance=Math.abs((r.left+r.width/2)-center);if(distance<bestDistance){bestDistance=distance;bestIndex=index}});
  if(bestIndex>-1&&bestIndex!==page){page=bestIndex;render(false)}
 },80);
}
track.addEventListener('scroll',syncMobilePage,{passive:true});
prev.addEventListener('click',function(){go(-1)});
next.addEventListener('click',function(){go(1)});
filters.forEach(function(button){button.addEventListener('click',function(){
 activeFilter=button.getAttribute('data-work-filter');page=0;
 filters.forEach(function(item){var selected=item===button;item.classList.toggle('is-active',selected);item.setAttribute('aria-pressed',String(selected))});
 render(true);
})});
var resizeTimer;
window.addEventListener('resize',function(){window.clearTimeout(resizeTimer);resizeTimer=window.setTimeout(function(){page=0;render(true)},120)});
render(true)
})();