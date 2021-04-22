let center = [36.14819188135983, -120.83772947793881]; 
let zoom = 8; 

let mapConfig = {"center": center, "zoomLevel": zoom};
const map = L.map('map').setView(center, zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


let nebraska = [40.927316893065885, -99.95246387738227];
addExcitedMarker(nebraska[0], nebraska[1], "This is Nebraska", 1); 

addExcitedMarker(37.554161894514564, -122.09429257186252, "The Bay Area (Point Reyes)", 13); 
addExcitedMarker(45.067025356140185, -86.12093542264297, "The Great Lakes", 5); 
addExcitedMarker(50.57739648211621, -75.31038942567739, "Niagara Falls and maybe Toronto", 7); 


function addExcitedMarker(lat, long, message, howExcited) 
//set isExcited to true to add exclamation points
{
    createButton(lat, long, message); 

    let excite = "!";
    for(let i = 0; i < howExcited; i++)
    {
        excite += "!"; 
    }
    message += excite; 
    L.marker([lat, long]).addTo(map).bindPopup(message);

    return message; 

}

// function addMarker(lat, long, message, title) 
// {
//     console.log(message); 
//     L.marker([lat, long]).addTo(map).bindPopup(message);
//     createButton(lat, long, title);
//     return message;  
// }

function createButton(lat, long, title)
{
    const newButton = document.createElement("button");
    newButton.id = "button" + title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat", lat);
    newButton.setAttribute("long", long);
    newButton.addEventListener('click', function(){
        map.flyTo([lat,long]); //this is the flyTo from Leaflet
    })
    document.body.appendChild(newButton); //appends the button in the head 
}