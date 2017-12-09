/* Toggle "hidden" class for current element */
function toggleHidden(currentElement) {
  if (currentElement.classList.contains("hidden")) {
    currentElement.classList.remove("hidden");
  } else {
    currentElement.classList.add("hidden");
  }
}


/* Toggle Layer Selection Window */
var toggleLayers = function toggleLayers(event) {
  var arrowNode = event.currentTarget.getElementsByClassName("fa")[0];
  var layerSelect = document.getElementById("layer-select");
  if (arrowNode.classList.contains("fa-arrow-right")) {
    layerSelect.classList.add("layer-select-animation");
    layerSelect.classList.remove("layer-select-animation-reverse");
    arrowNode.classList.remove("fa-arrow-right");
    arrowNode.classList.add("fa-arrow-left");
  } else {
    layerSelect.classList.add("layer-select-animation-reverse");
    layerSelect.classList.remove("layer-select-animation");
    arrowNode.classList.remove("fa-arrow-left");
    arrowNode.classList.add("fa-arrow-right");
  }
}

/* Toggle orange logos in hamburger menu */
var colorOn = function colorOn(event) {
  var logo = event.currentTarget.getElementsByTagName("I")[0];
  logo.style["color"] = "#DC4405";
}
var colorOff = function colorOff(event) {
  var logo = event.currentTarget.getElementsByTagName("I")[0];
  logo.style["color"] = "#fff";
}

/* Toggle Hamburger Menu */
var toggleMenu = function toggleMenu(event) {
  toggleHidden(document.getElementById('hamburger-menu'));
}

/* Listener for layer select */
var layerSelect = document.getElementById('layer-select-button');
layerSelect.addEventListener("click", toggleLayers);

/* Listener for hamburger menu button */
var menu = document.getElementById('menu');
menu.addEventListener("click", toggleMenu);

/* Color Change Listener for links in hamburger menu */
var hamburgerMenu = document.getElementById('hamburger-menu');
for (var i = 0; i < hamburgerMenu.getElementsByTagName("A").length; i++) {
  hamburgerMenu.getElementsByTagName("a")[i].addEventListener("mouseover", colorOn);
  hamburgerMenu.getElementsByTagName("a")[i].addEventListener("mouseout", colorOff);
}
