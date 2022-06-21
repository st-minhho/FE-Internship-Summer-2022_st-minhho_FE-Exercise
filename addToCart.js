var product = document.querySelector(".product-list");
var totalCount = document.querySelector(".total-cart");
var cartList = [];
var productItem = [];
var cartQty = 0;
var listKey = {
  product: "product",
  cart: "cart",
  cartTotal: "totalCart",
};
var productData = [
  {
    id: "pd1",
    name: "T-Shirt Summer Vibes",
    price: "89.99",
    imgSrc: "./images/image-product1.png",
  },
  {
    id: "pd2",
    name: "Loose Knit 3/4 Sleeve",
    price: "119.99",
    imgSrc: "./images/image-product2.png",
  },
  {
    id: "pd3",
    name: "Basic Slim Fit T-Shirt",
    price: "119.99",
    imgSrc: "./images/image-product3.png",
  },
  {
    id: "pd4",
    name: "Loose Textured T-Shirt",
    price: "119.99",
    imgSrc: "./images/image-product4.png",
  },
];

eventListeners();
function eventListeners() {
  setLocal(listKey.product, productData);
  renderData();
  renderTotalCart();
}

function getLocal(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

function setLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function renderData() {
  var productData = getLocal(listKey.product);
  if (productData) {
    var html = "";
    productData.map( function (data){
      html += `
      <li class="col-3 product-item">
        <div class="product-img">
          <img src="${data.imgSrc}" alt="Image product" />
          <div class="product-overlay">
            <button data-id="${data.id}" class="btn btn-primary add-to-cart" >Add to cart</button>
          </div>
        </div>
        <div class="product-content">
          <h4 class="product-name">${data.name}</h4>
          <div class="product-price">
            <span class="price-sell">$${data.price}</span>
          </div>
        </div>
      </li>
    `;
    });
  }
  product.innerHTML = html;

  var btnAddToCart = document.querySelectorAll(".add-to-cart");
  for (var i = 0; i < btnAddToCart.length; i++) {
    btnAddToCart[i].addEventListener("click", addToCart);
  }
}

function addToCart(e) {
  var productID = e.target.dataset.id;
  handleQuantityCart("add", productID);
}

function handleQuantityCart(mess, productID) {
  var productInCart = getLocal(listKey.cart);
  var productData = getLocal(listKey.product);
  var findProduct = productData.find(obj => obj.id === productID);
  if (mess === "add") {
    if (productInCart) {
      var cart = productInCart.find(obj => obj.id === productID);
      if (cart) {
        cart.qty++;
      } else {
        productInCart.push({
          id: findProduct.id,
          name: findProduct.name,
          imgSrc: findProduct.imgSrc,
          discount: findProduct.discount,
          price: findProduct.price,
          qty: 1,
        });
      }
    } else {
      productInCart = [];
      productInCart.push({
        id: findProduct.id,
        name: findProduct.name,
        imgSrc: findProduct.imgSrc,
        discount: findProduct.discount,
        price: findProduct.price,
        qty: 1,
      });
    }
    setLocal(listKey.cart, productInCart);
    totalCart();
  }
}

//get product information
// function addToCart(e) {
//   var cartData = getLocal(listKey.product)
//   var product = e.target.parentElement.parentElement.parentElement;
//   var getID = e.target.dataset.id;
//   var getName = product.querySelector('.product-name').textContent;
//   var getImgSrc = product.querySelector('.product-img img').getAttribute('src');
//   var getPrice = product.querySelector('.price-sell').textContent;
//   var getQty = 1;

//   cartList = localStorage.getItem('cart');

//   if (cartList) {
//     productItem = JSON.parse(cartList);
//     Object.keys(productItem).map((key, value) => {
//       if (key === getID) {
//         getQty = productItem[key]['qty'] + 1;

//       }
//     });

//   }
//   productItem[getID] = {
//     name: getName,
//     imgSrc: getImgSrc,
//     price: getPrice,
//     qty: getQty,
//   };

//   setLocal(listKey.cart, productItem);
//   totalCart();
// }

function renderTotalCart() {
  var cartTotal = getLocal(listKey.cartTotal);
  totalCount.innerHTML = cartTotal;
}

function totalCart() {
  var sumQtyCart = 0;
  var countCart = getLocal(listKey.cart);
  if (countCart) {
    countCart.map((data) => {
      sumQtyCart += data.qty;
    });
  }
  setLocal(listKey.cartTotal, sumQtyCart);
  totalCount.innerHTML = sumQtyCart;
}
