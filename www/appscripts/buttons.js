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
	
var location_1 = new Location();
var location_2 = new Location();
console.log(location_1);
	
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
			
			}
			document.getElementById(`response_${queryNum}`).textContent = JSON.stringify(data, null, 2);
		})
		.catch(error => {
			console.error('Error during search:', error);
			document.getElementById(`response_${queryNum}`).textContent = 'An error occurred.';
		});
}