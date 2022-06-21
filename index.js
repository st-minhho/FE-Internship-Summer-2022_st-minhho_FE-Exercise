// fetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then((response) => response.json())
//   //.then((response) => response.json())
//   .then((json) => console.log(json));

// async function fetchData(){

// }

// const women = document.querySelectorAll(".sub-menu-link");
// console.log(women[1]);

// women[1].onclick = function (e) {
//   this.style.color = "red";
// };


const product = document.querySelectorAll('.product-item')

const listProduct =document.querySelector('.product-list')
listProduct.innerHTML += `<li class="col-3 product-item">
<div class="product-img">
  <img src="./images/image-product1.png" alt="Image product" />
  <div class="badge badge-primary">-30%</div>
</div>
<div class="product-content">
  <h4 class="product-name">T-Shirt Summer Vibes</h4>
  <div class="product-price">

  </div>
</div>
</li>`
console.log(product[1])