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
	
	get isValid() {
		return (this.latitude && this.longitude);
	}
	
	setLocation(name, address, latitude, longitude) {
		this.name = name;
		this.address = address;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	
	resetLocation() {
		this.name = "";
		this.address = "";
		this.latitude = "";
		this.longitude = "";
	}
	
	toString() {
		return `${this.name} (${this.latitude}, ${this.longitude})`;
	}
	
	getLatLongString() {
		return `${this.latitude},${this.longitude}`;
	}
	
}