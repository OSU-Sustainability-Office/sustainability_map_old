// Find SVG icons in DOM
var icons = document.getElementsByClassName("icon");

// Downloads an SVG image from carbon.campusops.oregonstate.edu and returns a string.
function downloadSVG(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var url = this.responseURL;
         switch (url) {
           case "http://carbon.campusops.oregonstate.edu/map/img/bottle.svg":
            icons[0].innerHTML = this.responseText;
            break;
           case "http://carbon.campusops.oregonstate.edu/map/img/eco2go.svg":
            icons[1].innerHTML = this.responseText;
            break;
           case "http://carbon.campusops.oregonstate.edu/map/img/map.svg":
            icons[2].innerHTML = this.responseText;
            break;
           case "http://carbon.campusops.oregonstate.edu/map/img/map2.svg":
            icons[3].innerHTML = this.responseText;
            break;
         }
      }
  };
  xhttp.open("GET", "http://carbon.campusops.oregonstate.edu/map/img/"+url+".svg", true);
  xhttp.send();
}

// Initialize SVG images with correct innerHTML
downloadSVG("bottle");
downloadSVG("eco2go");
downloadSVG("map");
downloadSVG("map2");

/* Toggle orange logos in layer select menu */
var svgColorOn = function svgColorOn(event) {
  // Choose the icon and change the stroke color
  var current = $("#"+event.currentTarget.getAttribute("data-type")).first();
  console.log(current);
  var current = current.children().children()[0];
  console.log(current.innerHTML);
  current.innerHTML = current.innerHTML.split(event.currentTarget.getAttribute("data-neutral-color")).join("DC4405");
  console.log(current.innerHTML);
};

var svgColorOff = function svgColorOff(event) {
  // Choose the icon and change the stroke color
  var current = $("#"+event.currentTarget.getAttribute("data-type")).first();
  var current = current.children().children()[0];
  current.innerHTML = current.innerHTML.split("DC4405").join(event.currentTarget.getAttribute("data-neutral-color"));
};

/* Color Change Listener for layer-select links */
// Icons is declared above.
var otherIcons = document.getElementsByClassName("layer-choice");
for (var i = 0; i < icons.length; i++) {
  icons[i].addEventListener("mouseenter", svgColorOn);
  icons[i].addEventListener("mouseleave", svgColorOff);
  otherIcons[i].addEventListener("mouseenter", svgColorOn);
  otherIcons[i].addEventListener("mouseleave", svgColorOff);
}
