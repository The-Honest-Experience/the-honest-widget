(function () {
  const scriptTag = document.currentScript;
  const brand = scriptTag.getAttribute('data-brand');

  fetch(`https://thehonestexperience.com/api/badge-data?brand_slug=${brand}`)
    .then(res => res.json())
    .then(data => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <div style="border:1px solid #FF403F;padding:12px;border-radius:10px;max-width:300px;font-family:Poppins,sans-serif;color:#2C2C2C;background:#fff;">
          <div style="font-size:20px;font-weight:bold;color:#FF403F;">${data.score} ★</div>
          <div style="font-size:14px;">Based on ${data.total_reviews} verified reviews</div>
          <a href="https://thehonestexperience.com/brand/${data.slug}" target="_blank" style="display:inline-block;margin-top:6px;font-size:13px;color:#FF403F;text-decoration:none;">
            See all reviews →
          </a>
        </div>
      `;
      scriptTag.insertAdjacentElement('afterend', wrapper);
    });
})();
