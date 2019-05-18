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
    center: [39.09, -94.57],
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

//access the data
var link = "/data"
//access the data and create layer
d3.json(link, function(response) {
    console.log(response);
});  
// Create the createMarkers function
function createMarkers(link) {

  // Pulling the data from the link
  d3.json(link, function (data) {

    //Here we are setting variable for markers
    //We set the markers variable here because we needed to slice the amount of data we are gathering using the SLICE function
    limit = 500
    data = data.slice(0, limit)

    //Here is our for loop. NOTE that we are using our new variable MARKERS, due to prior slicing
    //NOTE we are binding our popup data within our FOR loop. 
    data.forEach(d => {
      try{
      L.marker([d.Lat, d.Lng])
        .bindPopup("<h5>" + d.Address +
          "</h5><hr><p>" + 'Description: ' + d.Description + "</p>")
        .addTo(myMap);}
        catch(err) {
          console.log(err)
        }
        
    })


  })
};

//Now we are using the newly made functions here to push the data onto our HTML
createMarkers(link);

