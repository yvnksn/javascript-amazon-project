export const cart = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    qty: 2,
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    qty: 1,
  },
];

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
