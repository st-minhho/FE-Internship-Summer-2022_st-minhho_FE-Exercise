export const listKey = {
  product : 'product',
  cart : 'cart',
  cartTotal : 'cartTotal'
};

export const productData = [
  {
    id: "pd1",
    name: "T-Shirt Summer Vibes",
    price: "89.99",
    imgSrc: "./images/image-product1.png",
  },
  {
    id: "pd2",
    name: "Loose Knit 3/4 Sleeve",
    price: "119.99",
    imgSrc: "./images/image-product2.png",
  },
  {
    id: "pd3",
    name: "Basic Slim Fit T-Shirt",
    price: "119.99",
    imgSrc: "./images/image-product3.png",
  },
  {
    id: "pd4",
    name: "Loose Textured T-Shirt",
    price: "119.99",
    imgSrc: "./images/image-product4.png",
  },
];


export function getLocal(key) {
  let item = localStorage.getItem(key);
  return item ? JSON.parse(item) : [];
}

console.log(getLocal(listKey.product))

export function setLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}


import {eventListeners} from './product.js'



