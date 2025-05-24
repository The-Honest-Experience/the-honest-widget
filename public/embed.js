document.addEventListener("DOMContentLoaded", () => {
  // 1. Feste CSS-URL nutzen (stabiler als scriptBase)
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = "https://the-honest-widget.pages.dev/the-honest-badge.css";
  document.head.appendChild(cssLink);

  // 2. Alle Container mit data-brand verarbeiten
  document.querySelectorAll('[data-brand]').forEach(badge => {
    const uuid = badge.dataset.brand;
    if (!uuid) return;

    fetch(`https://thehonestexperience.com/api/1.1/wf/badge-data?widget_uuid=${uuid}`)
      .then(res => res.json())
      .then(data => {
        if (!data?.response) return;
        const { score, total_reviews } = data.response;

        badge.innerHTML = `
  <div class="the-honest-badge">
    <div class="the-honest-score">
      <img src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1744554362576x344039617658736400/Total-score-the-honest-experience.png" class="score-icon" alt="Score Icon">
      ${score.toFixed(1)}
    </div>
    <div class="the-honest-reviews">${total_reviews} verified review${total_reviews !== 1 ? "s" : ""}</div>
    <div class="the-honest-logo">
      <img src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1745736971199x969105184116363800/Logo_Name_TheHonestExperience_Red_Red.png" class="honest-logo" alt="The Honest Experience">
    </div>
  </div>`;
      })
      .catch(err => {
        console.error("Badge API error", err);
        badge.innerText = "Error loading badge";
      });
  });
});
