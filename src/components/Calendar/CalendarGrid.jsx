import CalendarDay from "./CalendarDay";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
* The actual calendar grid itself, which is a html table.
* Choosing of date is handled one level up by Calendar.jsx.
*/
function CalendarGrid({ year, month }) {
	const firstOfMonth = new Date(year, month, 1);
	const startDay = firstOfMonth.getDay(); //0..6 for Sun..Sat
	const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
	const totalDaysPrevMonth = new Date(year, month, 0).getDate();
	
	// to be populated with 6 rows of 7 cells (or should the number of rows be flexible?)
	const cells = [];
	for (let i = 0; i < 42; i++) {
		const dayIndex = i - startDay;
		let dayNumber = 0;
		let inCurrentMonth = true;
		
		if (dayIndex < 0) {
			// previous month's days 
			inCurrentMonth = false;
			dayNumber = totalDaysPrevMonth + dayIndex + 1;
		} else if (dayIndex >= totalDaysInMonth) {
			// next month's days
			inCurrentMonth = false;
			dayNumber = dayIndex - totalDaysInMonth + 1;
		} else {
			dayNumber = dayIndex + 1;
		}
		
		cells.push({key: i, dayNumber, inCurrentMonth});
	}
	
	const weeks = [];
	for (let i = 0; i < 42; i += 7) {
		weeks.push({key: i/7, cells: cells.slice(i, i + 7)});
	}
	console.log(weeks);
	
	
	return (
		<table className="calendar-grid">
			<thead>
				<tr>
					{WEEKDAYS.map((day) => (
						<th key={day} scope="col">{day}</th>
					))}
				</tr>
			</thead>
			<tbody>
			{weeks.map((week, weekIndex) => (
				<tr key={weekIndex}>
					{week.cells.map((cell, dayIndex) => (
						<td key={dayIndex}>
						<CalendarDay date={cell.dayNumber} isCurrentMonth={cell.inCurrentMonth}/>
						</td>
					))}
				</tr>
			))}
			</tbody>
		</table>
	);
}

export default CalendarGrid