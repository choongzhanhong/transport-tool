const TODAY = new Date();
console.log(TODAY);
const TOTAL_DAYS = 42; // 42 days displayed on a 6-row, 7-day calendar.

// Fares for:     S  M  T  W  T  F  S
const dailyFares = new RecurringFare();
document.getElementById("dailyFareTable").textContent = dailyFares.toString();

// Call upon initialisation
document.getElementById("calendarHead").textContent = TODAY.toLocaleString('default', {
		month: 'long',
		year: 'numeric'}); 
	
populateCalendar();
console.log("Populated calendar.");

document.getElementById("resetRecurringTripsButton").addEventListener("click", function () {
	dailyFares.resetFares();
	document.getElementById("dailyFareTable").textContent = dailyFares.toString();
	});
	
	
document.getElementById("daysOfWeekCheckboxButton").addEventListener("click", function() {
	console.log("Checked fares");
	let fare = document.getElementById("fareInput").value;
	fare = parseFloat(fare);
	for (let i = 0; i < 7; i++) {
		if (document.getElementById(`checkDay${i}`).checked) {
			dailyFares.addFare(fare, i); //[i] += fare;
		}
	}
	document.getElementById("dailyFareTable").textContent = dailyFares.toString();
});

document.getElementById("calculateTotalFareButton").addEventListener("click", calculateTotalFares);

/**
 * Populates the HTML calendar table with the days of the month.
 * Starts with the current date and fills out all rows.
 */
function populateCalendar() {
	let day = TODAY.getDate();		// Should return the date (0 to 31).
	let total = TOTAL_DAYS - day;	
	let lastDay = daysInMonth(TODAY);
	let daysHighlighted = 0;
	
	// Start at day = [..6], 
	for (let i = day, currentDay = day; currentDay <= TOTAL_DAYS; i++, currentDay++) {
		if (i > lastDay) {
			i = 1;
		}
		let currentCell = document.getElementById(`day${currentDay}`);
		currentCell.textContent = i;
		if (daysHighlighted < 30) {
			currentCell.style.backgroundColor = "lightblue";
			daysHighlighted++;
		}
	}
}

/**
 * @return number of days in this month.
 * Does so by creating a date starting from the month after,
 * but day is 0 (meaning one day before the first of this month, i.e. last day
 * of current month)
 */
function daysInMonth(anyDateInMonth) {
    return new Date(anyDateInMonth.getFullYear(), 
			anyDateInMonth.getMonth()+1, 
			0).getDate();
}

/**
 * Calculate for the next few days (not necessarily just 30)
 */
function calculateTotalFares() {
	// Sunday - Saturday [0, 6]
	let day = TODAY.getDay();
	let total = 30; // TOTAL_DAYS - day;
	let totalFare = 0;
	while (total--) {
		console.log(totalFare);
		totalFare += dailyFares[day];
		day = (++day) % 7;
	}
	totalFare = parseFloat(totalFare.toFixed(2));
	document.getElementById("totalFareResult").textContent = totalFare;
	return totalFare;
}