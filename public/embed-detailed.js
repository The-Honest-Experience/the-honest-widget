// embed-detailed.js

(function () {
  document.addEventListener("DOMContentLoaded", async () => {
    const badge = document.querySelector(".the-honest-widget");
    if (!badge) return;

    const uuid = badge.dataset.brand;
    if (!uuid) return;

    // CSS einbinden
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "https://the-honest-widget.pages.dev/the-honest-detailed-badge.css";
    document.head.appendChild(cssLink);

    try {
      const res = await fetch(`https://thehonestexperience.com/api/1.1/wf/badge-data?uuid=${uuid}`);
      const data = await res.json();
      const { overall_score, review_count, category_scores = [], category_labels = [] } = data.response;

      // Mapping der Labels nach Order (frontendseitig gecached / injected)
      const labelMap = {
        1: "Customer Service",
        2: "Quality",
        3: "Value for Money",
        4: "Durability",
        5: "Ease of Use",
        6: "Sustainability"
        // Dynamisch ersetzbar je nach Branche (per Cache, Lookup oder Template)
      };

      const rowsHTML = category_scores.map((entry) => {
        const label = labelMap[entry.order] || `Category ${entry.order}`;
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

          <div class="the-breakdown">${rowsHTML}</div>

          <div class="the-footer">
            <span>${review_count} verified review${review_count !== 1 ? 's' : ''}</span>
            <img src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1745736971199x969105184116363800/Logo_Name_TheHonestExperience_Red_Red.png" alt="The Honest Experience" class="the-brand-logo">
          </div>
        </div>
      `;

    } catch (err) {
      console.error("Widget load failed", err);
      badge.innerText = "Widget not available";
    }
  });
})();
