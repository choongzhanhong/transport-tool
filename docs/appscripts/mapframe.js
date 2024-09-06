console.log("mapframe running");

var mapFrame = document.getElementById("mapFrame");
const baseURL = "https://www.onemap.gov.sg/amm/amm.html?mapStyle=Default&zoomLevel=15&popupWidth=200"

// Example URLs: Note latLng or postalcode works.
//"https://www.onemap.gov.sg/amm/amm.html?mapStyle=Default&zoomLevel=15&popupWidth=200&marker=latLng:1.31014127597376,103.909800408275!colour:red"
// "https://www.onemap.gov.sg/amm/amm.html?mapStyle=Default&zoomLevel=15&marker=postalcode:650326!colour:red&marker=postalcode:440013!colour:red&popupWidth=200" 

function formatMarkerString(latitude, longitude, colour = "red") {
	// If there is no lat/long data attached.
	if (!latitude || !longitude) {
		return "";
	}
	
	return `marker=latLng:${latitude},${longitude}!colour:${colour}`;
}

function appendURL(url, string) {
	if (!string) {
		return url;
	}
	
	return url + "&" + string;
}


// TODO Only two markers at any given time
// TODO don't expose Location class to this file so it can work independently
function updateMap(location1, location2) {
	location1Marker = formatMarkerString(location1.getLatitude, location1.getLongitude);
	location2Marker = formatMarkerString(location2.getLatitude, location2.getLongitude);
	let newURL = appendURL(baseURL, location1Marker);
	newURL = appendURL(newURL, location2Marker);
	mapFrame.src = newURL;
}