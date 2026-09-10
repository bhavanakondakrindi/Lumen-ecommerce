document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const PAGE_SIZE = 12;

  const state = {
    q: params.get("q") || "",
    categories: params.get("category") ? [params.get("category")] : [],
    brands: [],
    minPrice: null,
    maxPrice: null,
    minRating: 0,
    inStockOnly: false,
    sort: params.get("sort") || "featured",
    page: 1
  };

  const brands = [...new Set(PRODUCTS.map(p => p.brand))].sort();

  // Build category filter checkboxes
  document.getElementById("category-filters").innerHTML = CATEGORIES.map(c => `
    <label class="filter-option">
      <input type="checkbox" value="${c}" data-filter="category" ${state.categories.includes(c) ? "checked" : ""}>
      ${c}
    </label>`).join("");

  document.getElementById("brand-filters").innerHTML = brands.map(b => `
    <label class="filter-option"><input type="checkbox" value="${b}" data-filter="brand">${b}</label>`).join("");

  document.getElementById("rating-filters").innerHTML = [4, 3, 2].map(r => `
    <label class="filter-option">
      <input type="radio" name="rating" value="${r}" data-filter="rating">
      ${"★".repeat(r)}${"☆".repeat(5 - r)} &amp; up
    </label>`).join("") + `<label class="filter-option"><input type="radio" name="rating" value="0" data-filter="rating" checked>Any rating</label>`;

  document.getElementById("sort-select").value = state.sort;

  function getFiltered() {
    let list = PRODUCTS.slice();

    if (state.q) {
      const q = state.q.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (state.categories.length) list = list.filter(p => state.categories.includes(p.category));
    if (state.brands.length) list = list.filter(p => state.brands.includes(p.brand));
    if (state.minPrice != null) list = list.filter(p => p.price >= state.minPrice);
    if (state.maxPrice != null) list = list.filter(p => p.price <= state.maxPrice);
    if (state.minRating > 0) list = list.filter(p => p.rating >= state.minRating);
    if (state.inStockOnly) list = list.filter(p => p.stock > 0);

    switch (state.sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "newest": list.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); break;
      case "bestselling": list.sort((a, b) => b.reviews - a.reviews); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      default:
        list.sort((a, b) => (b.tags.includes("featured") ? 1 : 0) - (a.tags.includes("featured") ? 1 : 0));
    }
    return list;
  }

  function renderActiveFilters() {
    const chips = [];
    state.categories.forEach(c => chips.push({ label: c, clear: () => { state.categories = state.categories.filter(x => x !== c); } }));
    state.brands.forEach(b => chips.push({ label: b, clear: () => { state.brands = state.brands.filter(x => x !== b); } }));
    if (state.minRating > 0) chips.push({ label: `${state.minRating}★ & up`, clear: () => { state.minRating = 0; } });
    if (state.minPrice != null || state.maxPrice != null) chips.push({ label: `₹${state.minPrice || 0} – ₹${state.maxPrice || "∞"}`, clear: () => { state.minPrice = null; state.maxPrice = null; } });
    if (state.inStockOnly) chips.push({ label: "In stock only", clear: () => { state.inStockOnly = false; } });
    if (state.q) chips.push({ label: `"${state.q}"`, clear: () => { state.q = ""; } });

    const container = document.getElementById("active-filters");
    container.innerHTML = chips.map((c, i) => `<span class="tag tag--outline">${c.label}<button data-chip="${i}" aria-label="Remove filter"><i class="fa-solid fa-xmark"></i></button></span>`).join("");
    container.querySelectorAll("[data-chip]").forEach(btn => {
      btn.addEventListener("click", () => { chips[btn.dataset.chip].clear(); syncControlsFromState(); render(); });
    });
  }

  function syncControlsFromState() {
    document.querySelectorAll("[data-filter='category']").forEach(cb => cb.checked = state.categories.includes(cb.value));
    document.querySelectorAll("[data-filter='brand']").forEach(cb => cb.checked = state.brands.includes(cb.value));
    document.querySelectorAll("[data-filter='rating']").forEach(r => r.checked = Number(r.value) === state.minRating);
    document.getElementById("in-stock-only").checked = state.inStockOnly;
    document.getElementById("price-min").value = state.minPrice ?? "";
    document.getElementById("price-max").value = state.maxPrice ?? "";
  }

  function render() {
    const filtered = getFiltered();
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    state.page = Math.min(state.page, totalPages);
    const start = (state.page - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    document.getElementById("result-count").textContent = `Showing ${total === 0 ? 0 : start + 1}–${Math.min(start + PAGE_SIZE, total)} of ${total} products`;
    document.getElementById("shop-title").textContent = state.categories.length === 1 ? state.categories[0] : "All Products";

    const grid = document.getElementById("product-grid");
    const empty = document.getElementById("empty-state");
    if (pageItems.length === 0) {
      grid.innerHTML = "";
      empty.style.display = "block";
    } else {
      empty.style.display = "none";
      grid.innerHTML = pageItems.map(productCardHTML).join("");
    }

    const pagination = document.getElementById("pagination");
    if (totalPages <= 1) {
      pagination.innerHTML = "";
    } else {
      let html = "";
      for (let i = 1; i <= totalPages; i++) {
        html += `<button data-page="${i}" class="${i === state.page ? "is-active" : ""}">${i}</button>`;
      }
      pagination.innerHTML = html;
      pagination.querySelectorAll("[data-page]").forEach(btn => {
        btn.addEventListener("click", () => { state.page = Number(btn.dataset.page); render(); window.scrollTo({ top: 0, behavior: "smooth" }); });
      });
    }

    renderActiveFilters();
  }

  // Event bindings
  document.getElementById("category-filters").addEventListener("change", (e) => {
    const cb = e.target;
    if (cb.checked) state.categories.push(cb.value); else state.categories = state.categories.filter(v => v !== cb.value);
    state.page = 1; render();
  });
  document.getElementById("brand-filters").addEventListener("change", (e) => {
    const cb = e.target;
    if (cb.checked) state.brands.push(cb.value); else state.brands = state.brands.filter(v => v !== cb.value);
    state.page = 1; render();
  });
  document.getElementById("rating-filters").addEventListener("change", (e) => {
    state.minRating = Number(e.target.value); state.page = 1; render();
  });
  document.getElementById("in-stock-only").addEventListener("change", (e) => {
    state.inStockOnly = e.target.checked; state.page = 1; render();
  });
  ["price-min", "price-max"].forEach(id => {
    document.getElementById(id).addEventListener("input", () => {
      state.minPrice = document.getElementById("price-min").value ? Number(document.getElementById("price-min").value) : null;
      state.maxPrice = document.getElementById("price-max").value ? Number(document.getElementById("price-max").value) : null;
      state.page = 1; render();
    });
  });
  document.getElementById("sort-select").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
  document.getElementById("clear-filters").addEventListener("click", () => {
    state.q = ""; state.categories = []; state.brands = []; state.minPrice = null; state.maxPrice = null;
    state.minRating = 0; state.inStockOnly = false; state.page = 1;
    syncControlsFromState(); render();
  });

  syncControlsFromState();
  render();
});
