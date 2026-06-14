import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { loadProductsFromFetch, products } from './products.js';
import { addToCart, cart } from './cart.js';
import { formatCurrency } from '../scripts/utils/money.js';
import { deliveryOptions, getDeliveryOption } from './deliveryOptions.js';

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

async function loadOrders() {
  updateCartQuantity();
  let orderSummaryHTML = '';

  await loadProductsFromFetch();

  orders.forEach((order) => {
    let matchingProduct;
    let matchingItem;
    let matchingOrderId;

    console.log(orders);

    const date = `${order.orderTime}`;
    const dateString = dayjs(date).format('MMMM, D');

    orderSummaryHTML += `
  <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dateString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
  `;

    order.products.forEach((productItem) => {
      matchingOrderId = productItem.productId;

      products.forEach((product) => {
        if (matchingOrderId === product.id) {
          matchingProduct = product;
        }
      });
      console.log(matchingProduct);

      orderSummaryHTML += `
      <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${matchingProduct.image}" />
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">Arriving on: ${dayjs(productItem.estimatedDeliveryTime).format('MMMM D')}</div>
              <div class="product-quantity">Quantity: ${productItem.quantity}</div>
              <button class="buy-again-button button-primary js-buy-again-button" data-product-id=${matchingProduct.id}>
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
           </div>
      </div>
      `;
    });
  });
  document.querySelector('.js-order-container').innerHTML = orderSummaryHTML;

  function updateCartQuantity() {
    // Make cart qty icon interactive
    let cartQty = 0;
    cart.forEach((cartItem) => {
      cartQty += cartItem.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = cartQty;
  }

  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      addToCart(productId);
      updateCartQuantity();
    });
  });
}
loadOrders();
