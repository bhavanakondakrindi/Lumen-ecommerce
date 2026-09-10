document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("checkout-root");
  const cartItems = STORE.getCart().map(i => ({ ...i, product: getProductById(i.id) })).filter(i => i.product);

  if (cartItems.length === 0) {
    root.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-bag-shopping"></i>
        <h2>There's nothing to check out yet</h2>
        <p>Add a product to your cart first.</p>
        <a href="shop.html" class="btn btn--dark btn--lg">Browse products</a>
      </div>`;
    return;
  }

  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const savings = cartItems.reduce((sum, i) => sum + Math.max(0, (i.product.oldPrice || i.product.price) - i.product.price) * i.qty, 0);

  root.innerHTML = `
    <div class="checkout-layout">
      <form id="checkout-form" novalidate>

        <div class="form-section">
          <h3><i class="fa-solid fa-location-dot"></i> Shipping Information</h3>
          <div class="form-grid">
            <div class="field full">
              <label for="f-name">Full name</label>
              <input type="text" id="f-name" required>
              <p class="error-msg">Enter your full name.</p>
            </div>
            <div class="field">
              <label for="f-email">Email</label>
              <input type="email" id="f-email" required>
              <p class="error-msg">Enter a valid email address.</p>
            </div>
            <div class="field">
              <label for="f-phone">Phone</label>
              <input type="tel" id="f-phone" required pattern="[0-9]{10}" placeholder="10-digit number">
              <p class="error-msg">Enter a valid 10-digit phone number.</p>
            </div>
            <div class="field full">
              <label for="f-address">Address</label>
              <input type="text" id="f-address" required>
              <p class="error-msg">Enter your street address.</p>
            </div>
            <div class="field">
              <label for="f-city">City</label>
              <input type="text" id="f-city" required>
              <p class="error-msg">Enter your city.</p>
            </div>
            <div class="field">
              <label for="f-state">State</label>
              <input type="text" id="f-state" required>
              <p class="error-msg">Enter your state.</p>
            </div>
            <div class="field">
              <label for="f-zip">ZIP / PIN code</label>
              <input type="text" id="f-zip" required pattern="[0-9]{6}" placeholder="6-digit PIN">
              <p class="error-msg">Enter a valid 6-digit PIN code.</p>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3><i class="fa-solid fa-truck"></i> Delivery Method</h3>
          <div class="option-tiles" id="delivery-tiles">
            <label class="option-tile is-checked">
              <input type="radio" name="delivery" value="standard" checked>
              <span><strong>Standard Delivery</strong><span>Arrives in 4–6 days</span></span>
              <span class="option-tile__price">Free</span>
            </label>
            <label class="option-tile">
              <input type="radio" name="delivery" value="express">
              <span><strong>Express Delivery</strong><span>Arrives in 1–2 days</span></span>
              <span class="option-tile__price">₹249</span>
            </label>
          </div>
        </div>

        <div class="form-section">
          <h3><i class="fa-solid fa-credit-card"></i> Payment Method</h3>
          <div class="option-tiles" id="payment-tiles">
            <label class="option-tile is-checked">
              <input type="radio" name="payment" value="card" checked>
              <span><strong>Credit / Debit Card</strong><span>Visa, Mastercard, RuPay</span></span>
            </label>
            <label class="option-tile">
              <input type="radio" name="payment" value="upi">
              <span><strong>UPI</strong><span>Google Pay, PhonePe, Paytm</span></span>
            </label>
            <label class="option-tile">
              <input type="radio" name="payment" value="netbanking">
              <span><strong>Net Banking</strong><span>All major banks</span></span>
            </label>
            <label class="option-tile">
              <input type="radio" name="payment" value="cod">
              <span><strong>Cash on Delivery</strong><span>Pay when it arrives</span></span>
            </label>
          </div>
          <div id="card-fields" class="form-grid" style="margin-top:18px;">
            <div class="field full">
              <label for="f-card-number">Card number</label>
              <input type="text" id="f-card-number" placeholder="0000 0000 0000 0000" maxlength="19">
            </div>
            <div class="field">
              <label for="f-card-expiry">Expiry</label>
              <input type="text" id="f-card-expiry" placeholder="MM/YY" maxlength="5">
            </div>
            <div class="field">
              <label for="f-card-cvv">CVV</label>
              <input type="text" id="f-card-cvv" placeholder="123" maxlength="3">
            </div>
          </div>
          <p style="font-size:12px;color:#a08a83;margin-top:8px;"><i class="fa-solid fa-lock"></i> This is a simulated checkout — no real payment is processed.</p>
        </div>

      </form>

      <aside class="summary-card">
        <h3>Order Summary</h3>
        <div class="checkout-summary-items">
          ${cartItems.map(i => `
            <div class="checkout-summary-item">
              <img src="${i.product.image}" alt="${i.product.name}">
              <div><div class="name">${i.product.name}</div><div class="qty">Qty ${i.qty}</div></div>
              <span class="price">${formatPrice(i.product.price * i.qty)}</span>
            </div>`).join("")}
        </div>
        <div class="summary-row"><span>Subtotal</span><span class="val">${formatPrice(subtotal)}</span></div>
        <div class="summary-row"><span>Discount</span><span class="val" style="color:var(--emerald)">−${formatPrice(savings)}</span></div>
        <div class="summary-row"><span>Delivery</span><span class="val" id="summary-delivery">Free</span></div>
        <div class="summary-row total"><span>Total</span><span class="val" id="summary-total">${formatPrice(subtotal)}</span></div>
        <button class="btn btn--amber btn--block btn--lg" id="place-order-btn" style="margin-top:16px;">Place Order</button>
      </aside>
    </div>
  `;

  const deliveryPrices = { standard: 0, express: 249 };
  function updateTotals() {
    const deliveryMethod = document.querySelector("input[name=delivery]:checked").value;
    const deliveryFee = deliveryPrices[deliveryMethod];
    document.getElementById("summary-delivery").textContent = deliveryFee === 0 ? "Free" : formatPrice(deliveryFee);
    document.getElementById("summary-total").textContent = formatPrice(subtotal + deliveryFee);
  }

  document.querySelectorAll("#delivery-tiles input").forEach(input => {
    input.addEventListener("change", () => {
      document.querySelectorAll("#delivery-tiles .option-tile").forEach(t => t.classList.remove("is-checked"));
      input.closest(".option-tile").classList.add("is-checked");
      updateTotals();
    });
  });

  const cardFields = document.getElementById("card-fields");
  document.querySelectorAll("#payment-tiles input").forEach(input => {
    input.addEventListener("change", () => {
      document.querySelectorAll("#payment-tiles .option-tile").forEach(t => t.classList.remove("is-checked"));
      input.closest(".option-tile").classList.add("is-checked");
      cardFields.style.display = input.value === "card" ? "grid" : "none";
    });
  });

  function validateForm() {
    const form = document.getElementById("checkout-form");
    let valid = true;
    form.querySelectorAll(".field").forEach(field => {
      const input = field.querySelector("input");
      input.classList.add("touched");
      const ok = input.checkValidity();
      field.classList.toggle("has-error", !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      form.querySelector(".has-error input")?.focus();
      form.querySelector(".has-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return valid;
  }

  document.getElementById("place-order-btn").addEventListener("click", () => {
    if (!validateForm()) {
      showToast("Please fix the highlighted fields", "circle-exclamation");
      return;
    }
    const deliveryMethod = document.querySelector("input[name=delivery]:checked").value;
    const paymentMethod = document.querySelector("input[name=payment]:checked").value;
    const deliveryFee = deliveryPrices[deliveryMethod];
    const finalTotal = subtotal + deliveryFee;

    const order = {
      orderNumber: "LMN" + Math.floor(100000 + Math.random() * 900000),
      name: document.getElementById("f-name").value,
      email: document.getElementById("f-email").value,
      items: cartItems.map(i => ({ id: i.product.id, name: i.product.name, qty: i.qty, price: i.product.price })),
      subtotal, savings, deliveryFee, deliveryMethod, paymentMethod, finalTotal,
      placedAt: new Date().toISOString()
    };
    localStorage.setItem("lumen_last_order", JSON.stringify(order));
    STORE.write(STORE.CART_KEY, []);
    window.location.href = "order-success.html";
  });

  updateTotals();
});
