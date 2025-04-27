// 1. Load external stylesheet
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://the-honest-widget.pages.dev/the-honest-badge.css";
document.head.appendChild(link);

// 2. Render badge
function renderHonestBadge() {
  const badge = document.querySelector(".the-honest-widget");
  const uuid = badge?.dataset?.brand;
  if (!uuid) return;

  fetch(`https://thehonestexperience.com/api/1.1/wf/badge-data?widget_uuid=${uuid}`)
    .then(res => res.json())
    .then(data => {
      if (!data?.response) return;
      const { score, total_reviews } = data.response;

      badge.innerHTML = `
        <div class="the-widget-container">
          <div class="the-details">
            <div class="the-score">
              ${score.toFixed(1)}<span class="the-star"></span>
            </div>
            <div class="the-reviews">${total_reviews} verified reviews</div>
          </div>
          <div class="the-divider"></div>
          <div class="the-logo"></div>
        </div>
      `;
    });
}

document.addEventListener("DOMContentLoaded", renderHonestBadge);
