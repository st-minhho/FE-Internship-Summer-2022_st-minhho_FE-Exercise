// import {getLocal,setLocal} from './index'

// import {listKey, productData} from './index'

// let $product = document.querySelector(".product-list");
// let $totalCount = document.querySelector(".total-cart");
// console.log($product)

// let cartList = [];
// let productItem = [];
// let cartQty = 0;

// eventListeners();

// export function eventListeners() {
//   setLocal(listKey.product, productData);
//   renderData();
//   //renderTotalCart();
// }


// function renderData() {
//   let productData = getLocal(listKey.product);
//   let html = "";
//   if (productData) {
//     productData.map( data => {
//       html += `
//       <li class="col-3 product-item">
//         <div class="product-img">
//           <img src="${data.imgSrc}" alt="Image product" />
//           <div class="product-overlay">
//             <button data-id="${data.id}" class="btn btn-primary add-to-cart" >Add to cart</button>
//           </div>
//         </div>
//         <div class="product-content">
//           <h4 class="product-name">${data.name}</h4>
//           <div class="product-price">
//             <span class="price-sell">$${data.price}</span>
//           </div>
//         </div>
//       </li>
//     `;
//     });
//   }
//   $product?.append(html);

//   let $btnAddToCart = document.querySelectorAll(".add-to-cart");
//   for (let i = 0; i < $btnAddToCart.length; i++) {
//     $btnAddToCart[i].addEventListener("click", addToCart);
//   }
// }

// function addToCart(){
  
// }