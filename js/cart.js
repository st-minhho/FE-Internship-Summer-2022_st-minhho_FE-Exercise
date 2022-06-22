import { getLocal, setLocal, totalCart, listKey, renderTotalCart } from './index.js';
var $productTableList = document.querySelector('.js-product-cart-list');
var productInCart = getLocal(listKey.cart);
var total = 0;
var subTotal = 0;
var sum = 0;
var eventListenersCart = function () {
    renderDataCart();
    renderTotalCart();
    totalCart();
    countCart();
};
var renderDataCart = function () {
    if (productInCart) {
        $productTableList.innerHTML = '';
        productInCart.forEach(function (data) {
            var html = '';
            var price = data.price;
            var qty = data.qty;
            sum = +price * +qty;
            subTotal = +sum.toFixed(2);
            total += +subTotal;
            html += "\n        <tr class=\"product-item\">\n          <td class=\"product-remove\">\n            <button data-id=\"".concat(data.id, "\" class=\"btn btn-primary js-remove-link\">\n              <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n            </button>\n          </td>\n          <td class=\"image-prod\">\n            <div class=\"product-img\">\n              <img src=\"").concat(data.imgSrc, "\" alt=\"\">\n            </div>\n          </td>\n          <td class=\"product-name\">\n            <h4>").concat(data.name, "</h4>\n          </td>\n          <td class=\"price\">").concat(data.price, "</td>\n          <td class=\"quantity\">\n            <div class=\"js-cart-quantity-button\">\n            <button data-id=\"").concat(data.id, "\" class=\"btn btn-primary js-cart-quantity-down\"> - </button>\n            <input class=\"cart_quantity_input\" type=\"text\" name=\"quantity\" value=\"").concat(data.qty, "\">\n            <button data-id=\"").concat(data.id, "\" class=\"btn btn-primary js-cart-quantity-up\"> + </button>\n            </div>\n          </td>\n          <td class=\"total\">$").concat(subTotal, "</td>\n        </tr>\n      ");
            $productTableList.innerHTML += html;
        });
        document.getElementById('price-total').innerHTML = '$' + total;
        var btnUpdateQuantity = document.querySelectorAll('.js-cart-quantity-button button');
        for (var i = 0; i < btnUpdateQuantity.length; i++) {
            btnUpdateQuantity[i].addEventListener('click', updateQuantity);
        }
        var btnDeleteProduct = document.querySelectorAll('.js-remove-link');
        for (var i = 0; i < btnDeleteProduct.length; i++) {
            btnDeleteProduct[i].addEventListener('click', delProduct);
        }
    }
};
var updateQuantity = function (e) {
    var productID = e.target.dataset.id;
    var mess;
    if (e.target.classList.contains('js-cart-quantity-up')) {
        mess = 'plus';
    }
    else {
        mess = 'minus';
    }
    handleQuantity(mess, productID);
};
var handleQuantity = function (mess, productID) {
    var index = productInCart.findIndex(function (obj) { return obj.id === productID; });
    var cart = productInCart.find(function (obj) { return obj.id === productID; });
    var getQty = 0;
    if (mess === 'plus') {
        getQty = parseInt(cart.qty) + 1;
        productInCart.map(function (data) {
            if (data.id === productID) {
                data.qty++;
            }
        });
    }
    else {
        getQty = parseInt(cart.qty) - 1;
        productInCart.map(function (data) {
            if (data.id === productID) {
                if (data.qty > 1) {
                    data.qty--;
                }
                else {
                    productInCart.splice(index, 1);
                }
            }
        });
    }
    setLocal(listKey.cart, productInCart);
    eventListenersCart();
};
var delProduct = function (e) {
    var productID = e.target.dataset.id;
    productInCart = productInCart.filter(function (item) { return item.id !== productID; });
    setLocal(listKey.cart, productInCart);
    eventListenersCart();
};
var countCart = function () {
    var sumCart = 0;
    if (productInCart) {
        productInCart.map(function (data) {
            var quantity = data.qty;
            var price = data.price;
            subTotal = +quantity * +price;
            sumCart += +subTotal.toFixed(2);
        });
        document.getElementById('price-total').innerHTML = '$' + sumCart.toFixed(2);
    }
};
eventListenersCart();
