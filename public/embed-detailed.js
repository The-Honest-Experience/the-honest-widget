document.addEventListener("DOMContentLoaded", () => {
  const scriptBase = document.currentScript?.src.split("/").slice(0, -1).join("/") + "/";

  // CSS einbinden
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = scriptBase + "the-honest-badge-detailed.css";
  document.head.appendChild(cssLink);

  document.querySelectorAll('[data-brand]').forEach(async badge => {
    const uuid = badge.dataset.brand;
    if (!uuid) return;

    try {
      const res = await fetch(`https://thehonestexperience.com/api/1.1/wf/badge-data?widget_uuid=${uuid}`);
      const data = await res.json();
      if (!data?.response) throw new Error("Missing data");

      const {
        score,
        total_reviews,
        category_scores = [],
        category_labels = []
      } = data.response;

      const rowsHTML = category_scores.map((val, i) => {
        const label = category_labels[i] || `Category ${i + 1}`;
        return `<div class="the-row"><span>${label}</span><span>${val.toFixed(1)}</span></div>`;
      }).join("");

      badge.innerHTML = `
        <div class="the-honest-badge">
          <div class="the-score-section">
            <div class="the-score-icon">
              <img src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1744554362576x344039617658736400/Total-score-the-honest-experience.png" alt="score icon">
            </div>
            <div class="the-overall-score">${score.toFixed(1)}</div>
          </div>

          <div class="the-breakdown">
            ${rowsHTML}
          </div>

          <div class="the-footer">
            <span>${total_reviews} verified review${total_reviews !== 1 ? "s" : ""}</span>
            <img
              src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1748427907388x140507377293159980/LOGO_long_Transparent.png?_gl=1*n2y6gs*_gcl_au*MjA2MTY0NDE0MS4xNzQ2NTM4Nzcy*_ga*MjA5NDY1MjE0My4xNzQ2NTM4NzM1*_ga_BFPVR2DEE2*czE3NDgyMzYzNjgkbzE3JGcxJHQxNzQ4NDI3ODA2JGo1NyRsMCRoMA.."
              alt="The Honest Experience"
              class="the-brand-logo"
            >
          </div>
        </div>
      `;
    } catch (err) {
      console.error("Widget load failed", err);
      badge.innerText = "Widget not available";
    }
  });
});
