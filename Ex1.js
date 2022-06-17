const tabLink = document.querySelectorAll(".tab-link");
const tabContent = document.querySelectorAll(".tab-content");
function openTab() {
  for (let i = 0; i < tabLink.length; i++) {
    tabLink[i].onclick = function (e) {
      for (let i = 0; i < tabLink.length; i++) {
        if (tabLink[i].classList.contains("current")) {
          tabLink[i].classList.remove("current");
        }
      }
      tabLink[i].classList.add("current");
      let tabID = document.getElementById(e.target.dataset.tab);
      for (let j = 0; j < tabContent.length; j++) {
        if (tabContent[j].classList.contains("current")) {
          tabContent[j].classList.remove("current");
        }
      }
      tabID.classList.add("current");
    };
  }
}
openTab();
