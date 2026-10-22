/*
 * BIRTHDAY WEBSITE TEMPLATE SETTINGS
 * Edit this file first to personalize the template. No build step is required.
 */
window.BIRTHDAY_SITE_CONFIG = {
  // Names and text shown across the login, profile, hero, galleries, and message.
  recipientName: "Recipient Name",
  senderName: "Your Name",
  creatorName: "Your Name",
  year: String(new Date().getFullYear()),
  messageTitle: "A Special Birthday Message",
  galleryTitles: ["Recipient's Moments", "Shared Memories", "Favorite Moments"],
  customTagline: "A collection of favorite memories",
  heroDescription: "A heartfelt birthday surprise made just for you. Customize this description in customization.js.",
  birthdayMessage: "Write your birthday wishes here. Add kind words, a favorite memory, or a personal note.",
  closingMessage: "With love, Your Name",

  // Front-end demonstration accounts. These are NOT secure credentials.
  demoAccounts: [
    { email: "recipient@example.com", password: "demo1234", name: "Recipient Name", profileKey: "recipient" },
    { email: "sender@example.com", password: "demo5678", name: "Your Name", profileKey: "sender" }
  ],
  demoPin: "1234"
};

(function applyTemplateSettings() {
  const config = window.BIRTHDAY_SITE_CONFIG;
  const tokens = {
    "[RECIPIENT_NAME]": config.recipientName,
    "[SENDER_NAME]": config.senderName,
    "[CREATOR_NAME]": config.creatorName,
    "[YEAR]": config.year,
    "[MESSAGE_TITLE]": config.messageTitle,
    "[GALLERY_TITLE_1]": config.galleryTitles[0],
    "[GALLERY_TITLE_2]": config.galleryTitles[1],
    "[GALLERY_TITLE_3]": config.galleryTitles[2],
    "[CUSTOM_TAGLINE]": config.customTagline,
    "[HERO_DESCRIPTION]": config.heroDescription,
    "[BIRTHDAY_MESSAGE]": config.birthdayMessage,
    "[CLOSING_MESSAGE]": config.closingMessage
  };
  const replace = (value) => Object.entries(tokens).reduce((text, [token, replacement]) => text.split(token).join(String(replacement)), value);
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    if (node.parentElement && !["SCRIPT", "STYLE"].includes(node.parentElement.tagName)) node.nodeValue = replace(node.nodeValue);
  });
  document.querySelectorAll("*").forEach((element) => {
    ["alt", "title", "aria-label"].forEach((attribute) => {
      if (element.hasAttribute(attribute)) element.setAttribute(attribute, replace(element.getAttribute(attribute)));
    });
  });
  document.title = replace(document.title);
})();
