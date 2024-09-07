const TODAY = new Date();
console.log(TODAY);
const TOTAL_DAYS = 42; // 42 days displayed on a 6-row, 7-day calendar.

// Fares for:     S  M  T  W  T  F  S
var dailyFares = [0, 0, 0, 0, 0, 0, 0];
document.getElementById("dailyFareTable").textContent = dailyFares.toString();

// Call upon initialisation
document.getElementById("calendarHead").textContent = TODAY.toLocaleString('default', {
		month: 'long',
		year: 'numeric'}); 
	
populateCalendar();
console.log("Populated calendar.");

document.getElementById("daysOfWeekCheckboxButton").addEventListener("click", function() {
	console.log("Checked fares");
	let fare = document.getElementById("fareResult").textContent;
	fare = parseFloat(fare);
	for (let i = 0; i < 7; i++) {
		if (document.getElementById(`checkDay${i}`).checked) {
			dailyFares[i] += fare;
		}
	}
	document.getElementById("dailyFareTable").textContent = dailyFares.toString();
});

document.getElementById("calculateTotalFareButton").addEventListener("click", calculateTotalFares);

function populateCalendar() {
	// Sunday - Saturday [0, 6]
	let day = TODAY.getDay();
	let total = TOTAL_DAYS - day;
	let lastDay = daysInMonth(TODAY);
	
	// Start at day = [..6], 
	for (let i = 1 + day, currentDay = 1 + day; currentDay <= TOTAL_DAYS; i++, currentDay++) {
		if (i > lastDay) {
			i = 1;
		}
		document.getElementById(`day${currentDay}`).textContent = i;
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
	let total = TOTAL_DAYS - day;
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