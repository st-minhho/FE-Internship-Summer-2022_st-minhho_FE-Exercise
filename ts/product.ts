import { listKey, productData, getLocal, setLocal, totalCart, renderTotalCart } from './index.js';

setLocal(listKey.product, productData);

const renderData = () => {
  let productData = getLocal(listKey.product);
  let html = '';
  if (productData) {
    productData.map((data: any) => {
      html +=
        `<li class="col-3 product-item">
        <div class="product-img">
          <img src="${data.imgSrc}" alt="Image product" />
          <div class="product-overlay">
            <button data-id="${data.id}" class="btn btn-primary js-add-to-cart" >Add to cart</button>
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
  let $product = document.querySelector('.js-product-list') as HTMLElement;
  if ($product) {
    $product.innerHTML = html;
  }

  let $btnAddToCart = document.querySelectorAll('.js-add-to-cart');
  for (let i = 0; i < $btnAddToCart.length; i++) {
    $btnAddToCart[i].addEventListener('click', addToCart);
  }
}

const addToCart = (e: any) => {
  let productID: string = e.target.dataset.id;
  handleQuantityCart('add', productID);
}

const handleQuantityCart = (mess: string, productID: string) => {
  let productInCart = getLocal(listKey.cart);
  let productData = getLocal(listKey.product);
  let findProduct = productData.find((obj: any) => obj.id === productID);
  if (mess === 'add') {
    if (productInCart) {
      let cart = productInCart.find((obj: any) => obj.id === productID);
      if (cart) {
        cart.qty++;
      } else {
        productInCart.push({ ...findProduct, qty: 1 });
      }
    } else {
      productInCart = [];
      productInCart.push({ ...findProduct, qty: 1 });
    }
    setLocal(listKey.cart, productInCart);
    totalCart();
  }

}

const eventListenersCart = () => {
  renderData();
  renderTotalCart();
}

eventListenersCart();
