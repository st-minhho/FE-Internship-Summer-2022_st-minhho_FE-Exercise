const productTableList = document.querySelector(".product-cart-list");
const totalCount = document.querySelector(".total-cart");
var total = 0;
var subTotal = 0;
var sum = 0;
eventListeners();
function eventListeners() {
  window.addEventListener("DOMContentLoaded", () => {
    renderData();
    renderTotalCart();
  });
  productTableList.addEventListener("click", increaseQuantity);
  productTableList.addEventListener("click", reduceQuantity);
  productTableList.addEventListener("click", delProduct);
}

function renderData() {
  var productList = localStorage.getItem("cart");
  if (productList) {
    productInCart = JSON.parse(productList);
    
    Object.keys(productInCart).map((key, value) => {
      var html = "";
      var price = productInCart[key]["price"].slice(1);
      var qty = productInCart[key]["qty"];
      sum = price * qty;
      subTotal = sum.toFixed(2);
      total += parseFloat(subTotal);

      html += `
        <tr class="product-item">
          <td class="product-remove">
            <a class="remove-link" href="#">
              <i class="fa fa-times" aria-hidden="true"></i>
            </a>
          </td>
          <td class="image-prod">
            <div class="product-img">
              <img src="${productInCart[key]["imgSrc"]}" alt="">
            </div>
          </td>
          <td class="product-name">
            <h4>${productInCart[key]["name"]}</h4>
            <span class="product-id">${key}<span>
          </td>
          <td class="price">${productInCart[key]["price"]}</td>
          <td class="quantity">
            <div class="cart_quantity_button">
              <a class="cart-quantity-up" href="#"> + </a>
              <input class="cart_quantity_input" type="text" name="quantity" value="${productInCart[key]["qty"]}">
              <a class="cart-quantity-down" href="#"> - </a>
            </div>
          </td>
          <td class="total">$${subTotal}</td>
        </tr>
      `;
      productTableList.innerHTML += html;
    });
    document.getElementById("price-total").innerHTML = "$" + total;
  }
}

function renderTotalCart() {
  var cartTotal = JSON.parse(localStorage.getItem("cartTotal"));
  totalCount.innerHTML = cartTotal;
}
function totalCart() {
  var cartTotal = 0;
  var productList = localStorage.getItem("cart");
  if (productList) {
    productItem = JSON.parse(productList);
    Object.keys(productItem).map((key, value) => {
      cartTotal += productItem[key]["qty"];
    });
  }
  localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
  totalCount.innerHTML = cartTotal;
}

function increaseQuantity(e) {
  if (e.target.classList.contains("cart-quantity-up")) {
    var product = e.target.parentElement.parentElement.parentElement;
    var getID = product.querySelector(".product-id").innerText;
    var getQty = product
      .querySelector(".cart_quantity_input")
      .getAttribute("value");
    var getPrice = product.querySelector(".price").textContent.slice(1);
  }

  getQty = parseInt(getQty) + 1;
  sum = getQty * parseFloat(getPrice);
  subTotal = sum.toFixed(2);

  total = document.getElementById("price-total").textContent.slice(1);
  total = parseFloat(total) + parseFloat(getPrice);
  document.getElementById("price-total").innerHTML = "$" + total;
  var productList = localStorage.getItem("cart");
  if (productList) {
    var productItem = JSON.parse(productList);
    Object.keys(productItem).map((key, value) => {
      if (key === getID) {
        productItem[key]["qty"]++;
        product
          .querySelector(".cart_quantity_input")
          .setAttribute("value", productItem[key]["qty"]);
        product.querySelector(".total").innerHTML = "$" + subTotal;
      }
    });
  }
  localStorage.setItem("cart", JSON.stringify(productItem));
  totalCart();
}

function reduceQuantity(e) {
  if (e.target.classList.contains("cart-quantity-down")) {
    var product = e.target.parentElement.parentElement.parentElement;
    var getID = product.querySelector(".product-id").innerText;
    var getQty = product
      .querySelector(".cart_quantity_input")
      .getAttribute("value");
    var getPrice = product.querySelector(".price").textContent.slice(1);
  }

  if (getQty > 1) {
    getQty = parseInt(getQty) - 1;
    sum = getQty * parseFloat(getPrice);
    subTotal = sum.toFixed(2);
    product.querySelector(".total").innerHTML = "$" + subTotal;
  }

  total = document.getElementById("price-total").textContent.slice(1);
  console.log(total)
  total = parseFloat(total) - parseFloat(getPrice);
  document.getElementById("price-total").innerHTML = "$" + total;

  var productList = localStorage.getItem("cart");
  if (productList) {
    var productItem = JSON.parse(productList);
    Object.keys(productItem).map((key, value) => {
      if (key === getID) {
        if (productItem[key]["qty"] > 1) {
          productItem[key]["qty"]--;
          product
            .querySelector(".cart_quantity_input")
            .setAttribute("value", productItem[key]["qty"]);
        } else {
          delete productItem[key];
          product.parentNode.removeChild(product);
        }
      }
    });
  }
  localStorage.setItem("cart", JSON.stringify(productItem));
  totalCart();
}

function delProduct(e) {
  if (e.target.classList.contains("remove-link")) {
    var product = e.target.parentElement.parentElement;
    var getID = product.querySelector(".product-id").innerText;
  }
  var productList = localStorage.getItem("cart");
  if (productList) {
    var productItem = JSON.parse(productList);
    Object.keys(productItem).map((key, value) => {
      if (key === getID) {
        delete productItem[key];
        product.parentNode.removeChild(product);
      }
    });
  }
  localStorage.setItem("cart", JSON.stringify(productItem));
  totalCart();
}


