import { getLocal, setLocal, totalCart, LIST_KEY, renderTotalCart } from './index.js';
const $productTableList = document.querySelector('.js-product-cart-list');
let productInCart = getLocal(LIST_KEY.CART);
let total = 0;
let subTotal = 0;
let sum = 0;
const eventListenersCart = () => {
    renderDataCart();
    renderTotalCart();
    totalCart();
    countCart();
};
const renderDataCart = () => {
    if (productInCart) {
        $productTableList.innerHTML = '';
        productInCart.forEach((data) => {
            let html = '';
            let price = data.price;
            let qty = data.qty;
            sum = +price * +qty;
            subTotal = +sum.toFixed(2);
            total += +subTotal;
            html += `
        <tr class="product-item">
          <td class="product-remove">
            <button data-id="${data.id}" class="btn btn-primary js-remove-link">
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
          </td>
          <td class="image-prod">
            <div class="product-img">
              <img src="${data.imgSrc}" alt="">
            </div>
          </td>
          <td class="product-name">
            <h4>${data.name}</h4>
          </td>
          <td class="price">${data.price}</td>
          <td class="quantity">
            <div class="js-cart-quantity-button">
            <button data-id="${data.id}" class="btn btn-primary js-cart-quantity-down"> - </button>
            <input class="cart_quantity_input" type="text" name="quantity" value="${data.qty}">
            <button data-id="${data.id}" class="btn btn-primary js-cart-quantity-up"> + </button>
            </div>
          </td>
          <td class="total">$${subTotal}</td>
        </tr>
      `;
            $productTableList.innerHTML += html;
        });
        document.getElementById('price-total').innerHTML = '$' + total;
        let btnUpdateQuantity = document.querySelectorAll('.js-cart-quantity-button button');
        for (let i = 0; i < btnUpdateQuantity.length; i++) {
            btnUpdateQuantity[i].addEventListener('click', updateQuantity);
        }
        let btnDeleteProduct = document.querySelectorAll('.js-remove-link');
        for (let i = 0; i < btnDeleteProduct.length; i++) {
            btnDeleteProduct[i].addEventListener('click', delProduct);
        }
    }
};
const updateQuantity = (e) => {
    let productID = e.target.dataset.id;
    let mess;
    if (e.target.classList.contains('js-cart-quantity-up')) {
        mess = 'plus';
    }
    else {
        mess = 'minus';
    }
    handleQuantity(mess, productID);
};
const handleQuantity = (mess, productID) => {
    let index = productInCart.findIndex((obj) => obj.id === productID);
    let cart = productInCart.find((obj) => obj.id === productID);
    let getQty = 0;
    if (mess === 'plus') {
        getQty = cart.qty + 1;
        productInCart.map((data) => {
            if (data.id === productID) {
                data.qty++;
            }
        });
    }
    else {
        getQty = cart.qty - 1;
        productInCart.map((data) => {
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
    setLocal(LIST_KEY.CART, productInCart);
    eventListenersCart();
};
const delProduct = (e) => {
    let productID = e.target.dataset.id;
    productInCart = productInCart.filter((item) => item.id !== productID);
    setLocal(LIST_KEY.CART, productInCart);
    eventListenersCart();
};
const countCart = () => {
    let sumCart = 0;
    if (productInCart) {
        productInCart.map((data) => {
            let quantity = data.qty;
            let price = data.price;
            subTotal = +quantity * +price;
            sumCart += +subTotal.toFixed(2);
        });
        document.getElementById('price-total').innerHTML = '$' + sumCart.toFixed(2);
    }
};
eventListenersCart();
