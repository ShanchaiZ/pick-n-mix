// Credits goes to https://bbbootstrap.com/snippets/bootstrap-5-sidebar-menu-toggle-button-34132202 for the template and script

document.addEventListener("DOMContentLoaded", function (event) {
  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId);

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener("click", () => {
        // show navbar
        nav.classList.toggle("nav-show");
        // change icon
        toggle.classList.toggle("bx-x");
        // add padding to body
        toggle.classList.toggle("fa-x");
        // add padding to body
        bodypd.classList.toggle("body-pd");
        // add padding to header
        headerpd.classList.toggle("body-pd");
      });
    }
  };

  showNavbar("header-toggle", "nav-bar", "body-pd", "header");

  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll(".nav_link");

  function colorLink() {
    if (linkColor) {
      linkColor.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    }
  }
  linkColor.forEach((l) => l.addEventListener("click", colorLink));

  // Your code to run since DOM is loaded and ready
});

var buttonUp = () => {
  const input = document.querySelector(".searchbox-input");
  const cards = document.getElementsByClassName("card");
  let filter = input.value.toLowerCase();
  for (let i = 0; i < cards.length; i++) {
    let title = cards[i].querySelector(".card-body");
    if (title.innerText.toLowerCase().indexOf(filter) > -1) {
      cards[i].classList.remove("d-none");
    } else {
      cards[i].classList.add("d-none");
    }
  }
};
