(function() {
  // 1. Externes Stylesheet laden
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://the-honest-widget.pages.dev/the-honest-badge.css";
  document.head.appendChild(link);

  // 2. Container erstellen
  const container = document.createElement("div");
  container.className = "the-honest-widget";
  container.setAttribute("data-brand", document.currentScript.getAttribute("data-widget-id"));
  document.currentScript.parentNode.insertBefore(container, document.currentScript.nextSibling);

  // 3. Badge Rendern
  function renderHonestBadge() {
    const badge = document.querySelector(".the-honest-widget");
    const uuid = badge?.dataset?.brand;
    if (!uuid) return;

    fetch(`https://thehonestexperience.com/api/1.1/wf/badge-data?widget_uuid=${uuid}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data?.response) return;
        const { score, total_reviews } = data.response;

        badge.innerHTML = `
          <div class="the-widget-container">
            <div class="the-details">
              <div class="the-score">${score.toFixed(1)}<img src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1744554362576x344039617658736400/Total-score-the-honest-experience.png" class="the-star" /></div>
              <div class="the-reviews">${total_reviews} verified reviews</div>
            </div>
            <div class="the-divider"></div>
            <div class="the-logo">
              <img src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1745736971199x969105184116363800/Logo_Name_TheHonestExperience_Red_Red.png" class="logo-image" alt="THE HONEST EXPERIENCE" />
            </div>
          </div>
        `;
      });
  }

  document.addEventListener("DOMContentLoaded", renderHonestBadge);
})();
