<div class="integration-section" style="max-width: 800px; margin: 0 auto; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  
  <h1 style="font-size: 32px; font-weight: 700; margin-bottom: 12px;">Add Your Honest Badge</h1>
  <p style="font-size: 18px; color: #444; margin-bottom: 32px;">
    Let your visitors see how your brand performs based on verified customer reviews. Simply copy and paste the following snippet into your site.
  </p>

  <!-- Code block -->
  <div style="background-color: #f7f7f7; border: 1px solid #ddd; padding: 20px; border-radius: 8px; font-family: monospace; font-size: 14px; position: relative;">
    <button onclick="navigator.clipboard.writeText(document.getElementById('widget-code').innerText)" style="position: absolute; top: 12px; right: 12px; background-color: #ef443d; color: white; border: none; border-radius: 4px; padding: 4px 10px; font-size: 12px; cursor: pointer;">Copy</button>
    <pre id="widget-code"><code>&lt;script src="https://the-honest-widget.pages.dev/embed.js" data-widget-id="YOUR_UUID_HERE" defer&gt;&lt;/script&gt;</code></pre>
  </div>

  <!-- Live preview (optional) -->
  <div style="margin-top: 48px;">
    <h2 style="font-size: 22px; font-weight: 600; margin-bottom: 16px;">Live preview:</h2>
    <div class="the-honest-widget" data-brand="YOUR_UUID_HERE"></div>
  </div>

  <p style="margin-top: 40px; font-size: 14px; color: #666;">
    Works with Shopify, Webflow, WordPress and any website with HTML support.
  </p>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const uuid = "30232558139534853023255813953485gf78wgf8ewpE8G36P88G8PFWE"; // Example UUID
    const widget = document.querySelector(".the-honest-widget");
    if (widget) widget.dataset.brand = uuid;
    
    const script = document.createElement("script");
    script.src = "https://the-honest-widget.pages.dev/embed-universal-line.js";
    script.defer = true;
    document.body.appendChild(script);
  });
</script>
