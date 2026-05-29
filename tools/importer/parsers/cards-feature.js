/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-feature
 * Base block: cards
 * Source: https://www.marutisuzuki.com/genuine-accessories
 * Selector: .sign-up-teaser.block .signup-teaser--cards_teaser
 * Generated: 2026-05-29
 *
 * Container block: each .signup-teaser__step becomes one row
 * Model fields per card: image (reference), text (richtext)
 */
export default function parse(element, { document }) {
  // Extract all step/card items from the source
  const steps = element.querySelectorAll('.signup-teaser__step');

  const cells = [];

  steps.forEach((step) => {
    // Extract image
    const img = step.querySelector('img.signup-teaser__step-image, img');

    // Extract text content (heading + description combined as richtext)
    const heading = step.querySelector('.signup-teaser__step-subtitle h3, .signup-teaser__step-subtitle h2, h3');
    const description = step.querySelector('p.signup-teaser__step-description, p');

    // Build image cell with field hint
    const imageCell = document.createDocumentFragment();
    if (img) {
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(img);
    }

    // Build text cell with field hint (heading + description as richtext)
    const textCell = document.createDocumentFragment();
    const hasTextContent = heading || description;
    if (hasTextContent) {
      textCell.appendChild(document.createComment(' field:text '));
      if (heading) textCell.appendChild(heading);
      if (description) textCell.appendChild(description);
    }

    // Each card is one row with [image, text] columns
    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-feature', cells });
  element.replaceWith(block);
}
