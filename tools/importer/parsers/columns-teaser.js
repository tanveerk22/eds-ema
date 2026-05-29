/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-teaser
 * Base block: columns
 * Source: https://www.marutisuzuki.com/genuine-accessories
 * Generated: 2026-05-29
 *
 * Extracts a two-column teaser layout:
 *   Column 1 (content): heading, description, CTA link
 *   Column 2 (media): image
 *
 * Columns blocks do NOT require field hints per xwalk hinting rules.
 */
export default function parse(element, { document }) {
  // Extract heading from the title section
  const heading = element.querySelector('.signup-teaser__title h2, .signup-teaser__title h1, h2, h1');

  // Extract description paragraph
  const description = element.querySelector('p.signup-teaser__description, .signup-teaser__content p');

  // Extract CTA link
  const ctaLink = element.querySelector('a.signup-teaser__cta, .signup-teaser__link a, .signup-teaser__actions a');

  // Extract image from media section
  const image = element.querySelector('.signup-teaser__media img.signup-teaser__image, .signup-teaser__media img, .signup-teaser__picture img, img');

  // Build content column (column 1)
  const contentCol = [];
  if (heading) contentCol.push(heading);
  if (description) contentCol.push(description);
  if (ctaLink) contentCol.push(ctaLink);

  // Build media column (column 2)
  const mediaCol = [];
  if (image) mediaCol.push(image);

  // Columns block: single row with one cell per column
  const cells = [
    [contentCol, mediaCol]
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-teaser', cells });
  element.replaceWith(block);
}
