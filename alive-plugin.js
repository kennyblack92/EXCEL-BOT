const express = require('express');
const app = express();
const port = 3000; // You can change this to any port you prefer

// Define a route for the alive check
app.get('/alive', (req, res) => {
  res.json({ message: 'Bot is alive and running!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
