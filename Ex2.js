const btnDrop = document.querySelectorAll('.dropdown-btn');
const contentDrop = document.querySelectorAll('.dropdown-container');

function removeClass() {
  for (let i = 0; i < btnDrop.length; i++) {
    btnDrop[i].classList.remove('active');
    contentDrop[i].classList.remove('show');
  }
}
function dropDown() {
  for (let i = 0; i < btnDrop.length; i++) {
    btnDrop[i].onclick = function (e) {
      if (!btnDrop[i].classList.contains('active')) {
        removeClass();
        btnDrop[i].classList.add('active');
        contentDrop[i].classList.add('show');
      } else {
        removeClass();
      }
    };
  }
}
dropDown();
