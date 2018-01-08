// Declare layer variables
var bottle;
var eco;
var gluten;
var halal;
var local;
var makeCents;
var restaurants;
var susTour;
var vegan;
var vegetarian;

// Variable that contains the most recently opened InfoWindow
var infoWindow;

// Get mouse X and Y
var mx;
var my;
// Add mouse event listerner.
document.getElementsByTagName("body")[0].addEventListener("mousemove", function(mouseEvent) {
  mx = mouseEvent.clientX;
  my = mouseEvent.clientY;
});

// Toggles info windows
var togglePopup = function togglePopup(kmlEvent) {

  console.log(kmlEvent); // For debugging purposes.

  infoWindow.close(); // Closes the previously-opened infoWindow

  // Initializes a new infowindow for the clicked element.
  infoWindow = new google.maps.InfoWindow({
    content: kmlEvent.featureData.infoWindowHtml,
    //maxWidth: "500px",
    position: kmlEvent.latLng
  });

  infoWindow.open(map); // Open the infoWindow!

};

// Initialize Google Maps API
var map;
function initMap() {
  infoWindow = new google.maps.InfoWindow({content: "Empty."}); // Initialize an empty infoWindow.
  // Initialize the map.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.563781, lng: -123.283},
    zoom: 16,
    disableDefaultUI: true
  });

  // Disables info windows.
  map.addListener('click', function (event) {
  // If the event is a POI
  if (event.placeId) {
    // Call event.stop() on the event to prevent the default info window from showing.
    event.stop();
    console.log(event);
  }
});

  // Add & remove layers.
  var src = 'http://carbon.campusops.oregonstate.edu/map/map_data/';

  // Bottle Refill Stations
  bottle = new google.maps.KmlLayer(src + "bottle.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  bottle.addListener('click', togglePopup);

  // Eco2Go
  eco = new google.maps.KmlLayer(src + "eco2Go.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  eco.addListener('click', togglePopup);

  // Gluten Free
  gluten = new google.maps.KmlLayer(src + "glutenFree.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  gluten.addListener('click', togglePopup);

  // Halal
  halal = new google.maps.KmlLayer(src + "halal.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  halal.addListener('click', togglePopup);

  // Local
  local = new google.maps.KmlLayer(src + "local.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  local.addListener('click', togglePopup);

  // Make Cents
  makeCents = new google.maps.KmlLayer(src + "makeCents.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  makeCents.addListener('click', togglePopup);

  // Restaurants
  restaurants = new google.maps.KmlLayer(src + "restaurants.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  restaurants.addListener('click', togglePopup);

  // OSU Sustainability Tour
  susTour = new google.maps.KmlLayer(src + "susTour.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  susTour.addListener('click', togglePopup);

  // Vegan
  vegan = new google.maps.KmlLayer(src + "vegan.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  vegan.addListener('click', togglePopup);

  // Vegetarian
  vegetarian = new google.maps.KmlLayer(src + "vegetarian.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  vegetarian.addListener('click', togglePopup);
}

// Toggles individual layers on the Google Map
function toggleLayer(layers) {
  for (var i = 0; i < layers.length; i++) {
    layers[i].setMap(layers[i].getMap() ? null : map);
  }
}

// Toggles the neutral color of the associated icon, and changes its color.
var layerCallback = function(e) {
  var type = e.currentTarget.getAttribute("data-type");
  var current = document.getElementById(type);
  switch (type) {
    case 'bottle':
      toggleLayer([bottle]);
      current.getAttribute("data-neutral-color") == "ffffff" ? current.setAttribute("data-neutral-color", "006064") : current.setAttribute("data-neutral-color", "ffffff");
      break;
    case 'eco2go':
      toggleLayer([eco]);
      current.getAttribute("data-neutral-color") == "ffffff" ? current.setAttribute("data-neutral-color", "f57c00") : current.setAttribute("data-neutral-color", "ffffff");
      break;
    case 'food':
      toggleLayer([gluten, halal, local, makeCents, restaurants, vegan, vegetarian]);
      current.getAttribute("data-neutral-color") == "ffffff" ? current.setAttribute("data-neutral-color", "7cb341") : current.setAttribute("data-neutral-color", "ffffff");
      break;
    case 'tour':
      toggleLayer([susTour]);
      current.getAttribute("data-neutral-color") == "ffffff" ? current.setAttribute("data-neutral-color", "673ab7") : current.setAttribute("data-neutral-color", "ffffff");
      break;
  }
}

// Event listeners for toggling layers
var layerChoices = document.getElementsByClassName("layer-choice")
var otherChoices = document.getElementsByClassName("icon");
for (var i = 0; i < layerChoices.length; i++) {
  layerChoices[i].addEventListener("click", layerCallback);
}
for (var i = 0; i < otherChoices.length; i++) {
  otherChoices[i].addEventListener("click", layerCallback);
}
