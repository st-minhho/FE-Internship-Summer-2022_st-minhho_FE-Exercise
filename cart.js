const productTableList = document.querySelector(".product-cart-list");
const totalCount = document.querySelector(".total-cart");

eventListeners();

function eventListeners() {
  window.addEventListener("DOMContentLoaded", () => {
    renderData();
    renderTotalCart();
    increaseQuantity();
  });

  
  // const productItem = document.querySelectorAll(".product-item");
  // console.log(productItem)
  // for (i = 0; i < productItem.length; i++) {
  //   console.log(productItem[0])
  //   // productItem[i].addEventListener("click", increaseQuantity);

  // }
}

function renderData() {
  var productList = localStorage.getItem("product");
  if (productList) {
    productInCart = JSON.parse(productList);
    var sum = 0;
    Object.keys(productInCart).map((key, value) => {
      var html = "";
      var price = productInCart[key]["price"].slice(1);
      var qty = productInCart[key]["qty"];
      sum = price * qty;
      var subTotal = sum.toFixed(2)
      html += `
        <tr class="product-item">
          <td class="product-remove">
            <a href="#">
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
  }
}

function renderTotalCart() {
  var cartTotal = JSON.parse(localStorage.getItem("cartTotal"));
  totalCount.innerHTML = cartTotal;
}


function increaseQuantity() {
  const productItem = document.querySelector(".product-cart-list ").querySelectorAll('.product-cart-list');
console.log(productItem)
  // const productItem = document.querySelectorAll(".product-item");
  // console.log(productTableList);
  // console.log(document.querySelectorAll('tr.product-item'));
  // for (i = 0; i < productItem.length; i++) {
  //   console.log(productItem[0])
  //   // productItem[i].addEventListener("click", increaseQuantity);

  // }
}
