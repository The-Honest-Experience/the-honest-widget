document.addEventListener("DOMContentLoaded", () => {
  const badge = document.querySelector(".the-honest-widget");
  const uuid = badge?.dataset?.brand;
  if (!uuid) return;

  
  fetch(`https://thehonestexperience.com/api/1.1/wf/badge-data?widget_uuid=${uuid}`)
    .then(res => res.json())
    .then(data => {
      if (!data?.response) return;
      const { score, total_reviews } = data.response;

      badge.innerHTML = `
        <div style="font-family: sans-serif; border: 1px solid #eee; border-radius: 8px; padding: 16px; display: flex; gap: 12px; align-items: center;">
          <div style="font-size: 24px; font-weight: bold;">⭐ ${score.toFixed(1)}</div>
          <div>${total_reviews} verified review${total_reviews !== 1 ? 's' : ''}</div>
          <div style="margin-left: auto; background: #f44336; color: white; padding: 4px 8px; border-radius: 4px;">THE</div>
        </div>
      `;
    })
    .catch(err => {
      console.error("Badge API error", err);
      badge.innerText = "Error loading badge";
    });
});
