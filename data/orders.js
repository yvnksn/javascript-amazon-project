import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { loadProductsFromFetch, products } from './products.js';
import { cart } from './cart.js';
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
  let orderHeaderHTML = '';
  let matchingProduct;
  let matchingItem;
  let matchingOrderId;

  await loadProductsFromFetch();

  orders.forEach((item) => {
    const date = `${item.orderTime}`;
    const dateString = dayjs(date).format('MMMM, D');

    orderHeaderHTML += `
  <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dateString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(item.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${item.id}</div>
            </div>
          </div>
  `;
    document.querySelector('.js-order-container').innerHTML = orderHeaderHTML;

    item.products.forEach((item) => {
      matchingOrderId = item.productId;

      products.forEach((product) => {
        if (matchingOrderId === product.id) {
          matchingProduct = product;
        }
      });
      console.log(matchingProduct);

      `
      <div class="order-details-grid">
            <div class="product-image-container">
              <img src="images/products/athletic-cotton-socks-6-pairs.jpg" />
            </div>

            <div class="product-details">
              <div class="product-name">
                Black and Gray Athletic Cotton Socks - 6 Pairs
              </div>
              <div class="product-delivery-date">Arriving on: August 15</div>
              <div class="product-quantity">Quantity: 1</div>
              <button class="buy-again-button button-primary">
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

            <div class="product-image-container">
              <img
                src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg"
              />
            </div>

            <div class="product-details">
              <div class="product-name">
                Adults Plain Cotton T-Shirt - 2 Pack
              </div>
              <div class="product-delivery-date">Arriving on: August 19</div>
              <div class="product-quantity">Quantity: 2</div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=123&productid=4">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
      `;
    });
  });
}

loadOrders();
