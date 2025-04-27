
// Embed script for The Honest Experience
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const widget = document.querySelector('[data-widget-id]');
    if (!widget) return;

    const uuid = widget.getAttribute('data-widget-id');
    if (!uuid) return;

    fetch(`https://thehonestexperience.com/api/1.1/wf/badge-data?widget_uuid=${uuid}`)
      .then(res => res.json())
      .then(data => {
        if (!data?.response) return;
        const { score, total_reviews } = data.response;

        widget.innerHTML = `
          <div class="the-widget-container" style="display:flex;align-items:center;border:2px solid #eee;border-radius:12px;padding:16px;max-width:460px;box-shadow:0 2px 6px rgba(0,0,0,0.06);background-color:#fff;">
            <div class="the-details" style="display:flex;flex-direction:column;margin-right:24px;">
              <div class="the-score" style="display:flex;align-items:center;font-size:48px;font-weight:700;line-height:1;margin-right:12px;color:#111;">
                ${score.toFixed(1)}
                <img src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1744554362576x344039617658736400/Total-score-the-honest-experience.png" 
                     alt="score icon" 
                     style="width:28px;height:28px;margin-left:8px;" />
              </div>
              <div class="the-reviews" style="font-size:16px;color:#333;margin-top:4px;">${total_reviews} verified reviews</div>
            </div>
            <div class="the-divider" style="height:60px;width:1px;background-color:#ddd;margin:0 20px;"></div>
            <div class="the-logo" style="display:flex;align-items:center;">
              <img src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1745736971199x969105184116363800/Logo_Name_TheHonestExperience_Red_Red.png"
                   alt="The Honest Experience Logo"
                   style="height:40px;object-fit:contain;" />
            </div>
          </div>
        `;
      });
  });
})();
