/**
* Single day grid cell in the Calendar
* props:
*	(int) date: the date.
* 	(bool) isCurrentMonth: whether or not the day displayed is part of the current month.
*	will be rendered differently.
*/
function CalendarDay({ date, isCurrentMonth }) {
	return(
		<p className={`daycell ${isCurrentMonth ? "" : "daycell-muted"}`}>
			<span>{date}</span>
		</p>
	);
}

export default CalendarDay
