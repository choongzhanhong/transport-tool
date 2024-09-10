console.log("Recurring Fare class loaded");

class RecurringFare {
	
    constructor() {
		//                 S  M  T  W  T  F  S
        this.dailyFares = [0, 0, 0, 0, 0, 0, 0];
    }

	addFare(amount, index) {
		this.dailyFares[index] += amount;
	}
	
	getFare(index) {
		return this.dailyFares[index];
	}
	
	resetFares() {
		this.dailyFares = [0, 0, 0, 0, 0, 0, 0];
	}

	
	// Keep it this way because this string format takes things quite literally.
	toString() {
		return `Sunday:    $${this.dailyFares[0]}\nMonday:    $${this.dailyFares[1]}\nTuesday:   $${this.dailyFares[2]}\nWednesday: $${this.dailyFares[3]}\nThursday:  $${this.dailyFares[4]}\nFriday:    $${this.dailyFares[5]}\nSaturday:  $${this.dailyFares[6]}`;
	}
	
}