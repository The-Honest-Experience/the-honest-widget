document.addEventListener("DOMContentLoaded", () => {
  const scriptBase = document.currentScript?.src.split("/").slice(0, -1).join("/") + "/";

  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = scriptBase + "the-honest-badge.css"; // Wichtig: CSS liegt im selben Ordner wie embed.js
  document.head.appendChild(cssLink);


(function () {
  "use strict";

  // Alle Widget-Container mit data-brand Attribut finden
  const widgetElements = document.querySelectorAll("[data-brand]");
  if (!widgetElements.length) return;

  // Aktuelles Skript finden, um Basis-Pfad zu ermitteln
  const currentScript = document.currentScript || (function () {
    const scripts = document.getElementsByTagName("script");
    return scripts[scripts.length - 1];
  })();

  const scriptSrc = currentScript.src || "";
  const scriptBase = scriptSrc.substring(0, scriptSrc.lastIndexOf("/") + 1);

  // CSS-Datei dynamisch laden
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = scriptBase + "the-honest-badge.css";
  document.head.appendChild(cssLink);

  // Widget rendern
  function renderWidget(element, data) {
    const { score, total_reviews } = data;
    if (typeof score !== "number" || typeof total_reviews !== "number") return;

    const scoreFormatted = (Math.round(score * 10) / 10).toFixed(score % 1 === 0 ? 0 : 1);

    element.innerHTML = `
      <div class="the-honest-badge">
        <span class="the-honest-score">${scoreFormatted}</span>
        <span class="the-honest-max">/5</span>
        <span class="the-honest-reviews">(${total_reviews} verified reviews)</span>
      </div>
    `;
  }

  // API Call + Render
  function loadWidget(element) {
    const uuid = element.getAttribute("data-brand");
    if (!uuid) return;

    const apiUrl = "https://thehonestexperience.com/api/1.1/wf/badge-data?widget_uuid=" + encodeURIComponent(uuid);

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.status !== "success" || !data.response) return;
        renderWidget(element, data.response);
      })
      .catch(() => {
        // stillschweigend ignorieren
      });
  }

  // Alle gefundenen Widgets initialisieren
  function initWidgets() {
    widgetElements.forEach(loadWidget);
  }

  // DOM-Ready abwarten
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWidgets);
  } else {
    initWidgets();
  }
})();
