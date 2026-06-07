export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      qty: 2,
    },
    {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      qty: 1,
    },
  ];
}

/**
 *
 * @param {*} localStorage
 * save item in localstorage
 */
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  // Deduplicate products.
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.id) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.qty += 1;
  } else {
    cart.push({
      id: productId,
      qty: 1,
    });
  }
  console.log(cart);
  saveToStorage();
}

// remove items from cart.
export function removeItemFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (productId !== cartItem.id) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}
