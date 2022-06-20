const product = document.querySelector('.product-list');
const totalCount = document.querySelector('.total-cart');
var productList = {};
var productItem = {};
var cartQty = 0;
const productData = [
  {
    id: 'pd1',
    name: 'T-Shirt Summer Vibes',
    price: '89.99',
    imgSrc: './images/image-product1.png',
  },
  {
    id: 'pd2',
    name: 'Loose Knit 3/4 Sleeve',
    price: '119.99',
    imgSrc: './images/image-product2.png',
  },
  {
    id: 'pd3',
    name: 'Basic Slim Fit T-Shirt',
    price: '119.99',
    imgSrc: './images/image-product3.png',
  },
  {
    id: 'pd4',
    name: 'Loose Textured T-Shirt',
    price: '119.99',
    imgSrc: './images/image-product4.png',
  },
];
localStorage.setItem('product', JSON.stringify(productData));

eventListeners();
function eventListeners() {
  window.addEventListener('DOMContentLoaded', () => {
    renderData();
    renderTotalCart();
  });

  product.addEventListener('click', addToLocal);
}

function renderData() {
  var data = localStorage.getItem('product');
  if (data) {
    var productData = JSON.parse(data);
    var html = '';
    Object.keys(productData).map((key, value) => {
      html += `
          <li class="col-3 product-item">
            <div class="product-img">
              <img id="${productData[key]['id']}" src="${productData[key]['imgSrc']}" alt="Image product" />
              <div class="product-overlay">
                  <a href="#" class="btn btn-primary add-to-cart" >Add to cart</a>
                </div>
            </div>
            <div class="product-content">
              <h4 class="product-name">${productData[key]['name']}</h4>
              <div class="product-price">
                <span class="price-sell">$${productData[key]['price']}</span>
              </div>
            </div>
          </li>
        `;
    });
    product.innerHTML = html;
  }
}
function renderTotalCart() {
  var cartTotal = JSON.parse(localStorage.getItem('cartTotal'));
  totalCount.innerHTML = cartTotal;
}

function addToLocal(e) {
  //get product information
  if (e.target.classList.contains('add-to-cart')) {
    var product = e.target.parentElement.parentElement.parentElement;
    var getID = product.querySelector('.product-img img').getAttribute('id');
    var getName = product.querySelector('.product-name').textContent;
    var getImgSrc = product.querySelector('.product-img img').getAttribute('src');
    var getPrice = product.querySelector('.price-sell').textContent;
    var getQty = 1;
  }

  productList = localStorage.getItem('cart');
  if (productList) {
    productItem = JSON.parse(productList);

    Object.keys(productItem).map((key, value) => {
      if (key == getID) {
        getQty = productItem[key]['qty'] + 1;
      }
    });
  }

  productItem[getID] = {
    name: getName,
    imgSrc: getImgSrc,
    price: getPrice,
    qty: getQty,
  };

  localStorage.setItem('cart', JSON.stringify(productItem));
  totalCart();
}

function totalCart() {
  var cartTotal = 0;
  productList = localStorage.getItem('cart');
  if (productList) {
    productItem = JSON.parse(productList);
    Object.keys(productItem).map((key, value) => {
      cartTotal += productItem[key]['qty'];
    });
  }
  localStorage.setItem('cartTotal', JSON.stringify(cartTotal));
  totalCount.innerHTML = cartTotal;
}
