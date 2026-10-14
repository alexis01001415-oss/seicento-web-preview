(() => {
  'use strict';

  document.querySelectorAll('[data-makeup-comparison]').forEach(figure => {
    const stage = figure.querySelector('.comparison-stage');
    const range = figure.querySelector('.comparison-range');
    const before = figure.querySelector('.comparison-before');
    const after = figure.querySelector('.comparison-after');
    const buttons = [...figure.querySelectorAll('[data-comparison-position]')];
    const message = figure.querySelector('.comparison-unavailable');
    if (!stage || !range || !before || !after || !message) return;

    let pointerId = null;
    let ready = false;
    const images = new Map([[before, 'pending'], [after, 'pending']]);

    function setPosition(position) {
      const value = Math.max(0, Math.min(100, Math.round(Number(position) || 0)));
      range.value = String(value);
      range.setAttribute('aria-valuetext', `${value} % antes; ${100 - value} % después`);
      stage.style.setProperty('--comparison-position', `${value}%`);
      figure.classList.toggle('is-before-only', value === 100);
      figure.classList.toggle('is-after-only', value === 0);
      buttons.forEach(button => {
        button.setAttribute('aria-pressed', String(Number(button.dataset.comparisonPosition) === value));
      });
    }

    function syncImages() {
      const beforeState = images.get(before);
      const afterState = images.get(after);
      ready = beforeState === 'loaded' && afterState === 'loaded';
      figure.classList.toggle('is-ready', ready);
      range.disabled = !ready;
      buttons.forEach(button => { button.disabled = !ready; });

      if (ready) {
        message.hidden = true;
        return;
      }
      if (beforeState !== 'error' && afterState !== 'error') return;
      before.hidden = beforeState === 'error';
      after.hidden = afterState === 'error';
      if (beforeState === 'loaded') setPosition(100);
      else if (afterState === 'loaded') setPosition(0);
      message.textContent = 'La comparativa no está disponible en este momento.';
      message.hidden = false;
    }

    [before, after].forEach(img => {
      img.addEventListener('load', () => {
        images.set(img, 'loaded');
        syncImages();
      });
      img.addEventListener('error', () => {
        images.set(img, 'error');
        syncImages();
      });
      if (img.complete && img.naturalWidth > 0) images.set(img, 'loaded');
      else if (img.complete && img.currentSrc) images.set(img, 'error');
    });

    function positionFromPointer(event) {
      const bounds = stage.getBoundingClientRect();
      if (bounds.width > 0) setPosition((event.clientX - bounds.left) / bounds.width * 100);
    }

    range.addEventListener('input', () => { setPosition(range.value); });
    range.addEventListener('pointerdown', event => {
      if (!ready || event.isPrimary === false || event.button !== 0) return;
      event.preventDefault();
      pointerId = event.pointerId;
      range.focus({ preventScroll: true });
      range.setPointerCapture(pointerId);
      positionFromPointer(event);
    });
    range.addEventListener('pointermove', event => {
      if (event.pointerId !== pointerId) return;
      positionFromPointer(event);
    });
    function releasePointer(event) {
      if (event.pointerId !== pointerId) return;
      if (range.hasPointerCapture(pointerId)) range.releasePointerCapture(pointerId);
      pointerId = null;
    }
    range.addEventListener('pointerup', releasePointer);
    range.addEventListener('pointercancel', releasePointer);
    range.addEventListener('lostpointercapture', () => { pointerId = null; });
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        if (ready) setPosition(button.dataset.comparisonPosition);
      });
    });

    setPosition(range.value);
    syncImages();
  });
})();
