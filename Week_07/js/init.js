const map = L.map('map').setView([34.0709, -118.444], 15);

const url = "https://spreadsheets.google.com/feeds/list/1hOI-wMAGusEXfGFwQmUf7P22NgAz5FRng0B9M_zAcbU/o34mprh/public/values?alt=json";


let Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

Esri_WorldTopoMap.addTo(map); 


fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)

let northCircleOptions = {
  radius: 10,
  fillColor: "#24FFF5",
  color: "#1a998a",
  weight:1, //stroke weight and opacity 
    opacity: 1,
  fillOpacity: 0.5,
  dashArray:4
}

let southCircleOptions = {
  radius: 10,
  fillColor: "#ff7800",
  color: "#b30000",
  weight: 0.5,
    opacity: 1,
  fillOpacity: 0.5, 
  dashArray:4
}

let northernGroup = L.featureGroup(); 
let southernGroup = L.featureGroup();

let allLayers = {
  "Northern Hemisphere":northernGroup,
  "Southern Hemisphere":southernGroup
}; 
let southernHemisphereCount = 0; 


function addMarker(data){
  if(data.lat >= 0) //Only create markers for places in the northern hemisphere 
  {
    northernGroup.addLayer(L.circleMarker([data.lat,data.lng], northCircleOptions)
    .bindPopup(`<h2>${data.enteraplace} (Northern hemisphere)</h2>
    <p>Cool things: ${data.whatdoyoulikeaboutthisplace}</p>
    <p>Human-selected location? ${data.doyouhaveaplaceinmind}</p>`));
  }
  else
  {
    southernGroup.addLayer(L.circleMarker([data.lat,data.lng], southCircleOptions)
    .bindPopup(`<h2>${data.enteraplace} (Southern hemisphere)</h2>
    <p>Cool things: ${data.whatdoyoulikeaboutthisplace}</p>
    <p>Human-selected location? ${data.doyouhaveaplaceinmind}</p>`));

    southernHemisphereCount++; 
  }

  createButtons(data.lat, data.lng, data.enteraplace); 
  
  console.log(southernHemisphereCount + " places in the southern hemisphere"); 
} 


function createButtons(lat,lng,title){
  if(title == "")
    title = "Randomly generated place at " + lat + ", " + lng; 

  const newButton = document.createElement("button"); // adds a new button
  newButton.id = "button"+title; // gives the button a unique id
  newButton.innerHTML = title; // gives the button a title
  newButton.setAttribute("lat",lat); // sets the latitude 
  newButton.setAttribute("lng",lng); // sets the longitude 
  newButton.addEventListener('click', function(){
      map.flyTo([lat,lng], 8, {duration:1}); //this is the flyTo from Leaflet
  })

  let hemisphere = 'northernhemisphere'; 
  if(lat < 0)
    hemisphere = 'southernhemisphere';

  const buttonPanel = document.getElementById(hemisphere); 
  buttonPanel.appendChild(newButton); //this adds the button to our page.
}

function formatData(theData){
        const formattedData = []
        const rows = theData.feed.entry
        for(const row of rows) {
          const formattedRow = {}
          for(const key in row) {
            if(key.startsWith("gsx$")) {
                  formattedRow[key.replace("gsx$", "")] = row[key].$t
            }
          }
          formattedData.push(formattedRow)
        }
        console.log(formattedData)
        formattedData.forEach(addMarker)
        
        //Add layers to map: 
        L.control.layers(null,allLayers,{collapsed:false}).addTo(map);
        let allGroups = L.featureGroup([northernGroup, southernGroup]);   
        allGroups.addTo(map);  //Making all layers visible by default 
        map.fitBounds(allGroups.getBounds()); 
}
