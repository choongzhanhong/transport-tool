import CalendarGrid from "./CalendarGrid"
import "./calendar.css"

/**
* Topmost container for calendar functionality.
* Month is zero indexed.
*/
function Calendar({year, month}) {
    const monthLabel = new Date(year, month, 1).toLocaleString(undefined, {
        year: "numeric",
        month: "long",
    });

    return (
		<div className="calendar">
			<div className="calendar-header">
			<h2 className="calendar-title">{monthLabel}</h2>
			</div>
			
			<div className="calendar-body">
				<CalendarGrid year={year} month={month}/>
			</div>
			
		</div>
    )
}

export default Calendar