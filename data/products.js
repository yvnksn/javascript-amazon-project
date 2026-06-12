import { formatCurrency } from "../scripts/utils/money.js";

export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsURL() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return "";
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
    <a href='${this.sizeChartLink}' target="_blank">
      Size Chart
    </a>
    `;
  }
}

export let products = [];

/*
export function loadProducts(fun) {
  console.log("load products");
  let XHRresponse;

  const XHR = new XMLHttpRequest();

  XHR.addEventListener("load", () => {
    XHRresponse = XHR.response;
    products = JSON.parse(XHRresponse).map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
    fun();
  });

  XHR.addEventListener("error", (e) => {
    console.log('Unexpected error. Please try again later')
  });

  XHR.open("GET", "https://supersimplebackend.dev/products");
  XHR.send();
}
*/

export function loadProductsFromFetch() {
  const promise = fetch("https://supersimplebackend.dev/products")
    .then((response) => {
      return response.json();
    })
    .then((productDetails) => {
      products = productDetails.map((productDetails) => {
        if (productDetails.type === "clothing") {
          return new Clothing(productDetails);
        }
        return new Product(productDetails);
      });
    })/*.catch((error) => {
      console.log('Unexpected error. Please try again later...')
    })*/

  return promise;
}
loadProductsFromFetch()
