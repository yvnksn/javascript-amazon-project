import renderOrderSummary from './checkout/orderSummary.js';
import renderPaymentSummary from './checkout/paymentSummary.js';
// import "../data/backend-practice.js";
import { loadProductsFromFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';

async function loadPage() {
  console.log('async load page');

  await loadProductsFromFetch();

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();
