/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-feature
 * Base block: columns
 * Source selector: .car-config-teaser.block
 * Project type: xwalk (columns blocks do NOT require field hints per hinting rules Rule 4 exception)
 * Generated: 2026-05-29
 *
 * Structure: 2-column layout with 1 row
 *   - Column 1 (content): subtitle, heading, CTA button
 *   - Column 2 (media): feature image (car configurator / 360 view)
 *
 * Source: https://www.marutisuzuki.com/genuine-accessories
 */
export default function parse(element, { document }) {
  // Extract subtitle from .car-teaser__subtitle
  const subtitle = element.querySelector('p.car-teaser__subtitle, .car-teaser__content > p:first-of-type');

  // Extract heading from .car-teaser__title
  const heading = element.querySelector('.car-teaser__title h2, .car-teaser__title h1, .car-teaser__content h2, h2, h1');

  // Extract CTA button - convert button to a link-like element for EDS compatibility
  const ctaButton = element.querySelector('button.car-teaser__button, .car-teaser__content button, .car-teaser__content a');

  // Extract main feature image from the image wrapper
  const image = element.querySelector('picture.car-teaser__fallback-image img, .car-teaser__image-container img, .car-teaser__image-wrapper img');

  // Build column 1: content (subtitle + heading + CTA)
  const col1 = [];
  if (subtitle) col1.push(subtitle);
  if (heading) col1.push(heading);
  if (ctaButton) {
    // If it's a button element (not an anchor), create an anchor for EDS block format
    if (ctaButton.tagName === 'BUTTON') {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = ctaButton.textContent.trim();
      col1.push(link);
    } else {
      col1.push(ctaButton);
    }
  }

  // Build column 2: media (feature image)
  const col2 = [];
  if (image) {
    const pic = image.closest('picture') || image;
    col2.push(pic);
  }

  // Cells: one row with two columns (content | media)
  const cells = [
    [col1, col2],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
