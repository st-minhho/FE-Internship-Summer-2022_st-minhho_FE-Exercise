var productTableList = document.querySelector(".product-cart-list");

var totalCount = document.querySelector(".total-cart");
var listKey = {
  product: "product",
  cart: "cart",
  cartTotal: "totalCart",
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

function renderTotalCart() {
  var cartTotal = getLocal(listKey.cartTotal);
  totalCount.innerHTML = cartTotal;
}

function totalCart() {
  var sumQtyCart = 0;
  var countCart = getLocal(listKey.cart);
  if (countCart) {
    Object.keys(countCart).map((key, value) => {
      sumQtyCart += countCart[key]["qty"];
    });
  }
  setLocal(listKey.cartTotal, sumQtyCart);
  totalCount.innerHTML = sumQtyCart;
}

function renderData() {
  var productInCart = getLocal(listKey.cart);
  var total = 0;
  var subTotal = 0;
  var sum = 0;
  if (productInCart) {
    productInCart.forEach((data) => {
      var html = "";
      var price = data.price;
      var qty = data.qty;
      sum = +price * +qty;
      subTotal = sum.toFixed(2);
      total += +subTotal;
      html += `
        <tr class="product-item">
          <td class="product-remove">
            <button data-id="${data.id}" class="btn btn-primary remove-link" href="#">
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
            <div class="cart_quantity_button">
              <button data-id="${data.id}" class="btn btn-primary cart-quantity-up" href="#"> + </button>
              <input class="cart_quantity_input" type="text" name="quantity" value="${data.qty}">
              <button data-id="${data.id}" class="btn btn-primary cart-quantity-down" href="#"> - </button>
            </div>
          </td>
          <td class="total">$${subTotal}</td>
        </tr>
      `;
      productTableList.innerHTML += html;
    });
    document.getElementById("price-total").innerHTML = "$" + total;

    var btnUpdateQuantity = document.querySelectorAll(
      ".cart_quantity_button button"
    );
    for (let i = 0; i < btnUpdateQuantity.length; i++) {
      btnUpdateQuantity[i].addEventListener("click", updateQuantity);
    }

    var btnDeleteProduct = document.querySelectorAll(".remove-link");
    for (let i = 0; i < btnDeleteProduct.length; i++) {
      btnDeleteProduct[i].addEventListener("click", delProduct);
    }
  }
}

function updateQuantity(e) {
  var productID = e.target.dataset.id;
  var mess = 0;
  if (e.target.classList.contains("cart-quantity-up")) {
    mess = 1;
  } else {
    mess = -1;
  }
  handleQuantity(mess, productID);
}

function handleQuantity(mess, productID) {
  var productInCart2 = getLocal(listKey.cart);
  var index = productInCart2.findIndex((obj) => obj.id === productID);
  console.log("1111", productInCart2);
  var cart = productInCart2.find((obj) => obj.id === productID);
  //console.log('ccc',cart)
  var getQty = 0;
  var subTotal = 0;
  var sum = 0;
  if (mess === 1) {
    console.log("addddd", cart);
    getQty = parseInt(cart.qty) + 1;
    sum = getQty * parseFloat(cart.price);
    subTotal = sum.toFixed(2);
    productInCart2.map((data) => {
      if (data.id === productID) {
        data.qty++;
        productTableList.children[index]
          .querySelector(".cart_quantity_input")
          .setAttribute("value", productInCart2[index].qty);
        productTableList.children[index].querySelector(".total").innerHTML =
          "$" + subTotal;
      }
    });
  } else {
    console.log("minussss", cart);
    getQty = parseInt(cart.qty) - 1;
    sum = getQty * parseFloat(cart.price);
    subTotal = sum.toFixed(2);
    productInCart2.map((data) => {
      if (data.id === productID) {
        if (data.qty > 1) {
          data.qty--;
          productTableList.children[index]
            .querySelector(".cart_quantity_input")
            .setAttribute("value", productInCart2[index].qty);
          productTableList.children[index].querySelector(".total").innerHTML =
            "$" + subTotal;
        } else {
          productInCart2.splice(data, 1);
          productTableList.removeChild(productTableList.children[index]);
        }
      }
    });
  }
  setLocal(listKey.cart, productInCart2);
  totalCart();
  countCart();
}

function delProduct(e) {
  var productID = e.target.dataset.id;
  var productInCart = getLocal(listKey.cart);
  var index = productInCart.findIndex((obj) => obj.id === productID);
  productInCart.splice(
    productInCart.findIndex(function (i) {
      return i.id === productID;
    }),
    1
  );
  productTableList.removeChild(productTableList.children[index]);
  console.log(productInCart);
  setLocal(listKey.cart, productInCart);
  console.log("delete", productInCart);
  totalCart();
  countCart();
}

function countCart() {
  var sumCart = 0;
  var productList = getLocal(listKey.cart);
  if (productList) {
    productList.map((data) => {
      var quantity = data.qty;
      var price = data.price;
      subTotal = +quantity * +price;
      sumCart += +subTotal.toFixed(2);
    });
    document.getElementById("price-total").innerHTML = "$" + sumCart.toFixed(2);
  }
}
