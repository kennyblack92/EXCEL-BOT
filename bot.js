const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const axios = require('axios');

const SESSION_FILE_PATH = './session.json';
const COMMAND_PREFIX = '!'; // Set your preferred command prefix

let sessionData;

if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
  session: sessionData
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', (session) => {
  console.log('Authenticated');
  sessionData = session;
  fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(session));
});

client.on('message', async (msg) => {
  const lowercaseMsg = msg.body.toLowerCase();

  if (lowercaseMsg.startsWith(COMMAND_PREFIX)) {
    const command = lowercaseMsg.slice(1); // Remove the prefix
    
    if (command === 'hi') {
      msg.reply('Hello! How can I assist you today?');
    } else if (command === 'weather') {
      try {
        // ... (weather API interaction, as before)
      } catch (error) {
        msg.reply('Sorry, I couldn\'t fetch the weather information.');
      }
    } else if (command === 'imagify') {
      // Example text-to-image API interaction
      const imageUrl = await convertTextToImage('Hello from WhatsApp Bot!');
      msg.reply(imageUrl);
    } else {
      msg.reply('Unknown command. Type `' + COMMAND_PREFIX + 'help` for a list of commands.');
    }
  }
});

async function convertTextToImage(text) {
  // Replace with actual image API integration
  // For demonstration purposes, return a placeholder URL
  return 'https://via.placeholder.com/300';
}

client.initialize();
