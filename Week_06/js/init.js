const map = L.map('map').setView([34.0709, -118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function createButtons(lat,lng,title){
  if(title == "")
    title = "Randomly generated place at " + lat + ", " + lng; 

  const newButton = document.createElement("button"); // adds a new button
  newButton.id = "button"+title; // gives the button a unique id
  newButton.innerHTML = title; // gives the button a title
  newButton.setAttribute("lat",lat); // sets the latitude 
  newButton.setAttribute("lng",lng); // sets the longitude 
  newButton.addEventListener('click', function(){
      map.flyTo([lat,lng]); //this is the flyTo from Leaflet
  })

  let hemisphere = 'northernhemisphere'; 
  if(lat < 0)
      hemisphere = 'southernhemisphere'; 
      
  const buttonPanel = document.getElementById(hemisphere); 
  buttonPanel.appendChild(newButton); //this adds the button to our page.
}

function addMarker(data){
  L.marker([data.lat, data.lng]).addTo(map)
  .bindPopup(`<h2>${data.enteraplace}</h2>
  <p>Cool things: ${data.whatdoyoulikeaboutthisplace}</p>
  <p>Human-selected location? ${data.doyouhaveaplaceinmind}</p>`);
  createButtons(data.lat, data.lng, data.enteraplace); 
}

let url = "https://spreadsheets.google.com/feeds/list/1hOI-wMAGusEXfGFwQmUf7P22NgAz5FRng0B9M_zAcbU/o34mprh/public/values?alt=json"; 
////// 

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)


function formatData(theData){
        const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
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
}