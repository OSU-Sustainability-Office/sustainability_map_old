
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
  if (arrowNode.classList.contains("fa-arrow-right")) {
    arrowNode.classList.remove("fa-arrow-right");
    arrowNode.classList.add("fa-arrow-left");
  } else {
    arrowNode.classList.remove("fa-arrow-left");
    arrowNode.classList.add("fa-arrow-right");
  }
  toggleHidden(document.getElementById("layer-select"));
}

var layerSelect = document.getElementById('layer-select-button');
console.log("layerSelect");
layerSelect.addEventListener("click", toggleLayers);
