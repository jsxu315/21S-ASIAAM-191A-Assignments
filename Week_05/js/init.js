const map = L.map('map').setView([34.0709, -118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//let url = "https://spreadsheets.google.com/feeds/list/1IZzv50RrC-NLsfzZ6ONJ73svDRHzH3jGSJKzmNF-Ka0/oua1awz/public/values?alt=json"; //From JSON returner 
let url = "https://spreadsheets.google.com/feeds/list/1hOI-wMAGusEXfGFwQmUf7P22NgAz5FRng0B9M_zAcbU/o34mprh/public/values?alt=json"; 

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
        //console.log(data);
        processData(data); 
    })

addMarker(data); 

// const electronics = [{'name' : 'wallace'}, {'name': 'bernard'}, {'name': 'adelaide'}]; 
// electronics.forEach(greet); 

// function greet(person)
// {
//     console.log("Hello " + person.name + "!\n"); 

//     //Add some marker
//     //addMarker(person); 
// }

function addMarker(data){
    L.marker([data.lat, data.lng]).addTo(map)
    .bindPopup(`<h2>${data.enteraplace}</h2>
    <p>Cool things: ${data.whatdoyoulikeaboutthisplace}</p>
    <p>Human-selected location? ${data.doyouhaveaplaceinmind}</p>`);
}



function processData(theData){
    const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
    const rows = theData.feed.entry // this is the weird Google Sheet API format we will be removing
    // we start a for..of.. loop here 
    for(const row of rows) { 
      const formattedRow = {}
      for(const key in row) {
        // time to get rid of the weird gsx$ format...
        if(key.startsWith("gsx$")) {
              formattedRow[key.replace("gsx$", "")] = row[key].$t
        }
      }
      // add the clean data
      formattedData.push(formattedRow)
    }
    // lets see what the data looks like when its clean!
    console.log(formattedData)
    // we can actually add functions here too
    formattedData.forEach(addMarker)
}