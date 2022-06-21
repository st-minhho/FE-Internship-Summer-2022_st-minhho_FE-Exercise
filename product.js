"use strict";
exports.__esModule = true;
exports.eventListeners = void 0;
var index_js_1 = require("./index.js");
var index_js_2 = require("./index.js");
var $product = document.querySelector(".product-list");
var $totalCount = document.querySelector(".total-cart");
var cartList = [];
var productItem = [];
var cartQty = 0;
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
function eventListeners() {
    (0, index_js_1.setLocal)(index_js_2.listKey.product, index_js_2.productData);
    renderData();
    //renderTotalCart();
}
exports.eventListeners = eventListeners;
function renderData() {
    var productData = (0, index_js_1.getLocal)(index_js_2.listKey.product);
    var html = "";
    if (productData) {
        productData.map(function (data) {
            html += "\n      <li class=\"col-3 product-item\">\n        <div class=\"product-img\">\n          <img src=\"".concat(data.imgSrc, "\" alt=\"Image product\" />\n          <div class=\"product-overlay\">\n            <button data-id=\"").concat(data.id, "\" class=\"btn btn-primary add-to-cart\" >Add to cart</button>\n          </div>\n        </div>\n        <div class=\"product-content\">\n          <h4 class=\"product-name\">").concat(data.name, "</h4>\n          <div class=\"product-price\">\n            <span class=\"price-sell\">$").concat(data.price, "</span>\n          </div>\n        </div>\n      </li>\n    ");
        });
    }
    $product === null || $product === void 0 ? void 0 : $product.append(html);
    var $btnAddToCart = document.querySelectorAll(".add-to-cart");
    for (var i = 0; i < $btnAddToCart.length; i++) {
        $btnAddToCart[i].addEventListener("click", addToCart);
    }
}
function addToCart() {
}
