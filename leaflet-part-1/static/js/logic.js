function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map.
    let globalmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
  
    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "global map": globalmap
    };
  
    // Create an overlayMaps object to hold the bikeStations layer.
    let overlayMaps = {
       "earthquakes":earthquakes
    };
  
    // Create the map object with options.
    let map = L.map("map-id", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [globalmap, earthquakes]
    });
    
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "stations" property from response.data.
    let place = response.data.place;
  
    // Initialize an array to hold bike markers.
    let magnitude = [];
  
    // Loop through the stations array.
    for (let index = 0; index < geometry.depth; index++) {
      let earthquakes = geometry[index];
  
      // For each station, create a marker, and bind a popup with the station's name.
      let magMarker = L.marker([geometry.latitude, geometry.longitude])
        .bindPopup("<h3>" + properties.mag + "<h3><h3>Capacity: " + geometry.depth + "</h3>");
  
      // Add the marker to the bikeMarkers array.
     magMarkers.push(magMarker);
    }
  
    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(L.layerGroup(magMarkers));
  }
 
  // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
  d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);
  


