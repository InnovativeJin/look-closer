/* =========================================================
   Look Closer — Project Page interactions
   - Figure carousel: stacked slides, manual + auto switching
   - Videos: play on click only, one at a time
   ========================================================= */
(function () {
  'use strict';

  /* ==================== FIGURE CAROUSEL ==================== */
  var carousel = document.getElementById('figureCarousel');

  if (carousel) {
    var slides    = Array.prototype.slice.call(
                      carousel.querySelectorAll('.carousel-slide'));
    var captionEl = document.getElementById('carouselCaption');
    var dotsEl    = document.getElementById('carouselDots');
    var prevBtn   = document.getElementById('carouselPrev');
    var nextBtn   = document.getElementById('carouselNext');

    var AUTOPLAY_MS = 7000;   // auto-switch interval (ms between figures)
    var current     = 0;
    var timer       = null;
    var dots        = [];

    /* Build one navigation dot per slide */
    slides.forEach(function (slide, i) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Show figure ' + (i + 1));
      dot.addEventListener('click', function () {
        goTo(i);
        restartTimer();
      });
      dotsEl.appendChild(dot);
      dots.push(dot);
    });

    function goTo(index) {
      current = (index + slides.length) % slides.length;

      slides.forEach(function (slide, i) {
        slide.classList.toggle('is-active', i === current);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current);
      });
      if (captionEl) {
        captionEl.textContent =
          slides[current].getAttribute('data-caption') || '';
      }
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startTimer() {
      if (slides.length < 2) { return; }
      timer = window.setInterval(next, AUTOPLAY_MS);
    }
    function stopTimer() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }
    function restartTimer() {
      stopTimer();
      startTimer();
    }

    /* Manual controls */
    nextBtn.addEventListener('click', function () { next(); restartTimer(); });
    prevBtn.addEventListener('click', function () { prev(); restartTimer(); });

    /* Keyboard arrows */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { next(); restartTimer(); }
      else if (e.key === 'ArrowLeft') { prev(); restartTimer(); }
    });

    /* Pause auto-switching while the pointer is over the figure */
    carousel.addEventListener('mouseenter', stopTimer);
    carousel.addEventListener('mouseleave', startTimer);

    /* Initialize */
    goTo(0);
    startTimer();
  }

  /* ====================== VIDEO PLAYBACK ===================== */
  /* Videos use the native `controls` attribute, so they only play
     when the user presses play. Here we just make sure that
     starting one video pauses any other that is still playing. */
  var videos = Array.prototype.slice.call(document.querySelectorAll('video'));

  videos.forEach(function (video) {
    video.addEventListener('play', function () {
      videos.forEach(function (other) {
        if (other !== video) { other.pause(); }
      });
    });
  });
})();
