import { orders } from './orders.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { loadProductsFromFetch, products } from './products.js';

async function renderTrackingHTML() {
  let html = '';
  let matchingProduct;
  let matchingOrder;
  let dateString;

  await loadProductsFromFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  orders.forEach((order) => {
    if (orderId === order.id) {
      matchingOrder = order;
    }
  });

  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });

  matchingOrder.products.forEach((option) => {
    let deliveryDate;
    deliveryDate = option.estimatedDeliveryTime;
    dateString = dayjs(deliveryDate).format('MMMM D');
    console.log(dateString);

     html = `
  <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on Monday,
          ${dateString}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">Quantity: ${option.quantity}</div>

        <img
          class="product-image"
          src="${matchingProduct.image}"
        />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
  `;
  });

  console.log(matchingOrder);
  console.log(matchingProduct);

  document.querySelector('.js-order-tracking').innerHTML = html;
}

renderTrackingHTML();
