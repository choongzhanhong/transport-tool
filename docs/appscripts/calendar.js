const TODAY = new Date();
console.log(TODAY);
const TOTAL_DAYS = 42; 			// 42 days displayed on a 6-row, 7-day calendar.
const DURATION_OF_PASS = 30;	// The pass should be 30 days, if I'm not wrong

// Fares for:     S  M  T  W  T  F  S
const dailyFares = new RecurringFare();
const singleFares = new SingleFare();

document.getElementById("dailyFareTable").textContent = dailyFares.toString();
document.getElementById("singleFareTable").textContent = singleFares.toString();

// Constrain Ad-hoc date picker to only the next 42 days.
const datePicker = document.getElementById('dateInput');

// Get today's date
datePicker.min = TODAY.toISOString().split('T')[0];

// Calculate the date 42 days from today
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 42);
datePicker.max = maxDate.toISOString().split('T')[0];


// Call upon initialisation
document.getElementById("calendarHead").textContent = TODAY.toLocaleString('default', {
		month: 'long',
		year: 'numeric'}); 
	
populateCalendar();
console.log("Populated calendar.");

showFaresOnCalendar();

document.getElementById("resetRecurringTripsButton").addEventListener("click", function () {
	dailyFares.resetFares();
	document.getElementById("dailyFareTable").textContent = dailyFares.toString();
	});
	
document.getElementById("resetSingleTripsButton").addEventListener("click", function () {
	singleFares.resetFares();
	document.getElementById("singleFareTable").textContent = singleFares.toString();
	});
	
	
/**
 * Add recurring fares
 */
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
	showFaresOnCalendar();
	calculateTotalFares();
});

const selectedDate = document.getElementById("selectedDate");
selectedDate.innerText = TODAY.toDateString();

/**
 * Add ad-hoc fares
 * Takes the difference in days between today and the selected date
 * The date picker limits dates to next 42 days, so won't go overboard
 */
document.getElementById("adHocDateButton").addEventListener("click", function() {
	// Simply make a new date object
	let inputtedDate = new Date(document.getElementById("dateInput").value);
	
	// get today at midnight to make a comparison
	let todayMidnight  = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
	
	// Find the difference between two dates in milliseconds
	let diff = inputtedDate - todayMidnight;
	diff = Math.floor(diff/(24 * 60 * 60 * 1000)); // conversion from milliseconds
	
	let fare = document.getElementById("fareInput").value;
	fare = parseFloat(fare);
	singleFares.addFare(fare, diff);
	
	document.getElementById("singleFareTable").textContent = singleFares.toString();
	
	showFaresOnCalendar();
	calculateTotalFares();
});

document.getElementById("calculateTotalFareButton").addEventListener("click", calculateTotalFares);

/**
 * Populates the HTML calendar table with the days of the month.
 * Starts with the current date and fills out all rows.
 */
function populateCalendar() {
	let currentTODAY = new Date();			// Make a copy of TODAY.
	let day = TODAY.getDate();		  		// Should return the date (0 to 31).
	let startingID = TODAY.getDay() + 1; 		// Returns 0..6, Sunday to Sat.
	let total = TOTAL_DAYS - startingID;  	// Total number of cells to populate
	let lastDay = daysInMonth(TODAY);		// last day of the month (28, 30, or 31)
	let daysHighlighted = 0;
	
	for (let i = 0; i <= total; i++) {
		let currentCell = document.getElementById(`day${startingID}`);
		currentCell.textContent = day;
		
		if (daysHighlighted < DURATION_OF_PASS) {
			currentCell.style.color = "red";
			daysHighlighted++;
		}
		
		startingID++;
		day++;
		if (day > lastDay) {
			day = 1;
			// the next month's total number of days. Do it once because
			// max probably do it twice (if jan 31, feb 28 days, then march)
			currentTODAY.setMonth(currentTODAY.getMonth() + 1);
			lastDay = daysInMonth(currentTODAY);
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
 * Calculate for the next 30 days
 */
function calculateTotalFares() {
	// Sunday - Saturday [0, 6]
	let day = TODAY.getDay();
	let total = DURATION_OF_PASS;
	let totalFare = 0;
	
	// Add recurring fares
	while (total--) {
		console.log(totalFare);
		totalFare += dailyFares.getFare(day);
		day = (++day) % 7;
		
		totalFare += singleFares.getFare(total);
	}
	totalFare = parseFloat(totalFare.toFixed(2));
	document.getElementById("totalFareResult").textContent = totalFare;
	return totalFare;
}

/**
 * Show the fares in the calendar itself
 */
function showFaresOnCalendar() {
	console.log("doing it boss");
	let startingID = TODAY.getDay() + 1; 		// Returns 0..6, Sunday to Sat.
	let total = TOTAL_DAYS - startingID;  	// Total number of cells to populate
	let dayOfWeek = startingID - 1;
	
	for (let i = 0; i <= total; i++) {
		let currentCell = document.getElementById(`dayFare${startingID}`);
		let amount = dailyFares.getFare(dayOfWeek);
		amount += singleFares.getFare(i); 
		
		if (amount > 0) {
			currentCell.style.color = "black";
		}
		currentCell.textContent = "$" + amount.toFixed(2);
		
		startingID++;
		dayOfWeek = (dayOfWeek + 1) % 7;
		
	}
}