/* ============================================================
   LUMEN — Curated Technology
   Shared store logic: cart, wishlist, toasts, nav, header search.
   Every page includes this after products.js.
   ============================================================ */

const STORE = {
  CART_KEY: "lumen_cart_v1",
  WISHLIST_KEY: "lumen_wishlist_v1",
  SAVED_KEY: "lumen_saved_for_later_v1",

  read(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("LUMEN storage read failed for", key, e);
      return [];
    }
  },
  write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("LUMEN storage write failed for", key, e);
    }
  },

  getCart() { return this.read(this.CART_KEY); },
  getWishlist() { return this.read(this.WISHLIST_KEY); },
  getSaved() { return this.read(this.SAVED_KEY); },

  addToCart(id, qty = 1) {
    const cart = this.getCart();
    const existing = cart.find(i => i.id === id);
    const product = getProductById(id);
    if (!product || product.stock <= 0) return false;
    const maxQty = product.stock;
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, maxQty);
    } else {
      cart.push({ id, qty: Math.min(qty, maxQty) });
    }
    this.write(this.CART_KEY, cart);
    updateNavCounts();
    return true;
  },
  setCartQty(id, qty) {
    let cart = this.getCart();
    const product = getProductById(id);
    const maxQty = product ? product.stock : 99;
    if (qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    } else {
      const item = cart.find(i => i.id === id);
      if (item) item.qty = Math.min(qty, maxQty);
    }
    this.write(this.CART_KEY, cart);
    updateNavCounts();
  },
  removeFromCart(id) {
    const cart = this.getCart().filter(i => i.id !== id);
    this.write(this.CART_KEY, cart);
    updateNavCounts();
  },
  cartCount() {
    return this.getCart().reduce((sum, i) => sum + i.qty, 0);
  },

  saveForLater(id) {
    this.removeFromCart(id);
    const saved = this.getSaved();
    if (!saved.includes(id)) saved.push(id);
    this.write(this.SAVED_KEY, saved);
  },
  moveSavedToCart(id) {
    let saved = this.getSaved().filter(i => i !== id);
    this.write(this.SAVED_KEY, saved);
    this.addToCart(id, 1);
  },
  removeSaved(id) {
    const saved = this.getSaved().filter(i => i !== id);
    this.write(this.SAVED_KEY, saved);
  },

  toggleWishlist(id) {
    let wishlist = this.getWishlist();
    const idx = wishlist.indexOf(id);
    let added;
    if (idx > -1) {
      wishlist.splice(idx, 1);
      added = false;
    } else {
      wishlist.push(id);
      added = true;
    }
    this.write(this.WISHLIST_KEY, wishlist);
    updateNavCounts();
    return added;
  },
  isWishlisted(id) {
    return this.getWishlist().includes(id);
  },
  removeFromWishlist(id) {
    const wishlist = this.getWishlist().filter(i => i !== id);
    this.write(this.WISHLIST_KEY, wishlist);
    updateNavCounts();
  },
  wishlistCount() {
    return this.getWishlist().length;
  }
};

/* ---------- Toast notifications ---------- */
function showToast(message, icon = "check-circle") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-${icon}"></i><span>${message}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("toast--visible"));
  setTimeout(() => {
    toast.classList.remove("toast--visible");
    setTimeout(() => toast.remove(), 320);
  }, 2400);
}

/* ---------- Nav badge counts (every page) ---------- */
function updateNavCounts() {
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    const n = STORE.cartCount();
    el.textContent = n;
    el.classList.toggle("badge--hidden", n === 0);
  });
  document.querySelectorAll("[data-wishlist-count]").forEach(el => {
    const n = STORE.wishlistCount();
    el.textContent = n;
    el.classList.toggle("badge--hidden", n === 0);
  });
}

