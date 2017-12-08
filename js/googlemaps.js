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

/*
//KML Mouse Event is passed in.
var kmlClick = function(me) {
  console.log(me.KMLFeatureData);
}
bottle.addListener("click", kmlClick);
eco.addListener("click", kmlClick);
gluten.addListener("click", kmlClick);
halal.addListener("click", kmlClick);
local.addListener("click", kmlClick);
makeCents.addListener("click", kmlClick);
restaurants.addListener("click", kmlClick);
susTour.addListener("click", kmlClick);
vegan.addListener("click", kmlClick);
vegetarian.addListener("click", kmlClick);*/

// Toggles individual layers on the Google Map
function toggleLayer(layers) {
  /*for (var i = 0; i < layers.length; i++) {
    layers[i].setMap(layers[i].getMap() ? null : map);
  }*/
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
