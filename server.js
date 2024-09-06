const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

// HTML inside www directory
app.use(express.static('www'));

/* app.get('/getToken', (req, res) => {
  const data = {
    email: process.env.ONEMAP_EMAIL,
    password: process.env.ONEMAP_EMAIL_PASSWORD
  };

  axios.post('https://www.onemap.gov.sg/api/auth/post/getToken', data)
    .then(response => {
      // Send the API response back to the client
      res.json(response.data);

      // Optionally save it to a file
      fs.writeFileSync('response.json', JSON.stringify(response.data, null, 2));
      console.log('Data saved to response.json');
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('Error occurred');
    });
}); */

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'www/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
