// Initialize the map on the "map" div with a given center and zoom
var map = L.map('map', {
    center: [44.565, -123.2785],
    zoom: 17
});

// Add the map tiles
L.tileLayer('https://api.mapbox.com/styles/v1/jack-woods/cjh6io71w09s42sqr6rizxwkm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFjay13b29kcyIsImEiOiJjamg2aWpjMnYwMjF0Mnd0ZmFkaWs0YzN0In0.qyiDXCvvSj3O4XvPsSiBkA', {
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
      buildPolygons(JSON.parse(xhttp.response));
    }
};
xhttp.open("GET", "./data/buildings/campus_map_locations.json", true);
xhttp.send();

// Build OSU building polygons
function buildPolygons(json) {
  // Iterate over each building and create it's polygon
  for (var i = 0; i < json.data.length; i++) {
    if (json.data[i].attributes.geometry != null && json.data[i].attributes.geometry.coordinates != null ) {
      var polygon = L.polygon(json.data[i].attributes.geometry.coordinates[0]).addTo(map);
    }
  }
}
