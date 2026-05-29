/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-promo
 * Base block: columns
 * Source selector: .section.hero-container .trusted-product-banner.block
 * Project type: xwalk (columns blocks do NOT require field hints per hinting.md Rule 4 exception)
 * Generated: 2026-05-29
 *
 * Structure: 2-column layout with 1 row
 *   - Column 1: Background/promo image
 *   - Column 2: Heading + subtitle/description text
 */
export default function parse(element, { document }) {
  // Extract image from .tpb__media
  const image = element.querySelector('.tpb__media img.tpb__image, .tpb__media img, picture img');

  // Extract heading from .tpb__title or fallback
  const heading = element.querySelector('.tpb__title h2, .tpb__title h1, .tpb__content h2, .tpb__content h1, h2, h1');

  // Extract subtitle/description from .tpb__subtitle or fallback
  const subtitle = element.querySelector('p.tpb__subtitle, .tpb__title p, .tpb__content p');

  // Build column 1: image
  const col1 = [];
  if (image) {
    const pic = image.closest('picture') || image;
    col1.push(pic);
  }

  // Build column 2: heading + description
  const col2 = [];
  if (heading) col2.push(heading);
  if (subtitle) col2.push(subtitle);

  // Cells: one row with two columns (image | text content)
  const cells = [
    [col1, col2],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-promo', cells });
  element.replaceWith(block);
}
