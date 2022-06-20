var productTableList = document.querySelector('.product-cart-list');
var totalCount = document.querySelector('.total-cart');
var listKey = {
  product: 'product',
  cart: 'cart',
  cartTotal: 'totalCart',
};
function getLocal(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

function setLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

eventListeners();

function eventListeners() {
  renderData();
  renderTotalCart();
}

function renderData() {
  var productInCart = getLocal(listKey.cart);
  var total = 0;
  var subTotal = 0;
  var sum = 0;
  if (productInCart) {
    Object.keys(productInCart).map((key, value) => {
      var html = '';
      var price = productInCart[key]['price'].slice(1);
      var qty = productInCart[key]['qty'];
      sum = +price * +qty;
      subTotal = sum.toFixed(2);
      total += +subTotal;
      html += `
        <tr class="product-item">
          <td class="product-remove">
            <button data-id="${key}" class="btn btn-primary remove-link" href="#">
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
          </td>
          <td class="image-prod">
            <div class="product-img">
              <img src="${productInCart[key]['imgSrc']}" alt="">
            </div>
          </td>
          <td class="product-name">
            <h4>${productInCart[key]['name']}</h4>
          </td>
          <td class="price">${productInCart[key]['price']}</td>
          <td class="quantity">
            <div class="cart_quantity_button">
              <button data-id="${key}" class="btn btn-primary cart-quantity-up" href="#"> + </button>
              <input class="cart_quantity_input" type="text" name="quantity" value="${productInCart[key]['qty']}">
              <button data-id="${key}" class="btn btn-primary cart-quantity-down" href="#"> - </button>
            </div>
          </td>
          <td class="total">$${subTotal}</td>
        </tr>
      `;
      productTableList.innerHTML += html;
    });
    document.getElementById('price-total').innerHTML = '$' + total;

    var btnUpdateQuantity = document.querySelectorAll('.cart_quantity_button button');
    for (let i = 0; i < btnUpdateQuantity.length; i++) {
      btnUpdateQuantity[i].addEventListener('click', updateQuantity);
    }

    var btnDeleteProduct = document.querySelectorAll('.remove-link');
    for (let i = 0; i < btnDeleteProduct.length; i++) {
      btnDeleteProduct[i].addEventListener('click', delProduct);
    }
  }
}

function updateQuantity(e) {
  var productID = e.target.dataset.id;
  var cartItem = e.target.parentElement.parentElement.parentElement;
  var mess = 0;
  if (e.target.classList.contains('cart-quantity-up')) {
    mess = 1;
  } else {
    mess = -1;
  }
  handleQuantity(mess, productID, cartItem);
}

function handleQuantity(mess, productID, cartItem) {
  var productHandle = getLocal(listKey.cart);
  var getQty = cartItem.querySelector('.cart_quantity_input').getAttribute('value');
  var getPrice = cartItem.querySelector('.price').textContent.slice(1);

  if (mess === 1) {
    getQty = parseInt(getQty) + 1;
    sum = getQty * parseFloat(getPrice);
    subTotal = sum.toFixed(2);
    Object.keys(productHandle).map((key, value) => {
      if (key === productID) {
        productHandle[key]['qty']++;
        cartItem.querySelector('.cart_quantity_input').setAttribute('value', productHandle[key]['qty']);
        cartItem.querySelector('.total').innerHTML = '$' + subTotal;
      }
    });
  } else {
    getQty = parseInt(getQty) - 1;
    sum = getQty * parseFloat(getPrice);
    subTotal = sum.toFixed(2);
    Object.keys(productHandle).map((key, value) => {
      if (key === productID) {
        if (productHandle[key]['qty'] > 1) {
          productHandle[key]['qty']--;
          cartItem.querySelector('.cart_quantity_input').setAttribute('value', productHandle[key]['qty']);
          cartItem.querySelector('.total').innerHTML = '$' + subTotal;
        } else {
          delete productHandle[key];
          cartItem.parentNode.removeChild(cartItem);
        }
      }
    });
  }
  setLocal(listKey.cart, productHandle);
  totalCart();
  countCart();
}

function renderTotalCart() {
  var cartTotal = getLocal(listKey.cartTotal);
  totalCount.innerHTML = cartTotal;
}

function totalCart() {
  var sumQtyCart = 0;
  var countCart = getLocal(listKey.cart);
  if (countCart) {
    Object.keys(countCart).map((key, value) => {
      sumQtyCart += countCart[key]['qty'];
    });
  }
  setLocal(listKey.cartTotal, sumQtyCart);
  totalCount.innerHTML = sumQtyCart;
}

function delProduct(e) {
  if (e.target.classList.contains('remove-link')) {
    var product = e.target.parentElement.parentElement;
    var getID = e.target.dataset.id;
  }
  var productData = getLocal(listKey.cart);
  if (productData) {
    Object.keys(productData).map((key, value) => {
      if (key === getID) {
        delete productData[key];
        product.parentNode.removeChild(product);
      }
    });
  }
  setLocal(listKey.cart, productData);
  totalCart();
  countCart();
}

function countCart() {
  var sumCart = 0;
  var productList = getLocal(listKey.cart);
  if (productList) {
    Object.keys(productList).map((key, value) => {
      var quantity = productList[key]['qty'];
      var price = productList[key]['price'].slice(1);
      subTotal = +quantity * +price;
      sumCart += +subTotal.toFixed(2);
    });
    document.getElementById('price-total').innerHTML = '$' + sumCart.toFixed(2);
  }
}
