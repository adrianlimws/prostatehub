import { e as createComponent, f as createAstro, m as maybeRenderHead, s as spreadAttributes, h as addAttribute, j as renderSlot, r as renderTemplate, i as renderComponent, k as renderScript, u as unescapeHTML, l as Fragment } from './astro/server_Chp6wBtO.mjs';
import 'clsx';
import 'kleur/colors';

const schemaJson = (parts) => JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: parts.map((part, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@id": part.href,
      name: part.text
    }
  }))
});

const findSeparator = (slug) => {
  const separators = ["-", "_"];
  for (const separator of separators) {
    if (slug.includes(separator)) {
      return separator;
    }
  }
};
const unSlugTrimmed = (slug) => {
  const separator = findSeparator(slug);
  if (separator) {
    return slug.split(separator).join(" ").trim();
  }
  return slug;
};
const formatLinkText = (slug, format) => {
  const slugToFormat = unSlugTrimmed(slug);
  switch (format) {
    case "lower":
      return slugToFormat.toLowerCase();
    case "capitalized":
      return slugToFormat.split(" ").map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(" ");
    case "sentence":
      return slugToFormat.charAt(0).toUpperCase() + slugToFormat.slice(1);
    default:
      return slug;
  }
};

const isLastElement = (index, array) => index + 1 === array.length;
const truncatedButtonVisible = (truncated, index, pathLength) => {
  return truncated && index === 1 && pathLength > 1;
};

const generateCrumbs = ({
  crumbs,
  paths,
  indexText,
  hasTrailingSlash,
  linkTextFormat,
  customBaseUrl
}) => {
  if (crumbs && crumbs?.length > 0) {
    return crumbs;
  }
  const parts = [];
  const baseUrl = "/";
  const basePartCount = baseUrl.split("/").filter((s) => s).length;
  if (customBaseUrl) {
    paths.unshift(customBaseUrl);
  }
  paths.forEach((text, index) => {
    const generateHref = `/${paths.slice(0, index + 1).join("/")}`;
    const addTrailingSlash = hasTrailingSlash ? `${generateHref}/` : generateHref;
    const finalHref = addTrailingSlash;
    const matches = text.match(/^(.+?)(\.[a-z0-9]+)?\/?$/i);
    if (matches?.[2]) {
      text = matches[1];
    }
    parts.push({
      text: formatLinkText(text, linkTextFormat),
      href: finalHref
    });
  });
  if (!customBaseUrl) {
    parts.unshift({
      text: indexText,
      href: baseUrl
    });
  }
  if (!customBaseUrl && basePartCount > 1) {
    let toRemove = basePartCount - 1;
    while (toRemove--) {
      parts.shift();
    }
  }
  parts[0] = {
    text: indexText,
    href: parts[0]?.href
  };
  return parts;
};
const mergeCustomizedLinks = (parts, customizeLinks) => {
  const clonedParts = parts.map((part) => ({ ...part }));
  const partsLength = clonedParts.length;
  customizeLinks.forEach((customLink, arrayIndex) => {
    let targetIndex = arrayIndex;
    if (typeof customLink.index === "number") {
      targetIndex = customLink.index;
    } else if (customLink.index === "last") {
      targetIndex = partsLength - 1;
    }
    if (!(targetIndex >= 0 && targetIndex < partsLength)) {
      return;
    }
    Object.assign(clonedParts[targetIndex], customLink);
    delete clonedParts[targetIndex].index;
  });
  return clonedParts;
};
const customizeListElement = (index, truncatedButtonShown, listElements = []) => {
  if (truncatedButtonShown) {
    return listElements.filter((item, index2) => index2 !== 1);
  }
  return listElements[index];
};
const processParts = (customizedParts, customizeListElements, excludeCurrentPage, truncated, pathLength) => {
  const processedParts = customizedParts.map((part, index, array) => {
    const isLast = isLastElement(index, array);
    const showTruncatedButton = truncatedButtonVisible(
      truncated,
      index,
      pathLength
    );
    return { ...part, isLast, showTruncatedButton };
  }).filter((part, index) => {
    const shouldRemove = customizeListElements.some(
      (config) => config.remove && config.index === index
    );
    if (shouldRemove) {
      return false;
    }
    return !(excludeCurrentPage && part.isLast);
  });
  if (excludeCurrentPage && processedParts.length > 0) {
    processedParts[processedParts.length - 1].isLast = true;
  }
  return processedParts;
};

const $$Astro$2 = createAstro();
const $$BreadcrumbLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$BreadcrumbLink;
  const { attrs, mainBemClass, isIndex, isCurrent } = Astro2.props;
  const cssClasses = [
    `${mainBemClass}__link`,
    { "is-current": isCurrent },
    { "is-index": isIndex }
  ];
  return renderTemplate`${maybeRenderHead()}<a${spreadAttributes(attrs)}${addAttribute(cssClasses, "class:list")}${addAttribute(isCurrent ? "location" : false, "aria-current")}> ${renderSlot($$result, $$slots["index"])} </a>`;
}, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/node_modules/astro-breadcrumbs/src/BreadcrumbLink.astro", void 0);

