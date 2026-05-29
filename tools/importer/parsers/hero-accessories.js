/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-accessories
 * Base block: hero
 * Source: https://www.marutisuzuki.com/genuine-accessories
 * Selector: .section.hero-container .hero.block
 * Generated: 2026-05-29
 *
 * UE Model fields:
 *   - image (reference) — hero background image
 *   - imageAlt (text) — collapsed into image alt attribute
 *   - text (richtext) — heading, description, CTAs
 *
 * Structure: Simple block, 2 rows (image, text)
 */
export default function parse(element, { document }) {
  // Extract background/hero image from .hero-media picture element
  const heroMedia = element.querySelector('.hero-media picture, .hero-default-image picture');
  const heroImg = element.querySelector('.hero-media img, .hero-default-image img');

  // Extract heading from .hero-content-title
  const heading = element.querySelector('.hero-content-title h1, .hero-content h1');

  // Extract CTA button (Select Vehicle)
  const ctaButton = element.querySelector('.select-vehicle-btn');

  // Extract terms/conditions link
  const termsLink = element.querySelector('.terms-container-inner a, .termsCondition');

  // Build the text content cell (richtext field: heading + CTA + terms)
  const textContainer = document.createDocumentFragment();

  if (heading) {
    const h1 = document.createElement('h1');
    h1.textContent = heading.textContent.trim();
    textContainer.appendChild(h1);
  }

  if (ctaButton) {
    const p = document.createElement('p');
    const link = document.createElement('a');
    const labelSpan = ctaButton.querySelector('.label');
    link.textContent = labelSpan ? labelSpan.textContent.trim() : ctaButton.textContent.trim();
    link.href = '#';
    p.appendChild(link);
    textContainer.appendChild(p);
  }

  if (termsLink) {
    const p = document.createElement('p');
    const link = document.createElement('a');
    link.textContent = termsLink.textContent.trim();
    link.href = termsLink.href || '#';
    p.appendChild(link);
    textContainer.appendChild(p);
  }

  // Build image cell with field hint
  const imageCell = document.createDocumentFragment();
  imageCell.appendChild(document.createComment(' field:image '));
  if (heroMedia) {
    imageCell.appendChild(heroMedia.cloneNode(true));
  } else if (heroImg) {
    const img = heroImg.cloneNode(true);
    imageCell.appendChild(img);
  }

  // Build text cell with field hint
  const textCell = document.createDocumentFragment();
  textCell.appendChild(document.createComment(' field:text '));
  textCell.appendChild(textContainer);

  // Cells: Row 1 = image, Row 2 = text (simple block, one column)
  const cells = [
    [imageCell],
    [textCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-accessories', cells });
  element.replaceWith(block);
}
