import {getLocal,setLocal} from './index.js'

import {listKey, productData} from './index.js'

let $product = document.querySelector(".product-list");
let $totalCount = document.querySelector(".total-cart");

let cartList = [];
let productItem = [];
let cartQty = 0;

// const listKey = {
//   product : 'product',
//   cart : 'cart',
//   cartTotal : 'cartTotal'
// };

// const productData = [
//   {
//     id: "pd1",
//     name: "T-Shirt Summer Vibes",
//     price: "89.99",
//     imgSrc: "./images/image-product1.png",
//   },
//   {
//     id: "pd2",
//     name: "Loose Knit 3/4 Sleeve",
//     price: "119.99",
//     imgSrc: "./images/image-product2.png",
//   },
//   {
//     id: "pd3",
//     name: "Basic Slim Fit T-Shirt",
//     price: "119.99",
//     imgSrc: "./images/image-product3.png",
//   },
//   {
//     id: "pd4",
//     name: "Loose Textured T-Shirt",
//     price: "119.99",
//     imgSrc: "./images/image-product4.png",
//   },
// ];


eventListeners();

export function eventListeners() {
  setLocal(listKey.product, productData);
  renderData();
  //renderTotalCart();
}


function renderData() {
  let productData = getLocal(listKey.product);
  let html = "";
  if (productData) {
    productData.map( data => {
      html += `
      <li class="col-3 product-item">
        <div class="product-img">
          <img src="${data.imgSrc}" alt="Image product" />
          <div class="product-overlay">
            <button data-id="${data.id}" class="btn btn-primary add-to-cart" >Add to cart</button>
          </div>
        </div>
        <div class="product-content">
          <h4 class="product-name">${data.name}</h4>
          <div class="product-price">
            <span class="price-sell">$${data.price}</span>
          </div>
        </div>
      </li>
    `;
    });
  }
  $product?.append(html);

  let $btnAddToCart = document.querySelectorAll(".add-to-cart");
  for (let i = 0; i < $btnAddToCart.length; i++) {
    $btnAddToCart[i].addEventListener("click", addToCart);
  }
}

function addToCart(){
  
}