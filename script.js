(function(){
  "use strict";

  /* Header background once scrolled off the hero */
  var header = document.getElementById('siteHeader');
  var onScroll = function(){
    header.classList.toggle('is-stuck', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  /* Mobile navigation */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');
  toggle.addEventListener('click', function(){
    var open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.addEventListener('click', function(e){
    if (e.target.tagName === 'A') {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded','false');
    }
  });

  /* Project stepper: walks through the four projects and keeps the
     counter in sync. On wide screens all four are already in view, so
     stepping only moves the marker; on narrow screens it brings the
     next card into view. */
  var track = document.getElementById('workTrack');
  var cards = Array.prototype.slice.call(track.children);
  var prev = document.getElementById('prevBtn');
  var next = document.getElementById('nextBtn');
  var counter = document.getElementById('counter');
  var index = 0;

  function pad(n){ return (n < 10 ? '0' : '') + n; }

  function render(){
    counter.textContent = pad(index + 1) + ' \u2014 ' + pad(cards.length);
    prev.disabled = index === 0;
    next.disabled = index === cards.length - 1;
  }

  function go(step){
    index = Math.min(cards.length - 1, Math.max(0, index + step));
    render();
    cards[index].scrollIntoView({behavior:'smooth', block:'nearest', inline:'nearest'});
  }

  prev.addEventListener('click', function(){ go(-1); });
  next.addEventListener('click', function(){ go(1); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          var i = cards.indexOf(entry.target);
          if (i > -1 && i !== index) { index = i; render(); }
        }
      });
    }, {threshold:[0.6]});
    /* Only track position when the cards stack; in the 4-up row every
       card is visible at once and the marker would flicker. */
    if (window.matchMedia('(max-width:680px)').matches) {
      cards.forEach(function(c){ io.observe(c); });
    }
  }

  render();
})();
