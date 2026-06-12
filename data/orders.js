import { cart, loadCart } from "./cart.js";

export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

const productId = cart.productId;
console.log(productId)

let summaryHTML = "";
let matchingItem;

function renderOrderHTML() {
  cart.forEach((cartItem) => {});
}
renderOrderHTML();
