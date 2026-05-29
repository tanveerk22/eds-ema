/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Maruti Suzuki DM/Scene7 image rewriter.
 * Converts DM <img> tags into anchors that survive markdown round-trip.
 * Runs in afterTransform only (block parsers need <img> during beforeTransform).
 *
 * Site-specific: www.marutisuzuki.com serves DM Open API images at
 * /adobe/assets/urn: paths behind its own vanity domain (not the standard
 * delivery-p*-e* hostname). Detection extended accordingly.
 *
 * All selectors validated against migration-work/cleaned.html.
 */

// ---- Begin canonical helpers (adapted from dm-scene7-helpers.js) ----

/**
 * Detects whether a URL is a Dynamic Media / Scene7 URL.
 * Extended for www.marutisuzuki.com which serves DM Open API content
 * at /adobe/assets/urn: paths behind its own domain.
 */
function detectDynamicMediaUrl(urlStr) {
  let u;
  try { u = new URL(urlStr, 'https://x/'); } catch { return false; }
  // Scene7 detected by path alone — hostname is irrelevant because
  // customer sites routinely CNAME a vanity domain to Scene7.
  if (u.pathname.startsWith('/is/image/')) {
    return 'scene7';
  }
  // Standard DM Open API (publish-tier delivery hostname)
  if (/^delivery-p\d+-e\d+\.adobeaemcloud\.com$/.test(u.hostname)
      && u.pathname.startsWith('/adobe/assets/urn:')) {
    return 'dm-openapi';
  }
  // Site-specific: www.marutisuzuki.com serves DM Open API at /adobe/assets/urn:
  if (u.hostname === 'www.marutisuzuki.com'
      && u.pathname.startsWith('/adobe/assets/urn:')) {
    return 'dm-openapi';
  }
  return false;
}

// Walk up from a DM <img> through allow-listed inline wrappers (currently
// just <picture>) to find the carrier anchor for the linked-image
// round-trip. Returns the outer <a> when the img is the sole meaningful
// descendant; null otherwise.
const LINKED_DM_INLINE_WRAPPER_TAGS = new Set(['PICTURE']);
const LINKED_DM_WRAPPER_SIBLING_TAGS = new Set(['SOURCE']);
function findLinkedDmCarrier(img) {
  if (!img || !img.parentElement) return null;
  let node = img;
  let parent = img.parentElement;
  while (parent && LINKED_DM_INLINE_WRAPPER_TAGS.has(parent.tagName)) {
    let foundNode = false;
    for (const child of parent.children) {
      if (child === node) {
        foundNode = true;
      } else if (!LINKED_DM_WRAPPER_SIBLING_TAGS.has(child.tagName)) {
        return null;
      }
    }
    if (!foundNode) return null;
    node = parent;
    parent = parent.parentElement;
  }
  if (!parent || parent.tagName !== 'A') return null;
  if (parent.children.length !== 1 || parent.children[0] !== node) return null;
  if (parent.textContent.trim() !== '') return null;
  return parent;
}

const EMPTY_ALT_SENTINEL = 'Image without alt text';

function altToLinkText(alt) {
  return alt || EMPTY_ALT_SENTINEL;
}
// ---- End canonical helpers ----

export default function transform(hookName, element, payload) {
  if (hookName !== 'afterTransform') return;
  const doc = element.ownerDocument;

  element.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src') || '';
    if (!detectDynamicMediaUrl(src)) return;

    const alt = img.getAttribute('alt') || '';

    // Linked image case: DM URL stashed in title, keep outer href
    const linkedAnchor = findLinkedDmCarrier(img);
    if (linkedAnchor) {
      linkedAnchor.setAttribute('title', src);
      linkedAnchor.textContent = altToLinkText(alt);
      return;
    }

    // Inside an anchor but not a sole-meaningful-child shape — mixed content, skip
    const parent = img.parentElement;
    if (parent && parent.tagName === 'A') {
      // eslint-disable-next-line no-console
      console.warn('DM image inside mixed-content anchor, skipped:', src);
      return;
    }

    // Unlinked image: create an anchor whose href is the DM URL
    const a = doc.createElement('a');
    a.href = src;
    a.textContent = altToLinkText(alt);
    img.replaceWith(a);
  });
}
