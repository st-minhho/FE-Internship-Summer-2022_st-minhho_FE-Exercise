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
      if (btnDrop[i].classList.contains('active')) {
        removeClass();
      } else {
        removeClass();
        btnDrop[i].classList.add('active');
        contentDrop[i].classList.add('show');
      }
    };
  }
}
dropDown();
