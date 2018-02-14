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
           case "http://carbon.campusops.oregonstate.edu/map/img/plate.svg":
            icons[2].innerHTML = this.responseText;
            break;
           case "http://carbon.campusops.oregonstate.edu/map/img/bike.svg":
            icons[3].innerHTML = this.responseText;
            break;
          case "http://carbon.campusops.oregonstate.edu/map/img/transportation.svg":
           icons[4].innerHTML = this.responseText;
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
downloadSVG("plate");
downloadSVG("bike");
downloadSVG("transportation");

/* Toggle orange logos in layer select menu */
var svgColorOn = function svgColorOn(event) {
  // Hover the cursor.
  event.currentTarget.style['cursor'] = "pointer";
  // Choose the icon and change the stroke color
  var color = document.getElementById(event.currentTarget.getAttribute("data-type")).getAttribute("data-neutral-color");
  var current = $("#"+event.currentTarget.getAttribute("data-type")).first();
  current = current.children().children()[0];
  current.innerHTML = current.innerHTML.split(color).join("DC4405");
};

var svgColorOff = function svgColorOff(event) {
  // Un- hover the cursor.
  event.currentTarget.style['cursor'] = "auto";
  // Choose the icon and change the stroke color
    var color = document.getElementById(event.currentTarget.getAttribute("data-type")).getAttribute("data-neutral-color");
  var current = $("#"+event.currentTarget.getAttribute("data-type")).first();
  current = current.children().children()[0];
  current.innerHTML = current.innerHTML.split("DC4405").join(color);
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
