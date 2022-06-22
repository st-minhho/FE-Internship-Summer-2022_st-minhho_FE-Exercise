import { getLocal, setLocal, totalCart, listKey, renderTotalCart, productInCart } from './index.js'

const $productTableList = document.querySelector('.js-product-cart-list') as HTMLElement;

let productInCart:productInCart[] = getLocal(listKey.cart);
let total = 0;
let subTotal = 0;
let sum = 0;

const eventListenersCart = () => {
  renderDataCart();
  renderTotalCart();
  totalCart();
  countCart();
}

const renderDataCart = () => {
  if (productInCart) {
    $productTableList.innerHTML = '';
    productInCart.forEach((data: productInCart) => {
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
}

const updateQuantity = (e: Event) => {
  let productID: string = (e.target as HTMLElement).dataset.id;
  let mess: string;
  if ((e.target as HTMLElement).classList.contains('js-cart-quantity-up')) {
    mess = 'plus';
  } else {
    mess = 'minus';
  }
  handleQuantity(mess, productID);
}

const handleQuantity = (mess: string, productID: string) => {
  let index = productInCart.findIndex((obj: productInCart) => obj.id === productID);
  let cart:productInCart = productInCart.find((obj: productInCart) => obj.id === productID);
  let getQty = 0;
  if (mess === 'plus') {
    getQty = cart.qty + 1;
    productInCart.map((data: any) => {
      if (data.id === productID) {
        data.qty++;
      }
    });
  } else {
    getQty = cart.qty - 1;
    productInCart.map((data: any) => {
      if (data.id === productID) {
        if (data.qty > 1) {
          data.qty--;
        } else {
          productInCart.splice(index, 1);
        }
      }
    });
  }
  setLocal(listKey.cart, productInCart);
  eventListenersCart();
}

const delProduct = (e: Event) => {
  let productID: string = (e.target as HTMLElement).dataset.id;
  productInCart = productInCart.filter((item: productInCart) => item.id !== productID)
  setLocal(listKey.cart, productInCart);
  eventListenersCart();
}

const countCart = () => {
  let sumCart = 0;
  if (productInCart) {
    productInCart.map((data: productInCart) => {
      let quantity = data.qty;
      let price = data.price;
      subTotal = +quantity * +price;
      sumCart += +subTotal.toFixed(2);
    });
    document.getElementById('price-total').innerHTML = '$' + sumCart.toFixed(2);
  }
}

eventListenersCart();
