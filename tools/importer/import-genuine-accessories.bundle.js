/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-genuine-accessories.js
  var import_genuine_accessories_exports = {};
  __export(import_genuine_accessories_exports, {
    default: () => import_genuine_accessories_default
  });

  // tools/importer/parsers/hero-accessories.js
  function parse(element, { document }) {
    const heroMedia = element.querySelector(".hero-media picture, .hero-default-image picture");
    const heroImg = element.querySelector(".hero-media img, .hero-default-image img");
    const heading = element.querySelector(".hero-content-title h1, .hero-content h1");
    const ctaButton = element.querySelector(".select-vehicle-btn");
    const termsLink = element.querySelector(".terms-container-inner a, .termsCondition");
    const textContainer = document.createDocumentFragment();
    if (heading) {
      const h1 = document.createElement("h1");
      h1.textContent = heading.textContent.trim();
      textContainer.appendChild(h1);
    }
    if (ctaButton) {
      const p = document.createElement("p");
      const link = document.createElement("a");
      const labelSpan = ctaButton.querySelector(".label");
      link.textContent = labelSpan ? labelSpan.textContent.trim() : ctaButton.textContent.trim();
      link.href = "#";
      p.appendChild(link);
      textContainer.appendChild(p);
    }
    if (termsLink) {
      const p = document.createElement("p");
      const link = document.createElement("a");
      link.textContent = termsLink.textContent.trim();
      link.href = termsLink.href || "#";
      p.appendChild(link);
      textContainer.appendChild(p);
    }
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(" field:image "));
    if (heroMedia) {
      imageCell.appendChild(heroMedia.cloneNode(true));
    } else if (heroImg) {
      const img = heroImg.cloneNode(true);
      imageCell.appendChild(img);
    }
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(" field:text "));
    textCell.appendChild(textContainer);
    const cells = [
      [imageCell],
      [textCell]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-accessories", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-promo.js
  function parse2(element, { document }) {
    const image = element.querySelector(".tpb__media img.tpb__image, .tpb__media img, picture img");
    const heading = element.querySelector(".tpb__title h2, .tpb__title h1, .tpb__content h2, .tpb__content h1, h2, h1");
    const subtitle = element.querySelector("p.tpb__subtitle, .tpb__title p, .tpb__content p");
    const col1 = [];
    if (image) {
      const pic = image.closest("picture") || image;
      col1.push(pic);
    }
    const col2 = [];
    if (heading) col2.push(heading);
    if (subtitle) col2.push(subtitle);
    const cells = [
      [col1, col2]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-product.js
  function parse3(element, { document }) {
    const slides = element.querySelectorAll(
      ".product-recommendations-item, .splide__slide"
    );
    const cells = [];
    slides.forEach((slide) => {
      const imgWrapper = slide.querySelector(".product-recommendations-item__image-wrapper");
      const img = imgWrapper ? imgWrapper.querySelector("img") : slide.querySelector("img");
      const label = slide.querySelector(".product-recommendations-item__label");
      const sku = slide.querySelector(".product-recommendations-item__sku");
      const priceLabel = slide.querySelector(".product-recommendations-item__price-label");
      const priceValue = slide.querySelector(".product-recommendations-item__price-value");
      const priceUnit = slide.querySelector(".product-recommendations-item__price-unit");
      const hasImage = img && img.getAttribute("src");
      const hasLabel = label && label.textContent.trim();
      const hasPrice = priceValue && priceValue.textContent.trim();
      if (!hasImage && !hasLabel && !hasPrice) {
        return;
      }
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(" field:media_image "));
      if (img) {
        imageCell.appendChild(img.cloneNode(true));
      }
      const contentCell = document.createDocumentFragment();
      contentCell.appendChild(document.createComment(" field:content_text "));
      if (hasLabel) {
        const p = document.createElement("p");
        p.textContent = label.textContent.trim();
        contentCell.appendChild(p);
      }
      if (sku && sku.textContent.trim()) {
        const p = document.createElement("p");
        p.textContent = sku.textContent.trim();
        contentCell.appendChild(p);
      }
      const priceParts = [];
      if (priceLabel && priceLabel.textContent.trim()) priceParts.push(priceLabel.textContent.trim());
      if (priceValue && priceValue.textContent.trim()) priceParts.push(priceValue.textContent.trim());
      if (priceUnit && priceUnit.textContent.trim()) priceParts.push(priceUnit.textContent.trim());
      if (priceParts.length > 0) {
        const p = document.createElement("p");
        p.textContent = priceParts.join(" ");
        contentCell.appendChild(p);
      }
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-vehicle.js
  function parse4(element, { document }) {
    const slides = element.querySelectorAll("li.splide__slide");
    const cells = [];
    slides.forEach((slide) => {
      const vehicleImg = slide.querySelector(".cars__image img, div.cars__image img");
      const vehicleLogo = slide.querySelector("img.cars__logo, .cars__details img");
      const mediaCell = document.createDocumentFragment();
      mediaCell.appendChild(document.createComment(" field:media_image "));
      if (vehicleImg) {
        const img = vehicleImg.cloneNode(true);
        mediaCell.appendChild(img);
      }
      const contentCell = document.createDocumentFragment();
      contentCell.appendChild(document.createComment(" field:content_text "));
      if (vehicleLogo) {
        const logo = vehicleLogo.cloneNode(true);
        contentCell.appendChild(logo);
      }
      cells.push([mediaCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-vehicle", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-teaser.js
  function parse5(element, { document }) {
    const heading = element.querySelector(".signup-teaser__title h2, .signup-teaser__title h1, h2, h1");
    const description = element.querySelector("p.signup-teaser__description, .signup-teaser__content p");
    const ctaLink = element.querySelector("a.signup-teaser__cta, .signup-teaser__link a, .signup-teaser__actions a");
    const image = element.querySelector(".signup-teaser__media img.signup-teaser__image, .signup-teaser__media img, .signup-teaser__picture img, img");
    const contentCol = [];
    if (heading) contentCol.push(heading);
    if (description) contentCol.push(description);
    if (ctaLink) contentCol.push(ctaLink);
    const mediaCol = [];
    if (image) mediaCol.push(image);
    const cells = [
      [contentCol, mediaCol]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-teaser", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-category.js
  function parse6(element, { document }) {
    const allCardLinks = Array.from(element.querySelectorAll("a.explore-category__card-content-wrapper"));
    const cells = [];
    allCardLinks.forEach((cardLink) => {
      const img = cardLink.querySelector("img.explore-category__card-image");
      const label = cardLink.querySelector(".explore-category__card-label");
      const href = cardLink.getAttribute("href");
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(" field:text "));
      if (label && href) {
        const link = document.createElement("a");
        link.setAttribute("href", href);
        link.textContent = label.textContent.trim();
        textCell.appendChild(link);
      } else if (label) {
        const p = document.createElement("p");
        p.textContent = label.textContent.trim();
        textCell.appendChild(p);
      }
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(" field:image "));
      if (img) {
        const clonedImg = img.cloneNode(true);
        imageCell.appendChild(clonedImg);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-category", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-banner.js
  function parse7(element, { document }) {
    const slides = element.querySelectorAll(".splide__slide .offer-banner-item, .offer-banner-item");
    const cells = [];
    slides.forEach((slide) => {
      const img = slide.querySelector("img.offer-banner__image, .offer-banner__media img, picture img");
      const picture = slide.querySelector("picture");
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(" field:media_image "));
      if (picture) {
        imageCell.appendChild(picture);
      } else if (img) {
        imageCell.appendChild(img);
      }
      const contentCell = document.createDocumentFragment();
      const textContent = slide.querySelector('.offer-banner__content, .offer-banner-content, [class*="content"]');
      if (textContent) {
        contentCell.appendChild(document.createComment(" field:content_text "));
        contentCell.appendChild(textContent);
      }
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse8(element, { document }) {
    const subtitle = element.querySelector("p.car-teaser__subtitle, .car-teaser__content > p:first-of-type");
    const heading = element.querySelector(".car-teaser__title h2, .car-teaser__title h1, .car-teaser__content h2, h2, h1");
    const ctaButton = element.querySelector("button.car-teaser__button, .car-teaser__content button, .car-teaser__content a");
    const image = element.querySelector("picture.car-teaser__fallback-image img, .car-teaser__image-container img, .car-teaser__image-wrapper img");
    const col1 = [];
    if (subtitle) col1.push(subtitle);
    if (heading) col1.push(heading);
    if (ctaButton) {
      if (ctaButton.tagName === "BUTTON") {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = ctaButton.textContent.trim();
        col1.push(link);
      } else {
        col1.push(ctaButton);
      }
    }
    const col2 = [];
    if (image) {
      const pic = image.closest("picture") || image;
      col2.push(pic);
    }
    const cells = [
      [col1, col2]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-feature.js
  function parse9(element, { document }) {
    const steps = element.querySelectorAll(".signup-teaser__step");
    const cells = [];
    steps.forEach((step) => {
      const img = step.querySelector("img.signup-teaser__step-image, img");
      const heading = step.querySelector(".signup-teaser__step-subtitle h3, .signup-teaser__step-subtitle h2, h3");
      const description = step.querySelector("p.signup-teaser__step-description, p");
      const imageCell = document.createDocumentFragment();
      if (img) {
        imageCell.appendChild(document.createComment(" field:image "));
        imageCell.appendChild(img);
      }
      const textCell = document.createDocumentFragment();
      const hasTextContent = heading || description;
      if (hasTextContent) {
        textCell.appendChild(document.createComment(" field:text "));
        if (heading) textCell.appendChild(heading);
        if (description) textCell.appendChild(description);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-faq.js
  function parse10(element, { document }) {
    const leftCol = element.querySelector(".smart-emi__left");
    const video = element.querySelector(".smart-emi__video, video");
    const rightCol = element.querySelector(".smart-emi__right");
    const heading = element.querySelector(".smart-emi__title, .smart-emi__header h2");
    const ctaLink = element.querySelector(".smart-emi__ctalink, .smart-emi__header a");
    const accordion = element.querySelector(".accordion");
    const accordionItems = Array.from(element.querySelectorAll(".accordion__item, details"));
    const leftCell = [];
    if (video) {
      leftCell.push(video);
    } else if (leftCol) {
      leftCell.push(leftCol);
    }
    const rightCell = [];
    if (heading) {
      rightCell.push(heading);
    }
    if (ctaLink) {
      rightCell.push(ctaLink);
    }
    if (accordion) {
      rightCell.push(accordion);
    } else if (accordionItems.length > 0) {
      accordionItems.forEach((item) => rightCell.push(item));
    }
    const cells = [
      [leftCell.length === 1 ? leftCell[0] : leftCell, rightCell]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-promo.js
  function parse11(element, { document }) {
    const slides = element.querySelectorAll(".splide__slide .teaser__card");
    const cells = [];
    slides.forEach((card) => {
      const img = card.querySelector(".teaser__image img");
      const title = card.querySelector("h3.card-title, .teaser__title h3");
      const description = card.querySelector(".teaser__description p, .teaser__description");
      const ctaButton = card.querySelector("button.teaser__read-more, .teaser__read-more");
      const cardLink = card.querySelector(":scope > a");
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(" field:image "));
      if (img) {
        const picture = img.closest("picture") || img;
        imageCell.appendChild(picture);
      }
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(" field:text "));
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent;
        textCell.appendChild(h3);
      }
      if (description) {
        const p = document.createElement("p");
        p.textContent = description.textContent;
        textCell.appendChild(p);
      }
      if (ctaButton && cardLink) {
        const link = document.createElement("a");
        link.href = cardLink.href;
        link.textContent = ctaButton.textContent.trim();
        textCell.appendChild(link);
      } else if (ctaButton) {
        const p2 = document.createElement("p");
        p2.textContent = ctaButton.textContent.trim();
        textCell.appendChild(p2);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/marutisuzuki-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, ["#TT_offerModal"]);
      WebImporter.DOMUtils.remove(element, [".custom-tooltip"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, ["header.header-wrapper"]);
      WebImporter.DOMUtils.remove(element, ["footer.footer-wrapper"]);
      WebImporter.DOMUtils.remove(element, ["iframe"]);
      WebImporter.DOMUtils.remove(element, [".section.expandable-content-container.tags-list-container"]);
    }
  }

  // tools/importer/transformers/marutisuzuki-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = payload;
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversedSections = [...sections].reverse();
      reversedSections.forEach((section, reverseIndex) => {
        const originalIndex = sections.length - 1 - reverseIndex;
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(sectionMetadata);
        }
        if (originalIndex > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/transformers/marutisuzuki-dm-images.js
  function detectDynamicMediaUrl(urlStr) {
    let u;
    try {
      u = new URL(urlStr, "https://x/");
    } catch (e) {
      return false;
    }
    if (u.pathname.startsWith("/is/image/")) {
      return "scene7";
    }
    if (/^delivery-p\d+-e\d+\.adobeaemcloud\.com$/.test(u.hostname) && u.pathname.startsWith("/adobe/assets/urn:")) {
      return "dm-openapi";
    }
    if (u.hostname === "www.marutisuzuki.com" && u.pathname.startsWith("/adobe/assets/urn:")) {
      return "dm-openapi";
    }
    return false;
  }
  var LINKED_DM_INLINE_WRAPPER_TAGS = /* @__PURE__ */ new Set(["PICTURE"]);
  var LINKED_DM_WRAPPER_SIBLING_TAGS = /* @__PURE__ */ new Set(["SOURCE"]);
  function findLinkedDmCarrier(img) {
    if (!img || !img.parentElement) return null;
    let node = img;
    let parent = img.parentElement;
    while (parent && LINKED_DM_INLINE_WRAPPER_TAGS.has(parent.tagName)) {
      let foundNode = false;
      for (const child of parent.children) {
        if (child === node) {
          foundNode = true;
        } else if (!LINKED_DM_WRAPPER_SIBLING_TAGS.has(child.tagName)) {
          return null;
        }
      }
      if (!foundNode) return null;
      node = parent;
      parent = parent.parentElement;
    }
    if (!parent || parent.tagName !== "A") return null;
    if (parent.children.length !== 1 || parent.children[0] !== node) return null;
    if (parent.textContent.trim() !== "") return null;
    return parent;
  }
  var EMPTY_ALT_SENTINEL = "Image without alt text";
  function altToLinkText(alt) {
    return alt || EMPTY_ALT_SENTINEL;
  }
  function transform3(hookName, element, payload) {
    if (hookName !== "afterTransform") return;
    const doc = element.ownerDocument;
    element.querySelectorAll("img").forEach((img) => {
      const src = img.getAttribute("src") || "";
      if (!detectDynamicMediaUrl(src)) return;
      const alt = img.getAttribute("alt") || "";
      const linkedAnchor = findLinkedDmCarrier(img);
      if (linkedAnchor) {
        linkedAnchor.setAttribute("title", src);
        linkedAnchor.textContent = altToLinkText(alt);
        return;
      }
      const parent = img.parentElement;
      if (parent && parent.tagName === "A") {
        console.warn("DM image inside mixed-content anchor, skipped:", src);
        return;
      }
      const a = doc.createElement("a");
      a.href = src;
      a.textContent = altToLinkText(alt);
      img.replaceWith(a);
    });
  }

  // tools/importer/import-genuine-accessories.js
  var parsers = {
    "hero-accessories": parse,
    "columns-promo": parse2,
    "carousel-product": parse3,
    "carousel-vehicle": parse4,
    "columns-teaser": parse5,
    "cards-category": parse6,
    "carousel-banner": parse7,
    "columns-feature": parse8,
    "cards-feature": parse9,
    "columns-faq": parse10,
    "cards-promo": parse11
  };
  var PAGE_TEMPLATE = {
    name: "genuine-accessories",
    description: "Genuine accessories landing page showcasing Maruti Suzuki vehicle accessories categories",
    urls: ["https://www.marutisuzuki.com/genuine-accessories"],
    blocks: [
      {
        name: "hero-accessories",
        instances: [".section.hero-container .hero.block"]
      },
      {
        name: "columns-promo",
        instances: [".section.hero-container .trusted-product-banner.block"]
      },
      {
        name: "carousel-product",
        instances: [".section.product-recommendations-container > .product-recommendations-wrapper > .product-recommendations.block"]
      },
      {
        name: "carousel-vehicle",
        instances: [".section.car-carousel-container .car-carousel.block"]
      },
      {
        name: "columns-teaser",
        instances: [".section.sign-up-teaser-container .sign-up-teaser.block .signup-teaser--rewards_teaser"]
      },
      {
        name: "cards-category",
        instances: [".section.explore-category-container .explore-category.block"]
      },
      {
        name: "carousel-banner",
        instances: [".offer-banner.block"]
      },
      {
        name: "columns-feature",
        instances: [".car-config-teaser.block"]
      },
      {
        name: "cards-feature",
        instances: [".sign-up-teaser.block .signup-teaser--cards_teaser"]
      },
      {
        name: "columns-faq",
        instances: [".smart-emi-banner.block"]
      },
      {
        name: "cards-promo",
        instances: [".slider.block"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Section",
        selector: ".section.hero-container.trusted-product-banner-container",
        style: "dark",
        blocks: ["hero-accessories", "columns-promo"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Product Recommendations",
        selector: "div.section.product-recommendations-container",
        style: null,
        blocks: ["carousel-product"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Car Selector",
        selector: ".section.car-carousel-container",
        style: null,
        blocks: ["carousel-vehicle"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Rewards Teaser",
        selector: ".section.sign-up-teaser-container.product-recommendations-container",
        style: null,
        blocks: ["columns-teaser"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Categories and Offers",
        selector: ".section.explore-category-container.fragment-container.offer-banner-container.car-config-teaser-container",
        style: null,
        blocks: ["cards-category", "carousel-banner", "columns-feature"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Features and More",
        selector: ".section.fragment-container.product-recommendations-container.smart-emi-banner-container.sign-up-teaser-container",
        style: null,
        blocks: ["cards-feature", "carousel-product", "columns-faq", "cards-promo"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    transform2,
    transform3
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_genuine_accessories_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_genuine_accessories_exports);
})();