const $$Astro$1 = createAstro();
const $$BreadcrumbSeparator = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BreadcrumbSeparator;
  const { mainBemClass, separatorAriaHidden } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(`${mainBemClass}__separator`, "class")}${addAttribute(separatorAriaHidden, "aria-hidden")}> ${renderSlot($$result, $$slots["separator"])} </span>`;
}, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/node_modules/astro-breadcrumbs/src/BreadcrumbSeparator.astro", void 0);

const debugInformation = (debug, parts, customizedParts) => {
  if (!debug) {
    return;
  }
  console.log("__ autogenerated parts __");
  console.table(parts);
  console.log("__ customized parts __");
  console.table(customizedParts);
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Breadcrumbs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Breadcrumbs;
  const {
    indexText = "Home",
    mainBemClass = "c-breadcrumbs",
    ariaLabel = "breadcrumbs",
    crumbs = [],
    customizeLinks = [],
    customizeListElements = [],
    customizeList = {},
    customizeNav = {},
    schemaJsonScript = true,
    ellipsisAriaLabel = "Show hidden navigation",
    truncated = false,
    linkTextFormat,
    customBaseUrl,
    excludeCurrentPage = false,
    debug = false,
    separatorAriaHidden = true,
    id = crypto.randomUUID()
  } = Astro2.props;
  const paths = Astro2.url.pathname.split("/").filter((crumb) => crumb);
  const hasTrailingSlash = Astro2.url.pathname.endsWith("/");
  const pathLength = paths?.length;
  const listCssClasses = [
    `${mainBemClass}__crumbs`,
    Astro2.slots.has("separator") ? " has-separators" : " has-no-separators"
  ];
  const parts = generateCrumbs({
    crumbs,
    paths,
    indexText,
    hasTrailingSlash,
    linkTextFormat,
    customBaseUrl
  });
  const customizedParts = mergeCustomizedLinks(parts, customizeLinks);
  const processedParts = processParts(
    customizedParts,
    customizeListElements,
    excludeCurrentPage,
    truncated,
    pathLength
  );
  debugInformation(debug, parts, customizedParts);
  return renderTemplate`${renderComponent($$result, "astro-breadcrumbs", "astro-breadcrumbs", { "data-main-bem-class": mainBemClass, "data-id": id, "data-path-length": pathLength, "data-truncated": truncated }, { "default": () => renderTemplate` ${maybeRenderHead()}<nav${addAttribute(ariaLabel, "aria-label")}${addAttribute(mainBemClass, "class")}${addAttribute(id, "id")}${spreadAttributes(customizeNav)}> <ol${addAttribute(listCssClasses, "class:list")}${spreadAttributes(customizeList)}> ${processedParts.map(
    ({ text, isLast, showTruncatedButton, ...attrs }, index) => {
      return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${showTruncatedButton && renderTemplate`<li${addAttribute(`${mainBemClass}__crumb has-ellipsis`, "class")}${spreadAttributes(customizeListElements[1])}> <button type="button"${addAttribute(ellipsisAriaLabel, "aria-label")}${addAttribute(`${mainBemClass}__truncated-button`, "class")}> ${renderSlot($$result2, $$slots["ellipsis"], renderTemplate`…`)} </button> ${renderComponent($$result2, "BreadcrumbSeparator", $$BreadcrumbSeparator, { "mainBemClass": mainBemClass, "separatorAriaHidden": separatorAriaHidden }, { "separator": ($$result3) => renderTemplate`${renderSlot($$result3, $$slots["separator"])}` })} </li>`}<li${addAttribute(`${mainBemClass}__crumb`, "class")}${spreadAttributes(customizeListElement(
        index,
        showTruncatedButton,
        customizeListElements
      ))}> ${renderComponent($$result2, "BreadcrumbLink", $$BreadcrumbLink, { "attrs": attrs, "mainBemClass": mainBemClass, "isIndex": index === 0, "isCurrent": isLast }, { "index": ($$result3) => renderTemplate`${Astro2.slots.has("index") && index === 0 ? renderTemplate`${renderSlot($$result3, $$slots["index"])}` : decodeURI(text)}` })} ${Astro2.slots.has("separator") && !isLast && renderTemplate`${renderComponent($$result2, "BreadcrumbSeparator", $$BreadcrumbSeparator, { "mainBemClass": mainBemClass, "separatorAriaHidden": separatorAriaHidden }, { "separator": ($$result3) => renderTemplate`${renderSlot($$result3, $$slots["separator"])}` })}`} </li> ` })}`;
    }
  )} </ol> </nav> ` })} ${schemaJsonScript && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(schemaJson(customizedParts)))} ${renderScript($$result, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/node_modules/astro-breadcrumbs/src/Breadcrumbs.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/node_modules/astro-breadcrumbs/src/Breadcrumbs.astro", void 0);

export { $$Breadcrumbs as $ };
