document.addEventListener("DOMContentLoaded", () => {
  const scriptBase = document.currentScript?.src.split("/").slice(0, -1).join("/") + "/";
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = scriptBase + "the-honest-badge-universal-one-line.css";
  document.head.appendChild(cssLink);

  document.querySelectorAll('[data-brand]').forEach(async badge => {
    const uuid = badge.dataset.brand;
    const questionCode = badge.dataset.question; // <--- NEU: Fragecode

    if (!uuid || !questionCode) return;

    try {
      const res = await fetch(`https://thehonestexperience.com/api/1.1/wf/badge-universal-one-line?widget_uuid=${uuid}&question_code=${questionCode}`);
      const data = await res.json();
      if (!data?.response) throw new Error("Missing data");

      const { score_single_question, question_label, icon_url } = data.response;

      badge.innerHTML = `
        <div class="the-honest-badge-universal-one-line">
          <div class="the-score-row">
            <img src="${icon_url}" class="score-icon" alt="icon">
            <span class="label">${question_label}</span>
            <span class="score">${score_single_question.toFixed(1)}</span>
          </div>
          <img class="honest-logo" src="https://.../Logo_THE_weiss.png" alt="THE">
        </div>
      `;
    } catch (err) {
      console.error("Universal widget error", err);
      badge.innerText = "Widget not available";
    }
  });
});
