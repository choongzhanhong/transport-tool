require('dotenv').config()
const EMAIL = process.env.ONEMAP_EMAIL;
const PASSWORD = process.env.ONEMAP_EMAIL_PASSWORD;
const ACCESS_TOKEN= process.env.ACCESS_TOKEN;

const data = JSON.stringify(false);
      
const xhr = new XMLHttpRequest();
      
xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
			console.log(this.responseText);  // Prints the response
        }
      });
      
xhr.open("GET", "https://www.onemap.gov.sg/api/public/routingsvc/route?start=1.320981%2C103.844150&end=1.326762%2C103.8559&routeType=pt&date=08-13-2023&time=07%3A35%3A00&mode=TRANSIT&maxWalkDistance=1000&numItineraries=3");
      
xhr.setRequestHeader("Authorization", ACCESS_TOKEN);
      
xhr.send(data);