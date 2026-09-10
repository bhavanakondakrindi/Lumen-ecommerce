function onWishlistChanged() { renderWishlist(); }

document.addEventListener("DOMContentLoaded", renderWishlist);

function renderWishlist() {
  const root = document.getElementById("wishlist-root");
  const ids = STORE.getWishlist();
  const items = ids.map(getProductById).filter(Boolean);

  document.getElementById("wishlist-count-label").textContent = items.length ? `${items.length} item${items.length > 1 ? "s" : ""}` : "";

  if (items.length === 0) {
    root.innerHTML = `
      <div class="empty-cart">
        <i class="fa-regular fa-heart"></i>
        <h2>Your wishlist is empty</h2>
        <p>Tap the heart on any product to save it here for later.</p>
        <a href="shop.html" class="btn btn--dark btn--lg">Explore products</a>
      </div>`;
    return;
  }

  root.innerHTML = `<div class="grid">${items.map(productCardHTML).join("")}</div>`;

  // "Move to cart" convenience row under each wishlist card
  root.querySelectorAll(".card").forEach(card => {
    const id = card.dataset.id;
    const actions = card.querySelector(".card__actions");
    const moveBtn = document.createElement("button");
    moveBtn.className = "btn btn--ghost btn--sm";
    moveBtn.innerHTML = `<i class="fa-solid fa-arrow-right-arrow-left"></i>`;
    moveBtn.title = "Move to cart";
    moveBtn.addEventListener("click", () => {
      STORE.addToCart(id, 1);
      STORE.removeFromWishlist(id);
      showToast("Moved to cart", "bag-shopping");
      renderWishlist();
    });
    actions.appendChild(moveBtn);
  });
}
