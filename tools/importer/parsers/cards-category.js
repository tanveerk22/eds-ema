/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-category
 * Base block: cards
 * Source: https://www.marutisuzuki.com/genuine-accessories
 * Selector: .section.explore-category-container .explore-category.block
 * Generated: 2026-05-29
 *
 * Container block: each card item = one row with [image, text] columns.
 * Extracts category cards (static + carousel subcategory cards) from the
 * explore-category component.
 */
export default function parse(element, { document }) {
  // Extract all card links - both the static category card and carousel subcategory cards
  const allCardLinks = Array.from(element.querySelectorAll('a.explore-category__card-content-wrapper'));

  const cells = [];

  allCardLinks.forEach((cardLink) => {
    // Image column
    const img = cardLink.querySelector('img.explore-category__card-image');

    // Text column - build richtext with label as a link
    const label = cardLink.querySelector('.explore-category__card-label');
    const href = cardLink.getAttribute('href');

    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));

    if (label && href) {
      const link = document.createElement('a');
      link.setAttribute('href', href);
      link.textContent = label.textContent.trim();
      textCell.appendChild(link);
    } else if (label) {
      const p = document.createElement('p');
      p.textContent = label.textContent.trim();
      textCell.appendChild(p);
    }

    // Image cell with field hint
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:image '));
    if (img) {
      const clonedImg = img.cloneNode(true);
      imageCell.appendChild(clonedImg);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-category', cells });
  element.replaceWith(block);
}
