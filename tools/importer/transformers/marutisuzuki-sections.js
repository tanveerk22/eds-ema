/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Maruti Suzuki Genuine Accessories section breaks and section metadata.
 * Inserts <hr> between sections and adds Section Metadata blocks for sections with styles.
 * Runs in afterTransform only. Processes sections in reverse order.
 * All selectors validated against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = payload;
    const sections = payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to avoid DOM position shifts
    const reversedSections = [...sections].reverse();

    reversedSections.forEach((section, reverseIndex) => {
      const originalIndex = sections.length - 1 - reverseIndex;
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) return;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.append(sectionMetadata);
      }

      // Insert <hr> before section if not the first section
      if (originalIndex > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}
