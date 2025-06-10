document.addEventListener("DOMContentLoaded", () => {
  const scriptBase = document.currentScript?.src.split("/").slice(0, -1).join("/") + "/";

  // CSS laden
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = scriptBase + "the-honest-badge.css";
  document.head.appendChild(cssLink);

  // Badge für jede Brand laden
  document.querySelectorAll('[data-brand]').forEach(async badge => {
    const uuid = badge.dataset.brand;
    if (!uuid) return;

    try {
      const res = await fetch(`https://thehonestexperience.com/api/1.1/wf/badge-data?widget_uuid=${uuid}`);
      const data = await res.json();
      if (!data?.response) throw new Error("Missing data");

      const { score, total_reviews } = data.response;

      badge.innerHTML = `
        <div class="the-honest-badge">
          <div class="the-score-block">
            <div class="the-score-row">
              <img 
                src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1748152410553x159106384415167680/total-score-white-the-honest-experience.png" 
                class="score-icon" 
                alt="Score Icon">
              <div class="the-honest-score">${Number(score).toFixed(1)}</div>
            </div>
            <div class="the-honest-reviews">
              ${total_reviews} verified review${total_reviews !== 1 ? 's' : ''}
            </div>
          </div>
          <img 
            src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1748152500612x296252883912272640/Logo_THE_weiss.png" 
            class="honest-logo" 
            alt="The Honest Experience">
        </div>
      `;
    } catch (err) {
      console.error("Badge API error", err);
      badge.innerText = "Error loading badge.";
    }
  });
});
