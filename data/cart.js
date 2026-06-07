export const cart = [];

export function addToCart(productId) {
  // Deduplicate products.
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.qty += 1;
  } else {
    cart.push({
      productId,
      qty: 1,
    });
  }
}