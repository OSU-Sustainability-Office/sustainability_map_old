import L from 'leaflet';

class Cluster {
  constructor(bounds) {
    this.innerPoints = [];
    this.bounds = bounds;
    this.marker = null;
  }
  createMarker() {
    this.marker = L.circleMarker([this.bounds[0][0], this.bounds[0][1] ], {
      radius: 8,
      fillColor: "#000",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.6
    });
    return this.marker;
  }
}

class ClusterControl {
  constructor() {
    this.width = 40;
    this.height = 40;

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
    return Math.abs(this.map.getBounds().getSouthEast().lat - this.map.getBounds().getNorthWest().lat)/this.width;
  }
  unitHeight() {
    return Math.abs(this.map.getBounds().getSouthEast().lng - this.map.getBounds().getNorthWest().lng)/this.height;
  }
  addLayer(val) {
    this.clusterableLayers.push(val);
  }
  addPointToCluster(point) {
    var maxIndex = this.width*this.height;
    var hor = Math.round(Math.abs(point._latlng.lat - this.map.getBounds().getNorthWest().lat)/this.unitWidth());
    var ver = Math.floor(Math.abs(point._latlng.lng - this.map.getBounds().getNorthWest().lng)/this.unitHeight());
    if ((ver*this.width)+hor > maxIndex) {
      console.log(ver);
      console.log(this.unitHeight());
    }
    this.clusteringPoints[(ver*this.width)+hor].innerPoints.push(point);
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
        var cluster = new Cluster([[this.map.getBounds().getNorthWest().lat-unitWidth*x,this.map.getBounds().getNorthWest().lng+unitHeight*y],[this.map.getBounds().getNorthWest().lat+unitWidth*x,this.map.getBounds().getNorthWest().lng+unitHeight*y],[this.map.getBounds().getNorthWest().lat+unitWidth*x,this.map.getBounds().getNorthWest().lng-unitHeight*y],[this.map.getBounds().getNorthWest().lat-unitWidth*x,this.map.getBounds().getNorthWest().lng-unitHeight*y]]);
        this.clusteringPoints.push(cluster)
      }
    }
    for (var rPoint of this.removedPoints)
      rPoint.addTo(this.map);
    this.updateClustersInPoints();
    this.displayClusters();
  }

  partionMap() {
    console.log("Hello");
  }
}

export default new ClusterControl();
