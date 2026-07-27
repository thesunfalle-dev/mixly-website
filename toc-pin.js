(() => {
  'use strict';

  /**
   * Desktop TOC pin shared by legal docs and articles.
   * Fixed under the header; slides up against layout bottom + footer so it
   * never covers page chrome at the end.
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
      // Same stop rule as legal docs: end of grid column / footer, not mid-page hide hacks.
      const stopLine = Math.min(footerTop, layoutBottom) - edgeGap;

      tocEl.style.visibility = '';
      tocEl.style.pointerEvents = '';
      tocEl.style.position = 'fixed';
      tocEl.style.left = `${pinnedLeft}px`;
      tocEl.style.width = `${pinnedWidth}px`;
      tocEl.style.bottom = 'auto';
      tocEl.style.overflowY = 'auto';

      const viewportCap = Math.max(120, window.innerHeight - pinTop - edgeGap);
      tocEl.style.maxHeight = `${viewportCap}px`;
      let tocHeight = tocEl.getBoundingClientRect().height || tocEl.offsetHeight;

      // Classic sticky: stick under header, then unstick / slide up against stopLine.
      let top = pinTop;
      if (top + tocHeight > stopLine) {
        top = stopLine - tocHeight;
      }
      if (top < edgeGap) {
        top = edgeGap;
        const tightCap = Math.max(80, stopLine - top);
        tocEl.style.maxHeight = `${tightCap}px`;
        tocHeight = tocEl.getBoundingClientRect().height || tocEl.offsetHeight;
        top = Math.min(pinTop, stopLine - tocHeight);
        if (top < edgeGap) top = edgeGap;
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
