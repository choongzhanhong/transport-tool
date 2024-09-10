console.log("Single Fare class loaded");

// TODO: Consider creating an interface for SingleFare and RecurringFare
// since similar methods are employed.
class SingleFare {
	
    constructor() {
		// An array, shouldn't be larger than size 42, or even 365...
		this.fares = [];
    }

	addFare(amount, index) {
		// First initialisation is undefined.
		if (!this.fares[index]) {
			this.fares[index] = amount;
		} else {
			this.fares[index] += amount;
		}
	}
	
	getFare(index) {
		if (!this.fares[index]) {
			return 0;
		} else {
			return this.fares[index];
		}
	}
	
	
	// lazily add zeros only when the full array is needed
	getFareArray() {
		for (let i = 0, len = this.fares.length; i < len; i++) {
			let current = this.fares[i];
			if (!current) {
				this.fares[i] = 0;
			}
		}
		
		return this.fares;
	}
	
	resetFares() {
		this.fares = [];
	}

	
	// Keep it this way because this string format takes things quite literally.
	toString() {
		let output = "[";
		
		for (let i = 0, len = this.fares.length; i < len; i++) {
			let current = this.fares[i];
			if (!current) {
				output += "0";
			} else {
				output += this.fares[i].toFixed(2);
			}
			
			if (i < len - 1) {
				output += ", ";
			}
		}
		
		output += "]";
		return output;
	}
	
}