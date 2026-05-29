/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Maruti Suzuki Genuine Accessories site-wide cleanup.
 * Removes non-authorable content (header, footer, nav, modals, tracking iframes, SEO tags).
 * All selectors validated against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove modal/popup overlays that may interfere with block parsing
    // Found in cleaned.html line 3260: <div id="TT_offerModal" class="TT_bankOfferModal">
    WebImporter.DOMUtils.remove(element, ['#TT_offerModal']);

    // Remove tooltip overlay: <div class="custom-tooltip"> (line 3258)
    WebImporter.DOMUtils.remove(element, ['.custom-tooltip']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove site header: <header class="header-wrapper"> (line 1)
    WebImporter.DOMUtils.remove(element, ['header.header-wrapper']);

    // Remove site footer: <footer class="footer-wrapper"> (line 3062)
    WebImporter.DOMUtils.remove(element, ['footer.footer-wrapper']);

    // Remove tracking/ad iframes (lines 3256, 3268: doubleclick.net, empty iframes)
    WebImporter.DOMUtils.remove(element, ['iframe']);

    // Remove SEO tags section (not authorable): <div class="section expandable-content-container tags-list-container"> (line 2933)
    WebImporter.DOMUtils.remove(element, ['.section.expandable-content-container.tags-list-container']);
  }
}
