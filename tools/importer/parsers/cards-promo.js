/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-promo variant.
 * Base block: cards
 * Source: https://www.marutisuzuki.com/genuine-accessories
 * Selector: .slider.block
 * Generated: 2026-05-29
 *
 * Source structure:
 *   .slider.block
 *     h2.slider-title (section heading - not part of block table)
 *     hr
 *     .teaser-content .splide__slide[] (repeating card items)
 *       .teaser__card > a
 *         .teaser__image > picture > img (card image)
 *         .teaser__content > .teaser__info > .title-arrow
 *           .teaser__title > h3.card-title (card title)
 *           .teaser__description > p (card description)
 *           button.teaser__read-more (CTA text)
 *
 * UE Model (container block):
 *   Each card row: col1 = image (reference), col2 = text (richtext)
 *   Field hints: <!-- field:image -->, <!-- field:text -->
 */
export default function parse(element, { document }) {
  // Extract all card slides
  const slides = element.querySelectorAll('.splide__slide .teaser__card');

  const cells = [];

  slides.forEach((card) => {
    // Extract image from the card
    const img = card.querySelector('.teaser__image img');

    // Extract text content: title, description, and CTA link
    const title = card.querySelector('h3.card-title, .teaser__title h3');
    const description = card.querySelector('.teaser__description p, .teaser__description');
    const ctaButton = card.querySelector('button.teaser__read-more, .teaser__read-more');
    const cardLink = card.querySelector(':scope > a');

    // Build image cell with field hint
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:image '));
    if (img) {
      const picture = img.closest('picture') || img;
      imageCell.appendChild(picture);
    }

    // Build text cell with field hint (title + description + CTA as link)
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));

    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent;
      textCell.appendChild(h3);
    }

    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent;
      textCell.appendChild(p);
    }

    // Convert button text + card link href into an anchor element for CTA
    if (ctaButton && cardLink) {
      const link = document.createElement('a');
      link.href = cardLink.href;
      link.textContent = ctaButton.textContent.trim();
      textCell.appendChild(link);
    } else if (ctaButton) {
      const p2 = document.createElement('p');
      p2.textContent = ctaButton.textContent.trim();
      textCell.appendChild(p2);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-promo', cells });
  element.replaceWith(block);
}
