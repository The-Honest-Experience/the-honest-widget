document.addEventListener("DOMContentLoaded", () => {
  // 1. Basis-URL des Skripts ermitteln (für relativen CSS-Pfad)
  const scriptBase = document.currentScript?.src.split("/").slice(0, -1).join("/") + "/";

  // 2. CSS automatisch einfügen
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = scriptBase + "the-honest-badge.css";
  document.head.appendChild(cssLink);

  // 3. Alle Container mit data-brand verarbeiten
  document.querySelectorAll('[data-brand]').forEach(badge => {
    const uuid = badge.dataset.brand;
    if (!uuid) return;

    fetch(`https://thehonestexperience.com/api/1.1/wf/badge-data?widget_uuid=${uuid}`)
      .then(res => res.json())
      .then(data => {
        if (!data?.response) return;
        const { score, total_reviews } = data.response;

        badge.innerHTML = `
          <div class="the-widget-container">
            <div class="the-details">
              <div class="the-score">
                ${score.toFixed(1)}
                <img src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1744554362576x344039617658736400/Total-score-the-honest-experience.png" class="the-star" alt="Score Icon">
              </div>
              <div class="the-reviews">${total_reviews} verified reviews</div>
            </div>
            <div class="the-divider"></div>
            <div class="the-logo">
              <img src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1745736971199x969105184116363800/Logo_Name_TheHonestExperience_Red_Red.png" class="logo-image" alt="The Honest Experience Logo">
            </div>
          </div>
        `;
      });
  });
});
