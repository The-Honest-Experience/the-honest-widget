async function renderHonestBadge() {
  const widget = document.querySelector('.the-honest-widget');
  if (!widget) return;

  const brandSlug = widget.dataset.brand;
  if (!brandSlug) return;

  try {
    const response = await fetch(`https://thehonestexperience.com/api/1.1/wf/badge-data?brand_slug=${brandSlug}`);
    const data = await response.json();
    const { score, total_reviews } = data.response;

    widget.innerHTML = `
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
        }
        .the-star {
          font-size: 32px;
          color: #FFC107;
          margin-left: 4px;
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
          font-weight: 700;
          font-size: 18px;
          color: #EF443D;
        }
        .the-logo-box {
          background-color: #EF443D;
          color: white;
          font-weight: 800;
          padding: 10px 12px;
          margin-right: 8px;
          border-radius: 4px;
          font-size: 20px;
        }
      </style>
      <div class="the-widget-container">
        <div class="the-details">
          <div class="the-score">
            ${parseFloat(score).toFixed(1)}<span class="the-star">★</span>
          </div>
          <div class="the-reviews">${total_reviews} verified reviews</div>
        </div>
        <div class="the-divider"></div>
        <div class="the-logo">
          <div class="the-logo-box">THE</div>
          <div>THE HONEST<br>EXPERIENCE</div>
        </div>
      </div>
    `;
  } catch (error) {
    widget.innerHTML = '⚠️ Error loading badge.';
    console.error(error);
  }
}

// Autostart
document.addEventListener("DOMContentLoaded", renderHonestBadge);
