// JavaScript const variable declaration
const map = L.map('map').setView([40.20817017105436, -99.67677569780989], 4); //id name from HTML is in the single quotes

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//JavaScript let variable declaration to create a marker
// let marker = L.marker([34.0709, -118.444]).addTo(map)
// 		.bindPopup('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I work in ')
// 		.openPopup();

let pyramidLakesMarker = L.marker([34.658119685884806, -118.77486338171346]).addTo(map)
	.bindPopup('I\'ve only driven by Pyramid Lakes but it\'s so pretty!')
	.openPopup();

//console.log("Attempting to put Point Reyes marker: "); 
let pointReyesMarker = L.marker([38.068771, -122.806770]).addTo(map)
	.bindPopup('I\'ve never been to Point Reyes, but I hope to go someday!')
	.openPopup();

//console.log("Attempting to put the Met marker: "); 
let metMarker = L.marker([40.7796965529347, -73.96299723857942]).addTo(map)
	.bindPopup('The Met has so many exhibits! But as a 9th grader I spent almost all of my time in the weapons/armor section.')
	.openPopup();