(() => {
  'use strict';

  function bindImageLightbox() {
    var figures = Array.prototype.slice.call(document.querySelectorAll('.article-image'));
    if (!figures.length) return;

    var dialog = document.createElement('dialog');
    dialog.className = 'article-image-lightbox';
    dialog.setAttribute('aria-label', 'Image preview');
    dialog.innerHTML = '<button class="article-image-lightbox-close" type="button" aria-label="Close image preview">×</button><img alt="">';
    document.body.appendChild(dialog);

    var preview = dialog.querySelector('img');
    var closeButton = dialog.querySelector('button');
    var lastTrigger = null;
    function closeLightbox() {
      dialog.close();
      if (lastTrigger) lastTrigger.focus();
    }
    closeButton.addEventListener('click', closeLightbox);
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) closeLightbox();
    });

    figures.forEach(function (figure) {
      var image = figure.querySelector('img');
      if (!image) return;
      figure.classList.add('is-zoomable');
      figure.setAttribute('tabindex', '0');
      figure.setAttribute('role', 'button');
      var caption = (figure.querySelector('figcaption') && figure.querySelector('figcaption').textContent || '').trim();
      var label = 'Open full-screen image: ' + (image.alt || 'article image');
      if (caption && label.indexOf(caption) === -1) label += '. ' + caption;
      figure.setAttribute('aria-label', label);
      function openLightbox() {
        lastTrigger = figure;
        preview.src = image.currentSrc || image.src;
        preview.alt = image.alt;
        dialog.showModal();
        closeButton.focus();
      }
      figure.addEventListener('click', openLightbox);
      figure.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox();
        }
      });
    });
  }

  function init() {
    var toc = document.querySelector('.article-toc');
    if (!toc) return;

    var dropdown = toc.querySelector('.article-toc-dropdown');
    var summary = toc.querySelector('.article-toc-summary');
    var nav = toc.querySelector('.article-toc-nav');
    var current = toc.querySelector('.article-toc-current');
    var sections = Array.prototype.slice.call(document.querySelectorAll('.article-page-content section[id]'));
    if (!dropdown || !summary || !nav || !sections.length) return;

    var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    function setActive(id) {
      links.forEach(function (link) {
        var active = link.getAttribute('href') === '#' + id;
        link.classList.toggle('is-active', active);
        if (active && current) current.textContent = link.textContent;
      });
    }

    var desktopToc = window.matchMedia('(min-width: 981px)');
    function syncTocMode() {
      dropdown.open = desktopToc.matches;
      summary.tabIndex = desktopToc.matches ? -1 : 0;
      if (desktopToc.matches) summary.setAttribute('aria-hidden', 'true');
      else summary.removeAttribute('aria-hidden');
    }
    syncTocMode();
    if (desktopToc.addEventListener) desktopToc.addEventListener('change', syncTocMode);
    else if (desktopToc.addListener) desktopToc.addListener(syncTocMode);

    function updateActiveSection() {
      var anchorLine = 120;
      var active = sections[0];
      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= anchorLine) active = section;
      });
      setActive(active.id);
    }

    var framePending = false;
    window.addEventListener('scroll', function () {
      if (framePending) return;
      framePending = true;
      requestAnimationFrame(function () {
        updateActiveSection();
        framePending = false;
      });
    }, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    updateActiveSection();
    bindImageLightbox();
  }

  window.MixlyArticleToc = { mount: init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
