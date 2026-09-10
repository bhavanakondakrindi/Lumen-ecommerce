document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = getProductById(id);
  const root = document.getElementById("product-root");

  if (!product) {
    root.innerHTML = `
      <div class="empty-state" style="padding:100px 20px;">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <h3>We couldn't find that product</h3>
        <p>It may have been removed or the link is out of date.</p>
        <a href="shop.html" class="btn btn--dark" style="margin-top:16px;">Back to shop</a>
      </div>`;
    return;
  }

  document.title = `${product.name} — LUMEN`;
  document.getElementById("breadcrumbs").innerHTML = `
    <a href="index.html">Home</a><i class="fa-solid fa-chevron-right"></i>
    <a href="shop.html?category=${encodeURIComponent(product.category)}">${product.category}</a><i class="fa-solid fa-chevron-right"></i>
    <span>${product.name}</span>`;

  const disc = discountPercent(product);
  const wished = STORE.isWishlisted(product.id);
  const gallery = product.gallery && product.gallery.length ? product.gallery : [product.image];

  root.innerHTML = `
    <div class="pdp" style="padding:20px 0 60px;">
      <div>
        <div class="pdp__gallery-main" id="gallery-main">
          <img src="${gallery[0]}" alt="${product.name}" id="gallery-main-img" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMG}';">
        </div>
        <div class="pdp__thumbs" id="gallery-thumbs">
          ${gallery.map((src, i) => `<button data-src="${src}" class="${i === 0 ? "is-active" : ""}"><img src="${src}" alt="${product.name} view ${i + 1}" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMG}';"></button>`).join("")}
        </div>
      </div>
      <div>
        <p class="pdp__brand">${product.brand} &middot; ${product.category}</p>
        <h1 class="pdp__title">${product.name}</h1>
        <div class="pdp__meta-row">
          <span class="stars">${starsMarkup(product.rating)}</span>
          <span class="card__reviews">${product.rating.toFixed(1)} (${product.reviews} reviews)</span>
          <span class="tag ${product.stock > 0 ? "tag--emerald" : "tag--outline"}">${product.stock > 0 ? "In stock" : "Out of stock"}</span>
        </div>
        <div class="pdp__price-row">
          <span class="pdp__price">${formatPrice(product.price)}</span>
          ${disc > 0 ? `<span class="pdp__price-old">${formatPrice(product.oldPrice)}</span><span class="tag tag--amber">-${disc}%</span>` : ""}
        </div>
        <p class="pdp__desc">${product.description}</p>

        <p class="pdp__stock ${product.stock <= 0 ? "is-out" : product.stock < 10 ? "is-low" : ""}">
          <i class="fa-solid ${product.stock <= 0 ? "fa-circle-xmark" : "fa-circle-check"}"></i>
          ${product.stock <= 0 ? "Currently out of stock" : product.stock < 10 ? `Only ${product.stock} left in stock` : "In stock, ready to ship"}
        </p>

        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
          <div class="qty-selector">
            <button type="button" id="qty-minus" aria-label="Decrease quantity">−</button>
            <input type="number" id="qty-input" value="1" min="1" max="${Math.max(product.stock, 1)}" aria-label="Quantity">
            <button type="button" id="qty-plus" aria-label="Increase quantity">+</button>
          </div>
          <span style="font-size:12.5px;color:#a08a83;">${product.stock} available</span>
        </div>

        <div class="pdp__actions">
          <button class="btn btn--dark btn--lg" id="add-cart-btn" ${product.stock <= 0 ? "disabled" : ""}><i class="fa-solid fa-bag-shopping"></i> Add to cart</button>
          <button class="btn btn--amber btn--lg" id="buy-now-btn" ${product.stock <= 0 ? "disabled" : ""}>Buy now</button>
          <button class="btn btn--outline btn--icon" id="wishlist-btn" aria-label="Add to wishlist">
            <i class="fa-${wished ? "solid" : "regular"} fa-heart"></i>
          </button>
        </div>

        <div class="pdp__trust">
          <div><i class="fa-solid fa-truck-fast"></i>48-hour express delivery</div>
          <div><i class="fa-solid fa-rotate-left"></i>7-day easy returns</div>
          <div><i class="fa-solid fa-shield-halved"></i>1-year warranty</div>
        </div>

        <div class="pdp__tabs">
          <div class="tabs__nav">
            <button data-tab="description" class="is-active">Description</button>
            <button data-tab="specs">Specifications</button>
            <button data-tab="reviews">Reviews (${product.reviews})</button>
          </div>
          <div class="tabs__panel is-active" data-panel="description">
            <p class="pdp__desc">${product.description}</p>
            <ul class="features-list">
              ${product.features.map(f => `<li><i class="fa-solid fa-check"></i>${f}</li>`).join("")}
            </ul>
          </div>
          <div class="tabs__panel" data-panel="specs">
            <table class="spec-table">
              ${Object.entries(product.specs).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("")}
            </table>
          </div>
          <div class="tabs__panel" data-panel="reviews" id="reviews-panel"></div>
        </div>
      </div>
    </div>

    <div class="related">
      <div class="section-head">
        <div><p class="eyebrow">You might also like</p><h2>Related products</h2></div>
      </div>
      <div class="grid" id="related-grid"></div>
    </div>
  `;

  // Gallery thumbnails
  document.querySelectorAll("#gallery-thumbs button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("gallery-main-img").src = btn.dataset.src;
      document.querySelectorAll("#gallery-thumbs button").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });
  // Zoom on click
  const galleryMain = document.getElementById("gallery-main");
  galleryMain.addEventListener("click", () => galleryMain.classList.toggle("is-zoomed"));

  // Quantity controls
  const qtyInput = document.getElementById("qty-input");
  document.getElementById("qty-minus").addEventListener("click", () => {
    qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
  });
  document.getElementById("qty-plus").addEventListener("click", () => {
    qtyInput.value = Math.min(Number(qtyInput.max), Number(qtyInput.value) + 1);
  });
  qtyInput.addEventListener("change", () => {
    let v = Math.max(1, Math.min(Number(qtyInput.max), Number(qtyInput.value) || 1));
    qtyInput.value = v;
  });

  // Add to cart / buy now / wishlist
  document.getElementById("add-cart-btn").addEventListener("click", () => {
    STORE.addToCart(product.id, Number(qtyInput.value));
    showToast("Added to cart", "bag-shopping");
  });
  document.getElementById("buy-now-btn").addEventListener("click", () => {
    STORE.addToCart(product.id, Number(qtyInput.value));
    window.location.href = "checkout.html";
  });
  document.getElementById("wishlist-btn").addEventListener("click", function () {
    const added = STORE.toggleWishlist(product.id);
    this.querySelector("i").className = `fa-${added ? "solid" : "regular"} fa-heart`;
    showToast(added ? "Added to wishlist" : "Removed from wishlist", "heart");
  });

  // Tabs
  document.querySelectorAll(".tabs__nav button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tabs__nav button").forEach(b => b.classList.remove("is-active"));
      document.querySelectorAll(".tabs__panel").forEach(p => p.classList.remove("is-active"));
      btn.classList.add("is-active");
      document.querySelector(`[data-panel="${btn.dataset.tab}"]`).classList.add("is-active");
    });
  });

  // Reviews (deterministic mock breakdown based on product data)
  renderReviews(product);

  // Related products: same category, excluding current
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  document.getElementById("related-grid").innerHTML = related.length
    ? related.map(productCardHTML).join("")
    : `<p style="color:#a08a83;">No related products in this category yet.</p>`;
});

function renderReviews(product) {
  const dist = { 5: 0.62, 4: 0.24, 3: 0.09, 2: 0.03, 1: 0.02 };
  const names = ["Priya S.", "Karan V.", "Divya R.", "Aman T.", "Nisha P.", "Rohit M."];
  const sampleReviews = [
    { stars: 5, name: names[0], date: "3 weeks ago", text: `Exactly as described. The ${product.spec.split(" / ")[0]} spec makes a real difference day-to-day.` },
    { stars: 4, name: names[1], date: "1 month ago", text: "Very happy with this. Docked one star only because delivery took a day longer than promised." },
    { stars: 5, name: names[2], date: "1 month ago", text: "Build quality is genuinely excellent. Feels like it costs more than it does." },
    { stars: 3, name: names[3], date: "2 months ago", text: "Good product overall, but the included accessories feel a bit basic for the price." }
  ];

  const panel = document.getElementById("reviews-panel");
  panel.innerHTML = `
    <div class="review-summary">
      <div class="review-summary__score">
        <strong>${product.rating.toFixed(1)}</strong>
        <span class="stars">${starsMarkup(product.rating)}</span>
        <p style="font-size:12px;color:#a08a83;margin:6px 0 0;">${product.reviews} reviews</p>
      </div>
      <div class="review-bars">
        ${[5, 4, 3, 2, 1].map(n => `
          <div class="review-bar">
            <span style="width:34px;">${n}★</span>
            <div class="review-bar__track"><div class="review-bar__fill" style="width:${dist[n] * 100}%"></div></div>
            <span style="width:34px;text-align:right;">${Math.round(dist[n] * 100)}%</span>
          </div>`).join("")}
      </div>
    </div>
    ${sampleReviews.map(r => `
      <div class="review-item">
        <div class="review-item__head">
          <span class="review-item__name">${r.name}</span>
          <span class="stars" style="font-size:11px;">${starsMarkup(r.stars)}</span>
          <span class="review-item__date">${r.date}</span>
        </div>
        <p>${r.text}</p>
      </div>`).join("")}
  `;
}
