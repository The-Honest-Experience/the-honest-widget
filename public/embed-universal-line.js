document.addEventListener("DOMContentLoaded", () => {
  const scriptBase = document.currentScript?.src.split("/").slice(0, -1).join("/") + "/";

  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = scriptBase + "the-honest-badge.css";
  document.head.appendChild(cssLink);

  document.querySelectorAll('[data-brand]').forEach(badge => {
    const uuid = badge.dataset.brand;
    if (!uuid) return;

    fetch(`https://thehonestexperience.com/api/1.1/wf/badge-data?widget_uuid=${uuid}&question_slugs=${question_Slugs}`)
      .then(res => res.json())
      .then(data => {
        if (!data?.response) return;

        const { score_single_question, question_label } = data.response;

        // Optional: Fallback-Schutz
        if (typeof score_single_question !== "number") {
          console.error("Missing or invalid score:", score_single_question);
          badge.innerText = "Widget not available";
          return;
        }

        badge.innerHTML = `
  <div class="the-honest-badge-universal-line">
    <div class="the-score-row">
      
      <span class="label">${question_label}</span>
      <span class="score">${score_single_question.toFixed(1)}</span>
    </div>
    <img src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1748152500612x296252883912272640/Logo_THE_weiss.png" class="honest-logo" alt="THE">
  </div>
        `;
      })
      .catch(err => {
        console.error("Badge API error", err);
        badge.innerText = "Widget not available";
      });
  });
});
