/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-product
 * Base block: carousel-product
 * Source: https://www.marutisuzuki.com/genuine-accessories
 * Selector: .section.product-recommendations-container > .product-recommendations-wrapper > .product-recommendations.block
 * Generated: 2026-05-29
 *
 * UE Model (carousel-product-item):
 *   - media_image (reference) — product image
 *   - media_imageAlt (text) — collapsed into media_image
 *   - content_text (richtext) — product label, SKU, price info
 *
 * Source structure: Splide carousel with product recommendation cards.
 * Each slide has an image wrapper and content (label, sku, price).
 * Target: Each slide becomes a row with [image cell] [content cell].
 * Handles shimmer/placeholder states by skipping empty slides.
 */
export default function parse(element, { document }) {
  // Extract product slides from the carousel
  const slides = element.querySelectorAll(
    '.product-recommendations-item, .splide__slide'
  );

  const cells = [];

  slides.forEach((slide) => {
    // Extract content elements
    const imgWrapper = slide.querySelector('.product-recommendations-item__image-wrapper');
    const img = imgWrapper ? imgWrapper.querySelector('img') : slide.querySelector('img');
    const label = slide.querySelector('.product-recommendations-item__label');
    const sku = slide.querySelector('.product-recommendations-item__sku');
    const priceLabel = slide.querySelector('.product-recommendations-item__price-label');
    const priceValue = slide.querySelector('.product-recommendations-item__price-value');
    const priceUnit = slide.querySelector('.product-recommendations-item__price-unit');

    // Determine if this slide has any real content (skip shimmer/empty placeholders)
    const hasImage = img && img.getAttribute('src');
    const hasLabel = label && label.textContent.trim();
    const hasPrice = (priceValue && priceValue.textContent.trim());

    if (!hasImage && !hasLabel && !hasPrice) {
      // Skip empty/shimmer slides with no actual content
      return;
    }

    // --- Image cell ---
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:media_image '));
    if (img) {
      imageCell.appendChild(img.cloneNode(true));
    }

    // --- Content cell ---
    const contentCell = document.createDocumentFragment();
    contentCell.appendChild(document.createComment(' field:content_text '));

    if (hasLabel) {
      const p = document.createElement('p');
      p.textContent = label.textContent.trim();
      contentCell.appendChild(p);
    }
    if (sku && sku.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = sku.textContent.trim();
      contentCell.appendChild(p);
    }
    // Combine price information into a single paragraph
    const priceParts = [];
    if (priceLabel && priceLabel.textContent.trim()) priceParts.push(priceLabel.textContent.trim());
    if (priceValue && priceValue.textContent.trim()) priceParts.push(priceValue.textContent.trim());
    if (priceUnit && priceUnit.textContent.trim()) priceParts.push(priceUnit.textContent.trim());
    if (priceParts.length > 0) {
      const p = document.createElement('p');
      p.textContent = priceParts.join(' ');
      contentCell.appendChild(p);
    }

    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-product', cells });
  element.replaceWith(block);
}
