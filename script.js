// إعدادات الحركة
const EYE_MAX_OFFSET = 4;
const EYE_LERP = 0.10;

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// تتبع عيون مارد للماوس — خفيف وناعم باستخدام Lerp
const dog = document.querySelector('#contactDog');
const pupils = [...document.querySelectorAll('.eye i')];
const finePointer = matchMedia('(pointer:fine)').matches;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (dog && pupils.length && finePointer && !reducedMotion) {
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
  let lastMove = performance.now();
  window.addEventListener('mousemove', e => {
    lastMove = performance.now();
    const r = dog.getBoundingClientRect();
    const cx = r.left + r.width * .5, cy = r.top + r.height * .38;
    const dx = e.clientX - cx, dy = e.clientY - cy;
    const distance = Math.hypot(dx, dy) || 1;
    const strength = Math.min(EYE_MAX_OFFSET, distance / 90);
    targetX = (dx / distance) * strength;
    targetY = (dy / distance) * strength;
  }, { passive: true });
  const animateEyes = now => {
    if (now - lastMove > 1300) { targetX *= .94; targetY *= .94; }
    currentX += (targetX - currentX) * EYE_LERP;
    currentY += (targetY - currentY) * EYE_LERP;
    pupils.forEach(p => p.style.transform = `translate(${currentX}px, ${currentY}px)`);
    requestAnimationFrame(animateEyes);
  };
  requestAnimationFrame(animateEyes);
}