(() => {
  'use strict';

  /**
   * Shared desktop TOC pin for legal docs and articles.
   * Same flow everywhere:
   * 1) stick under the header while the layout is on screen
   * 2) slide up with the layout/footer stop line (classic sticky unstick)
   * 3) fully hide once the block has left the viewport — never leave a clipped strip
   */
  function pinDesktopToc(tocEl, options) {
    if (!tocEl || tocEl.dataset.tocPinBound === '1') {
      if (tocEl && tocEl.dataset.tocPinBound === '1') {
        window.dispatchEvent(new Event('resize'));
      }
      return;
    }
    tocEl.dataset.tocPinBound = '1';

    const opts = options || {};
    const layoutSelector = opts.layoutSelector || '.legal-layout';
    const spacerAttr = opts.spacerAttr || 'data-toc-spacer';
    const pinTop = opts.pinTop != null ? opts.pinTop : 96;
    const edgeGap = opts.edgeGap != null ? opts.edgeGap : 32;

    const desktop = window.matchMedia('(min-width: 981px)');
    let pinnedLeft = 0;
    let pinnedWidth = 0;
    let spacer = null;
    let frame = 0;

    const ensureSpacer = () => {
      if (spacer && spacer.isConnected) return spacer;
      spacer = tocEl.previousElementSibling;
      if (!spacer || spacer.getAttribute(spacerAttr) !== '1') {
        spacer = document.createElement('div');
        spacer.setAttribute(spacerAttr, '1');
        spacer.setAttribute('aria-hidden', 'true');
        tocEl.parentNode.insertBefore(spacer, tocEl);
      }
      return spacer;
    };

    const clearInline = () => {
      tocEl.style.position = '';
      tocEl.style.top = '';
      tocEl.style.left = '';
      tocEl.style.width = '';
      tocEl.style.maxHeight = '';
      tocEl.style.overflowY = '';
      tocEl.style.bottom = '';
      tocEl.style.visibility = '';
      tocEl.style.pointerEvents = '';
      if (spacer && spacer.isConnected) {
        spacer.style.display = 'none';
        spacer.style.height = '';
        spacer.style.width = '';
      }
    };

    const hideFixed = () => {
      // Keep layout column reserved, but do not paint a clipped remnant.
      tocEl.style.position = 'fixed';
      tocEl.style.left = `${pinnedLeft}px`;
      tocEl.style.width = `${pinnedWidth}px`;
      tocEl.style.top = `${pinTop}px`;
      tocEl.style.maxHeight = '';
      tocEl.style.visibility = 'hidden';
      tocEl.style.pointerEvents = 'none';
    };

    const measureColumn = () => {
      tocEl.style.visibility = '';
      tocEl.style.pointerEvents = '';
      tocEl.style.position = 'static';
      tocEl.style.top = '';
      tocEl.style.left = '';
      tocEl.style.width = '';
      tocEl.style.maxHeight = '';
      tocEl.style.bottom = '';
      const slot = ensureSpacer();
      slot.style.display = 'none';
      const rect = tocEl.getBoundingClientRect();
      pinnedLeft = Math.round(rect.left);
      pinnedWidth = Math.max(160, Math.round(rect.width));
      slot.style.display = 'block';
      slot.style.width = `${pinnedWidth}px`;
      slot.style.height = '1px';
      slot.style.pointerEvents = 'none';
      slot.style.visibility = 'hidden';
    };

    const applyPin = () => {
      if (!tocEl.isConnected) return;
      if (!desktop.matches) {
        clearInline();
        return;
      }

      const footer = document.querySelector('.site-footer');
      const layout = document.querySelector(layoutSelector);
      const footerTop = footer ? footer.getBoundingClientRect().top : window.innerHeight;
      const layoutBottom = layout ? layout.getBoundingClientRect().bottom : footerTop;
      const stopLine = Math.min(footerTop, layoutBottom) - edgeGap;

      // Layout already left the sticky band — same as sticky finished and scrolled away.
      if (layoutBottom <= pinTop) {
        hideFixed();
        return;
      }

      tocEl.style.visibility = '';
      tocEl.style.pointerEvents = '';
      tocEl.style.position = 'fixed';
      tocEl.style.left = `${pinnedLeft}px`;
      tocEl.style.width = `${pinnedWidth}px`;
      tocEl.style.bottom = 'auto';
      tocEl.style.overflowY = 'auto';

      // Height only capped by viewport while stuck — never crush into a 40–80px strip.
      const viewportCap = Math.max(160, window.innerHeight - pinTop - edgeGap);
      tocEl.style.maxHeight = `${viewportCap}px`;
      const tocHeight = tocEl.getBoundingClientRect().height || tocEl.offsetHeight;

      // Stick under header, then slide up with the stop line (may go negative).
      let top = pinTop;
      if (top + tocHeight > stopLine) {
        top = stopLine - tocHeight;
      }

      // Fully above the viewport → hide (no "50/50" crumb at the top edge).
      if (top + tocHeight <= 0) {
        hideFixed();
        return;
      }

      tocEl.style.top = `${Math.round(top)}px`;
    };

    const syncLayout = () => {
      if (!tocEl.isConnected) return;
      if (!desktop.matches) {
        clearInline();
        return;
      }
      measureColumn();
      applyPin();
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        applyPin();
      });
    };

    syncLayout();
    window.addEventListener('resize', syncLayout);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (desktop.addEventListener) desktop.addEventListener('change', syncLayout);
    else desktop.addListener(syncLayout);
    requestAnimationFrame(() => requestAnimationFrame(syncLayout));
  }

  window.MixlyTocPin = { pin: pinDesktopToc };
})();
