document.addEventListener("DOMContentLoaded", () => {
  const scriptBase = document.currentScript?.src.split("/").slice(0, -1).join("/") + "/";

  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = scriptBase + "the-honest-badge-universal-line.css";
  document.head.appendChild(cssLink);

  document.querySelectorAll('[data-brand]').forEach(async badge => {
    const uuid = badge.dataset.brand;
    const questionSlug = badge.dataset.question_slugs;

    if (!uuid || !questionSlug) return;

    try {
      const res = await fetch(`https://thehonestexperience.com/api/1.1/wf/badge-data?widget_uuid=${uuid}&question_slugs=${questionSlug}`);
      const data = await res.json();
      if (!data?.response) throw new Error("Missing data");

      const {
        question_slugs,
        category_labels,
        question_icons,
        category_scores
      } = data.response;

      const index = question_slugs.indexOf(questionSlug);
      if (index === -1) throw new Error("Question slug not found");

      const label = category_labels[index];
      const iconUrl = question_icons[index];
      const score = category_scores[index];

      badge.innerHTML = `
        <div class="the-honest-badge-universal-line">
          <div class="the-score-row">
            <img src="${iconUrl}" class="score-icon" alt="icon">
            <span class="label">${label}</span>
            <span class="score">${score.toFixed(1)}</span>
          </div>
          <img class="honest-logo" src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1748152500612x296252883912272640/Logo_THE_weiss.png" alt="THE">
        </div>
      `;
    } catch (err) {
      console.error("Universal widget error", err);
      badge.innerText = "Widget not available";
    }
  });
});
