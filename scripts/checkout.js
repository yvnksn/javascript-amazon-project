import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
// import "../data/backend-practice.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
/** 
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
**/

// Use Promise to loadProducts;
/*
new Promise((resolve) => {
  loadProducts();
  resolve();
}).then(() => {
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/

Promise.all([
  new Promise((resolve) => {
    loadProducts();
    resolve('load product');
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('done.');
    });
  }),
]).then((values) => {
  console.log(values)
  renderOrderSummary();
  renderPaymentSummary();
});
