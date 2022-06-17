const btnDrop = document.querySelectorAll('.dropdown-btn');
const contentDrop = document.querySelectorAll('.dropdown-container');

function removeClass() {
  for (let i = 0; i < btnDrop.length; i++) {
    if (btnDrop[i].classList.contains('active')) {
      btnDrop[i].classList.toggle('active');
    }
    if (contentDrop[i].classList.contains('show')) {
      contentDrop[i].classList.toggle('show');
    }
  }
}
function dropDown() {
  for (let i = 0; i < btnDrop.length; i++) {
    btnDrop[i].onclick = function (e) {
      removeClass();
      btnDrop[i].classList.toggle('active');
      contentDrop[i].classList.toggle('show');
    };
  }
}
dropDown();
