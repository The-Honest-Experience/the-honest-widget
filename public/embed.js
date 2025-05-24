document.addEventListener("DOMContentLoaded", () => {
  const scriptBase = document.currentScript?.src.split("/").slice(0, -1).join("/") + "/";

  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = scriptBase + "the-honest-badge.css";
  document.head.appendChild(cssLink);

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
            <div class="the-honest-score">${score.toFixed(1)}</div>
            <div class="the-honest-reviews">${total_reviews} verified review${total_reviews !== 1 ? 's' : ''}</div>
          </div>
        `;
      })
      .catch(err => {
        console.error("Badge API error", err);
        badge.innerText = "Error loading badge";
      });
  });
});
