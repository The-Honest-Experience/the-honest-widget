document.addEventListener("DOMContentLoaded", () => {
  const scriptBase = document.currentScript?.src.split("/").slice(0, -1).join("/") + "/";

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
      if (!data?.response) return;

      const { score: overall_score, total_reviews, category_scores = [] } = data.response;

      const rowsHTML = category_scores.map(entry => {
        const label = entry.label || `Category ${entry.order}`;
        return `<div class="the-row"><span>${label}</span><span>${entry.score.toFixed(1)}</span></div>`;
      }).join("");

      badge.innerHTML = `
        <div class="the-honest-badge">
          <div class="the-score-section">
            <div class="the-score-icon">
              <img src="https://thehonestexperience.bubbleapps.io/version-test/fileupload/score-icon-white.png" alt="score icon">
            </div>
            <div class="the-overall-score">${overall_score.toFixed(1)}</div>
          </div>

          <div class="the-breakdown">
            ${rowsHTML}
          </div>

          <div class="the-footer">
            <span>${total_reviews} verified review${total_reviews !== 1 ? 's' : ''}</span>
            <img src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1745736971199x969105184116363800/Logo_Name_TheHonestExperience_Red_Red.png" alt="The Honest Experience" class="the-brand-logo">
          </div>
        </div>
      `;

    } catch (err) {
      console.error("Widget load failed", err);
      badge.innerText = "Widget not available";
    }
  });
});
