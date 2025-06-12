document.addEventListener("DOMContentLoaded", () => {
  const scriptBase = document.currentScript?.src.split("/").slice(0, -1).join("/") + "/";
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = scriptBase + "the-honest-badge-universal-line.css";
  document.head.appendChild(cssLink);

  document.querySelectorAll('[data-brand]').forEach(async badge => {
    const uuid = badge.dataset.brand;
    const question_Slugs = badge.dataset.question_slugs;
    if (!uuid || !question_Slugs) return;

    try {
      const res = await fetch(`https://thehonestexperience.com/api/1.1/wf/badge-data?widget_uuid=${uuid}&question_slugs=${question_Slugs}`);
      const data = await res.json();
      if (!data?.response) throw new Error("Missing data");

      const { score, category_labels, question_icons } = data.response;
      console.log("RESPONSE", { score, category_labels, question_icons });

      if (!score_single_question || !question_label || !icon_url) throw new Error("Missing values");

      badge.innerHTML = `
        <div class="the-honest-badge-universal-line">
          <div class="the-score-row">
            <img src="${question_icons}" class="question_icons" alt="question_icons">
            <span class="label">${category_labels}</span>
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
