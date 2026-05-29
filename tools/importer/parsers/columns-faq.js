/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-faq
 * Base block: columns
 * Selector: .smart-emi-banner.block
 * Description: Two-column layout with video/media on the left and FAQ accordion content on the right.
 * Source: https://www.marutisuzuki.com/genuine-accessories
 * Generated: 2026-05-29
 *
 * Source structure:
 *   .smart-emi > .smart-emi__left (video)
 *   .smart-emi > .smart-emi__right (heading, CTA, accordion FAQ items)
 *
 * Target: Columns block with 2 columns per row.
 *   Row 1: [video/media element] | [heading + CTA + FAQ accordion content]
 *
 * Note: Columns blocks do NOT require field hint comments per xwalk hinting rules (Rule 4 exception).
 */
export default function parse(element, { document }) {
  // Extract left column content (video/media)
  const leftCol = element.querySelector('.smart-emi__left');
  const video = element.querySelector('.smart-emi__video, video');

  // Extract right column content
  const rightCol = element.querySelector('.smart-emi__right');
  const heading = element.querySelector('.smart-emi__title, .smart-emi__header h2');
  const ctaLink = element.querySelector('.smart-emi__ctalink, .smart-emi__header a');
  const accordion = element.querySelector('.accordion');
  const accordionItems = Array.from(element.querySelectorAll('.accordion__item, details'));

  // Build left cell content
  const leftCell = [];
  if (video) {
    leftCell.push(video);
  } else if (leftCol) {
    leftCell.push(leftCol);
  }

  // Build right cell content
  const rightCell = [];
  if (heading) {
    rightCell.push(heading);
  }
  if (ctaLink) {
    rightCell.push(ctaLink);
  }
  // Add each FAQ accordion item as content in the right column
  if (accordion) {
    rightCell.push(accordion);
  } else if (accordionItems.length > 0) {
    accordionItems.forEach((item) => rightCell.push(item));
  }

  // Build cells array - single row with 2 columns
  const cells = [
    [leftCell.length === 1 ? leftCell[0] : leftCell, rightCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-faq', cells });
  element.replaceWith(block);
}
