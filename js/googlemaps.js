// Declare layer variables
var eco;
var gluten;
var halal;
var local;
var makeCents;
var restaurants;
var susTour;
var vegan;
var vegetarian;

// Initialize Google Maps API
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.563781, lng: -123.283},
    zoom: 16
  });

  // Add & remove layers.
  var src = 'http://carbon.campusops.oregonstate.edu/map/map_data/';

  // Bottle Refill Stations
  bottle = new google.maps.KmlLayer(src + "bottle.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });

  // Eco2Go
  eco = new google.maps.KmlLayer(src + "eco2Go.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });

  // Gluten Free
  gluten = new google.maps.KmlLayer(src + "glutenFree.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });

  // Halal
  halal = new google.maps.KmlLayer(src + "halal.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });

  // Local
  local = new google.maps.KmlLayer(src + "local.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });

  // Make Cents
  makeCents = new google.maps.KmlLayer(src + "makeCents.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });

  // Restaurants
  restaurants = new google.maps.KmlLayer(src + "restaurants.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });

  // OSU Sustainability Tour
  susTour = new google.maps.KmlLayer(src + "susTour.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });

  // Vegan
  vegan = new google.maps.KmlLayer(src + "vegan.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });

  // Vegetarian
  vegetarian = new google.maps.KmlLayer(src + "vegetarian.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
}
// Toggles individual layers on the Google Map
function toggleLayer(layers) {
  console.log("toggle");
  for (var i = 0; i < layers.length; i++) {
    layers[i].setMap(layers[i].getMap() ? null : map);
  }
}
var layerCallback = function(e) {
  console.log(e.currentTarget.textContent);
  switch (e.currentTarget.textContent) {
    case 'Bottle Refill Stations':
      toggleLayer([bottle]);
      break;
    case 'Eco2Go Return Stations':
      toggleLayer([eco]);
      break;
    case 'Food':
      toggleLayer([gluten, halal, local, makeCents, restaurants, vegan, vegetarian]);
      break;
    case 'Sustainability Tour':
      toggleLayer([susTour]);
      break;
    console.log("end");
  }
}
// Event listeners for toggling layers
var layerChoices = document.getElementsByClassName("layer-choice");
for (var i = 0; i < layerChoices.length; i++) {
  layerChoices[i].addEventListener("click", layerCallback);
}
