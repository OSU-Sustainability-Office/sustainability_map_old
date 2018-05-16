// Initialize the map on the "map" div with a given center and zoom
var map = L.map('map', {
    center: [44.565, -123.2785],
    zoom: 17
});

// Add the map tiles
L.tileLayer('https://api.mapbox.com/styles/v1/jack-woods/cjh85kv6z0lzo2slfl00ygdit/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFjay13b29kcyIsImEiOiJjamg2aWpjMnYwMjF0Mnd0ZmFkaWs0YzN0In0.qyiDXCvvSj3O4XvPsSiBkA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiamFjay13b29kcyIsImEiOiJjamg2aWpjMnYwMjF0Mnd0ZmFkaWs0YzN0In0.qyiDXCvvSj3O4XvPsSiBkA'
}).addTo(map);

// Download building polygon data
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Asynchronously call buildPolygons
      var json = JSON.parse(xhttp.response);;
      buildPolygons(json);
      initializeAutocomplete(json)
    }
};
xhttp.open("GET", "./data/buildings/campus_map_locations.json", true);
xhttp.send();

// Build OSU building polygons
function buildPolygons(json) {

  // Iterate over each building and create it's polygon
  var polygons = [];

  for (var i = 0; i < json.data.length; i++) { // Iterate over buildings

    // Check to see if this location is a building
    if (json.data[i].attributes.type.indexOf("building") > -1) {

      // Check for polygon type
      if (json.data[i].attributes.geometry.type.indexOf("polygon") > -1) {
        // Add polygon to map
        polygons.push(L.polygon(flip(json.data[i].attributes.geometry.coordinates), {color: "#000"}).addTo(map));
      } else { // multipolygon
        for (var j = 0; j < json.data[i].attributes.geometry.coordinates.length; j++) {
          // Some multipolygons have arrays of sub-polygons
          if (json.data[i].attributes.geometry.coordinates[j].length == 1) {
            // Iterate over sub polygons
            for (var k = 0; k < json.data[i].attributes.geometry.coordinates[j].length; k++) {
              // Add polygon to map
              polygons.push(L.polygon(flip(json.data[i].attributes.geometry.coordinates[j][k]), {color: "#000"}).addTo(map));
            }
          } else {
            // Add polygon to map
            polygons.push(L.polygon(flip(json.data[i].attributes.geometry.coordinates[j]), {color: "#000"}).addTo(map));
          }
        }
      }
    }
  }
}

// Reverses lat/long coordinates for leaflet API compatibility.
// There appear to be two types of buildings:
// 1. Buildings with multiple polygons
function flip(coords) {
  for (var i = 0; i < coords.length; i++) {
    coords[i] = coords[i].reverse();
  }
  return coords;
}
