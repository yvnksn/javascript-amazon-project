import {
  cart,
  removeItemFromCart,
  updateDeliveryOption,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

let cartSummaryHTML = "";
cart.forEach((cartItem) => {
  const productId = cartItem.id;

  // Normalization -
  let matchingProduct;

  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">Delivery date: ${dateString}</div>

        <div class="cart-item-details-grid">
            <img
            class="product-image"
            src="${matchingProduct.image}"
            />

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
            <div class="product-quantity">
                <span> Quantity: <span class="quantity-label">${cartItem.qty}</span> </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-quantity-link"
                data-product-id=${matchingProduct.id}>
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            
           
            </div>
        </div>
    </div>
    `;
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
});
document.querySelectorAll(".js-delete-quantity-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    const { productId } = link.dataset;
    removeItemFromCart(productId);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );
    container.remove();
  });
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE"
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    console.log(cartItem);

    html += `
    <div class="delivery-option js-delivery-option"
    data-product-id=${matchingProduct.id}
    data-delivery-option-id=${deliveryOption.id}
    >
                <input
                type="radio"
                ${isChecked ? "checked" : ""}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
                />
                <div>
                <div class="delivery-option-date">${dateString}</div>
                <div class="delivery-option-price">${priceString} Shipping</div>
                </div>
            </div>
    `;
  });
  return html;
}

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", (e) => {
    const { productId, deliveryOptionId } = element.dataset;
    console.log(productId, deliveryOptionId)
    updateDeliveryOption(productId, deliveryOptionId);
  });
});
