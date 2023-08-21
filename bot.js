const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Express to parse JSON data
app.use(bodyParser.json());

// Create a new WhatsApp client
const client = new Client({
  auth: new LocalAuth({
    session: require('./session.json'), // Replace with your own session data
  }),
});

// Handle incoming messages
client.on('message', async (message) => {
  if (message.body === '!hello') {
    await message.reply('Hello! This is your WhatsApp bot.');
  }
});

// Initialize the client
client.initialize();

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
