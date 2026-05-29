/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-banner
 * Base block: carousel
 * Source: https://www.marutisuzuki.com/genuine-accessories
 * Selector: .offer-banner.block
 * Generated: 2026-05-29
 *
 * Source structure: Splide carousel with .splide__slide items each containing
 * .offer-banner-item > .offer-banner__media > picture > img.offer-banner__image
 *
 * Target structure (container block): Each slide = one row with 2 columns:
 *   Column 1: image (media_image field)
 *   Column 2: text content (content_text field) - may be empty in source
 *
 * UE Model: carousel-banner-item
 *   - media_image (reference) - Background Image
 *   - media_imageAlt (text, collapsed) - Background Alt
 *   - content_text (richtext) - Text
 */
export default function parse(element, { document }) {
  // Extract all slide items from the carousel
  const slides = element.querySelectorAll('.splide__slide .offer-banner-item, .offer-banner-item');

  const cells = [];

  slides.forEach((slide) => {
    // Column 1: Image (media group)
    const img = slide.querySelector('img.offer-banner__image, .offer-banner__media img, picture img');
    const picture = slide.querySelector('picture');

    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:media_image '));
    if (picture) {
      imageCell.appendChild(picture);
    } else if (img) {
      imageCell.appendChild(img);
    }

    // Column 2: Text content (content group)
    // In source, slides may only have images with no text overlay
    const contentCell = document.createDocumentFragment();
    const textContent = slide.querySelector('.offer-banner__content, .offer-banner-content, [class*="content"]');
    if (textContent) {
      contentCell.appendChild(document.createComment(' field:content_text '));
      contentCell.appendChild(textContent);
    }

    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-banner', cells });
  element.replaceWith(block);
}
