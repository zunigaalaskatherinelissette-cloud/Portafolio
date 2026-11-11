"use strict";
(async () => {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "language-toggle";
  button.textContent = "ES";
  button.setAttribute("aria-label", "Cambiar idioma a español");
  button.setAttribute("title", "Español");
  button.setAttribute("aria-pressed", "false");
  const headerMark = header.querySelector(".header-mark");
  header.insertBefore(button, headerMark || null);

  let translations;
  try {
    const response = await fetch("./translations.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("No se pudo cargar translations.json");
    translations = await response.json();
  } catch (error) {
    console.error("Language switcher:", error);
    button.disabled = true;
    return;
  }

  const textNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  while (walker.nextNode()) textNodes.push({ node: walker.currentNode, original: walker.currentNode.nodeValue });

  const attributes = ["aria-label", "title", "alt", "placeholder"];
  const attributeNodes = [];
  document.querySelectorAll("*").forEach((element) => attributes.forEach((attribute) => {
    if (element.hasAttribute(attribute)) attributeNodes.push({ element, attribute, original: element.getAttribute(attribute) });
  }));

  const translate = (value, language) => {
    if (language !== "es") return value;
    const translated = translations[value.trim()];
    if (!translated) return value;
    const leading = value.match(/^\\s*/)?.[0] || "";
    const trailing = value.match(/\\s*$/)?.[0] || "";
    return leading + translated + trailing;
  };

  const applyLanguage = (language) => {
    textNodes.forEach(({ node, original }) => { node.nodeValue = translate(original, language); });
    attributeNodes.forEach(({ element, attribute, original }) => element.setAttribute(attribute, translate(original, language)));
    document.documentElement.lang = language;
    const spanish = language === "es";
    button.textContent = spanish ? "EN" : "ES";
    button.setAttribute("aria-label", spanish ? "Switch language to English" : "Cambiar idioma a español");
    button.setAttribute("title", spanish ? "English" : "Español");
    button.setAttribute("aria-pressed", String(spanish));
  };
  button.addEventListener("click", () => applyLanguage(document.documentElement.lang === "en" ? "es" : "en"));
})();
