function onCartChanged() { renderCart(); }

document.addEventListener("DOMContentLoaded", renderCart);

function renderCart() {
  const root = document.getElementById("cart-root");
  const cartItems = STORE.getCart().map(i => ({ ...i, product: getProductById(i.id) })).filter(i => i.product);
  const savedItems = STORE.getSaved().map(id => getProductById(id)).filter(Boolean);

  if (cartItems.length === 0 && savedItems.length === 0) {
    root.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-bag-shopping"></i>
        <h2>Your cart is empty</h2>
        <p>Products you add will show up here, ready for checkout.</p>
        <a href="shop.html" class="btn btn--dark btn--lg">Continue shopping</a>
      </div>`;
    return;
  }

  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const savings = cartItems.reduce((sum, i) => sum + Math.max(0, (i.product.oldPrice || i.product.price) - i.product.price) * i.qty, 0);
  const delivery = cartItems.length === 0 ? 0 : (subtotal >= 15000 ? 0 : 199);
  const total = subtotal + delivery;

  root.innerHTML = `
    <div class="cart-layout">
      <div>
        <div id="cart-items">
          ${cartItems.length ? cartItems.map(cartItemHTML).join("") : `<p style="color:#a08a83;padding:20px 0;">No items in your cart yet.</p>`}
        </div>
        ${savedItems.length ? `
          <div class="saved-later">
            <h3 style="font-family:var(--font-display);font-size:19px;margin:0 0 14px;">Saved for later (${savedItems.length})</h3>
            ${savedItems.map(savedItemHTML).join("")}
          </div>` : ""}
        <a href="shop.html" class="btn btn--outline" style="margin-top:20px;"><i class="fa-solid fa-arrow-left"></i> Continue shopping</a>
      </div>

      <aside class="summary-card">
        <h3>Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span class="val">${formatPrice(subtotal)}</span></div>
        <div class="summary-row"><span>You save</span><span class="val" style="color:var(--emerald)">−${formatPrice(savings)}</span></div>
        <div class="summary-row"><span>Delivery</span><span class="val">${delivery === 0 ? "Free" : formatPrice(delivery)}</span></div>
        <div class="promo-row">
          <input type="text" placeholder="Promo code" id="promo-input">
          <button class="btn btn--ghost btn--sm" id="promo-apply">Apply</button>
        </div>
        <div class="summary-row total"><span>Total</span><span class="val">${formatPrice(total)}</span></div>
        <button class="btn btn--amber btn--block btn--lg" id="checkout-btn" style="margin-top:16px;" ${cartItems.length === 0 ? "disabled" : ""}>
          Proceed to Checkout <i class="fa-solid fa-arrow-right"></i>
        </button>
      </aside>
    </div>
  `;

  document.getElementById("checkout-btn")?.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });
  document.getElementById("promo-apply")?.addEventListener("click", () => {
    const code = document.getElementById("promo-input").value.trim();
    if (code) showToast("That code isn't valid or has expired", "circle-info");
    else showToast("Enter a promo code first", "circle-info");
  });

  // Quantity + remove + save-for-later bindings
  root.querySelectorAll("[data-qty-minus]").forEach(btn => btn.addEventListener("click", () => changeQty(btn.dataset.qtyMinus, -1)));
  root.querySelectorAll("[data-qty-plus]").forEach(btn => btn.addEventListener("click", () => changeQty(btn.dataset.qtyPlus, 1)));
  root.querySelectorAll("[data-qty-input]").forEach(input => input.addEventListener("change", () => {
    const v = Math.max(1, Number(input.value) || 1);
    STORE.setCartQty(input.dataset.qtyInput, v);
    renderCart();
  }));
  root.querySelectorAll("[data-remove]").forEach(btn => btn.addEventListener("click", () => {
    STORE.removeFromCart(btn.dataset.remove);
    showToast("Removed from cart", "trash");
    renderCart();
  }));
  root.querySelectorAll("[data-save-later]").forEach(btn => btn.addEventListener("click", () => {
    STORE.saveForLater(btn.dataset.saveLater);
    showToast("Saved for later", "bookmark");
    renderCart();
  }));
  root.querySelectorAll("[data-move-to-cart]").forEach(btn => btn.addEventListener("click", () => {
    STORE.moveSavedToCart(btn.dataset.moveToCart);
    showToast("Moved to cart", "bag-shopping");
    renderCart();
  }));
  root.querySelectorAll("[data-remove-saved]").forEach(btn => btn.addEventListener("click", () => {
    STORE.removeSaved(btn.dataset.removeSaved);
    renderCart();
  }));
}

function changeQty(id, delta) {
  const cart = STORE.getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  STORE.setCartQty(id, item.qty + delta);
  renderCart();
}

function cartItemHTML(item) {
  const p = item.product;
  return `
    <div class="cart-item">
      <a href="product.html?id=${p.id}" class="cart-item__media"><img src="${p.image}" alt="${p.name}" onerror="this.onerror=null;this.src=PLACEHOLDER_IMG;"></a>
      <div>
        <a href="product.html?id=${p.id}" class="cart-item__name">${p.name}</a>
        <p class="cart-item__meta">${p.category} &middot; ${p.spec}</p>
        <div class="qty-selector">
          <button type="button" data-qty-minus="${p.id}" aria-label="Decrease quantity">−</button>
          <input type="number" data-qty-input="${p.id}" value="${item.qty}" min="1" max="${p.stock}" aria-label="Quantity">
          <button type="button" data-qty-plus="${p.id}" aria-label="Increase quantity">+</button>
        </div>
        <div class="cart-item__links" style="margin-top:10px;">
          <button data-save-later="${p.id}">Save for later</button>
          <button data-remove="${p.id}">Remove</button>
        </div>
      </div>
      <div class="cart-item__right">
        <span class="cart-item__price">${formatPrice(p.price * item.qty)}</span>
        ${discountPercent(p) > 0 ? `<span class="card__price-old">${formatPrice(p.oldPrice * item.qty)}</span>` : ""}
      </div>
    </div>`;
}

function savedItemHTML(p) {
  return `
    <div class="cart-item">
      <a href="product.html?id=${p.id}" class="cart-item__media"><img src="${p.image}" alt="${p.name}" onerror="this.onerror=null;this.src=PLACEHOLDER_IMG;"></a>
      <div>
        <a href="product.html?id=${p.id}" class="cart-item__name">${p.name}</a>
        <p class="cart-item__meta">${formatPrice(p.price)}</p>
        <div class="cart-item__links">
          <button data-move-to-cart="${p.id}">Move to cart</button>
          <button data-remove-saved="${p.id}">Remove</button>
        </div>
      </div>
      <div class="cart-item__right"></div>
    </div>`;
}
