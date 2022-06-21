"use strict";
exports.__esModule = true;
exports.eventListeners = void 0;
var listKey = {
    product: 'product',
    cart: 'cart',
    cartTotal: 'cartTotal'
};
var productData = [
    {
        id: "pd1",
        name: "T-Shirt Summer Vibes",
        price: "89.99",
        imgSrc: "./images/image-product1.png"
    },
    {
        id: "pd2",
        name: "Loose Knit 3/4 Sleeve",
        price: "119.99",
        imgSrc: "./images/image-product2.png"
    },
    {
        id: "pd3",
        name: "Basic Slim Fit T-Shirt",
        price: "119.99",
        imgSrc: "./images/image-product3.png"
    },
    {
        id: "pd4",
        name: "Loose Textured T-Shirt",
        price: "119.99",
        imgSrc: "./images/image-product4.png"
    },
];
function getLocal(key) {
    var item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
}
function setLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
var $product = document.querySelector(".product-list");
var $totalCount = document.querySelector(".total-cart");
console.log($product);
var cartList = [];
var productItem = [];
var cartQty = 0;
eventListeners();
function eventListeners() {
    setLocal(listKey.product, productData);
    renderData();
    //renderTotalCart();
}
exports.eventListeners = eventListeners;
function renderData() {
    var productData = getLocal(listKey.product);
    var html = '';
    if (productData) {
        productData.map(function (data) {
            html +=
                "<li class=\"col-3 product-item\">\n        <div class=\"product-img\">\n          <img src=\"".concat(data.imgSrc, "\" alt=\"Image product\" />\n          <div class=\"product-overlay\">\n            <button data-id=\"").concat(data.id, "\" class=\"btn btn-primary add-to-cart\" >Add to cart</button>\n          </div>\n        </div>\n        <div class=\"product-content\">\n          <h4 class=\"product-name\">").concat(data.name, "</h4>\n          <div class=\"product-price\">\n            <span class=\"price-sell\">$").concat(data.price, "</span>\n          </div>\n        </div>\n      </li>\n    ");
        });
    }
    if ($product) {
        $product.innerHTML = html;
    }
    var $btnAddToCart = document.querySelectorAll(".add-to-cart");
    for (var i = 0; i < $btnAddToCart.length; i++) {
        $btnAddToCart[i].addEventListener("click", addToCart);
    }
}
function addToCart(e) {
    var productID = e.target.dataset.id;
    handleQuantityCart("add", productID);
}
function handleQuantityCart(mess, productID) {
    var productInCart = getLocal(listKey.cart);
    var productData = getLocal(listKey.product);
    var findProduct = productData.find(function (obj) { return obj.id === productID; });
    if (mess === "add") {
        if (productInCart) {
            var cart = productInCart.find(function (obj) { return obj.id === productID; });
            if (cart) {
                cart.qty++;
            }
            else {
                productInCart.push({
                    id: findProduct.id,
                    name: findProduct.name,
                    imgSrc: findProduct.imgSrc,
                    discount: findProduct.discount,
                    price: findProduct.price,
                    qty: 1
                });
            }
        }
        else {
            productInCart = [];
            productInCart.push({
                id: findProduct.id,
                name: findProduct.name,
                imgSrc: findProduct.imgSrc,
                discount: findProduct.discount,
                price: findProduct.price,
                qty: 1
            });
        }
        setLocal(listKey.cart, productInCart);
        //totalCart();
    }
}
