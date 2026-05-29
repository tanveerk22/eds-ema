/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-vehicle.
 * Base block: carousel.
 * Source: https://www.marutisuzuki.com/genuine-accessories
 * Generated: 2026-05-29
 *
 * Container block: each vehicle slide becomes one row.
 * UE Model fields per item: media_image (reference), media_imageAlt (collapsed), content_text (richtext)
 * Rows = number of slide items; Columns per row = [media_image | content_text]
 */
export default function parse(element, { document }) {
  // Extract all vehicle slide items from the carousel
  const slides = element.querySelectorAll('li.splide__slide');

  const cells = [];

  slides.forEach((slide) => {
    // Vehicle image (maps to media_image field)
    const vehicleImg = slide.querySelector('.cars__image img, div.cars__image img');
    // Vehicle logo/name (maps to content_text field)
    const vehicleLogo = slide.querySelector('img.cars__logo, .cars__details img');

    // Build cell for media_image (column 1)
    const mediaCell = document.createDocumentFragment();
    mediaCell.appendChild(document.createComment(' field:media_image '));
    if (vehicleImg) {
      const img = vehicleImg.cloneNode(true);
      mediaCell.appendChild(img);
    }

    // Build cell for content_text (column 2)
    const contentCell = document.createDocumentFragment();
    contentCell.appendChild(document.createComment(' field:content_text '));
    if (vehicleLogo) {
      const logo = vehicleLogo.cloneNode(true);
      contentCell.appendChild(logo);
    }

    cells.push([mediaCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-vehicle', cells });
  element.replaceWith(block);
}
