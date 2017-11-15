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
  google.maps.event.addListener(bottle, 'click', markerClick));

  // Eco2Go
  eco = new google.maps.KmlLayer(src + "eco2Go.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  google.maps.event.addListener(eco, 'click', markerClick));

  // Gluten Free
  gluten = new google.maps.KmlLayer(src + "glutenFree.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  google.maps.event.addListener(gluten, 'click', markerClick));

  // Halal
  halal = new google.maps.KmlLayer(src + "halal.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  google.maps.event.addListener(halal, 'click', markerClick));

  // Local
  local = new google.maps.KmlLayer(src + "local.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  google.maps.event.addListener(local, 'click', markerClick));

  // Make Cents
  makeCents = new google.maps.KmlLayer(src + "makeCents.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  google.maps.event.addListener(makeCents, 'click', markerClick));

  // Restaurants
  restaurants = new google.maps.KmlLayer(src + "restaurants.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  google.maps.event.addListener(restaurants, 'click', markerClick));

  // OSU Sustainability Tour
  susTour = new google.maps.KmlLayer(src + "susTour.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  google.maps.event.addListener(susTour, 'click', markerClick));

  // Vegan
  vegan = new google.maps.KmlLayer(src + "vegan.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  google.maps.event.addListener(vegan, 'click', markerClick));

  // Vegetarian
  vegetarian = new google.maps.KmlLayer(src + "vegetarian.kmz", {
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  google.maps.event.addListener(vegetarian, 'click', markerClick));
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

// Toggles the color associated with a particular layer-select
function toggleColor(element, color) {
  if (element.getAttribute("data-prev-color") == color) {
    element.style["color"] = "#fff";
    element.setAttribute("data-prev-color", "#fff");
  } else {
    element.style["color"] = color;
    element.setAttribute("data-prev-color", color);
  }
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
      toggleColor(e.currentTarget.getElementsByTagName("I")[0], "rgb(0, 96, 100)");
      break;
    case 'Eco2Go Return Stations':
      toggleLayer([eco]);
      toggleColor(e.currentTarget.getElementsByTagName("I")[0], "rgb(245, 124, 0)");
      break;
    case 'Food':
      toggleLayer([gluten, halal, local, makeCents, restaurants, vegan, vegetarian]);
      toggleColor(e.currentTarget.getElementsByTagName("I")[0], "rgb(124, 179, 65)");
      break;
    case 'Sustainability Tour':
      toggleLayer([susTour]);
      toggleColor(e.currentTarget.getElementsByTagName("I")[0], "rgb(103, 58, 183)");
      break;
    console.log("end");
  }
}
// Event listeners for toggling layers
var layerChoices = document.getElementsByClassName("layer-choice");
for (var i = 0; i < layerChoices.length; i++) {
  layerChoices[i].addEventListener("click", layerCallback);
}