/* ---------- Star rating markup ---------- */
function starsMarkup(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let html = "";
  for (let i = 0; i < full; i++) html += '<i class="fa-solid fa-star"></i>';
  if (half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
  for (let i = full + (half ? 1 : 0); i < 5; i++) html += '<i class="fa-regular fa-star"></i>';
  return html;
}

/* ---------- Product card factory (shared by home + shop + related) ---------- */
function productCardHTML(p) {
  const disc = discountPercent(p);
  const wished = STORE.isWishlisted(p.id);
  const outOfStock = p.stock <= 0;
  return `
  <article class="card" data-id="${p.id}">
    <a href="product.html?id=${p.id}" class="card__media">
      <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMG}';">
      ${disc > 0 ? `<span class="card__discount">-${disc}%</span>` : ""}
      ${outOfStock ? `<span class="card__oos">Out of stock</span>` : ""}
      <span class="card__spec">${p.spec}</span>
      <button class="card__wish ${wished ? "is-active" : ""}" data-action="wishlist" data-id="${p.id}" aria-label="Add to wishlist">
        <i class="fa-${wished ? "solid" : "regular"} fa-heart"></i>
      </button>
    </a>
    <div class="card__body">
      <p class="card__category">${p.category}</p>
      <a href="product.html?id=${p.id}" class="card__name">${p.name}</a>
      <div class="card__rating">
        <span class="stars">${starsMarkup(p.rating)}</span>
        <span class="card__reviews">(${p.reviews})</span>
      </div>
      <div class="card__price-row">
        <span class="card__price">${formatPrice(p.price)}</span>
        ${disc > 0 ? `<span class="card__price-old">${formatPrice(p.oldPrice)}</span>` : ""}
      </div>
      <div class="card__actions">
        <button class="btn btn--dark btn--block" data-action="quickview" data-id="${p.id}">Quick view</button>
        <button class="btn btn--ghost btn--icon" data-action="add-to-cart" data-id="${p.id}" ${outOfStock ? "disabled" : ""} aria-label="Add to cart">
          <i class="fa-solid fa-bag-shopping"></i>
        </button>
      </div>
    </div>
  </article>`;
}

/* ---------- Delegated click handling for cards rendered anywhere ---------- */
document.addEventListener("click", (e) => {
  const wishBtn = e.target.closest("[data-action='wishlist']");
  if (wishBtn) {
    e.preventDefault();
    const id = wishBtn.dataset.id;
    const added = STORE.toggleWishlist(id);
    wishBtn.classList.toggle("is-active", added);
    wishBtn.querySelector("i").className = `fa-${added ? "solid" : "regular"} fa-heart`;
    showToast(added ? "Added to wishlist" : "Removed from wishlist", "heart");
    if (typeof onWishlistChanged === "function") onWishlistChanged();
    return;
  }
  const cartBtn = e.target.closest("[data-action='add-to-cart']");
  if (cartBtn && !cartBtn.disabled) {
    e.preventDefault();
    const id = cartBtn.dataset.id;
    STORE.addToCart(id, 1);
    showToast("Added to cart", "bag-shopping");
    if (typeof onCartChanged === "function") onCartChanged();
    return;
  }
  const qvBtn = e.target.closest("[data-action='quickview']");
  if (qvBtn) {
    e.preventDefault();
    openQuickView(qvBtn.dataset.id);
    return;
  }
});

/* ---------- Quick View modal (shared) ---------- */
function ensureQuickViewModal() {
  if (document.getElementById("quickview-modal")) return;
  const modal = document.createElement("div");
  modal.id = "quickview-modal";
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal__backdrop" data-close-modal></div>
    <div class="modal__panel" role="dialog" aria-modal="true" aria-label="Quick view">
      <button class="modal__close" data-close-modal aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
      <div class="modal__content" id="quickview-content"></div>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-modal]")) closeQuickView();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeQuickView();
  });
}

function openQuickView(id) {
  const p = getProductById(id);
  if (!p) return;
  ensureQuickViewModal();
  const disc = discountPercent(p);
  const wished = STORE.isWishlisted(p.id);
  document.getElementById("quickview-content").innerHTML = `
    <div class="qv__media">
      <img src="${p.image}" alt="${p.name}" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMG}';">
    </div>
    <div class="qv__info">
      <p class="qv__category">${p.category} &middot; ${p.brand}</p>
      <h3 class="qv__name">${p.name}</h3>
      <div class="card__rating"><span class="stars">${starsMarkup(p.rating)}</span><span class="card__reviews">(${p.reviews} reviews)</span></div>
      <div class="card__price-row qv__price-row">
        <span class="qv__price">${formatPrice(p.price)}</span>
        ${disc > 0 ? `<span class="card__price-old">${formatPrice(p.oldPrice)}</span><span class="tag tag--amber">-${disc}%</span>` : ""}
      </div>
      <p class="qv__desc">${p.description}</p>
      <ul class="qv__features">
        ${p.features.slice(0, 4).map(f => `<li><i class="fa-solid fa-check"></i>${f}</li>`).join("")}
      </ul>
      <p class="qv__stock ${p.stock <= 0 ? "is-out" : p.stock < 10 ? "is-low" : ""}">
        ${p.stock <= 0 ? "Out of stock" : p.stock < 10 ? `Only ${p.stock} left` : "In stock"}
      </p>
      <div class="qv__actions">
        <button class="btn btn--dark" data-action="add-to-cart" data-id="${p.id}" ${p.stock <= 0 ? "disabled" : ""}>Add to cart</button>
        <button class="btn btn--outline" data-action="wishlist" data-id="${p.id}">
          <i class="fa-${wished ? "solid" : "regular"} fa-heart"></i> Wishlist
        </button>
        <a href="product.html?id=${p.id}" class="btn btn--ghost">View full details</a>
      </div>
    </div>`;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => document.getElementById("quickview-modal").classList.add("modal--visible"));
}

function closeQuickView() {
  const modal = document.getElementById("quickview-modal");
  if (!modal) return;
  modal.classList.remove("modal--visible");
  document.body.classList.remove("modal-open");
}

/* ---------- Mobile nav + header search shared behaviour ---------- */
document.addEventListener("DOMContentLoaded", () => {
  updateNavCounts();

  const hamburger = document.querySelector("[data-hamburger]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      mobileNav.classList.toggle("mobile-nav--open");
      hamburger.classList.toggle("is-active");
    });
  }

  const searchForms = document.querySelectorAll("[data-search-form]");
  searchForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      const q = input.value.trim();
      window.location.href = "shop.html" + (q ? `?q=${encodeURIComponent(q)}` : "");
    });
  });

  // Back to top button
  const backToTop = document.querySelector("[data-back-to-top]");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("is-visible", window.scrollY > 500);
    });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Newsletter forms
  document.querySelectorAll("[data-newsletter-form]").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      if (input.checkValidity()) {
        showToast("You're subscribed", "envelope-circle-check");
        form.reset();
      } else {
        input.reportValidity();
      }
    });
  });

  // Fade-in on scroll
  const revealTargets = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealTargets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("is-revealed"));
  }
});
