const product = document.querySelector(".product-list");
const totalCount = document.querySelector(".total-cart");
var productList = {};
var productItem = {};
var cartQty = 0;
eventListeners();

function eventListeners() {
  window.addEventListener("DOMContentLoaded", () => {
    renderData();
    renderTotalCart();
  });

  product.addEventListener("click", addToLocal);
}

//reder prodct item
function renderData() {
  fetch("products.json")
    .then((respone) => respone.json())
    .then((data) => {
      var html = "";
      data.forEach((product) => {
        html += `
        <li class="col-3 product-item">
          <div class="product-img">
            <img id=${product.id} src="${product.imgSrc}" alt="Image product" />
            <div class="product-overlay">
                <a href="#" class="btn btn-primary add-to-cart" >Add to cart</a>
              </div>
          </div>
          <div class="product-content">
            <h4 class="product-name">${product.name}</h4>
            <div class="product-price">
              <span class="price-sell">$${product.price}</span>
            </div>
          </div>
        </li>
        `;
      });
      product.innerHTML = html;
    });
}

function renderTotalCart() {
  var cartTotal = JSON.parse(localStorage.getItem("cartTotal"));
  totalCount.innerHTML = cartTotal;
}

function addToLocal(e) {
  //get product information
  if (e.target.classList.contains("add-to-cart")) {
    var product = e.target.parentElement.parentElement.parentElement;
    var getID = product.querySelector(".product-img img").getAttribute("id");
    var getName = product.querySelector(".product-name").textContent;
    var getImgSrc = product
      .querySelector(".product-img img")
      .getAttribute("src");
    var getPrice = product.querySelector(".price-sell").textContent;
    var getQty = 1;
  }

  productList = localStorage.getItem("product");
  if (productList) {
    productItem = JSON.parse(productList);

    Object.keys(productItem).map((key, value) => {
      if (key == getID) {
        getQty = productItem[key]["qty"] + 1;
      }
    });
  }
  productItem[getID] = {
    name: getName,
    imgSrc: getImgSrc,
    price: getPrice,
    qty: getQty,
  };

  localStorage.setItem("product", JSON.stringify(productItem));
  totalCart();
}

function totalCart() {
  var cartTotal = 0;
  productList = localStorage.getItem("product");
  if (productList) {
    productItem = JSON.parse(productList);
    Object.keys(productItem).map((key, value) => {
      cartTotal += productItem[key]["qty"];
    });
  }
  localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
  totalCount.innerHTML = cartTotal;
}
