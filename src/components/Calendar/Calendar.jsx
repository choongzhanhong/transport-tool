// Topmost container for calendar data
// import CalendarGrid from "./CalendarGrid"
import "./calendar.css"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// month is zero-indexed.
function Calendar({year, month}) {
    const monthLabel = new Date(year, month, 1).toLocaleString(undefined, {
        year: "numeric",
        month: "long",
    });

    return (
        <h2>{monthLabel}</h2>
    )
}

export default Calendar