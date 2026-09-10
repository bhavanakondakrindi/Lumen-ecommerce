document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("success-root");
  const raw = localStorage.getItem("lumen_last_order");

  if (!raw) {
    root.innerHTML = `
      <h1>No recent order found</h1>
      <p>Looks like you haven't placed an order yet this session.</p>
      <a href="shop.html" class="btn btn--dark btn--lg">Start shopping</a>`;
    return;
  }

  const order = JSON.parse(raw);
  const placed = new Date(order.placedAt);
  const deliveryDays = order.deliveryMethod === "express" ? 2 : 5;
  const estDelivery = new Date(placed);
  estDelivery.setDate(estDelivery.getDate() + deliveryDays);
  const estDeliveryStr = estDelivery.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  const paymentLabels = { card: "Credit / Debit Card", upi: "UPI", netbanking: "Net Banking", cod: "Cash on Delivery" };

  root.innerHTML = `
    <div class="success-check"><i class="fa-solid fa-check"></i></div>
    <h1>Order confirmed${order.name ? ", " + order.name.split(" ")[0] : ""}!</h1>
    <p>Thank you for shopping with LUMEN. A confirmation email is on its way to ${order.email || "your inbox"}.</p>
    <div class="order-details">
      <div class="row"><span>Order number</span><span>${order.orderNumber}</span></div>
      <div class="row"><span>Items</span><span>${order.items.reduce((s, i) => s + i.qty, 0)}</span></div>
      <div class="row"><span>Payment method</span><span>${paymentLabels[order.paymentMethod] || order.paymentMethod}</span></div>
      <div class="row"><span>Total paid</span><span>${formatPrice(order.finalTotal)}</span></div>
      <div class="row"><span>Estimated delivery</span><span>${estDeliveryStr}</span></div>
    </div>
    <a href="shop.html" class="btn btn--amber btn--lg">Continue Shopping</a>
  `;
});
