document.addEventListener("DOMContentLoaded", () => {
  const scriptBase = document.currentScript?.src.split("/").slice(0, -1).join("/") + "/";

  // CSS laden
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = scriptBase + "the-honest-badge-universal-one-line.css";
  document.head.appendChild(cssLink);

  document.querySelectorAll('[data-brand]').forEach(async badge => {
    const uuid = badge.dataset.brand;
    const questionSlugs = badge.dataset.questionslugs;

    if (!uuid || !questionSlugs) return;

    try {
      const res = await fetch(`https://thehonestexperience.com/api/1.1/wf/badge-data?widget_uuid=${uuid}&question_slugs=${questionSlugs}`);
      const data = await res.json();
      if (!data?.response) throw new Error("Missing data");

      const { score_single_question, question_label, icon_url } = data.response;

      badge.innerHTML = `
        <div class="the-honest-badge-universal-one-line">
          <div class="the-content-row">
            <img src="${icon_url}" class="score-icon" alt="icon">
            <span class="label">${question_label}</span>
            <span class="score">${score_single_question.toFixed(1)}</span>
          </div>
          <img class="honest-logo" src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1748152500612x296252883912272640/Logo_THE_weiss.png" alt="THE">
        </div>
      `;
    } catch (err) {
      console.error("Badge API error", err);
      badge.innerText = "Widget not available";
    }
  });
});
