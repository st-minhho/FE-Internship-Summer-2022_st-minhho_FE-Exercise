let $totalCount = document.querySelector('.total-cart');

export const listKey = {
  product: 'product',
  cart: 'cart',
  cartTotal: 'cartTotal'
};

export interface productData {
  id: string,
  name: string,
  price: number,
  imgSrc: string,
}

export interface productInCart {
  id: string,
  name: string,
  price: number,
  imgSrc: string,
  qty: number
}

export const productData= [
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

export const getLocal = (key: string) => {
  let item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export const setLocal = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const renderTotalCart = () => {
  var cartTotal = getLocal(listKey.cartTotal);
  if ($totalCount) {
    $totalCount.innerHTML = cartTotal;
  }

}

export const totalCart = () => {
  let sumQtyCart = 0;
  let countCart = getLocal(listKey.cart);
  if (countCart) {
    countCart.map((data: any) => {
      sumQtyCart += data.qty;
    });
  }
  setLocal(listKey.cartTotal, sumQtyCart);
  if ($totalCount) {
    $totalCount.innerHTML = sumQtyCart.toString();
  }
}
