var $totalCount = document.querySelector(".total-cart");
export var listKey = {
    product: 'product',
    cart: 'cart',
    cartTotal: 'cartTotal'
};
export var productData = [
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
export var getLocal = function (key) {
    var item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};
export var setLocal = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
export var renderTotalCart = function () {
    var cartTotal = getLocal(listKey.cartTotal);
    if ($totalCount) {
        $totalCount.innerHTML = cartTotal;
    }
};
export var totalCart = function () {
    var sumQtyCart = 0;
    var countCart = getLocal(listKey.cart);
    if (countCart) {
        countCart.map(function (data) {
            sumQtyCart += data.qty;
        });
    }
    setLocal(listKey.cartTotal, sumQtyCart);
    if ($totalCount) {
        $totalCount.innerHTML = sumQtyCart.toString();
    }
};
