/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroAccessoriesParser from './parsers/hero-accessories.js';
import columnsPromoParser from './parsers/columns-promo.js';
import carouselProductParser from './parsers/carousel-product.js';
import carouselVehicleParser from './parsers/carousel-vehicle.js';
import columnsTeaserParser from './parsers/columns-teaser.js';
import cardsCategoryParser from './parsers/cards-category.js';
import carouselBannerParser from './parsers/carousel-banner.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import cardsFeatureParser from './parsers/cards-feature.js';
import columnsFaqParser from './parsers/columns-faq.js';
import cardsPromoParser from './parsers/cards-promo.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/marutisuzuki-cleanup.js';
import sectionsTransformer from './transformers/marutisuzuki-sections.js';
import dmImagesTransformer from './transformers/marutisuzuki-dm-images.js';

// PARSER REGISTRY
const parsers = {
  'hero-accessories': heroAccessoriesParser,
  'columns-promo': columnsPromoParser,
  'carousel-product': carouselProductParser,
  'carousel-vehicle': carouselVehicleParser,
  'columns-teaser': columnsTeaserParser,
  'cards-category': cardsCategoryParser,
  'carousel-banner': carouselBannerParser,
  'columns-feature': columnsFeatureParser,
  'cards-feature': cardsFeatureParser,
  'columns-faq': columnsFaqParser,
  'cards-promo': cardsPromoParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'genuine-accessories',
  description: 'Genuine accessories landing page showcasing Maruti Suzuki vehicle accessories categories',
  urls: ['https://www.marutisuzuki.com/genuine-accessories'],
  blocks: [
    {
      name: 'hero-accessories',
      instances: ['.section.hero-container .hero.block'],
    },
    {
      name: 'columns-promo',
      instances: ['.section.hero-container .trusted-product-banner.block'],
    },
    {
      name: 'carousel-product',
      instances: ['.section.product-recommendations-container > .product-recommendations-wrapper > .product-recommendations.block'],
    },
    {
      name: 'carousel-vehicle',
      instances: ['.section.car-carousel-container .car-carousel.block'],
    },
    {
      name: 'columns-teaser',
      instances: ['.section.sign-up-teaser-container .sign-up-teaser.block .signup-teaser--rewards_teaser'],
    },
    {
      name: 'cards-category',
      instances: ['.section.explore-category-container .explore-category.block'],
    },
    {
      name: 'carousel-banner',
      instances: ['.offer-banner.block'],
    },
    {
      name: 'columns-feature',
      instances: ['.car-config-teaser.block'],
    },
    {
      name: 'cards-feature',
      instances: ['.sign-up-teaser.block .signup-teaser--cards_teaser'],
    },
    {
      name: 'columns-faq',
      instances: ['.smart-emi-banner.block'],
    },
    {
      name: 'cards-promo',
      instances: ['.slider.block'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Section',
      selector: '.section.hero-container.trusted-product-banner-container',
      style: 'dark',
      blocks: ['hero-accessories', 'columns-promo'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Product Recommendations',
      selector: 'div.section.product-recommendations-container',
      style: null,
      blocks: ['carousel-product'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Car Selector',
      selector: '.section.car-carousel-container',
      style: null,
      blocks: ['carousel-vehicle'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Rewards Teaser',
      selector: '.section.sign-up-teaser-container.product-recommendations-container',
      style: null,
      blocks: ['columns-teaser'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'Categories and Offers',
      selector: '.section.explore-category-container.fragment-container.offer-banner-container.car-config-teaser-container',
      style: null,
      blocks: ['cards-category', 'carousel-banner', 'columns-feature'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: 'Features and More',
      selector: '.section.fragment-container.product-recommendations-container.smart-emi-banner-container.sign-up-teaser-container',
      style: null,
      blocks: ['cards-feature', 'carousel-product', 'columns-faq', 'cards-promo'],
      defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
  dmImagesTransformer,
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
