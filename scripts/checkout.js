import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
// import "../data/backend-practice.js";
import { loadProductsFromFetch } from "../data/products.js";
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

/*
await Promise.all([
  loadProductsFromFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve("done.");
    });
  }),
]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});

loadProductsFromFetch().then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

async function loadPage() {
  await loadProductsFromFetch();

  const prom = await new Promise((resolve) => {
    loadCart(() => {
      resolve("closing Promise");
    });
  });

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();
