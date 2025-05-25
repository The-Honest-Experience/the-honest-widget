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
    <div class="the-score-block">
      <div class="the-score-row">
        <img src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1748152729987x798181084943014000/Logo_THE_weis_transparent_ohne_rahmen.png?_gl=1*1d5aumg*_gcl_au*MjA2MTY0NDE0MS4xNzQ2NTM4Nzcy*_ga*MjA5NDY1MjE0My4xNzQ2NTM4NzM1*_ga_BFPVR2DEE2*czE3NDgxNDgzMDAkbzE2JGcxJHQxNzQ4MTUyNzEzJGo2MCRsMCRoMCRkamRqak14OVhkZmRVdjNYSVdlXzk2a2N5RmgtSm1IN1hkdw.." class="score-icon" alt="Score Icon">
        <div class="the-honest-score">${score.toFixed(1)}</div>
      </div>
      <div class="the-honest-reviews">${total_reviews} verified review${total_reviews !== 1 ? 's' : ''}</div>
    </div>
    <img src="https://74b0fc046962dee287537fffacbddacd.cdn.bubble.io/f1748152500612x296252883912272640/Logo_THE_weiss.png?_gl=1*13399zk*_gcl_au*MjA2MTY0NDE0MS4xNzQ2NTM4Nzcy*_ga*MjA5NDY1MjE0My4xNzQ2NTM4NzM1*_ga_BFPVR2DEE2*czE3NDgxNDgzMDAkbzE2JGcxJHQxNzQ4MTUyMTU4JGo0NyRsMCRoMCRkamRqak14OVhkZmRVdjNYSVdlXzk2a2N5RmgtSm1IN1hkdw.." class="honest-logo" alt="The Honest Experience">
  </div>

        `;
      })
      .catch(err => {
        console.error("Badge API error", err);
        badge.innerText = "Error loading badge.";
      });
  });
});

