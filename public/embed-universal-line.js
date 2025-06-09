document.addEventListener("DOMContentLoaded", () => {
  const scriptBase = document.currentScript?.src.split("/").slice(0, -1).join("/") + "/";

  // Load the CSS dynamically (for flexibility)
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = scriptBase + "the-honest-badge-universal-line.css";
  document.head.appendChild(cssLink);

  document.querySelectorAll('[data-widget="universal-line"]').forEach(badge => {
    const uuid = badge.dataset.brand;
    const questionKey = badge.dataset.question;

    if (!uuid || !questionKey) return;

    // Fetch the rating for the given question + brand
    fetch(`https://thehonestexperience.com/api/1.1/wf/badge-data-question?widget_uuid=${uuid}&question=${questionKey}`)
      .then(res => res.json())
      .then(data => {
        if (!data?.response) return;
        const { score, question_title, icon_url } = data.response;

        badge.innerHTML = `
          <div class="the-honest-badge-universal-line">
            <div class="universal-left">
              <img src="${icon_url}" class="universal-icon" alt="icon">
              <div class="universal-text">${question_title}</div>
            </div>
            <div class="universal-score">${score.toFixed(1)}</div>
            <img src="https://thehonestexperience.com/file/logo_white_the_honest_experience.png" class="universal-logo" alt="logo">
          </div>
        `;
      })
      .catch(err => {
        console.error("Badge load error", err);
        badge.innerText = "Error loading badge.";
      });
  });
});
