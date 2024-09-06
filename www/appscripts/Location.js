console.log("Location class loaded");

class Location {
	constructor(name = "", address = "", latitude = "", longitude = "") {
		this.name = name;
		this.address = address;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	
	get getLatitude() {
        return this.latitude;
    }

    get getLongitude() {
        return this.longitude;
    }
	
	setLocation(name, address, latitude, longitude) {
		this.name = name;
		this.address = address;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	
	toString() {
		return `${this.name} (${this.latitude}, ${this.longitude})`;
	}
	
}