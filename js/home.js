document.addEventListener("DOMContentLoaded", () => {
  const byTag = (tag) => PRODUCTS.filter(p => p.tags.includes(tag));

  const featured = byTag("featured").slice(0, 4);
  const trending = byTag("trending").slice(0, 4);
  const bestseller = byTag("bestseller").slice(0, 4);
  const newest = [...PRODUCTS].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 4);

  document.getElementById("featured-grid").innerHTML = featured.map(productCardHTML).join("");
  document.getElementById("trending-grid").innerHTML = trending.map(productCardHTML).join("");
  document.getElementById("bestseller-grid").innerHTML = bestseller.map(productCardHTML).join("");
  document.getElementById("new-grid").innerHTML = newest.map(productCardHTML).join("");
});
