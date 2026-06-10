import { loadFromStorage } from "../data/cart.js";

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems) {
        this.cartItems = [
          {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            qty: 2,
            deliveryOptionId: "1",
          },
          {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            qty: 1,
            deliveryOptionId: "2",
          },
        ];
      }
    },
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
      let matchingItem;

      // Checks if product already exists.
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.id) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.qty += 1;
      } else {
        this.cartItems.push({
          id: productId,
          qty: 1,
          deliveryOptionId: "1",
        });
      }

      this.saveToStorage();
    },
    // remove items from cart
    removeItemFromCart(productId) {
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (productId !== cartItem.id) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.id) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    },
  };

  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("business-cart");
console.log(businessCart);
