// vim:sw=2:et:

function add_main_menu_button() {
  var breadcrumb_el = document.createElement('div');
  breadcrumb_el.setAttribute("class", "navToggle");
  breadcrumb_el.setAttribute("id", "navigationToggler");
  breadcrumb_el.innerHTML =
    "<div class=\"hamburger-menu\">" +
    "<div class=\"line1\"></div>" +
    "<div class=\"line2\"></div>" +
    "<div class=\"line3\"></div></div>";

  var sibling = document.querySelectorAll('.navigationWrapper')[0];
  sibling.parentNode.insertBefore(breadcrumb_el, sibling);

  function createToggler(togglerSelector, targetSelector, className) {
    var toggler = document.querySelector(togglerSelector);
    var target = document.querySelector(targetSelector);

    if (!toggler) {
      return;
    }

    toggler.onclick = function(event) {
      event.preventDefault();
      target.classList.toggle(className);
    };
  }

  createToggler(
    '#navigationToggler',
    '.navigationWrapper',
    'navigationSliderActive');
}

window.onload = add_main_menu_button;
