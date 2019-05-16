//create a satellite tile layer
var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
});

//create a light tile layer
var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
});

//create an outdoors tile layer
var outdoormap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
});

//create a map centered on the United States
var myMap = L.map("map", {
    center: [39.04, -94.56],
    zoom: 12,
    layers: [satellitemap]
});

//create a baseMaps object
var baseMaps = {
    "Satellite": satellitemap,
    "Light": lightmap,
    "Outdoors": outdoormap
};

//create a layer control
var controlLayers = L.control.layers(baseMaps, {}, {collapsed: false}).addTo(myMap);

//Function to create marker size for earthquakes
/* function calcRadius(magnitude) {
    return (magnitude/5) * 20;
}

//colors for circles
var colors = ["#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#f03b20", "#bd0026"];

//function to return color of circle
function circleColor(magnitude) {
    if (magnitude < 1) {
        return colors[0];
    }
    else if (magnitude < 2) {
        return colors[1];
    }
    else if (magnitude < 3) {
        return colors[2];
    }
    else if (magnitude < 4) {
        return colors[3];
    }
    else if (magnitude < 5) {
        return colors[4];
    }
    else {
        return colors[5];
    }
} */

//circles to represent earthquakes
var link = "/data/smalldata.json"
//Link to perform an API call to the United States Geological Survey to get GeoJSON records
//for all earthquakes in the last seven days
//var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//access the url and create layer
d3.json(link, function(response) {
    console.log(response);
     /* geoEarthquakes = L.geoJSON(response, {
        pointToLayer: function(feature) {
            return L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                fillColor: circleColor(+feature.properties.mag),
                color: "black",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8,
                radius: calcRadius(+feature.properties.mag)
            });
        }, 
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<p><h3>" + feature.properties.place + "</h3></p><p><h3>Magnitude: " + feature.properties.mag + "</h3></p>");
        }
    }).addTo(myMap);
    
    controlLayers.addOverlay(geoEarthquakes, "Earthquakes"); */
});  
// Create the createMarkers function
function createMarkers(link) {

  // Pulling the data from the link
  d3.json(link, function (data) {

    //Here we are setting variable for markers
    //We set the markers variable here because we needed to slice the amount of data we are gathering using the SLICE function
    limit = 200
    data = data.slice(0, limit)

    //Here is our for loop. NOTE that we are using our new variable MARKERS, due to prior slicing
    //NOTE we are binding our popup data within our FOR loop. 
    data.forEach(d => {
      L.marker([d.Lat, d.Lng])
        .bindPopup("<h5>" + d.Address +
          "</h5><hr><p>" + 'Description: ' + d.Description + "</p>")
        .addTo(myMap);

    })


  })
};

//Now we are using the newly made functions here to push the data onto our HTML
createMarkers(link);

