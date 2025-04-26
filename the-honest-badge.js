(async () => {
  const scriptTag = document.currentScript;
  const brandSlug = scriptTag.getAttribute("data-brand");

  const badge = document.createElement("div");
  badge.style.fontFamily = "system-ui, sans-serif";
  badge.style.border = "1px solid #ccc";
  badge.style.borderRadius = "12px";
  badge.style.padding = "12px 16px";
  badge.style.display = "inline-flex";
  badge.style.alignItems = "center";
  badge.style.gap = "12px";
  badge.style.background = "#fff";
  badge.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
  badge.style.fontSize = "14px";
  badge.style.lineHeight = "1.4";

  const logo = document.createElement("img");
  logo.src = "https://thehonestexperience.com/icon-192.png";
  logo.alt = "The Honest Experience";
  logo.style.height = "32px";
  logo.style.width = "32px";
  logo.style.borderRadius = "6px";

  const text = document.createElement("div");
  text.innerText = "Loading badge...";

  badge.appendChild(logo);
  badge.appendChild(text);
  scriptTag.parentNode.insertBefore(badge, scriptTag.nextSibling);

  try {
    const res = await fetch(
      `https://thehonestexperience.com/api/1.1/wf/badge-data?brand_slug=${brandSlug}`
    );
    const data = await res.json();
    if (data?.response?.score) {
      const score = data.response.score.toFixed(1);
      const reviews = data.response.total_reviews;
      const name = data.response.brand_name;
      const slug = data.response.slug;

      text.innerHTML = `
        <strong style="font-weight:600;">${name}</strong><br>
        <span style="color:#444;">Score: <strong>${score}</strong> | ${reviews} reviews</span><br>
        <a href="https://thehonestexperience.com/see-reviews/${slug}" target="_blank" style="color:#0066ff; text-decoration:none; font-size:12px;">See all reviews →</a>
      `;
    } else {
      text.innerText = "No reviews found.";
    }
  } catch (err) {
    text.innerText = "Error loading badge.";
    console.error("Badge error", err);
  }
})();
