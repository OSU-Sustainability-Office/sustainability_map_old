import L from 'leaflet';

class Cluster {
  constructor(bounds) {
    this.innerPoints = [];
    this.bounds = bounds;
    this.marker = null;
  }
  createMarker() {
    // this.marker = L.circleMarker([this.bounds[0][0]+(this.bounds[1][0]-this.bounds[0][0])/2, this.bounds[0][1]-(this.bounds[1][0]-this.bounds[0][0])/2], {
    //   radius: 8,
    //   fillColor: "#000",
    //   color: "#000",
    //   weight: 1,
    //   opacity: 1,
    //   fillOpacity: 0.6
    // });
    var percObj = {};
    for (var p of this.innerPoints) {
      if (percObj[p.options.fillColor])
        percObj[p.options.fillColor] += 1;
      else {
        percObj[p.options.fillColor] = 1;
      }
    }
    var data ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 2 2" style="transform: rotate(-0.25turn)">'
    var cumpercent = 0;
    for (var key of Object.keys(percObj)) {
      percObj[key] = (percObj[key]/this.innerPoints.length);
      var lastx = Math.cos(cumpercent*2*Math.PI);
      var lasty = Math.sin(cumpercent*2*Math.PI);
      cumpercent += percObj[key];
      var newx = Math.cos(cumpercent*2*Math.PI);
      var newy = Math.sin(cumpercent*2*Math.PI);

      var arc = (percObj[key] > 0.5)? "1" : "0";
      var sweep="1";
      data += '<path d="'
      data += 'M ' + lastx+" "+lasty+" A 1 1, 0, "+arc+", "+sweep+", "+ newx + ", " + newy + ' L 0 0"'
      data +=' fill="'+key+'" fill-opacity="0.8" />'
      lastx = Math.cos(cumpercent*2*Math.PI);
      lasty = Math.sin(cumpercent*2*Math.PI);
    }
    data += "<circle cx='0' cy='0' r='0.96' stroke-width='0.05' stroke='#000' fill-opacity='0' />"
    data += '</svg>';
    var formed = encodeURI('data:image/svg+xml,'+data).replace('#','%23');
    var icon = L.icon( {
      iconUrl: formed,
      iconSize: [18,18],
      shadowUrl: "",
    });
    this.marker = L.marker([this.bounds[0][0]+(this.bounds[1][0]-this.bounds[0][0])/2, this.bounds[0][1]-(this.bounds[1][0]-this.bounds[0][0])/2],{icon:icon});
  //  this.marker = L.polygon(this.bounds, {color: 'red'});
    return this.marker;
  }
}

class ClusterControl {
  constructor() {
    this.width = 20;
    this.height = 20;

    this.clusteringPoints = [];

    this.clusterableLayers = [];
    this.removedPoints = [];
    this.map = null;
  }
  addMap(val) {
    if (!val)
      return;
    this.map = val;
    val.on('moveend', (e)=>{this.updateClusterPoints(e.target)});
    this.updateClusterPoints();
  }
  unitWidth() {
    return Math.abs((this.map.getBounds().getSouthEast().lng - this.map.getBounds().getNorthWest().lng)/this.width);
  }
  unitHeight() {
    return Math.abs((this.map.getBounds().getSouthEast().lat - this.map.getBounds().getNorthWest().lat)/this.height);
  }
  addLayer(val) {
    var r = [];
    for (var l of val)
      if (l._latlng && l._radius)
        r.push(l)
    this.clusterableLayers.push(r);
  }
  addPointToCluster(point) {
    var maxIndex = this.width*this.height;
    var ver = Math.round(Math.abs((point._latlng.lat - this.map.getBounds().getNorthWest().lat))/this.unitHeight());
    var hor = Math.floor(Math.abs((point._latlng.lng - this.map.getBounds().getNorthWest().lng))/this.unitWidth());
    //console.log((hor*this.width)+ver);
    if ((hor*this.width)+ver > maxIndex) {

      //console.log(this.unitHeight());
    }
    else {
      this.clusteringPoints[(hor*this.width)+ver].innerPoints.push(point);
    }
  }
  displayClusters() {
    for (var cluster of this.clusteringPoints) {
      if (cluster.innerPoints.length > 1) {
        for (var point of cluster.innerPoints) {
          this.map.removeLayer(point);
          this.removedPoints.push(point);
        }
        cluster.createMarker().addTo(this.map);
      }

    }
  }
  clearClusteringPoints() {
    for (var cluster of this.clusteringPoints)
      if (cluster.marker) {
        this.map.removeLayer(cluster.marker);
        cluster.marker = null;
      }
    this.clusteringPoints = [];
  }
  updateClustersInPoints() {
    for (var layer of this.clusterableLayers)
      for (var point of layer)
        this.addPointToCluster(point);
  }
  updateClusterPoints() {
    if (!this.map)
      return;
    var unitWidth = this.unitWidth();
    var unitHeight = this.unitHeight();
    this.clearClusteringPoints();
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var cluster = new Cluster(
          [[this.map.getBounds().getNorthWest().lat-unitHeight*x,this.map.getBounds().getNorthWest().lng+unitWidth*y],
          [this.map.getBounds().getNorthWest().lat-unitHeight*(x+1),this.map.getBounds().getNorthWest().lng+unitWidth*y],
          [this.map.getBounds().getNorthWest().lat-unitHeight*(x+1),this.map.getBounds().getNorthWest().lng+unitWidth*(y+1)],
          [this.map.getBounds().getNorthWest().lat-unitHeight*x,this.map.getBounds().getNorthWest().lng+unitWidth*(y+1)]]);
        this.clusteringPoints.push(cluster)
      }
    }
    // var cluster = new Cluster(
    //       [[this.map.getBounds().getNorthWest().lat,this.map.getBounds().getNorthWest().lng],
    //       [this.map.getBounds().getNorthWest().lat-unitHeight,this.map.getBounds().getNorthWest().lng],
    //       [this.map.getBounds().getNorthWest().lat-unitHeight,this.map.getBounds().getNorthWest().lng+unitWidth],
    //       [this.map.getBounds().getNorthWest().lat+0,this.map.getBounds().getNorthWest().lng+unitWidth]]);
    //     this.clusteringPoints.push(cluster)
   for (var rPoint of this.removedPoints)
      rPoint.addTo(this.map);
   this.updateClustersInPoints();
   this.displayClusters();
  }

  partionMap() {
    console.log("Hello");
  }
}

export default ClusterControl;
