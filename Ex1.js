const tab_link = document.querySelectorAll(".tab-link");
const tab_content = document.querySelectorAll(".tab-content");
function openTab() {
  for (let i = 0; i < tab_link.length; i++) {
    tab_link[i].onclick = function (e) {
      for (let i = 0; i < tab_link.length; i++) {
        if (tab_link[i].classList.contains("current")) {
          tab_link[i].classList.remove("current");
        }
      }
      tab_link[i].classList.add("current");
      var tab = document.getElementById(e.target.dataset.tab);
      for (let j = 0; j < tab_content.length; j++) {
        if (tab_content[j].classList.contains("current")) {
          tab_content[j].classList.remove("current");
        }
      }
      tab.classList.add("current");
    };
  }
}
openTab();
