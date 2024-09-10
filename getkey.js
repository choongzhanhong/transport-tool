/* Use this to get new API key every 3 days */
/* DO NOT COMMIT ENV FILE! HAHAHA */

console.log("Running get key");

const fs = require('fs');
require('dotenv').config()
const EMAIL = process.env.ONEMAP_EMAIL;
const PASSWORD = process.env.ONEMAP_EMAIL_PASSWORD;
const ACCESS_TOKEN= process.env.ACCESS_TOKEN;

const LOGIN_DATA = JSON.stringify({
	"email": process.env.ONEMAP_EMAIL,
	"password": process.env.ONEMAP_EMAIL_PASSWORD
});

const API_URL = "https://www.onemap.gov.sg/api/auth/post/getToken";

getAuthInfo();

function getAuthInfo() {
	fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: LOGIN_DATA,
	})
	.then(response => {
        // Send the API response back to the client
		return response.json();
        // Optionally save it to a file
    })
	.then(data => {
		console.log(data);
		fs.writeFile('onemap_api.txt', JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error('Error saving data:', err);
            } else {
                console.log('Data has been saved to responseData.txt');
            }
        });
	})
	.catch(error => {
      console.error('Error:', error);
    });
}