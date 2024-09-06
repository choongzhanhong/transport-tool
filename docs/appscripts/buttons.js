console.log("buttons running");

/**
 * Add event listeners in this section.
 */
document.getElementById('searchButton_1').addEventListener('click', function() {
	const query = document.getElementById('searchQuery_1').value;
	searchAddress(query, 1);
});

document.getElementById('searchButton_2').addEventListener('click', function() {
	const query = document.getElementById('searchQuery_2').value;
	searchAddress(query, 2);
});

const calculateFareButton = document.getElementById("calculateFareButton");
calculateFareButton.addEventListener('click', function() {
	getRouting(location_1, location_2);
});
	
var location_1 = new Location();
var location_2 = new Location();
	
/**
 * Makes OneMap API call to search address based on input
 *
 * @param {string} input - The search term (e.g., postal code or address) to query.
 * @param {number} queryNum - Which search button.
 * @returns {Promise<void>} A promise that resolves when the search is complete.
 *
 */
function searchAddress(input, queryNum) {
	// Don't bother searching if there's no input.
	if (!input) {
		document.getElementById(`response_${queryNum}`).textContent = "Please input a query.";
		if (queryNum == 1) {
			location_1.resetLocation();
		} else {
			location_2.resetLocation();
		}
		
		// TODO uphold DRY principle here
		updateMap(location_1, location_2);
		if (location_1.isValid && location_2.isValid) {
			calculateFareButton.disabled = false;
		} else {
			calculateFareButton.disabled = true;
		}
		return;
	}
	
	// Yes/No (Y/N).
	// Geometry: Lat/Long
	// Address Details: Name of the thing itself.
	const returnGeom = "Y"; 
	const getAddrDetails = "Y";
	const pageNum = "1";
	
    const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${input}&returnGeom=${returnGeom}&getAddrDetails=${getAddrDetails}&pageNum=${pageNum}`;

	return fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			console.log('Search results:', data);
			let result = data.results[0];
			console.log(result);
			
			if (queryNum == 1) {
				location_1.setLocation(result.SEARCHVAL, result.ADDRESS, result.LATITUDE, result.LONGITUDE);
				document.getElementById(`response_1`).textContent = location_1.toString();
			} else {
				location_2.setLocation(result.SEARCHVAL, result.ADDRESS, result.LATITUDE, result.LONGITUDE);
				document.getElementById(`response_2`).textContent = location_2.toString();
			}
			updateMap(location_1, location_2);
			if (location_1.isValid && location_2.isValid) {
				calculateFareButton.disabled = false;
			} else {
				calculateFareButton.disabled = true;
			}
		})
		.catch(error => {
			console.error('Error during search:', error);
			document.getElementById(`response_${queryNum}`).textContent = 'An error occurred.';
		});
}

function getRouting(location1, location2) {
	const START_LAT_LONG = location1.getLatLongString();
	const END_LAT_LONG = location2.getLatLongString();
	const ROUTE_TYPE = "pt"; // Public transport, but actually I will just hard code it in
	const DATE = "01-01-2024"; // Is this important?
	const TIME = "07:00:00"; // %3A is : (colon)
	const MODE = "TRANSIT" // Alternatives: "BUS", "RAIL".
	
	const url = `https://www.onemap.gov.sg/api/public/routingsvc/route?start=${START_LAT_LONG}&end=${END_LAT_LONG}&routeType=pt&date=08-13-2024&time=09%3A35%3A00&mode=TRANSIT&maxWalkDistance=1000&numItineraries=1`
	
	return fetch(url, {
		method: "GET",
		headers: {"Authorization": ACCESS_TOKEN},
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(data => {
		console.log('Search results:', data);
		document.getElementById(`result_fare`).textContent = data.plan.itineraries[0].fare;
	})
	.catch(error => {
		console.error('Error during search:', error);
		document.getElementById(`response_${queryNum}`).textContent = 'An error occurred.';
	});
}
