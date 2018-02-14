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

/* Gets images and loads them into a format usable by Google Maps */
function getIcons(imagesDOM) {
  var icons = {};
  for (var i = 0; i < imagesDOM.length; i++) {
    icons[i] = {icon: imagesDOM[i].childNodes[0].getAttribute("src")}; // The location in the list is used as a type.
  }
  return icons;
}

/* Sends a get request and returns the request body. */
function sendGETRequest(url) {
  // Send GET request
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false); // false for synchronous request
  xmlHttp.send(null);
  var res = xmlHttp.responseText;

}

/* Downloads image location data and returns it in a JS object. */
function getMediaInformation() {
  var media = [];
  for (var i = 0; i < imagesDOM.length; i++) {

    // This request retrieves Instagram's location id for the image.
    var url = "../php/getRequest.php?url=https://api.instagram.com/v1/media/{media-id}?access_token=2105844702.1677ed0.9f9c0b0dc6fa4aedbd0c75cc50f4610d";
    var res = sendGETRequest(url);

    // Parse JSON response for location data.
    res = JSON.parse(res);
    var loc = res.data.location; // Save Instagram location ID

    // Now, retrieve geospatial data for the image.
    url = "https://api.instagram.com/v1/locations/{location-id}?access_token=2105844702.1677ed0.9f9c0b0dc6fa4aedbd0c75cc50f4610d";
    res = JSON.parse(sendGETRequest(url)); // Parse JSON

    // Build location data object and add to array.
    // The structure of this object is dictated by Google Maps API.
    media[i] = {
      position: new google.maps.LatLng(res.data.latitude, res.data.longitude),
      type: i // The location in the list is used as a type.
    }
  }

  return media;
}

/* Loads Instagram Layer */
var loadImageLayer = function loadImageLayer() {
  // Loop through images and load their location data.
  var imagesDOM = document.getElementById("photo-container").childNodes;
  var icons = getIcons(imagesDOM);
  var media = getMediaInformation(imagesDOM);

  var map = getMap(); // From googleMaps.js

  // Add markers to map.
  var markers = [];
  // This code comes from https://developers.google.com/maps/documentation/javascript/custom-markers.
  media.forEach(function(media) {
    var marker = new google.maps.Marker({
      position: media.position,
      icon: icons[media.type].icon,
      map: map
    });
  });


/* Downloads images from instagram and inserts them into the DOM. */
// Credit: https://github.com/stevenschobert/instafeed.js
var feed = new Instafeed({
    get: "user",
    userId: "2105844702", // ID for OSUSustainable.
    clientId: "bb54a3b389e84f91abe1b99dfe7819f9", // Instagram app client ID.
    accessToken: "2105844702.1677ed0.9f9c0b0dc6fa4aedbd0c75cc50f4610d", // OSUSustainable access token provided by instagram.
    sortBy: "most-recent",
    resolution: "thumbnail", // Gets images at 150x150 resolution.
    limit: "35", // Will only grab the 35 most recent photos from the account.
                 // 20 is the maximum that instagram allows in "sandbox mode".
    target: "photo-container", // This is a hidden DOM element for holding all images.
    after: loadImageLayer // Callback for when images are done.
});
feed.run();
