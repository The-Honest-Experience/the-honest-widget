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
        <style>
          .the-widget-container {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            display: flex;
            align-items: center;
            border: 2px solid #eee;
            border-radius: 12px;
            padding: 16px;
            max-width: 460px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.06);
            background-color: #fff;
          }
          .the-score {
            font-size: 48px;
            font-weight: 700;
            line-height: 1;
            margin-right: 12px;
            color: #111;
            display: flex;
            align-items: center;
          }
          .the-star {
            height: 32px;
            width: 32px;
            margin-left: 6px;
          }
          .the-details {
            display: flex;
            flex-direction: column;
            margin-right: 24px;
          }
          .the-reviews {
            font-size: 16px;
            color: #333;
            margin-top: 4px;
          }
          .the-divider {
            height: 60px;
            width: 1px;
            background-color: #ddd;
            margin: 0 20px;
          }
          .the-logo {
            display: flex;
            align-items: center;
          }
          .logo-image {
            height: 40px;
            object-fit: contain;
          }
        </style>

        <div class="the-widget-container">
          <div class="the-details">
            <div class="the-score">
              ${score.toFixed(1)}
              <img src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1744554362576x344039617658736400/Total-score-the-honest-experience.png" class="the-star" alt="Score Icon">
            </div>
            <div class="the-reviews">${total_reviews} verified reviews</div>
          </div>
          <div class="the-divider"></div>
          <div class="the-logo">
            <img src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1745736971199x969105184116363800/Logo_Name_TheHonestExperience_Red_Red.png" class="logo-image" alt="The Honest Experience Logo">
          </div>
        </div>
      `;
    });
}

document.addEventListener("DOMContentLoaded", renderHonestBadge);
