(() => {
  "use strict";

  const FRAME_COUNT = 120;
  const STILL_FRAME = 64;
  const CONCURRENCY = 4;
  const LOOKAHEAD = 8;
  const NAV_HEIGHT = 64;
  const scriptURL = document.currentScript && document.currentScript.src;
  const frameRoot = new URL("silky/scroll-v7/", scriptURL || new URL("assets/scroll-sequence.js", document.baseURI));
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  const smoothstep = (start, end, value) => {
    const t = clamp((value - start) / (end - start), 0, 1);
    return t * t * (3 - 2 * t);
  };
  let unmount = null;

  function mount() {
    if (unmount) return;
    const section = document.getElementById("silky-scroll");
    const canvas = document.getElementById("silky-canvas");
    const poster = document.getElementById("silky-poster");
    const stage = section && section.querySelector(".scroll-stage");
    if (!section || !canvas || !poster || !stage) return;

    let context;
    try { context = canvas.getContext("2d", { alpha: true }); } catch (_) { return; }
    if (!context) return;

    const intro = document.getElementById("scroll-intro");
    const progressBar = document.getElementById("scroll-progress");
    const captions = Array.from(section.querySelectorAll("[data-scroll-caption]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMedia = window.matchMedia("(max-width: 600px)");
    const cache = new Map();
    const pending = new Map();
    const failed = new Set();
    let queue = [];
    let destroyed = false;
    let animationFrame = 0;
    let target = 1;
    let previousTarget = 1;
    let direction = 1;
    let drawnFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let needsMeasure = true;
    let needsDraw = true;
    let hasDrawn = false;
    let lastCaptionProgress = -1;
    const firstBounds = section.getBoundingClientRect();
    let near = firstBounds.top < window.innerHeight + 600 && firstBounds.bottom > -600;

    captions.forEach((caption) => caption.setAttribute("aria-hidden", "true"));
    if (progressBar) progressBar.style.transformOrigin = "left center";

    const cacheLimit = () => mobileMedia.matches ? 12 : 20;
    const urlFor = (frame) => new URL(`frame-${String(frame).padStart(4, "0")}.webp`, frameRoot).href;

    function schedule() {
      if (!destroyed && !animationFrame) animationFrame = requestAnimationFrame(update);
    }

    function trimCache() {
      const wanted = new Set(desiredFrames());
      while (cache.size > cacheLimit()) {
        let victim = null;
        let farthest = -1;
        for (const frame of cache.keys()) {
          if (frame === target) continue;
          const distance = Math.abs(frame - target) + (wanted.has(frame) ? 0 : FRAME_COUNT);
          if (distance > farthest) { farthest = distance; victim = frame; }
        }
        if (victim === null) break;
        cache.delete(victim);
      }
    }

    function desiredFrames() {
      if (reducedMotion.matches) return [STILL_FRAME];
      const frames = [target];
      // Mobile reserves space for the last useful image and in-flight arrivals.
      const budget = Math.min(LOOKAHEAD * 2 + 1, cacheLimit() - 2);
      for (let distance = 1; distance <= LOOKAHEAD && frames.length < budget; distance++) {
        for (const sign of [direction, -direction]) {
          const frame = target + distance * sign;
          if (frame >= 1 && frame <= FRAME_COUNT && frames.length < budget) frames.push(frame);
        }
      }
      return frames;
    }

    function rebuildQueue() {
      queue = near ? desiredFrames().filter((frame) => !cache.has(frame) && !pending.has(frame) && !failed.has(frame)) : [];
    }

    function startLoads() {
      while (!destroyed && near && pending.size < CONCURRENCY && queue.length) {
        const frame = queue.shift();
        if (cache.has(frame) || pending.has(frame) || failed.has(frame)) continue;
        const picture = new Image();
        picture.decoding = "async";
        picture.fetchPriority = frame === target ? "high" : "low";
        pending.set(frame, picture);

        const settle = (success) => {
          if (destroyed || pending.get(frame) !== picture) return;
          picture.onload = null;
          picture.onerror = null;
          pending.delete(frame);
          if (success && picture.naturalWidth > 0 && picture.naturalHeight > 0) {
            cache.set(frame, picture);
            trimCache();
          } else {
            // A missing frame must not erase the previous image or create a retry loop.
            failed.add(frame);
          }
          rebuildQueue();
          startLoads();
          schedule();
        };

        picture.onload = () => {
          // Decode before drawing; keep this slot occupied until the pixels are ready.
          if (typeof picture.decode === "function") {
            picture.decode().then(() => settle(true), () => settle(picture.naturalWidth > 0));
          } else settle(true);
        };
        picture.onerror = () => settle(false);
        picture.src = urlFor(frame);
      }
    }

    function measure() {
      const bounds = stage.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = clamp(window.devicePixelRatio || 1, 1, 1.75);
      if (width <= 0 || height <= 0) return;
      const nextWidth = Math.max(1, Math.round(width * pixelRatio));
      const nextHeight = Math.max(1, Math.round(height * pixelRatio));
      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
        needsDraw = true;
      }
      needsMeasure = false;
    }

    function nearestReadyFrame() {
      if (cache.has(target)) return target;
      if (reducedMotion.matches) return 0;
      let closest = 0;
      let distance = Infinity;
      for (const frame of cache.keys()) {
        const nextDistance = Math.abs(frame - target);
        if (nextDistance < distance || (nextDistance === distance && frame === drawnFrame)) {
          closest = frame;
          distance = nextDistance;
        }
      }
      return closest;
    }

    function draw() {
      if (width <= 0 || height <= 0) return;
      const frame = nearestReadyFrame();
      const picture = cache.get(frame);
      if (!picture || (!needsDraw && drawnFrame === frame)) return;
      const requestedWidth = width * (mobileMedia.matches ? 1.3 : 1);
      const scale = Math.min(requestedWidth / picture.naturalWidth, height / picture.naturalHeight);
      const drawWidth = picture.naturalWidth * scale;
      const drawHeight = picture.naturalHeight * scale;
      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;
      try {
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        context.clearRect(0, 0, width, height);
        context.drawImage(picture, x, y, drawWidth, drawHeight);
      } catch (_) {
        // Restore the poster if the canvas itself cannot render this image.
        poster.hidden = false;
        poster.style.opacity = "1";
        poster.style.visibility = "visible";
        canvas.style.opacity = "0";
        hasDrawn = false;
        return;
      }
      drawnFrame = frame;
      needsDraw = false;
      canvas.dataset.frame = String(frame);
      if (!hasDrawn) {
        hasDrawn = true;
        canvas.style.opacity = "1";
        canvas.style.visibility = "visible";
        poster.style.opacity = "0";
        poster.style.visibility = "hidden";
        poster.hidden = true;
        section.dataset.sequenceReady = "true";
      }
    }

    function updateCopy(progress) {
      if (progress === lastCaptionProgress) return;
      lastCaptionProgress = progress;
      if (intro) {
        const opacity = reducedMotion.matches ? 1 : 1 - smoothstep(0.03, 0.2, progress);
        intro.style.opacity = String(opacity);
        intro.style.transform = `translateY(${-24 * (1 - opacity)}px)`;
      }
      const ranges = [[0.24, 0.28, 0.42, 0.46], [0.48, 0.52, 0.62, 0.66], [0.79, 0.85, 1.01, 1.05]];
      for (const caption of captions) {
        const range = ranges[Number(caption.dataset.scrollCaption)];
        if (!range) continue;
        const opacity = reducedMotion.matches ? 0 : smoothstep(range[0], range[1], progress) * (1 - smoothstep(range[2], range[3], progress));
        caption.style.opacity = String(opacity);
        caption.style.visibility = opacity > 0 ? "visible" : "hidden";
        caption.style.transform = `translateY(${14 * (1 - opacity)}px)`;
      }
      if (progressBar) progressBar.style.transform = `scaleX(${reducedMotion.matches ? 0 : progress})`;
    }

    function update() {
      animationFrame = 0;
      if (destroyed) return;
      if (needsMeasure) measure();
      const bounds = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - stage.offsetHeight);
      const progress = clamp((NAV_HEIGHT - bounds.top) / distance, 0, 1);
      target = reducedMotion.matches ? STILL_FRAME : Math.round(progress * (FRAME_COUNT - 1)) + 1;
      canvas.dataset.target = String(target);
      if (target !== previousTarget) {
        direction = target > previousTarget ? 1 : -1;
        previousTarget = target;
        needsDraw = true;
        trimCache();
      }
      updateCopy(progress);
      rebuildQueue();
      startLoads();
      draw();
    }

    function onScroll() { if (near) schedule(); }
    function onResize() { needsMeasure = true; needsDraw = true; schedule(); }
    function onPreferenceChange() {
      lastCaptionProgress = -1;
      needsMeasure = true;
      needsDraw = true;
      trimCache();
      schedule();
    }
    function onOnline() { failed.clear(); schedule(); }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("online", onOnline);
    const mediaListen = (media, listener) => {
      if (media.addEventListener) media.addEventListener("change", listener);
      else media.addListener(listener);
    };
    const mediaUnlisten = (media, listener) => {
      if (media.removeEventListener) media.removeEventListener("change", listener);
      else media.removeListener(listener);
    };
    mediaListen(reducedMotion, onPreferenceChange);
    mediaListen(mobileMedia, onPreferenceChange);

    const intersectionObserver = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      for (const entry of entries) {
        near = entry.isIntersecting;
        if (near) schedule();
        else queue = [];
      }
    }, { rootMargin: "600px 0px" }) : null;
    if (intersectionObserver) intersectionObserver.observe(section);
    else near = true;

    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(onResize) : null;
    if (resizeObserver) resizeObserver.observe(stage);

    unmount = () => {
      destroyed = true;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("online", onOnline);
      mediaUnlisten(reducedMotion, onPreferenceChange);
      mediaUnlisten(mobileMedia, onPreferenceChange);
      if (intersectionObserver) intersectionObserver.disconnect();
      if (resizeObserver) resizeObserver.disconnect();
      for (const picture of pending.values()) {
        picture.onload = null;
        picture.onerror = null;
        picture.src = "";
      }
      pending.clear();
      cache.clear();
      queue = [];
      unmount = null;
    };
    schedule();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount, { once: true });
  else mount();
  window.addEventListener("pagehide", () => { if (unmount) unmount(); });
  window.addEventListener("pageshow", (event) => { if (event.persisted) mount(); });
})();
