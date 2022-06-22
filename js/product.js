var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { listKey, productData, getLocal, setLocal, totalCart, renderTotalCart } from './index.js';
setLocal(listKey.product, productData);
var renderData = function () {
    var productData = getLocal(listKey.product);
    var html = '';
    if (productData) {
        productData.map(function (data) {
            html +=
                "<li class=\"col-3 product-item\">\n        <div class=\"product-img\">\n          <img src=\"".concat(data.imgSrc, "\" alt=\"Image product\" />\n          <div class=\"product-overlay\">\n            <button data-id=\"").concat(data.id, "\" class=\"btn btn-primary js-add-to-cart\" >Add to cart</button>\n          </div>\n        </div>\n        <div class=\"product-content\">\n          <h4 class=\"product-name\">").concat(data.name, "</h4>\n          <div class=\"product-price\">\n            <span class=\"price-sell\">$").concat(data.price, "</span>\n          </div>\n        </div>\n      </li>\n    ");
        });
    }
    var $product = document.querySelector('.js-product-list');
    if ($product) {
        $product.innerHTML = html;
    }
    var $btnAddToCart = document.querySelectorAll('.js-add-to-cart');
    for (var i = 0; i < $btnAddToCart.length; i++) {
        $btnAddToCart[i].addEventListener('click', addToCart);
    }
};
var addToCart = function (e) {
    var productID = e.target.dataset.id;
    handleQuantityCart('add', productID);
};
var handleQuantityCart = function (mess, productID) {
    var productInCart = getLocal(listKey.cart);
    var productData = getLocal(listKey.product);
    var findProduct = productData.find(function (obj) { return obj.id === productID; });
    if (mess === 'add') {
        if (productInCart) {
            var cart = productInCart.find(function (obj) { return obj.id === productID; });
            if (cart) {
                cart.qty++;
            }
            else {
                productInCart.push(__assign(__assign({}, findProduct), { qty: 1 }));
            }
        }
        else {
            productInCart = [];
            productInCart.push(__assign(__assign({}, findProduct), { qty: 1 }));
        }
        setLocal(listKey.cart, productInCart);
        totalCart();
    }
};
var eventListenersCart = function () {
    renderData();
    renderTotalCart();
};
eventListenersCart();
